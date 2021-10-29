package com.victor.service.listener;

import android.app.Activity;
import android.content.Context;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;

public class PhoneCallListener extends PhoneStateListener {

    private boolean isPhoneCalling = false;
    private int prevState = -1;

    private static PhoneCallListener instance;


    private OnCallStateChangedCallBack listener;

    public void setListener(OnCallStateChangedCallBack onCallMissedCallBack) {
        listener = onCallMissedCallBack;
    }

    public interface OnCallStateChangedCallBack {
        void onCallStateChanged(PhoneCallState phoneCallState, String phoneNumber);
    }

    public static PhoneCallListener getInstance(Activity activity) {
        if (instance == null) instance = new PhoneCallListener(activity);
        return instance;
    }

    private PhoneCallListener(Activity activity) {

    }

    public void register(Activity activity) {
        TelephonyManager telephonyManager = (TelephonyManager) activity.getSystemService(Context.TELEPHONY_SERVICE);
        if (telephonyManager != null)
            telephonyManager.listen(this, PhoneStateListener.LISTEN_CALL_STATE);
    }

    @Override
    public void onCallStateChanged(int state, String phoneNumber) {

        if (TelephonyManager.CALL_STATE_RINGING == state) {
            // phone ringing
            isPhoneCalling = true;
            if (listener!=null) listener.onCallStateChanged(PhoneCallState.RINGING,phoneNumber);
        }

        if (TelephonyManager.CALL_STATE_OFFHOOK == state) {
            // active
            isPhoneCalling = true;
            if (listener != null) {
                listener.onCallStateChanged(PhoneCallState.STARTED,phoneNumber);
            }
        }

        if (TelephonyManager.CALL_STATE_IDLE == state) {
            if (prevState==TelephonyManager.CALL_STATE_RINGING) {
                if (listener!=null) listener.onCallStateChanged(PhoneCallState.MISSED,phoneNumber);
            } else if (prevState==TelephonyManager.CALL_STATE_OFFHOOK) {
                if (listener!=null) listener.onCallStateChanged(PhoneCallState.FINISHED,phoneNumber);
            }
            isPhoneCalling = false;
        }
        prevState = state;
    }

    public boolean isPhoneCalling() {
        return this.isPhoneCalling;
    }

    public void setPhoneCalling(boolean phoneCalling) {
        isPhoneCalling = phoneCalling;
    }

    public enum PhoneCallState {
        RINGING,
        MISSED,
        FINISHED,
        STARTED
    }
}