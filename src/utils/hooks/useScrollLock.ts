import React from "react";

export const useScrollLock = () => {
  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
    const scrollOffset = window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollOffset}px`;
    document.body.style.width = "100%";
    document.body.classList.add("filter-effect");
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, window.pageYOffset);
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
