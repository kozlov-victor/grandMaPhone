package com.victor.model;

public class SimCardInfo {
    private String operatorName;
    private String operatorId;

    public SimCardInfo(String operatorName, String operatorId) {
        this.operatorName = operatorName;
        this.operatorId = operatorId;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(String operatorId) {
        this.operatorId = operatorId;
    }
}
