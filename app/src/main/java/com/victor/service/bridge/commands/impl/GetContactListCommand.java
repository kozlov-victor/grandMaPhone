package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.webkit.WebView;

import com.victor.model.PhoneBookRecord;
import com.victor.service.bridge.commands.Command;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.provider.PhoneBookProvider;

import java.util.List;

public class GetContactListCommand extends Command {

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.getContactList;
    }

    @Override
    public void execute(String commandId, Activity activity, WebView webView) {
        List<PhoneBookRecord> contactList = PhoneBookProvider.getInstance().getContactList(activity);
        sendPayloadToClient(commandId,activity,webView,contactList);
    }
}
