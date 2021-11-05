package com.victor.service.provider;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.app.ActivityCompat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PermissionsProvider {

    private static List<String> PERMISSIONS = new ArrayList<>();

    static {

        PERMISSIONS.addAll(
            Arrays.asList(

                // get income or dial number
                Manifest.permission.READ_PHONE_STATE,

                // call logs
                Manifest.permission.READ_CALL_LOG,

                // listen to sms
                Manifest.permission.RECEIVE_SMS,
                Manifest.permission.READ_SMS,

                // phonebook
                Manifest.permission.READ_CONTACTS,

                // make call
                Manifest.permission.CALL_PHONE

            )
        );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PERMISSIONS.add(Manifest.permission.ANSWER_PHONE_CALLS);
        }
    }

    public List<String> getAllAppPermissions() {
        return PERMISSIONS;
    }

    public static boolean hasAllPermissions(Activity activity) {
        for (String permission : PERMISSIONS) {
            boolean granted = ActivityCompat.checkSelfPermission(activity, permission) == PackageManager.PERMISSION_GRANTED;
            if (!granted) return false;
        }
        return true;
    }

}
