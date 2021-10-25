package com.victor.service.bridge.commands.impl;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.webkit.WebView;

import androidx.core.app.ActivityCompat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.victor.model.DialNumber;
import com.victor.service.bridge.commands.Command;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.listener.PhoneCallListener;

import java.io.IOException;

public class DialNumberCommand extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.dialNumber;
    }

    @Override
    public void execute(String commandId, String jsonParams, Activity activity, WebView webView) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            DialNumber dialNumber = objectMapper.readValue(jsonParams, DialNumber.class);
            String numberCleared = dialNumber.getNumber().trim().
                    replace("(", "").replace(")", "").
                    replace(" ", "").replace("-", "");
            Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + numberCleared));
            if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                return;
            }
            PhoneCallListener.getInstance(activity).setPhoneCalling(true);
            activity.startActivity(intent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
