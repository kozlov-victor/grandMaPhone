package com.victor.model;

public class CallInfo {
    private String nameFromPhoneBook;
    private String phone;
    private long callDate;

    public String getNameFromPhoneBook() {
        return nameFromPhoneBook;
    }

    public void setNameFromPhoneBook(String nameFromPhoneBook) {
        this.nameFromPhoneBook = nameFromPhoneBook;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public long getCallDate() {
        return callDate;
    }

    public void setCallDate(long callDate) {
        this.callDate = callDate;
    }

    @Override
    public String toString() {
        return "CallInfo{" +
                "nameFromPhoneBook='" + nameFromPhoneBook + '\'' +
                ", phone='" + phone + '\'' +
                ", callDate=" + callDate +
                '}';
    }
}