package com.victor.service.listener;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

public class BatteryStatusListener extends BroadcastReceiver {

    private BatteryStatusChangedCallBack listener;

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        boolean isCharging = Intent.ACTION_POWER_CONNECTED.equals(action);
        if (listener!=null) listener.onMessage(isCharging);
    }

    public void setListener(BatteryStatusChangedCallBack changedCallBack) {
        this.listener = changedCallBack;
    }

    public interface BatteryStatusChangedCallBack {
         void onMessage(boolean charged);
    }

    public boolean getValueForNow(Activity activity) {
        IntentFilter iFilter = new IntentFilter();
        iFilter.addAction(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = activity.registerReceiver(null, iFilter);
        if (batteryStatus==null) return false;
        int status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        return status == BatteryManager.BATTERY_STATUS_CHARGING ||
                status == BatteryManager.BATTERY_STATUS_FULL;
    }

}
