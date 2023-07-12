import React, {useEffect, useState} from "react";
import "./styles.scss";

import {Dialog} from "@mui/material";
import {ROOT_DIALOG_TYPE} from "./constants";

const index = (props) => {
    const {rootDialogDTO, updateDTO} = props;

    const [state, updateStateValue] = useState({});

    const setState = (value) => {
        updateStateValue((prevState) => ({
            ...prevState,
            ...value,
        }));
    };

    useEffect(() => {
        // Anything in here is fired on component mount.

        let timer;
        if (rootDialogDTO.timer == true) {
            timer = setInterval(() => closeRootDialog(), 3000);
        }

        return () => {
            // Anything in here is fired on component unmount.

            if (timer) {
                clearInterval(timer);
            }
        };
    }, []);

    useEffect(() => {
        // Anything in here is fired on component did update.
    });

    const closeRootDialog = () => {
        const defaultRootDialogDTO = {
            show: false,
            timer: false,
            type: null,
            message: null,
        };

        updateDTO({rootDialogDTO: defaultRootDialogDTO});
    };

    const getRootDialogSign = () => {
        switch (rootDialogDTO.type) {
            case ROOT_DIALOG_TYPE.INFO: {
                return "";
            }
            case ROOT_DIALOG_TYPE.SUCCESS: {
                return "assets/icons/correct-circle.svg";
            }
            case ROOT_DIALOG_TYPE.WARNING: {
                return "assets/icons/warning.svg";
            }
            case ROOT_DIALOG_TYPE.ERROR: {
                return "";
            }
            default: {
                return "";
            }
        }
    };

    return (
        <Dialog open={rootDialogDTO.show} className="root-dialog">
            <div className="root-dialog-header">
                {rootDialogDTO.timer == true ? null : (
                    <div
                        className="root-dialog-cross-container"
                        onClick={() => {
                            closeRootDialog();
                        }}
                    >
                        <img src="assets/icons/cross.svg" alt="Cross" height="24"/>
                    </div>
                )}
            </div>

            <div className="root-dialog-content">
                <div className="root-dialog-sign-container">
                    <img src={getRootDialogSign()} alt={rootDialogDTO.type} height="60"/>
                </div>
            </div>

            <div className="root-dialog-footer">
                <div className="root-dialog-message">{rootDialogDTO.message || ""}</div>
            </div>
        </Dialog>
    );
};

export default index;
