package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.webkit.WebView;

import com.victor.service.bridge.commands.Command;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.listener.BatteryLevelListener;

public class GetBatteryLevel extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.getBatteryLevel;
    }

    @Override
    public void execute(final String commandId, Activity activity, final WebView webView) {

        int level = 0;
        IntentFilter iFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = activity.registerReceiver(null, iFilter);
        if (batteryStatus!=null) {
            level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, 1);
            level =  BatteryLevelListener.calcLevel(level, scale);
        }
        sendPayloadToClient(commandId, activity, webView, level);

    }
}