package com.victor.service.bridge.commands;

import android.app.Activity;
import android.webkit.WebView;

import com.victor.service.bridge.JsNativeBridge;

public abstract class Command {

    public abstract DeviceCommand getCommand();
    public abstract void execute(String commandId, Activity activity, WebView webView);

    protected void sendPayloadToClient(final String commandId, Activity activity, final WebView webView, final Object payload) {
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                JsNativeBridge.sendToWebClient(webView,commandId,payload);
            }
        });
    }

}
