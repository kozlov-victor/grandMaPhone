package com.victor.service.bridge.commands;

import android.app.Activity;
import android.webkit.WebView;

import java.util.ArrayList;
import java.util.List;

public class CommandExecuter {

    private List<Command> commands = new ArrayList<>();

    public void registerCommand(Command command) {
        commands.add(command);
    }

    public void executeCommand(DeviceCommand deviceCommand, String commandId, Activity activity, WebView webView) {
        for (Command c : commands) {
            if (c.getCommand().equals(deviceCommand)) {
                c.execute(commandId,activity,webView);
                return;
            }
        }
        throw new RuntimeException("unregistered command " + deviceCommand.name());
    }

}
