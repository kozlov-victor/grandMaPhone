package com.victor.model;

import com.victor.service.receiver.CallReceiver;

public class PhoneCallStateInfo {

    private CallReceiver.PhoneCallState phoneCallState;
    private String phoneNumber;
    private String address;

    public CallReceiver.PhoneCallState getPhoneCallState() {
        return phoneCallState;
    }

    public void setPhoneCallState(CallReceiver.PhoneCallState phoneCallState) {
        this.phoneCallState = phoneCallState;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
