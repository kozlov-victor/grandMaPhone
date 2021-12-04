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

    private final int MAX_RECORDS = 20;

    public List<CallInfo> getMissedCalls(Activity activity) {

        List<CallInfo> result = new ArrayList<>();
        ContentResolver cr = activity.getContentResolver();
        if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.READ_CALL_LOG) != PackageManager.PERMISSION_GRANTED) {
            return result;
        }
        String where = CallLog.Calls.TYPE+"="+CallLog.Calls.MISSED_TYPE;
        Cursor cursor = cr.query(CallLog.Calls.CONTENT_URI, null, where, null, CallLog.Calls.DATE +" DESC LIMIT " + MAX_RECORDS);
        if (cursor==null) return result;

        int number = cursor.getColumnIndex(CallLog.Calls.NUMBER);
        int date = cursor.getColumnIndex(CallLog.Calls.DATE);
        //int duration = managedCursor.getColumnIndex(CallLog.Calls.DURATION);

        while (cursor.moveToNext()) {

            String phNumber = cursor.getString(number); // mobile number
            String nameFromPhoneBook = PhoneBookProvider.getInstance().getContactNameByPhoneNumber(activity,phNumber);

            String callDate = cursor.getString(date); // call date
            Date callDayTime = new Date(Long.parseLong(callDate));
            // String callDuration = managedCursor.getString(duration);

            CallInfo callInfo = new CallInfo();
            callInfo.setNameFromPhoneBook(nameFromPhoneBook);
            callInfo.setPhone(phNumber);
            callInfo.setCallDate(callDayTime.getTime());
            result.add(callInfo);
            //if (result.size()>MAX_RECORDS) break;

        }
        cursor.close();
        //Collections.reverse(result);
        return result;
    }

}
