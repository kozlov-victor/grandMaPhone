package com.victor.service.receiver.abstracts;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

public abstract class AbstractSMSReceiver extends BroadcastReceiver {

    private static final String SMS_RECEIVED  = "android.provider.Telephony.SMS_RECEIVED";

    protected abstract void onSmsReceived();

    @Override
    public void onReceive(Context context, Intent intent) {
        final String action = intent.getAction();
        final Bundle extras = intent.getExtras();

        if (action!=null && action.equals(AbstractSMSReceiver.SMS_RECEIVED)) {
            final boolean smsValid = extras != null;
            if (smsValid) {
                //Create SMSMessages from PDUs in the Bundle
                final Object[] pdus = (Object[])extras.get("pdus");
                if (pdus!=null && pdus.length>0) {
                    onSmsReceived();
                }
            }
        }
    }

}