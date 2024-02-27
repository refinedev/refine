import { useEffect, useState } from "react";

const getIsMobile = () =>
  typeof window !== "undefined" ? window.innerWidth <= 768 : false;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", onResize);
      }
    };
  }, []);

  return isMobile;
}
