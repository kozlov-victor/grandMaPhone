package com.victor;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.victor.model.PhoneCallStateInfo;
import com.victor.service.bridge.DeviceListener;
import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.impl.DialNumberCommand;
import com.victor.service.kiosk.KioskService;
import com.victor.service.provider.PermissionsProvider;
import com.victor.service.provider.PhoneBookProvider;
import com.victor.service.receiver.CallReceiver;

// додаткі і сповіщення - сповіщення - сповіщення додатка - телефон - відключити
// додаткі і сповіщення - телефон - показувати поверх ынших додатків - відключити

public class MainActivity extends Activity {

    private KioskService kioskService;
    private static WebView webView;
    private static MainActivity mainActivity;
    private DeviceListener deviceListener;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // enable kiosk
        kioskService = new KioskService(this);

        setContentView(R.layout.activity_main);
        webView = this.findViewById(R.id.main_screen);
        mainActivity = this;

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

        deviceListener = new DeviceListener();
        deviceListener.setUpBridge(this,webView);
        if (PermissionsProvider.hasAllPermissions(this)) {
            deviceListener.register(this);
        }
        webView.loadUrl("file:///android_asset/index.html?and="+this.toString());

    }

    @Override
    protected void onNewIntent(Intent intent) {

        if (intent==null) return;
        String phoneNumber = intent.getStringExtra(CallReceiver.PHONE_NUMBER);
        if (phoneNumber==null) return;
        if (!CallReceiver.IS_CALLING) return;

        PhoneCallStateInfo phoneCallStateInfo = new PhoneCallStateInfo();
        phoneCallStateInfo.setPhoneCallState(CallReceiver.PhoneCallState.RINGING);
        phoneCallStateInfo.setPhoneNumber(phoneNumber);
        phoneCallStateInfo.setAddress(PhoneBookProvider.getInstance().getContactNameByPhoneNumber(this,phoneNumber));
        System.out.println("ringing-----------------------" + this);
        JsNativeBridge.sendToWebClient(webView, DeviceCommand.onCallStateChanged.name(),phoneCallStateInfo);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (!CallReceiver.IS_CALLING) {
            kioskService.bringToFront(this);
        } else {
            Handler callActionHandler = new Handler();
            callActionHandler.postDelayed(() -> {
                kioskService.bringToFront(MainActivity.this);
                if (DialNumberCommand.LAST_DIAL_NUMBER!=null) {
                    CallReceiver.onPhoneStateChanged(MainActivity.this, DialNumberCommand.LAST_DIAL_NUMBER, CallReceiver.PhoneCallState.STARTED);
                }
            },400);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView==null) return;
        kioskService.bringToFront(this);
        JsNativeBridge.sendToWebClient(webView, DeviceCommand.onResume.name(),null);
        System.out.println("onresume-----------------------" + this);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Do nothing for key home, active tasks, back
        if (!KioskService.HARD_KIOSK) return super.onKeyDown(keyCode,event);
        else return true;
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (!KioskService.HARD_KIOSK) return false;
        switch( event.getKeyCode() ) {
            case KeyEvent.KEYCODE_VOLUME_UP:
            case KeyEvent.KEYCODE_VOLUME_DOWN:
            case KeyEvent.KEYCODE_BACK:
            case KeyEvent.KEYCODE_HOME:
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


    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        if (PermissionsProvider.hasAllPermissions(this)) {
            deviceListener.register(this);
        }
        JsNativeBridge.sendToWebClient(webView, DeviceCommand.onPermissionGranted.name(),null);
    }

    public static WebView getWebView() {
         return webView;
    }

    public static MainActivity getActivity() {
        return mainActivity;
    }

    private static class MyWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            Log.d("CONSOLE",url);
            return true;
        }
    }

    private static class MyChromeClient extends WebChromeClient {
        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Log.d("CONSOLE",consoleMessage.message());
            return super.onConsoleMessage(consoleMessage);
        }
    }

}
