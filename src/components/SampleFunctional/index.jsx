import React, { useEffect, useState } from "react";
import "./styles.scss";
import { TextFieldsOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";

const index = (props) => {
  const [state, updateState] = useState({});

  const updateStateValue = (value) => {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  // useEffect(() => {
  //   // Anything in here is fired on component did update.
  // });


  const { classDTO, handleClassDTO, handleButtons, handleChangeProduct } =
    props;
  console.log("name : ", classDTO.name);
  return (
    <div>
      <label htmlFor="">hsn</label>
      <TextField
        label="Enter your name"
        onChange={(e) => {
          handleChangeProduct("name", e.target.value);
        }}
        value={classDTO.name}
      />
      {/* <TextFieldsOutlined
        name="passengerFirstName"
        label="Product Hsn"
        variant="outlined"
        maxLength={30}
        onChnage={(event, value) => {
          handleChangeProduct("hsccode", event.target.value);
        }}
        value={classDTO.hsccode}
      /> */}
    </div>
  );
};

export default index;
