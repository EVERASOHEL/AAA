import React from "react";
import Delete from "../../components/images/trash.png";
import Edit from "../../components/images/edit.png";
import Payment from "../../components/images/money.png";
import HistoryImg from "../../components/images/checklist.png";
import processImg from "../../components/images/icons8-refresh.gif";
import CloseImg from "../../components/images/cross.gif";
import ViewPdfImg from "../../components/images/purchasesalesactionimages/viewpdf.png";
import DownloadPdfImg from "../../components/images/purchasesalesactionimages/dowloadpdf.png";
import PlusImg from "../../components/images/purchasesalesactionimages/plus_148764.png";
import emailImg from "../../components/images/purchasesalesactionimages/mail.png";
import "./styles.scss";

export const DeleteButton = (props) => {
  return (
    <>
      <img
        src={Delete}
        alt=""
        className="imgstyle"
        srcset=""
        style={{ width: props.width || "25px" }}
        onClick={props.onClick}
      />
    </>
  );
};

export const EditButton = (props) => {
  return (
    <>
      <img
        src={Edit}
        className="imgstyle"
        alt=""
        srcset=""
        style={{ width: props.width || "25px" }}
        onClick={props.onClick}
      />
    </>
  );
};

export const PaymentButton = (props) => {
  return (
    <>
      <img
        src={Payment}
        className="imgstyle"
        alt=""
        srcset=""
        style={{ width: props.width || "25px" }}
        onClick={props.onClick}
      />
    </>
  );
};

export const Process = (props) => {
  return (
    <>
      <img
        src={processImg}
        className="imgstyle"
        alt=""
        srcset=""
        style={{ width: props.width || "25px" }}
        onClick={props.onClick}
      />
    </>
  );
};

export const History = (props) => {
  return (
    <>
      <img
        src={HistoryImg}
        className="imgstyle"
        alt=""
        srcset=""
        style={{ width: props.width || "25px" }}
        onClick={props.onClick}
      />
    </>
  );
};

export const CloseButton = (props) => {
  return (
    <>
      <img
        style={{ height: "50px",width:"50px", cursor: "pointer" }}
        src={CloseImg}
        alt=""
        srcset=""
        onClick={props.onClick}
      />
    </>
  );
};

export const EmptyButton = (props) => {
  return (
    <>
      <img
        style={{ height: "50px",width:"50px", cursor: "pointer" }}
        // src={}
        alt=""
        srcset=""
        onClick={props.onClick}
      />
    </>
  );
};

export const ViewPdf = (props) => {
  return (
    <>
      <img
        className="imgstyle"
        src={ViewPdfImg}
        alt=""
        srcset=""
        onClick={props.onClick}
      />
    </>
  );
};

export const DownloadPdf = (props) => {
  return (
    <>
      <img
        className="imgstyle"
        src={DownloadPdfImg}
        alt=""
        srcset=""
        onClick={props.onClick}
      />
    </>
  );
};

export const sendEmail = (props) => {
  return (
    <>
      <img
        className="imgstyle"
        src={emailImg}
        alt=""
        srcset=""
        onClick={props.onClick}
      />
    </>
  );
};

export const Add = (props) => {
  return (
    <>
      <img
        className="imgstyle"
        src={PlusImg}
        alt=""
        srcset=""
        onClick={props.onClick}
      />
    </>
  );
};
