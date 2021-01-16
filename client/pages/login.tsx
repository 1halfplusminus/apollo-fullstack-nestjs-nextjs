import React from "react";
import { css, jsx } from "@emotion/react";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import styled from "@emotion/styled";
import Curve from "../components/curve";
import background from "../assets/images/background.jpg";
import Logo from "../components/logo";
import LoginForm, { FormPaper } from "../components/login-form";
import { Typography } from "@material-ui/core";
import { useLottie } from "lottie-react";
import rocketAnimation from "../assets/animation/8345-rocket-launcher.json";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/dist/client/router";
import { useMutation } from "@apollo/client";
import {
  Login as LoginMutation,
  LoginVariables,
} from "../queries/__generated__/Login";
import { MUTATION_LOGIN } from "../queries/MUTATION_LOGIN";

export default function Login() {
  const { View } = useLottie(
    {
      animationData: rocketAnimation,
    },
    { height: "100%", width: "100%" }
  );
  const theme = useTheme();
  const router = useRouter();
  const [login, { error, loading, data }] = useMutation<
    LoginMutation,
    LoginVariables
  >(MUTATION_LOGIN, {
    context: {
      headers: {
        "X-LOGIN": "application/json",
      },
    },
  });
  return (
    <Container container direction="row" alignContent="flex-start">
      <Head>
        <title>Login</title>
      </Head>
      <Grid
        item
        xs={12}
        css={css`
          flex-shrink: 1;
        `}
      >
        <Header>
          <StyledCurve />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Header>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Grid item xs={4} md={3} lg={2} xl={2}>
          {View}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          css={css`
            color: white;
            text-align: center;
            margin: ${theme.spacing(3)}px !important;
          `}
          variant="h3"
        >
          Space Explorer
        </Typography>
      </Grid>
      <Grid item xs={8} md={5} lg={3}>
        <FormPaper>
          <LoginForm
            onLogin={async (
              { email, password },
              { setFieldError, setSubmitting }
            ) => {
              try {
                const result = await login({ variables: { email, password } });
                setSubmitting(false);
                router.push("/");
              } catch (e) {
                setFieldError(
                  "password",
                  "Votre nom d'utilisateur ou votre mot de passe est invalide"
                );
              }
              setSubmitting(false);
            }}
          />
        </FormPaper>
      </Grid>
    </Container>
  );
}

const svgClassName = css({
  display: "block",
  fill: "currentColor",
});

const LogoWrapper = styled.div`
  height: 70x;
  width: 70px;
  display: block;
  margin: 0 auto;
  position: relative;
`;
const Header = styled("header")(svgClassName, {
  width: "100%",
  marginBottom: 8 * 5,
  height: "95px",
  padding: 10,
  position: "relative",
  margin: 0,
});
const StyledCurve = styled(Curve)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
});
const Container = styled(Grid)`
  background-image: url("${background}");
  background-size: cover;
  background-position: center;
  height: 100%;
  flex-grow: 0;
  justify-content: center;
`;
