package com.victor.service.receiver;

import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;

import com.victor.MainActivity;
import com.victor.service.receiver.abstracts.AbstractPhoneCallReceiver;

import java.util.Date;

public class CallReceiver extends AbstractPhoneCallReceiver {

    public final static String PHONE_NUMBER = "app.phoneNumber";

    @Override
    protected void onIncomingCallStarted(Context ctx, String phoneNumber, Date start) {
        Intent intent = new Intent();
        intent.setClass(ctx, MainActivity.class);
        intent.putExtra(PHONE_NUMBER,phoneNumber);
        intent.setFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
        ctx.startActivity(intent);

        try {
            TelephonyManager tmgr = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
            MyPhoneStateListener PhoneListener = new MyPhoneStateListener(ctx);
            if (tmgr!=null) tmgr.listen(PhoneListener, PhoneStateListener.LISTEN_CALL_STATE);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
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
                    Intent intentPhoneCall = new Intent(context, MainActivity.class);
                    intentPhoneCall.putExtra(PHONE_NUMBER, incomingNumber);
                    intentPhoneCall.setFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
                    context.startActivity(intentPhoneCall);
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

    @Override
    protected void onOutgoingCallStarted(Context ctx, String number, Date start) {

    }

    @Override
    protected void onIncomingCallEnded(Context ctx, String number, Date start, Date end) {
    }

    @Override
    protected void onOutgoingCallEnded(Context ctx, String number, Date start, Date end) {
    }

    @Override
    protected void onMissedCall(Context ctx, String number, Date start) {
    }

}