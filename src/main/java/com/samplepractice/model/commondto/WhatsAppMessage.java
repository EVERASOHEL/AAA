package com.samplepractice.model.commondto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WhatsAppMessage {

    private String number;
    private String document;
    private String filename;

}
