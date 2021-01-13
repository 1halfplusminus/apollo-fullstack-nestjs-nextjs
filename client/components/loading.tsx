import { css } from "@emotion/react";
import Lottie from "lottie-react";
import loadingAnimationData from "../assets/animation/loading.json";
export interface LoadingProps {
  height?: string;
  width?: string;
}
export const Loading = ({ height = "90%", width = "90%" }: LoadingProps) => {
  return (
    <Lottie
      animationData={loadingAnimationData}
      css={css`
        height: ${height};
        width: ${width};
      `}
    />
  );
};
