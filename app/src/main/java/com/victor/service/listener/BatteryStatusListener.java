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
         void onMessage(boolean isCharging);
    }


    public void register(Activity activity) {
        IntentFilter btrIntentFilter = new IntentFilter();
        btrIntentFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        btrIntentFilter.addAction(Intent.ACTION_POWER_CONNECTED);
        activity.registerReceiver(this, btrIntentFilter);
    }

}
