package com.victor.service.provider;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;

import androidx.core.content.ContextCompat;

import com.victor.model.Sms;

import java.util.ArrayList;
import java.util.List;

public class SmsListProvider {

    public List<Sms> getInbox(Activity activity) {
        List<Sms> result = new ArrayList<>();

        if (ContextCompat.checkSelfPermission(activity,
                Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
            return result;
        }

        Uri message = Uri.parse("content://sms/inbox");
        ContentResolver cr = activity.getContentResolver();

        Cursor c = cr.query(message, null, null, null, null);
        activity.startManagingCursor(c);
        int totalSMS = c.getCount();

        if (c.moveToFirst()) {
            for (int i = 0; i < totalSMS; i++) {
                Sms objSms = new Sms();
                objSms.setId(c.getString(c.getColumnIndexOrThrow("_id")));
                String address = c.getString(c
                        .getColumnIndexOrThrow("address"));
                String nameFromPhoneBook = PhoneBookProvider.getInstance().getContactName(activity,address);
                if (nameFromPhoneBook!=null && nameFromPhoneBook.length()>0) {
                    objSms.setAddress(nameFromPhoneBook);
                } else {
                    objSms.setAddress(address);
                }

                objSms.setMsg(c.getString(c.getColumnIndexOrThrow("body")));
                objSms.setReadState(c.getString(c.getColumnIndex("read")));
                objSms.setTime(c.getString(c.getColumnIndexOrThrow("date")));

                result.add(objSms);
                c.moveToNext();
            }
        }
        c.close();

        return result;
    }

}
