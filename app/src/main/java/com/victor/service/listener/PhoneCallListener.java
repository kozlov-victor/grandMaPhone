package com.victor.service.listener;

import android.app.Activity;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;

public class PhoneCallListener extends PhoneStateListener {

    private boolean isPhoneCalling = false;
    private int prevState = -1;


    private static PhoneCallListener instance;

    public static PhoneCallListener getInstance(Activity activity){
        if (instance==null) instance = new PhoneCallListener();
        return instance;
    }

    private PhoneCallListener() {

    }

    @Override
    public void onCallStateChanged(int state, String incomingNumber) {

        if (TelephonyManager.CALL_STATE_RINGING == state) {
            // phone ringing
            isPhoneCalling = true;
        }

        if (TelephonyManager.CALL_STATE_OFFHOOK == state) {
            // active
            isPhoneCalling = true;
        }

        if (TelephonyManager.CALL_STATE_IDLE == state) {
            if (prevState==TelephonyManager.CALL_STATE_RINGING) {
                System.out.println("missed " + incomingNumber);
            }
            isPhoneCalling = false;
        }
        prevState = state;
    }

    public boolean isPhoneCalling() {
        return this.isPhoneCalling;
    }

}