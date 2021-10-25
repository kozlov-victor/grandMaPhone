package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.webkit.WebView;

import com.victor.service.bridge.commands.Command;
import com.victor.service.bridge.commands.DeviceCommand;

public class GetBatteryStatusCommand extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.getBatteryStatus;
    }

    @Override
    public void execute(final String commandId,  String jsonParams, Activity activity, final WebView webView) {

        boolean isCharging = false;
        IntentFilter iFilter = new IntentFilter();
        iFilter.addAction(Intent.ACTION_BATTERY_CHANGED);
        Intent intent = activity.registerReceiver(null, iFilter);
        if (intent!=null) {
            int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
            isCharging =
                    status == BatteryManager.BATTERY_STATUS_CHARGING ||
                    status == BatteryManager.BATTERY_STATUS_FULL;
        }
        sendPayloadToClient(commandId, activity, webView, isCharging);
    }
}
