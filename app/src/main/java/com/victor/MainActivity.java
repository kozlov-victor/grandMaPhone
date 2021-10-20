package com.victor;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.telephony.PhoneStateListener;
import android.telephony.SmsMessage;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.victor.service.kiosk.KioskService;
import com.victor.service.listener.BatteryLevelListener;
import com.victor.service.listener.BatteryStatusListener;
import com.victor.service.listener.PhoneCallListener;
import com.victor.service.listener.SMSReceivedListener;
import com.victor.service.provider.PermissionsProvider;

public class MainActivity extends Activity {

    private KioskService kioskService;
    private PhoneCallListener callListener;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // enable kiosk
        kioskService = new KioskService(this);

        // permissions
        PermissionsProvider permissionsProvider = new PermissionsProvider();
        permissionsProvider.requestForPermissions(this);

        // listen to calls
        callListener = PhoneCallListener.getInstance(this);
        TelephonyManager telephonyManager = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        if (telephonyManager!=null) telephonyManager.listen(callListener, PhoneStateListener.LISTEN_CALL_STATE);

        IntentFilter filter = new IntentFilter();
        filter.addAction("android.provider.Telephony.SMS_RECEIVED");
        SMSReceivedListener smsReceivedListener = new SMSReceivedListener();
        registerReceiver(smsReceivedListener,filter);
        smsReceivedListener.addSMSListner(new SMSReceivedListener.SMSReceivedListner() {
            @Override
            public void message(SmsMessage message) {
                System.out.println(message);
            }
        });

        // listen to battery level
        BatteryLevelListener batteryLevelListener = new BatteryLevelListener();
        batteryLevelListener.setListener(new BatteryLevelListener.BatteryLevelChangedCallBack() {
            @Override
            public void onMessage(int level) {
                System.out.println(level);
            }
        });
        registerReceiver(batteryLevelListener, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));

        // listen to battery status
        BatteryStatusListener batteryStatusListener = new BatteryStatusListener();
        batteryStatusListener.setListener(new BatteryStatusListener.BatteryStatusChangedCallBack() {
            @Override
            public void onMessage(boolean charged) {
                System.out.println(charged);
            }
        });
        IntentFilter btrIntentFilter = new IntentFilter();
        btrIntentFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        btrIntentFilter.addAction(Intent.ACTION_POWER_CONNECTED);
        registerReceiver(batteryStatusListener, btrIntentFilter);

        //

        setContentView(R.layout.activity_main);

        WebView webView = this.findViewById(R.id.main_screen);
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
