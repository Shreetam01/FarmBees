package com.farmbees.server.model.seller;

public class FarmerRegistrationResponse {
    private boolean email;
    private boolean phoneNumber;
    private boolean panNumber;
    private boolean registration;

    public boolean isEmail() {
        return email;
    }

    public void setEmail(boolean email) {
        this.email = email;
    }

    public boolean isPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(boolean phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isPanNumber() {
        return panNumber;
    }

    public void setPanNumber(boolean panNumber) {
        this.panNumber = panNumber;
    }

    public boolean isRegistration() {
        return registration;
    }

    public void setRegistration(boolean registration) {
        this.registration = registration;
    }
}
