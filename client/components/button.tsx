import { PropsWithChildren, ReactNode } from "react";
import MuiButton from "@material-ui/core/Button";

export interface ButtonProps {
  onClick?: () => void;
  title: ReactNode;
}

export const Button = ({
  children,
  onClick,
  title,
}: PropsWithChildren<ButtonProps>) => (
  <MuiButton variant="contained" onClick={onClick}>
    {title}
  </MuiButton>
);
