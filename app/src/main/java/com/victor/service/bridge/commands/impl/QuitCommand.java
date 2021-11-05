package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.base.Command;
import com.victor.service.kiosk.KioskService;

public class QuitCommand extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.quit;
    }

    @Override
    protected Object execute(String commandId, @Nullable String jsonParams, Activity activity, WebView webView) {
        KioskService.HARD_KIOSK = false;
        activity.finish();
        return null;
    }
}
