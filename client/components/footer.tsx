import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Cart from "@material-ui/icons/AddShoppingCartOutlined";
import User from "@material-ui/icons/VerifiedUserOutlined";
import LogOut from "@material-ui/icons/ExitToApp";
import { css } from "@emotion/react";
import Home from "@material-ui/icons/HomeOutlined";
import { useRouter } from "next/router";

const icon = css`
  font-size: 60px !important;
`;
const actionButton = css`
  flex: 0.25 !important;
  .MuiBottomNavigationAction-label {
    font-size: 22px !important;
  }
`;
export default function Footer() {
  const router = useRouter();
  return (
    <BottomNavigation
      onChange={(e, newValue) => {
        router.push(newValue);
      }}
      showLabels
      css={css`
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 150px !important;
        text-transform: uppercase;
      `}
    >
      <BottomNavigationAction
        value="/"
        css={actionButton}
        label="Home"
        icon={<Home css={icon} />}
      />
      <BottomNavigationAction
        value="/cart"
        css={actionButton}
        label="Cart"
        icon={<Cart css={icon} />}
      />
      <BottomNavigationAction
        value="/profile"
        css={actionButton}
        label="Profile"
        icon={<User css={icon} />}
      />
      <BottomNavigationAction
        value="/logout"
        css={actionButton}
        label="Logout"
        icon={<LogOut css={icon} />}
      />
    </BottomNavigation>
  );
}
