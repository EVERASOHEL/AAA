import React, { Component, useEffect } from "react";

import { createStructuredSelector } from "reselect";
import { injectReducer, injectSaga } from "redux-injectors";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import { withRouter } from "../../utilities/withRouter";
import { withSuspense } from "../../utilities/withSuspense";

import HtmlComponent from "../../components/AdvancedDataTable";

const index = (props) => {
  useEffect(() => {
    const url = props.url;
    props.listRequest({ url, page: 0, size: 50 });
    return () => {
      props.updateSelectedFilters({}); // Reset selected filters on mount
    };
  }, []);

  const initialState = {
    filters: {
      components: [], // Default to an empty array
      url: "",
      method: "GET",
    },
    // Other initial state...
  };

  function handlechangelistPagination(payload) {
    const url = props.url;
    props.listRequest({ url, ...payload });
  }

  function handleFilterChange(filterKey, value) {
    // Dispatch an action to update the selected filter value in the Redux store
    props.updateSelectedFilters({ [filterKey]: value });
  }

  const handleFilterSubmitButton=()=> {
    const selectedFilters= props.selectedFilters || {}; // Use selected filters from props or initial state
    const filters = props.filters || initialState.filters; // Use filters from props or initial state

    // Collect selected filter values
    const filterPayload = filters.components.reduce((acc, filter) => {
      const selectedValue = selectedFilters[filter.payloadKey];
      if (selectedValue) {
        acc[filter.payloadKey] = selectedValue.value || selectedValue; // Use `value` if it's an object
      }
      return acc;
    }, {});

    // Trigger API call or other logic
    const url = props.url;
    props.listRequest({ url, page: 0, size: 10, filters: filterPayload });
  }

  const resetFilters = () => {
    props.updateSelectedFilters({}); 
    const url = props.url;
    props.listRequest({ url, page: 0, size: 50 });
  }


  return (
    <>
      <HtmlComponent
        dataList={props.list}
        currentPage={props.currentPage}
        currentPageSize={props.currentPageSize}
        headers={props.headers}
        keyMapping={props.keyMapping}
        isModelOpen={props.isModelOpen}
        title={props.title}
        handlechangelistPagination={handlechangelistPagination}
        filters={props.filters}
        handleFilterChange={handleFilterChange}
        selectedFilters= {props.selectedFilters}
        handleFilterSubmitButton={handleFilterSubmitButton}
        updateSelectedFilters={props.updateSelectedFilters}
        resetFilters={resetFilters}

      />  
    </>
  );
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    list: selectors.list(),
    currentPage: selectors.currentPage(),
    currentPageSize: selectors.currentPageSize(),
    // filters: selectors.getFilterData() || initialState.filters,
    selectedFilters: selectors.getSelectedFilters() || {}, 
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassDTO: (data) => {
      dispatch(actions.updateClassDTO(data));
    },
    listRequest: (payload) => {
      dispatch(actions.listRequest(payload));
    },
    handleAdvancedFilterChangeData: (payload) => {
      dispatch(actions.handleAdvancedFilterChangeData(payload));
    },
    updateSelectedFilters: (payload) => {
      dispatch(actions.updateSelectedFilters(payload));
    },
  };
};

const withReducer = injectReducer({ key: pageName, reducer });
const withSaga = injectSaga({ key: pageName, saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withReducer,
  withSaga,
  withConnect
)(withSuspense(withRouter(index)));

export default enhance;
