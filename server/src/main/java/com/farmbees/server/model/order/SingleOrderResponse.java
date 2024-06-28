package com.farmbees.server.model.order;

public class SingleOrderResponse {
    SorOrder order;
    SorProduct product;
    SorSeller seller;
    SorBuyer buyer;

    public SingleOrderResponse(SorOrder order, SorProduct product, SorSeller seller, SorBuyer buyer) {
        this.order = order;
        this.product = product;
        this.seller = seller;
        this.buyer = buyer;
    }

    public SorOrder getOrder() {
        return order;
    }

    public void setOrder(SorOrder order) {
        this.order = order;
    }

    public SorProduct getProduct() {
        return product;
    }

    public void setProduct(SorProduct product) {
        this.product = product;
    }

    public SorSeller getSeller() {
        return seller;
    }

    public void setSeller(SorSeller seller) {
        this.seller = seller;
    }

    public SorBuyer getBuyer() {
        return buyer;
    }

    public void setBuyer(SorBuyer buyer) {
        this.buyer = buyer;
    }
}
