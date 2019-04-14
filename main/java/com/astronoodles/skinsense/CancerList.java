package com.astronoodles.skinsense;

public class CancerList {

    private String cancerName;
    private String probability;

    public String getCancerName() {
        return cancerName;
    }

    public String getProbability() {
        return probability;
    }

    public CancerList(String cancerName, String probability){
        this.cancerName = cancerName;
        this.probability = probability;
    }
}
