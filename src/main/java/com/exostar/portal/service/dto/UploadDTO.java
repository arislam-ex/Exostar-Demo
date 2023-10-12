package com.exostar.portal.service.dto;

public class UploadDTO {

    private String message;

    public UploadDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
