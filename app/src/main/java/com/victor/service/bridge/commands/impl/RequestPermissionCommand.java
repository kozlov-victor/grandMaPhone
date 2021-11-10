package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.webkit.WebView;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.victor.model.RequestedPermission;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.base.Command;

import java.io.IOException;

public class RequestPermissionCommand extends Command {

    private int code = 100;

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.requestPermission;
    }

    @Override
    protected Object execute(String commandId, @Nullable String jsonParams, Activity activity, WebView webView) {
        try {
            RequestedPermission requestedPermission = new ObjectMapper().readValue(jsonParams, RequestedPermission.class);
            ActivityCompat.requestPermissions(activity, new String[]{requestedPermission.getPermission()}, code++);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
