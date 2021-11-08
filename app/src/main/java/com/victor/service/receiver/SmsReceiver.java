package com.victor.service.receiver;

import com.victor.MainActivity;
import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.receiver.abstracts.AbstractSMSReceiver;

public class SmsReceiver extends AbstractSMSReceiver {

    @Override
    protected void onSmsReceived() {
        JsNativeBridge.sendToWebClient(MainActivity.getWebView(), DeviceCommand.onSmsReceived.name(),null);
    }
}
