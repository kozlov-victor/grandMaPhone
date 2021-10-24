package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.webkit.WebView;

import com.victor.model.Sms;
import com.victor.service.bridge.commands.Command;
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
    public void execute(String commandId, Activity activity, WebView webView) {
        if (smsListProvider==null) smsListProvider = new SmsListProvider();
        List<Sms> smsList = smsListProvider.getInbox(activity);
        sendPayloadToClient(commandId,activity,webView,smsList);
    }
}
