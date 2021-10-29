package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.content.Context;
import android.telephony.TelephonyManager;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.victor.service.bridge.commands.base.Command;
import com.victor.service.bridge.commands.DeviceCommand;

import java.lang.reflect.Method;
public class EndCallCommand extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.endCall;
    }

    @Override
    protected Object execute(String commandId, @Nullable String jsonParams, Activity activity, WebView webView) {
        try{
            TelephonyManager manager = (TelephonyManager)activity.getSystemService(Context.TELEPHONY_SERVICE);
            Class c = Class.forName(manager.getClass().getName());
            Method getITelephonyMethod = c.getDeclaredMethod("getITelephony");
            getITelephonyMethod.setAccessible(true);
            Object telephony = getITelephonyMethod.invoke(manager);

            Method endCallMethod = telephony.getClass().getDeclaredMethod("endCall"); // answerRingingCall
            endCallMethod.invoke(telephony);
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
