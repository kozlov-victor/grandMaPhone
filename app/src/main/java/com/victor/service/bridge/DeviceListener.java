package com.victor.service.bridge;

import android.app.Activity;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.annotation.Nullable;

import com.victor.service.bridge.commands.CommandExecuter;
import com.victor.service.bridge.commands.DeviceCommand;
import com.victor.service.bridge.commands.impl.AcceptCallCommand;
import com.victor.service.bridge.commands.impl.DialNumberCommand;
import com.victor.service.bridge.commands.impl.EndCallCommand;
import com.victor.service.bridge.commands.impl.GetBatteryLevelCommand;
import com.victor.service.bridge.commands.impl.GetBatteryStatusCommand;
import com.victor.service.bridge.commands.impl.GetContactListCommand;
import com.victor.service.bridge.commands.impl.GetMissedCallsCommand;
import com.victor.service.bridge.commands.impl.GetPermissionInfoCommand;
import com.victor.service.bridge.commands.impl.GetSmsListCommand;
import com.victor.service.bridge.commands.impl.QuitCommand;
import com.victor.service.bridge.commands.impl.RequestPermissionCommand;
import com.victor.service.listener.BatteryLevelListener;
import com.victor.service.listener.BatteryStatusListener;
import com.victor.service.listener.SMSReceivedListener;

import java.util.HashMap;
import java.util.Map;

public class DeviceListener {

    private static boolean isListenedToServices = false;

    private static SMSReceivedListener smsReceivedListener;
    private static BatteryLevelListener batteryLevelListener;
    private static BatteryStatusListener batteryStatusListener;


    private void listenToSmsReceived(Activity activity, final WebView webView) {
        smsReceivedListener = new SMSReceivedListener();
        smsReceivedListener.register(activity);
        smsReceivedListener.addSMSListner(message -> JsNativeBridge.sendToWebClient(webView, DeviceCommand.onSmsReceived.name(),null));
    }

    private void listenToBatteryLevel(Activity activity, final WebView webView) {
        batteryLevelListener = new BatteryLevelListener();
        batteryLevelListener.register(activity);
        batteryLevelListener.setListener(value -> {
            Map<String,Object> map = new HashMap<>();
            map.put("value",value);
            JsNativeBridge.sendToWebClient(webView, DeviceCommand.onBatteryValueChanged.name(),map);
        });
    }

    private void listenToBatteryStatus(Activity activity, final WebView webView) {
        batteryStatusListener = new BatteryStatusListener();
        batteryStatusListener.register(activity);
        batteryStatusListener.setListener(isCharging -> {
            Map<String,Object> map = new HashMap<>();
            map.put("isCharging",isCharging);
            JsNativeBridge.sendToWebClient(webView, DeviceCommand.onBatteryStatusChanged.name(),map);
        });
    }

    public void setUpListenersOnce(Activity activity, WebView webView) {
        if (isListenedToServices) return;
        isListenedToServices = true;
        listenToSmsReceived(activity,webView);
        listenToBatteryLevel(activity, webView);
        listenToBatteryStatus(activity, webView);
    }

    public void setUpBridge(final Activity activity, final WebView webView) {
        final CommandExecuter commandExecuter = new CommandExecuter();
        commandExecuter.registerCommand(new GetBatteryStatusCommand());
        commandExecuter.registerCommand(new GetBatteryLevelCommand());
        commandExecuter.registerCommand(new GetMissedCallsCommand());
        commandExecuter.registerCommand(new GetContactListCommand());
        commandExecuter.registerCommand(new GetSmsListCommand());
        commandExecuter.registerCommand(new DialNumberCommand());
        commandExecuter.registerCommand(new EndCallCommand());
        commandExecuter.registerCommand(new AcceptCallCommand());
        commandExecuter.registerCommand(new GetPermissionInfoCommand());
        commandExecuter.registerCommand(new RequestPermissionCommand());
        commandExecuter.registerCommand(new QuitCommand());

        webView.addJavascriptInterface(new JsNativeBridge.ClientCommandCallLIstener(){
            @JavascriptInterface
            @Override
            public void callHostCommand(String commandName, String eventId, @Nullable String jsonParams) {
                commandExecuter.executeCommand(DeviceCommand.valueOf(commandName),eventId,jsonParams,activity,webView);
            }
        },"__host__");
    }

    public static void unRegisterListeners(Activity activity) {
        smsReceivedListener.unregister(activity);
        batteryLevelListener.unregister(activity);
        batteryStatusListener.unregister(activity);
    }


}
