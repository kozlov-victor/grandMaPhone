package com.victor;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.victor.service.bridge.DeviceListener;
import com.victor.service.bridge.JsNativeBridge;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.kiosk.KioskService;
import com.victor.service.provider.PermissionsProvider;

public class MainActivity extends Activity {

    private KioskService kioskService;
    private WebView webView;
    private DeviceListener deviceListener;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // enable kiosk
        kioskService = new KioskService(this);

        setContentView(R.layout.activity_main);
        webView = this.findViewById(R.id.main_screen);

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
            deviceListener.setUpListenersOnce(this,webView);
        }
        webView.loadUrl("file:///android_asset/index.html");

    }

    @Override
    protected void onPause() {
        super.onPause();
        kioskService.bringToFront(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView==null) return;
        kioskService.bringToFront(this);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Do nothing for key home, active tasks, back
        if (!KioskService.HARD_KIOSK) super.onKeyDown(keyCode,event);
        if (keyCode==KeyEvent.KEYCODE_HEADSETHOOK) return super.onKeyDown(keyCode,event); // allow accept call
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

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        if (PermissionsProvider.hasAllPermissions(this)) {
            deviceListener.setUpListenersOnce(this,webView);
        }
        JsNativeBridge.sendToWebClient(webView, DeviceCommand.onPermissionGranted.name(),null);
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
