import { PropsWithChildren, useEffect, useState } from "react";

const MOBILE_WIDTH = 1280;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const MobileVersionIsNotAvailable = ({
  children,
}: PropsWithChildren) => {
  const [windowDimensions, setWindowDimensions] = useState(() =>
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions();
      const body = document.body;

      if (dimensions.width < MOBILE_WIDTH) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }

      setWindowDimensions(dimensions);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimensions.width < MOBILE_WIDTH;

  return (
    <>
      <div
        style={{
          display: isMobile ? "flex" : "none",
          flexDirection: "column",
          pointerEvents: isMobile ? "none" : "unset",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: "0",
          left: "0",
          zIndex: 9999,
          background: "#080184",
          backgroundColor: "#080184",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            textAlign: "center",
            color: "#0300AB",
            backgroundColor: "#AAA",
            padding: "8px",
            fontWeight: "bold",
          }}
        >
          Windows
        </h1>
        <h2
          style={{
            fontSize: "24px",
            lineHeight: "2",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Mobile version is not available yet.
          <div>Please visit from a desktop browser.</div>
        </h2>
      </div>
      {children}
    </>
  );
};
