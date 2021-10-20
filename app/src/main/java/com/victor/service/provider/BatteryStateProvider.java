package com.victor.service.provider;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

public class BatteryStateProvider {

    public int getBatteryPercentage(Activity activity) {
        IntentFilter iFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = activity.registerReceiver(null, iFilter);
        if (batteryStatus==null) return 0;
        int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, 1);
        float batteryPct = level / (float)scale;
        return (int)(batteryPct * 100);
    }

}
