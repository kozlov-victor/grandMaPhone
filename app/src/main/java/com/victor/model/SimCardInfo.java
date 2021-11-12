package com.victor.model;

public class SimCardInfo {
    private String operatorName;
    private Integer operatorId;

    public SimCardInfo(String operatorName, Integer operatorId) {
        this.operatorName = operatorName;
        this.operatorId = operatorId;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }
}
