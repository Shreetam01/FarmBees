package com.farmbees.server.model.product;

public class ProductListingUpdate {

    private int pid;
    private boolean listed;

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public boolean isListed() {
        return listed;
    }

    public void setListed(boolean listed) {
        this.listed = listed;
    }
}
