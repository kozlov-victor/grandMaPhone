package com.victor.service.provider;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class PermissionsProvider {

    private int code = 1;

    private void request(Activity activity,String permission) {
        if (ContextCompat.checkSelfPermission(activity,
                permission) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(activity,
                    new String[]{permission}, code++);
        }
    }

    public void requestForPermissions(Activity activity) {
        // listen to sms
        request(activity,Manifest.permission.RECEIVE_SMS);
        request(activity,Manifest.permission.READ_SMS);

        // phonebook
        request(activity,Manifest.permission.READ_CONTACTS);

        // make call
        request(activity,Manifest.permission.CALL_PHONE);

        // call logs
        request(activity,Manifest.permission.READ_CALL_LOG);

        // get income or dial number
        request(activity,Manifest.permission.READ_PHONE_STATE);
    }

}
