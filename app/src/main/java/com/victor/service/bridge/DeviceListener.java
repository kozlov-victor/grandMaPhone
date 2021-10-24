package com.victor.service.bridge;

import android.app.Activity;
import android.telephony.SmsMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.victor.service.bridge.commands.CommandExecuter;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.impl.GetBatteryStatusCommand;
import com.victor.service.bridge.commands.impl.GetBatteryLevelCommand;
import com.victor.service.bridge.commands.impl.GetContactListCommand;
import com.victor.service.bridge.commands.impl.GetMissedCallsCommand;
import com.victor.service.bridge.commands.impl.GetSmsListCommand;
import com.victor.service.listener.BatteryLevelListener;
import com.victor.service.listener.BatteryStatusListener;
import com.victor.service.listener.PhoneCallListener;
import com.victor.service.listener.SMSReceivedListener;

import java.util.HashMap;
import java.util.Map;

public class DeviceListener {

    private void listenToCalls(Activity activity, final WebView webView) {
        PhoneCallListener callListener = PhoneCallListener.getInstance(activity);
        callListener.register(activity);
        callListener.setListener(new PhoneCallListener.OnCallMissedCallBack() {
            @Override
            public void onCallMissed() {
                JsNativeBridge.sendToWebClient(webView, DeviceCommand.onCallMissed.name(),null);
            }
        });
    }

    private void listenToSmsReceived(Activity activity, final WebView webView) {
        SMSReceivedListener smsReceivedListener = new SMSReceivedListener();
        smsReceivedListener.register(activity);
        smsReceivedListener.addSMSListner(new SMSReceivedListener.SMSReceivedListner() {
            @Override
            public void message(SmsMessage message) {
                JsNativeBridge.sendToWebClient(webView, DeviceCommand.onSmsReceived.name(),null);
            }
        });
    }

    private void listenToBatteryLevel(Activity activity, final WebView webView) {
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
    }

    private void listenToBatteryStatus(Activity activity, final WebView webView) {
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

    private void setUpListeners(Activity activity, WebView webView) {
        listenToCalls(activity,webView);
        listenToSmsReceived(activity,webView);
        listenToBatteryLevel(activity, webView);
        listenToBatteryStatus(activity, webView);
    }

    private void setUpBridge(final Activity activity, final WebView webView) {
        final CommandExecuter commandExecuter = new CommandExecuter();
        commandExecuter.registerCommand(new GetBatteryStatusCommand());
        commandExecuter.registerCommand(new GetBatteryLevelCommand());
        commandExecuter.registerCommand(new GetMissedCallsCommand());
        commandExecuter.registerCommand(new GetContactListCommand());
        commandExecuter.registerCommand(new GetSmsListCommand());

        webView.addJavascriptInterface(new JsNativeBridge.ClientCommandCallLIstener(){
            @JavascriptInterface
            @Override
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
