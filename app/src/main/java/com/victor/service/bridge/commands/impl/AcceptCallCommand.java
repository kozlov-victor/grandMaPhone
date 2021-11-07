package com.victor.service.bridge.commands.impl;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telecom.TelecomManager;
import android.webkit.WebView;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;

import com.victor.service.bridge.commands.base.Command;
import com.victor.service.bridge.commands.DeviceCommand;

public class AcceptCallCommand extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.acceptCall;
    }

    @Override
    protected Object execute(String commandId, @Nullable String jsonParams, final Activity activity, WebView webView) {

        TelecomManager tm;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tm = (TelecomManager) activity.getSystemService(Context.TELECOM_SERVICE);
            if (tm == null) {
                // whether you want to handle this is up to you really
                throw new NullPointerException("tm == null");
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.ANSWER_PHONE_CALLS) != PackageManager.PERMISSION_GRANTED) {
                   throw new RuntimeException("no rights");
                }
                tm.acceptRingingCall();
            }
        }
        return null;

    }
}
