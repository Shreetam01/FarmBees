package com.farmbees.server.model.product;

public class SingleProductResponse {
    private SprProduct product;
    private SprSeller seller;

    public SingleProductResponse(SprProduct product, SprSeller seller) {
        this.product = product;
        this.seller = seller;
    }

    public SprProduct getProduct() {
        return product;
    }

    public void setProduct(SprProduct product) {
        this.product = product;
    }

    public SprSeller getSeller() {
        return seller;
    }

    public void setSeller(SprSeller seller) {
        this.seller = seller;
    }
}
