import * as React from "react";
import { Component } from "react";
import "./styles.scss";
import isNullOrIsEmptyOrIsUndefined from "../../utilities/CommonValidator";

function SwitchWithMultipleOption(props) {
  let transform = "translateX(0%)";
  let currentValue = props.value;

  if (!isNullOrIsEmptyOrIsUndefined(props.displayKey)) {
    currentValue = (props.value || {})[props.displayKey];
  }
  let noSelection = "";
  if (isNullOrIsEmptyOrIsUndefined(currentValue)) {
    noSelection = "no-selection";
  }

  return (
    <div
      class={
        "switch-multiple " + (props.disabled ? "switch-multiple-disabled" : "")
      }
    >
      {props.options
        ? props.options instanceof Array
          ? props.options.map((option, index) => {
              const displayOption = props.displayKey
                ? option[props.displayKey]
                : option;

              let isSelected = currentValue == displayOption;
              if (isSelected) {
                transform = "translateX(" + index * 100 + "%)";
              }
              return (
                <div key={"switch-" + index}>
                  <input
                    id={props.component + "-" + displayOption}
                    className="switch-input"
                    type="radio"
                    disabled={props.disabled}
                    checked={isSelected}
                    onChange={(event) => {
                      if (props.onChange instanceof Function) {
                        props.onChange(option);
                      } else {
                        console.log("no function bound");
                      }
                    }}
                  />
                  <label
                    for={props.component + "-" + displayOption}
                    className={"switch-label"}
                    style={{
                      width: "" + 100 / props.options.length + "%",
                    }}
                  >
                    {displayOption || ""}
                  </label>
                </div>
              );
            })
          : ""
        : ""}

      <span
        class={
          "switch-selector " +
          noSelection +
          (props.disabled ? " switch-selector-disabled" : "")
        }
        style={{
          width: "" + 100 / props.options.length + "%",
          backgroundColor: "#0468bf",
          transform: transform,
        }}
      />
    </div>
  );
}

export default SwitchWithMultipleOption;
