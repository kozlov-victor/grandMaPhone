package com.victor;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.kiosk.KioskService;
import com.victor.service.listener.BatteryLevelListener;
import com.victor.service.listener.BatteryStatusListener;
import com.victor.service.listener.PhoneCallListener;
import com.victor.service.listener.SMSReceivedListener;
import com.victor.service.provider.PermissionsProvider;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {

    private KioskService kioskService;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // enable kiosk
        kioskService = new KioskService(this);

        setContentView(R.layout.activity_main);
        final WebView webView = this.findViewById(R.id.main_screen);

        // permissions
        PermissionsProvider permissionsProvider = new PermissionsProvider();
        permissionsProvider.requestForPermissions(this);

        // listen to calls
        PhoneCallListener callListener = PhoneCallListener.getInstance(this);
        callListener.register(this);

        SMSReceivedListener smsReceivedListener = new SMSReceivedListener();
        smsReceivedListener.register(this);
        smsReceivedListener.addSMSListner(new SMSReceivedListener.SMSReceivedListner() {
            @Override
            public void message(SmsMessage message) {
                System.out.println(message);
            }
        });

        // listen to battery level
        final BatteryLevelListener batteryLevelListener = new BatteryLevelListener();
        batteryLevelListener.register(this);
        batteryLevelListener.setListener(new BatteryLevelListener.BatteryLevelChangedCallBack() {
            @Override
            public void onMessage(int value) {
                Map<String,Object> map = new HashMap<>();
                map.put("value",value);
                JsNativeBridge.sendToWebClient(webView,"onBatteryValueChanged",map);
            }
        });

        // listen to battery status
        BatteryStatusListener batteryStatusListener = new BatteryStatusListener();
        batteryStatusListener.register(this);
        batteryStatusListener.setListener(new BatteryStatusListener.BatteryStatusChangedCallBack() {
            @Override
            public void onMessage(boolean charged) {
                System.out.println(charged);
            }
        });


        WebChromeClient chromeClient = new MyChromeClient();
        webView.setWebChromeClient(chromeClient);
        webView.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 5.1; rv:9.0.1) Gecko/20100101 Firefox/9.0.1");
        webView.setWebViewClient(new MyWebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.getSettings().setSupportZoom(false);
        webView.getSettings().setBuiltInZoomControls(false);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setSupportMultipleWindows(false);
        webView.getSettings().setAppCacheEnabled(true);

        // add bridge
        webView.addJavascriptInterface(new JsNativeBridge.OnMessageReceivedFromClient(){
            @JavascriptInterface
            public void onReceived(String eventId) {
                System.out.println("onreceiced"+ eventId);
                switch (eventId) {
                    case "BatteryLevelListener.getValueForNow":
                        final int value = batteryLevelListener.getValueForNow(MainActivity.this);
                        MainActivity.this.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                Map<String,Object> map = new HashMap<>();
                                map.put("value",value);
                                JsNativeBridge.sendToWebClient(webView,"onBatteryValueChanged",map);
                            }
                        });
                        break;
                }
            }
        },"__host__");

        webView.loadUrl("file:///android_asset/index.html");

    }

    @Override
    protected void onPause() {
        super.onPause();
        kioskService.onPause(this);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Do nothing for key home, active tasks, back
        if (!KioskService.HARD_KIOSK) super.onKeyDown(keyCode,event);
        return KioskService.HARD_KIOSK;
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (!KioskService.HARD_KIOSK) return false;
        switch( event.getKeyCode() ) {
            case KeyEvent.KEYCODE_VOLUME_UP:
            case KeyEvent.KEYCODE_VOLUME_DOWN:
                return true;
            default:
                super.dispatchKeyEvent(event);
                return false;
        }
    }

    @Override
    public void onBackPressed() {
        if (!KioskService.HARD_KIOSK) super.onBackPressed();
    }

    private class MyWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            Log.d("CONSOLE",url);
            return true;
        }
    }

    private class MyChromeClient extends WebChromeClient {
        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Log.d("CONSOLE",consoleMessage.message());
            return super.onConsoleMessage(consoleMessage);
        }
    }

}
