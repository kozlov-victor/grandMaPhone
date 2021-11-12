package com.victor.model;

public class DialNumber {
    private String number;
    private Integer operatorId;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    @Override
    public String toString() {
        return "DialNumber{" +
                "number='" + number + '\'' +
                ", operatorId=" + operatorId +
                '}';
    }
}
