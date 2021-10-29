package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.webkit.WebView;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;

import com.victor.model.GrantedPermissionInfo;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.base.Command;
import com.victor.service.provider.PermissionsProvider;

import java.util.ArrayList;
import java.util.List;

public class GetPermissionInfoCommand extends Command {

    private PermissionsProvider permissionsProvider;
    private boolean isListenersActive = false;

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.getPermissionsInfo;
    }

    @Override
    protected Object execute(String commandId, @Nullable String jsonParams, Activity activity, WebView webView) {
        if (permissionsProvider==null) permissionsProvider = new PermissionsProvider();
        List<GrantedPermissionInfo> grantedPermissionInfos = new ArrayList<>();
        for (String permission : permissionsProvider.getAllAppPermissions()) {
            GrantedPermissionInfo grantedPermissionInfo = new GrantedPermissionInfo();
            grantedPermissionInfo.setPermission(permission);
            boolean granted = ActivityCompat.checkSelfPermission(activity, permission) == PackageManager.PERMISSION_GRANTED;
            grantedPermissionInfo.setGranted(granted);
            grantedPermissionInfos.add(grantedPermissionInfo);
        }
        return grantedPermissionInfos;
    }
}
