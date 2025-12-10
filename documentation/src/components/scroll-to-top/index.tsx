import React, { useState, useEffect } from "react";
import clsx from "clsx";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-8 right-8 z-50",
        "flex items-center justify-center",
        "w-12 h-12",
        "rounded-full",
        "bg-refine-blue dark:bg-refine-blue-alt",
        "text-white",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-refine-blue focus:ring-offset-2",
        "dark:focus:ring-refine-blue-alt",
        "opacity-0 pointer-events-none",
        isVisible && "opacity-100 pointer-events-auto",
      )}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};
