import { createSelector } from "reselect";
import { pageName } from "./constants";

const stateSelector = (state) => state[pageName];

export const getClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.classDTO);

export const getResponseDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.responseDTO);

export const getisModelOpen = () =>
  createSelector(stateSelector, (bstate) => bstate.open);

export const productList = () =>
  createSelector(stateSelector, (bstate) => bstate.productlist);

export const getSalesClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.salesClassDTO);

export const getSalesClassListDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.salesClassListDTO);

export const getCompnayNameList = () =>
  createSelector(stateSelector, (bstate) => bstate.companyNameList);

export const getOrderList = () =>
  createSelector(stateSelector, (bstate) => bstate.salesOrderList);

export const currentPage = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPage);

export const currentPageSize = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPageSize);

export const getupdateforcompanyOrderRowData = () =>
  createSelector(stateSelector, (bstate) => bstate.companyOrderDetailsRowData);

export const paymentHistoryData = () =>
  createSelector(stateSelector, (bstate) => bstate.paymentHistoryData);

export const getPdfData = () =>
  createSelector(stateSelector, (bstate) => bstate.pdfData);

export const getPdfStatus = () =>
  createSelector(stateSelector, (bstate) => bstate.isOpenPdf);

export const getPaymentModelStatus = () =>
  createSelector(stateSelector, (bstate) => bstate.isPaymentModelOpen);