package com.samplepractice.model.commondto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TitleValueDTO {

    private String value;

    private String title;

    public TitleValueDTO(String value) {
        this.title = value;
        this.value = value;
    }

}
