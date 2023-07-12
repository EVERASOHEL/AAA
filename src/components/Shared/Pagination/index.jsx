import React, {useEffect, useState} from "react";
import "./styles.scss";

import Pagination from "react-js-pagination";

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
        <Pagination
            innerClass="dashboardPagination pagination"
            itemClass="itemClass"
            linkClass="linkClass"
            activeClass="activeClass"
            activeLinkClass="activeLinkClass"
            disabledClass="disabledClass"
            prevPageText="Prev"
            nextPageText="Next"
            activePage={props.activePage}
            itemsCountPerPage={props.itemsCountPerPage}
            totalItemsCount={parseInt(props.totalItemsCount)}
            pageRangeDisplayed={props.pageRangeDisplayed}
            onChange={props.onChange}
        />
    );
};

export default index;
