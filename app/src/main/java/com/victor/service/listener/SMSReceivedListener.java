package com.victor.service.listener;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.telephony.SmsMessage;

import java.util.ArrayList;

public class SMSReceivedListener extends BroadcastReceiver {

    private static final String SMS_RECEIVED  = "android.provider.Telephony.SMS_RECEIVED";

    private ArrayList<SMSReceivedListner> smsListner = new ArrayList<SMSReceivedListner>();

    @Override
    public void onReceive(Context context, Intent intent) {
        final String action = intent.getAction();
        final Bundle extras = intent.getExtras();

        if (action.equals(SMSReceivedListener.SMS_RECEIVED)) {
            final boolean smsValid = extras != null;

            if (smsValid) {
                //Create SMSMessages from PDUs in the Bundle
                final Object[] pdus = (Object[])extras.get("pdus");
                final SmsMessage[] messages = new SmsMessage[pdus.length];
                for (int i = 0; i < pdus.length; i++)
                    messages[i] = SmsMessage.createFromPdu((byte[])pdus[i]);

                for (SmsMessage message : messages) {
                    for (SMSReceivedListner smsReceivedListner : smsListner )
                        smsReceivedListner.message(message);
                }
            }
        }
    }

    public void addSMSListner(SMSReceivedListner listener){
        smsListner.add(listener);
    }

    public void removeSMSListener(SMSReceivedListner listener){
        smsListner.remove(listener);
    }

    public void register(Activity activity) {
        IntentFilter filter = new IntentFilter();
        filter.addAction("android.provider.Telephony.SMS_RECEIVED");
        activity.registerReceiver(this,filter);
    }

    public void unregister(Activity activity) {
        activity.unregisterReceiver(this);
    }

    public interface SMSReceivedListner{
         void message(SmsMessage message);
    }
}