package com.victor.service.bridge.commands.impl;

import android.app.Activity;
import android.webkit.WebView;

import com.victor.model.CallInfo;
import com.victor.service.bridge.commands.Command;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.provider.CallListProvider;

import java.util.List;

public class GetMissedCallsCommand extends Command {

    private CallListProvider callListProvider;

    @Override
    public DeviceCommand getCommand() {
        return DeviceCommand.getMissedCalls;
    }

    @Override
    public void execute(final String commandId,  String jsonParams,Activity activity, final WebView webView) {
        if (callListProvider==null) callListProvider = new CallListProvider();
        final List<CallInfo> missedCalls = callListProvider.getMissedCalls(activity);
        sendPayloadToClient(commandId,activity,webView,missedCalls);
    }
}
