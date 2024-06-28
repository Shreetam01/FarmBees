package com.farmbees.server.model.expert;

public class ExpertRegistrationResponse {
    private boolean email;
    private boolean registration;

    public boolean isEmail() {
        return email;
    }

    public void setEmail(boolean email) {
        this.email = email;
    }

    public boolean isRegistration() {
        return registration;
    }

    public void setRegistration(boolean registration) {
        this.registration = registration;
    }
}
