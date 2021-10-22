package com.victor.service.bridge;

import android.annotation.SuppressLint;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebView;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class JsNativeBridge {


    public static abstract class OnMessageReceivedFromClient {
         public abstract void requestEvent(String eventId);
    }

    public static void sendToWebClient(WebView webView, String eventId, Map<String,Object> payload) {
        Map<String,Object> toSerialize = new HashMap<>();
        toSerialize.put("eventId",eventId);
        if (payload!=null) toSerialize.put("payload",payload);
        JSONObject jsonObject = new JSONObject(toSerialize);
        webView.evaluateJavascript(String.format("window.__cb__ && window.__cb__(%s)", jsonObject.toString()), new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {

            }
        });
    }

}
