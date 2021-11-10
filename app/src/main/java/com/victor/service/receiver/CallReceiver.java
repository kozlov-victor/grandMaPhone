package com.victor.service.receiver;

import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;

import com.victor.MainActivity;
import com.victor.model.PhoneCallStateInfo;
import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.impl.DialNumberCommand;
import com.victor.service.provider.DeviceProvider;
import com.victor.service.provider.PhoneBookProvider;
import com.victor.service.receiver.abstracts.AbstractPhoneCallReceiver;

public class CallReceiver extends AbstractPhoneCallReceiver {

    public final static String PHONE_NUMBER = "app.phoneNumber";

    public static boolean IS_CALLING = false;

    private DeviceProvider deviceProvider = new DeviceProvider();

    public static void onPhoneStateChanged(Context context, String phoneNumber, PhoneCallState phoneCallState) {
        PhoneCallStateInfo phoneCallStateInfo = new PhoneCallStateInfo();
        phoneCallStateInfo.setPhoneCallState(phoneCallState);
        phoneCallStateInfo.setPhoneNumber(phoneNumber);
        phoneCallStateInfo.setAddress(PhoneBookProvider.getInstance().getContactNameByPhoneNumber(context,phoneNumber));
        JsNativeBridge.sendToWebClient(MainActivity.getWebView(), DeviceCommand.onCallStateChanged.name(),phoneCallStateInfo);
    }

    private static void showScreen(Context context,String phoneNumber) {
        Intent intent = new Intent();
        intent.setClass(context, MainActivity.class);
        intent.putExtra(PHONE_NUMBER,phoneNumber);
        intent.setFlags(Intent.FLAG_ACTIVITY_TASK_ON_HOME);
        context.startActivity(intent);
    }

    @Override
    protected void onRinging(Context context, String phoneNumber) {

        deviceProvider.killNativePhoneProcess(context);
        deviceProvider.turnOnScreen(context);
        IS_CALLING = true;
        showScreen(context,phoneNumber);

        try {
            TelephonyManager tmgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            MyPhoneStateListener PhoneListener = new MyPhoneStateListener(context);
            if (tmgr!=null) tmgr.listen(PhoneListener, PhoneStateListener.LISTEN_CALL_STATE);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        onPhoneStateChanged(context,phoneNumber, PhoneCallState.RINGING);
    }

    @Override
    protected void onStarted(Context ctx, String number) {
        onPhoneStateChanged(ctx,number, PhoneCallState.STARTED);
        IS_CALLING = false;
        DialNumberCommand.LAST_DIAL_NUMBER = null;
    }

    @Override
    protected void onEnded(Context ctx, String number) {
        onPhoneStateChanged(ctx,number, PhoneCallState.FINISHED);
        IS_CALLING = false;
        DialNumberCommand.LAST_DIAL_NUMBER = null;
    }

    @Override
    protected void onMissed(Context ctx, String number) {
        onPhoneStateChanged(ctx,number, PhoneCallState.MISSED);
        IS_CALLING = false;
        DialNumberCommand.LAST_DIAL_NUMBER = null;
    }

    private static class MyPhoneStateListener extends PhoneStateListener {

        private Context context;

        MyPhoneStateListener(Context context) {
            super();
            this.context = context;
        }

        public void onCallStateChanged(final int state, final String incomingNumber) {
            Handler callActionHandler = new Handler();
            Runnable runRingingActivity = () -> {
                if (state == 1) {
                    showScreen(context,incomingNumber);
                }
            };

            if (state == 1) {
                callActionHandler.postDelayed(runRingingActivity, 100);
            }

            if (state == 0) {
                callActionHandler.removeCallbacks(runRingingActivity);
            }
        }
    }

    public enum PhoneCallState {
        RINGING,
        MISSED,
        FINISHED,
        STARTED
    }

}