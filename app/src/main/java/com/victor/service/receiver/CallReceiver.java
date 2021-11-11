package com.victor.service.receiver;

import android.content.Context;

import com.victor.MainActivity;
import com.victor.model.PhoneCallStateInfo;
import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.provider.PhoneBookProvider;
import com.victor.service.receiver.abstracts.AbstractPhoneCallReceiver;

public class CallReceiver extends AbstractPhoneCallReceiver {

    public static boolean IS_CALLING = false;

    public static void onPhoneStateChanged(Context context, String phoneNumber, PhoneCallState phoneCallState) {
        PhoneCallStateInfo phoneCallStateInfo = new PhoneCallStateInfo();
        phoneCallStateInfo.setPhoneCallState(phoneCallState);
        phoneCallStateInfo.setPhoneNumber(phoneNumber);
        phoneCallStateInfo.setAddress(PhoneBookProvider.getInstance().getContactNameByPhoneNumber(context,phoneNumber));
        JsNativeBridge.sendToWebClient(MainActivity.getWebView(), DeviceCommand.onCallStateChanged.name(),phoneCallStateInfo);
    }

    @Override
    protected void onRinging(Context context, String phoneNumber) {
        IS_CALLING = true;
    }

    @Override
    protected void onStarted(Context ctx, String number) {
        IS_CALLING = false;
    }

    @Override
    protected void onEnded(Context ctx, String number) {
        IS_CALLING = false;
    }

    @Override
    protected void onMissed(Context ctx, String number) {
        onPhoneStateChanged(ctx,number, PhoneCallState.MISSED);
        IS_CALLING = false;
    }

    public enum PhoneCallState {
        RINGING,
        MISSED,
        FINISHED,
        STARTED
    }

}