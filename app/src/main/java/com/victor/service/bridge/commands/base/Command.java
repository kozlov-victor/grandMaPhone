package com.victor.service.bridge.commands.base;

import android.app.Activity;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.bridge.commands.DeviceCommand;

public abstract class Command {

    public abstract DeviceCommand getCommand();
    protected abstract Object execute(String commandId, @Nullable String jsonParams, Activity activity, WebView webView);

    public void doAction(String commandId, @Nullable String jsonParams, Activity activity, WebView webView) {
        new Thread(() -> {
            Object payload = execute(commandId,jsonParams,activity,webView);
            sendPayloadToClient(commandId,activity,webView,payload);
        }).start();
    }

    private void sendPayloadToClient(final String commandId, Activity activity, final WebView webView, final Object payload) {
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                JsNativeBridge.sendToWebClient(webView,commandId,payload);
            }
        });
    }
}
