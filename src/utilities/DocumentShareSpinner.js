import { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function SendMailSpinner() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const show = () => {
      if (!isLoading) setIsLoading(true); // ✅ Prevent unnecessary re-renders
    };
    const hide = () => {
      setTimeout(() => setIsLoading(false), 300); // ✅ Delay to smooth transition
    };

    document.addEventListener("SHOW_MAIL_SPINNER", show);
    document.addEventListener("HIDE_MAIL_SPINNER", hide);

    return () => {
      document.removeEventListener("SHOW_MAIL_SPINNER", show);
      document.removeEventListener("HIDE_MAIL_SPINNER", hide);
    };
  }, [isLoading]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.5)",
        display: isLoading ? "flex" : "none", // ✅ Prevent flickering
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: isLoading ? 1 : 0, // ✅ Smooth transition
        transition: "opacity 0.3s ease-in-out", // ✅ Smooth fade-in and fade-out
      }}
    >
      <ScaleLoader color="#4677b4" />
    </div>
  );
}
