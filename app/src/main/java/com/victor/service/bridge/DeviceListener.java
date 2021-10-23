package com.victor.service.bridge;

import android.app.Activity;
import android.telephony.SmsMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.victor.service.bridge.commands.CommandExecuter;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.impl.GetBatteryStatus;
import com.victor.service.bridge.commands.impl.GetBatteryLevel;
import com.victor.service.bridge.commands.impl.GetMissedCalls;
import com.victor.service.listener.BatteryLevelListener;
import com.victor.service.listener.BatteryStatusListener;
import com.victor.service.listener.PhoneCallListener;
import com.victor.service.listener.SMSReceivedListener;

import java.util.HashMap;
import java.util.Map;

public class DeviceListener {

    private void setUpListeners(Activity activity, final WebView webView) {
        // listen to calls
        PhoneCallListener callListener = PhoneCallListener.getInstance(activity);
        callListener.register(activity);
        callListener.setListener(new PhoneCallListener.OnCallMissedCallBack() {
            @Override
            public void onCallMissed() {
                JsNativeBridge.sendToWebClient(webView, DeviceCommand.onCallMissed.name(),null);
            }
        });

        SMSReceivedListener smsReceivedListener = new SMSReceivedListener();
        smsReceivedListener.register(activity);
        smsReceivedListener.addSMSListner(new SMSReceivedListener.SMSReceivedListner() {
            @Override
            public void message(SmsMessage message) {
                System.out.println(message);
            }
        });

        // listen to battery level
        BatteryLevelListener batteryLevelListener = new BatteryLevelListener();
        batteryLevelListener.register(activity);
        batteryLevelListener.setListener(new BatteryLevelListener.BatteryLevelChangedCallBack() {
            @Override
            public void onMessage(int value) {
                Map<String,Object> map = new HashMap<>();
                map.put("value",value);
                JsNativeBridge.sendToWebClient(webView, DeviceCommand.onBatteryValueChanged.name(),map);
            }
        });

        // listen to battery status
        BatteryStatusListener batteryStatusListener = new BatteryStatusListener();
        batteryStatusListener.register(activity);
        batteryStatusListener.setListener(new BatteryStatusListener.BatteryStatusChangedCallBack() {
            @Override
            public void onMessage(boolean isCharging) {
                Map<String,Object> map = new HashMap<>();
                map.put("isCharging",isCharging);
                JsNativeBridge.sendToWebClient(webView, DeviceCommand.onBatteryStatusChanged.name(),map);
            }
        });
    }

    private void setUpBridge(final Activity activity, final WebView webView) {
        final CommandExecuter commandExecuter = new CommandExecuter();
        commandExecuter.registerCommand(new GetBatteryStatus());
        commandExecuter.registerCommand(new GetBatteryLevel());
        commandExecuter.registerCommand(new GetMissedCalls());

        webView.addJavascriptInterface(new JsNativeBridge.ClientCommandCallLIstener(){
            @JavascriptInterface
            public void callHostCommand(String commandName, String eventId) {
                commandExecuter.executeCommand(DeviceCommand.valueOf(commandName),eventId,activity,webView);
            }
        },"__host__");
    }

    public void activate(Activity activity, WebView webView) {
        setUpListeners(activity,webView);
        setUpBridge(activity,webView);
    }

}
