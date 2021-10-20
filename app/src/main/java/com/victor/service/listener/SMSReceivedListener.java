package com.victor.service.listener;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
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

    public void addSMSListner(SMSReceivedListner listner){
        smsListner.add(listner);
    }

    public void removeSMSListener(SMSReceivedListner listner){
        smsListner.remove(listner);
    }

    public interface SMSReceivedListner{
         void message(SmsMessage message);
    }
}