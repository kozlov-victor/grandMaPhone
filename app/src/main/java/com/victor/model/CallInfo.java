package com.victor.model;

import java.util.Date;

public class CallInfo {
        private String address;
        private Date callDate;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getCallDate() {
        return callDate;
    }

    public void setCallDate(Date callDate) {
        this.callDate = callDate;
    }

    @Override
        public String toString() {
            return "CallInfo{" +
                    "address='" + address + '\'' +
                    ", callDate=" + callDate +
                    '}';
        }
    }