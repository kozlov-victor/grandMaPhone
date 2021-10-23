package com.victor.service.listener;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

public class BatteryLevelListener extends BroadcastReceiver {

    private BatteryLevelChangedCallBack listener;

    public static int calcLevel(int level, int scale) {
        float batteryPct = level / (float)scale;
        return (int)(batteryPct * 100);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, 1);
        level = calcLevel(level, scale);
        if (listener!=null) listener.onMessage(level);
    }

    public void setListener(BatteryLevelChangedCallBack changedCallBack) {
        this.listener = changedCallBack;
    }

    public interface BatteryLevelChangedCallBack {
         void onMessage(int value);
    }

    public void register(Activity activity) {
        activity.registerReceiver(this, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
    }

}
