package com.victor.service.provider;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;

import androidx.core.content.ContextCompat;

import com.victor.model.PhoneBookRecord;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PhoneBookProvider {

    private static PhoneBookProvider instance;

    private Map<String,String> nameByNumberCache = new HashMap<>();

    public static PhoneBookProvider getInstance() {
        if (instance==null) instance = new PhoneBookProvider();
        return instance;
    }

    public String getContactNameByPhoneNumber(Activity activity, String phoneNumber) {

        if (nameByNumberCache.containsKey(phoneNumber)) return nameByNumberCache.get(phoneNumber);

        if (ContextCompat.checkSelfPermission(activity,
                Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            return phoneNumber;
        }

        ContentResolver cr = activity.getContentResolver();
        Uri uri = Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI, Uri.encode(phoneNumber));
        Cursor cursor = cr.query(uri, new String[]{ContactsContract.PhoneLookup.DISPLAY_NAME}, null, null, null);
        if (cursor == null) {
            return null;
        }
        String contactName = null;
        if(cursor.moveToFirst()) {
            contactName = cursor.getString(cursor.getColumnIndex(ContactsContract.PhoneLookup.DISPLAY_NAME));
        }
        if(!cursor.isClosed()) {
            cursor.close();
        }
        nameByNumberCache.put(phoneNumber,contactName);
        return contactName;
    }

    public List<PhoneBookRecord> getContactList(Activity activity) {
        List<PhoneBookRecord> result = new ArrayList<>();

        ContentResolver cr = activity.getContentResolver();
        Cursor cur = cr.query(ContactsContract.Contacts.CONTENT_URI,
                null, null, null, ContactsContract.Contacts.DISPLAY_NAME + " ASC");

        if ((cur != null ? cur.getCount() : 0) > 0) {
            while (cur.moveToNext()) {
                String id = cur.getString(
                        cur.getColumnIndex(ContactsContract.Contacts._ID));
                String name = cur.getString(cur.getColumnIndex(
                        ContactsContract.Contacts.DISPLAY_NAME));

                if (cur.getInt(cur.getColumnIndex(
                        ContactsContract.Contacts.HAS_PHONE_NUMBER)) > 0) {
                    Cursor pCur = cr.query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                            null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                            new String[]{id}, null);
                    if (pCur==null) break;
                    while (pCur.moveToNext()) {
                        String phoneNo = pCur.getString(pCur.getColumnIndex(
                                ContactsContract.CommonDataKinds.Phone.NUMBER));
                        PhoneBookRecord phoneBookRecord = new PhoneBookRecord();
                        phoneBookRecord.setName(name);
                        phoneBookRecord.setPhoneNumber(phoneNo);
                        result.add(phoneBookRecord);
                    }
                    pCur.close();
                }
            }
        }
        if(cur!=null){
            cur.close();
        }
        return result;
    }

}
