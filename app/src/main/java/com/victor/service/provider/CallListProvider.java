package com.victor.service.provider;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.provider.CallLog;

import androidx.core.app.ActivityCompat;

import com.victor.model.CallInfo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CallListProvider {

    public List<CallInfo> getCallDetails(Activity activity) {

        List<CallInfo> result = new ArrayList<>();
        ContentResolver cr = activity.getContentResolver();
        if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.READ_CALL_LOG) != PackageManager.PERMISSION_GRANTED) {
            return result;
        }
        Cursor cursor = cr.query(CallLog.Calls.CONTENT_URI, null, null, null, null);
        if (cursor==null) return result;

        int number = cursor.getColumnIndex(CallLog.Calls.NUMBER);
        int type = cursor.getColumnIndex(CallLog.Calls.TYPE);
        int date = cursor.getColumnIndex(CallLog.Calls.DATE);
        //int duration = managedCursor.getColumnIndex(CallLog.Calls.DURATION);

        while (cursor.moveToNext()) {

            String callType = cursor.getString(type); // call type
            int dircode = Integer.parseInt(callType);
            if (dircode!=CallLog.Calls.MISSED_TYPE) continue;

            String phNumber = cursor.getString(number); // mobile number
            String address;
            String nameFromPhoneBook = PhoneBookProvider.getInstance().getContactName(activity,phNumber);
            if (nameFromPhoneBook!=null && nameFromPhoneBook.length()>0) {
                address = nameFromPhoneBook;
            } else {
                address = phNumber;
            }

            String callDate = cursor.getString(date); // call date
            Date callDayTime = new Date(Long.parseLong(callDate));
            // String callDuration = managedCursor.getString(duration);

            CallInfo callInfo = new CallInfo();
            callInfo.setAddress(address);
            callInfo.setCallDate(callDayTime);
            result.add(callInfo);

        }
        cursor.close();
        return result;
    }

}
