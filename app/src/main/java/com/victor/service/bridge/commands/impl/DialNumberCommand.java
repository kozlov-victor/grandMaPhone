package com.victor.service.bridge.commands.impl;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.telecom.PhoneAccountHandle;
import android.telecom.TelecomManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.webkit.WebView;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.victor.model.DialNumber;
import com.victor.service.bridge.commands.base.Command;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.receiver.CallReceiver;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

public class DialNumberCommand extends Command {


    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.dialNumber;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void callWithDualSim(Context context, int id, String number) {
        SubscriptionManager subscriptionManager = (SubscriptionManager) context.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE);
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        List<SubscriptionInfo> subList = subscriptionManager.getActiveSubscriptionInfoList();
        int index=-1;
        String primarySimId = null;
        String secondarySimId = null;
        for (SubscriptionInfo subscriptionInfo : subList) {
            index++;
            if(index == 0){
                primarySimId=subscriptionInfo.getIccId();
            }else {
                secondarySimId=subscriptionInfo.getIccId();
            }
        }

        // TO CREATE PhoneAccountHandle FROM SIM ID
        TelecomManager telecomManager =(TelecomManager) context.getSystemService(Context.TELECOM_SERVICE);
        List<PhoneAccountHandle> list = telecomManager.getCallCapablePhoneAccounts();
        PhoneAccountHandle primaryPhoneAccountHandle = null,secondaryPhoneAccountHandle = null;
        for(PhoneAccountHandle phoneAccountHandle:list){
            if(phoneAccountHandle.getId().contains(primarySimId)){
                primaryPhoneAccountHandle=phoneAccountHandle;
            }
            if(phoneAccountHandle.getId().contains(secondarySimId)){
                secondaryPhoneAccountHandle=phoneAccountHandle;
            }
        }

        if (id==0) {
            //To call from SIM 1
            Uri uri = Uri.fromParts("tel",number, "");
            System.out.println(primaryPhoneAccountHandle);
            Bundle extras = new Bundle();  extras.putParcelable(TelecomManager.EXTRA_PHONE_ACCOUNT_HANDLE,primaryPhoneAccountHandle);
            telecomManager.placeCall(uri, extras);
        } else {
            //To call from SIM 2
            System.out.println(secondaryPhoneAccountHandle);
            Uri uri = Uri.fromParts("tel",number, "");
            Bundle extras = new Bundle();  extras.putParcelable(TelecomManager.EXTRA_PHONE_ACCOUNT_HANDLE,secondaryPhoneAccountHandle);
            telecomManager.placeCall(uri, extras);
        }
    }

    private void callWithOneSim(Activity activity, String number) throws UnsupportedEncodingException {
        Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + URLEncoder.encode(number,"UTF-8")));
        intent.setFlags(Intent.FLAG_ACTIVITY_NO_USER_ACTION);
        if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        activity.startActivity(intent);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    protected Object execute(String commandId, String jsonParams, Activity activity, WebView webView) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            CallReceiver.IS_CALLING = true;
            DialNumber dialNumber = objectMapper.readValue(jsonParams, DialNumber.class);
            String numberCleared = dialNumber.getNumber().trim().
                    replace("(", "").replace(")", "").
                    replace(" ", "").replace("-", "");

            if (dialNumber.getOperatorId()!=null) {
                callWithDualSim(activity,dialNumber.getOperatorId(),numberCleared);
            } else {
                callWithOneSim(activity,numberCleared);
            }
        } catch (IOException e) {
            e.printStackTrace();
            CallReceiver.IS_CALLING = false;
        }
        return null;
    }
}
