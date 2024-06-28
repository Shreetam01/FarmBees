package com.farmbees.server.model.buyer;

public class BusinessmanRegistrationResponse {
    private boolean email = false;
    private boolean phoneNumber = false;
    private boolean panNumber = false;
    private boolean registration = false;

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
