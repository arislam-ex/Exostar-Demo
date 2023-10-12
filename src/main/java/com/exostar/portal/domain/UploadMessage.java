package com.exostar.portal.domain;

import java.text.MessageFormat;
import org.apache.commons.lang3.StringUtils;

public class UploadMessage {

    private String message = "";

    public void initMessage(String detailMessage, Object... detailParams) {
        if (StringUtils.isBlank(this.message)) {
            if (detailParams == null || detailParams.length == 0) {
                this.message = detailMessage;
            } else {
                this.message = MessageFormat.format(detailMessage, detailParams);
            }
        }
    }

    public void initMessage(String messageText) {
        initMessage(messageText, (Object[]) null);
    }

    public boolean isMessageEmpty() {
        return message.length() == 0;
    }

    public String getMessage() {
        return message;
    }
}
