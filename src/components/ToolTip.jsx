import React, { useEffect, useState } from "react";

export default function ToolTip({ children, classN, text }) {
  const [tooltip, setTooltip] = useState(false);
  const [tooltipDelayed, setTooltipDelayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTooltipDelayed(tooltip);
    }, 200);
  }, [tooltip]);

  const displayToolTip = {
    display: "flex",
    opacity: tooltipDelayed ? 1 : 0,
    transition: "opacity 1s ease",
  };

  const hideToolTip = {
    display: tooltipDelayed ? "flex" : "none",
    opacity: 0,
    transition: "opacity 1s ease",
  };

  const relativeDiv = {
    position: "relative",
  };
  return (
    <div
      onClick={() => {
        setTooltip(!tooltip);
      }}
      className={classN}
      style={relativeDiv}
    >
      {children}
      <div className="ToolTip" style={tooltip ? displayToolTip : hideToolTip}>
        <span className="ToolTipText">{text}</span>
      </div>
    </div>
  );
}
