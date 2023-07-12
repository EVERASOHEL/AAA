import React, {useEffect, useState} from "react";
import "./styles.scss";

const index = (props) => {
    const {classDTO, handleClassDTO, handleButtons} = props;

    const [state, updateStateValue] = useState({});

    const setState = (value) => {
        updateStateValue((prevState) => ({
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

    useEffect(() => {
        // Anything in here is fired on component did update.
    });

    return (
        <div id="root">
            <div className="loader-container">
                {/* <img
          src={constant.LOADER_SPINNER}
          style={{ marginTop: "-36px" }}
          height="80px"
          width="80px"
          alt="loader"
        ></img> */}
                {/* <img
          src={require("../../assets/images/LoaderSpinner.gif")}
          style={{
            position: "absolute",
            right: "50%",
            top: "50%",
            zIndex: 9999,
            width: "120px",
            height: "120px",
          }}
          alt="loader"
        ></img> */}
                {/* <img
          className="loader-image"
          src={require("../../../assets/images/loaders/loaderRolling.gif")}
          alt="loader"
        ></img> */}
                <div className="animated fadeIn pt-3 text-center">Loading...</div>
            </div>
        </div>
    );
};

export default index;
