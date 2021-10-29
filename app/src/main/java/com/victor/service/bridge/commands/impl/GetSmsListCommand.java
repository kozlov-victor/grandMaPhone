package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.victor.model.Sms;
import com.victor.service.bridge.commands.base.Command;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.provider.SmsListProvider;

import java.util.List;

public class GetSmsListCommand extends Command {

    private SmsListProvider smsListProvider;

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.getSmsList;
    }

    @Override
    protected Object execute(String commandId, @Nullable String jsonParams,Activity activity, WebView webView) {
        if (smsListProvider==null) smsListProvider = new SmsListProvider();
        List<Sms> smsList = smsListProvider.getInbox(activity);
        return smsList;
    }
}
