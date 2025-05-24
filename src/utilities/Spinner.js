import React, { useState } from "react";
import { ClipLoader, ScaleLoader } from "react-spinners";


// Export functions to control the spinner externally
export const spinnerInstance = {
  show: () => {},
  hide: () => {},
};

// Assign the actual functions
spinnerInstance.show = () => document.dispatchEvent(new CustomEvent("SHOW_SPINNER"));
spinnerInstance.hide = () => document.dispatchEvent(new CustomEvent("HIDE_SPINNER"));

// Listen to global events and control the spinner
export default function GlobalSpinnerWrapper() {
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const show = () => setIsLoading(true);
    const hide = () => setIsLoading(false);

    document.addEventListener("SHOW_SPINNER", ()=>{
      show();
    });
    document.addEventListener("HIDE_SPINNER", ()=>{
      hide();
    });

    return () => {
      document.removeEventListener("SHOW_SPINNER", show);
      document.removeEventListener("HIDE_SPINNER", hide);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
            >
            <ScaleLoader color="#4677b4"/>
        </div>
      )}
    </>
  );
}
