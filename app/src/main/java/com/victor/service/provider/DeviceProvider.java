package com.victor.service.provider;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import android.os.PowerManager;

public class DeviceProvider {

    public void turnOnScreen(Activity activity) {
        PowerManager powerManager = (PowerManager) activity.getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock  wakeLock = powerManager.newWakeLock(PowerManager.FULL_WAKE_LOCK |
                PowerManager.ACQUIRE_CAUSES_WAKEUP |
                PowerManager.ON_AFTER_RELEASE, "appname::WakeLock");

        //acquire will turn on the display
        wakeLock.acquire();

        //release will release the lock from CPU, in case of that, screen will go back to sleep mode in defined time bt device settings
        wakeLock.release();
    }

    public void killNativePhoneProcess(Activity activity) {
        ActivityManager am = (ActivityManager) activity.getSystemService(Context.ACTIVITY_SERVICE);
        am.killBackgroundProcesses("com.android.providers.telephony");
        am.killBackgroundProcesses("com.android.phone");
    }

}
