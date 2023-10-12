package com.exostar.portal.domain;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class UploadItem {

    // name of the file
    private String name;
    private CommonsMultipartFile[] files;

    private char delimiter;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CommonsMultipartFile[] getFileData() {
        return files;
    }

    public void setFileData(CommonsMultipartFile[] fileData) {
        this.files = fileData;
    }

    public char getDelimiter() {
        return delimiter;
    }

    public void setDelimiter(char delimiter) {
        this.delimiter = delimiter;
    }

    public CommonsMultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(CommonsMultipartFile[] files) {
        this.files = files;
    }

    public String getOriginalFileName() {
        return this.getFileData() != null && this.getFileData().length > 0 ? this.getFileData()[0].getOriginalFilename() : "Unknown";
    }
}
