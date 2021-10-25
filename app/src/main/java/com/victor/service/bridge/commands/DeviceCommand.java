package com.victor.service.bridge.commands;

public enum DeviceCommand {
    onCallStateChanged,
    onSmsReceived,
    onBatteryValueChanged,
    onBatteryStatusChanged,
    onResume,

    getBatteryStatus,
    getBatteryLevel,
    getMissedCalls,
    getContactList,
    getSmsList,

    dialNumber,
    endCall,

}
