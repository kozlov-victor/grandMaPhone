package com.victor.service.bridge.commands;

public enum DeviceCommand {
    onCallMissed,
    onSmsReceived,
    onBatteryValueChanged,
    onBatteryStatusChanged,
    onResume,

    getBatteryStatus,
    getBatteryLevel,
    getMissedCalls,
    getContactList,
    getSmsList,

}
