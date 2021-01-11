import { useTheme } from "@material-ui/core";
import React, { PropsWithChildren } from "react";

export const Curve = ({ children, ...props }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  return (
    <svg
      {...props}
      viewBox="0 0 600 92"
      baseProfile="full"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{
          fill: theme.palette.primary.main,
        }}
        d="M600,0 L600,50.0069831 C504.031934,78.0023277 406.564775,92 307.59852,92 C208.632266,92 106.099426,78.0023277 0,50.0069831 L0,0 L600,0 Z"
      />
    </svg>
  );
};

export default Curve;
