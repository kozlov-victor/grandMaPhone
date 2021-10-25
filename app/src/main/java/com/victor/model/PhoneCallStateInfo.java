package com.victor.model;

import com.victor.service.listener.PhoneCallListener;

public class PhoneCallStateInfo {

    private PhoneCallListener.PhoneCallState phoneCallState;
    private String phoneNumber;
    private String address;

    public PhoneCallListener.PhoneCallState getPhoneCallState() {
        return phoneCallState;
    }

    public void setPhoneCallState(PhoneCallListener.PhoneCallState phoneCallState) {
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
