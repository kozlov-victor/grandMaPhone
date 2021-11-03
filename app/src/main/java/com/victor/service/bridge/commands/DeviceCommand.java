package com.victor.service.bridge.commands;

public enum DeviceCommand {
    onCallStateChanged,
    onSmsReceived,
    onBatteryValueChanged,
    onBatteryStatusChanged,
    onPermissionGranted,
    onResume,

    getPermissionsInfo,
    getBatteryStatus,
    getBatteryLevel,
    getMissedCalls,
    getContactList,
    getSmsList,

    dialNumber,
    endCall,
    acceptCall,
    requestPermission,

    quit,

}
