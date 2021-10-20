package com.victor.service.provider;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;

import androidx.core.content.ContextCompat;

import java.util.ArrayList;
import java.util.List;

public class SmsListProvider {

    public static class Sms{
        private String id;
        private String address;
        private String msg;
        private String readState; //"0" for have not read sms and "1" for have read sms
        private String time;

        public String getId(){
            return id;
        }
        public String getAddress(){
            return address;
        }
        public String getMsg(){
            return msg;
        }
        public String getReadState(){
            return readState;
        }
        public String getTime(){
            return time;
        }


        @Override
        public String toString() {
            return "Sms{" +
                    "id='" + id + '\'' +
                    ", address='" + address + '\'' +
                    ", msg='" + msg + '\'' +
                    ", readState='" + readState + '\'' +
                    ", time='" + time + '\'' +
                    '}';
        }
    }


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
                objSms.id = c.getString(c.getColumnIndexOrThrow("_id"));
                String address = c.getString(c
                        .getColumnIndexOrThrow("address"));
                String nameFromPhoneBook = PhoneBookProvider.getInstance().getContactName(activity,address);
                if (nameFromPhoneBook!=null && nameFromPhoneBook.length()>0) {
                    objSms.address = nameFromPhoneBook;
                } else {
                    objSms.address = address;
                }

                objSms.msg = c.getString(c.getColumnIndexOrThrow("body"));
                objSms.readState = c.getString(c.getColumnIndex("read"));
                objSms.time = c.getString(c.getColumnIndexOrThrow("date"));

                result.add(objSms);
                c.moveToNext();
            }
        }
        c.close();

        return result;
    }

}
