import { css, jsx } from "@emotion/react";
import React, { PropsWithChildren } from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validate={(values) => {
      const errors: { email?: string | null } = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onLogin();
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={1}>
          <Grid container item justify="center">
            <Grid item xs={8}>
              <TextField
                type="email"
                name="email"
                label="Email"
                autoComplete="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={8}>
              {errors.email && touched.email && errors.email}
            </Grid>
          </Grid>
          <Grid container item justify="center">
            <Grid item xs={8}>
              <TextField
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item justify="center">
            <Grid item xs={8}>
              {errors.password && touched.password && errors.password}
            </Grid>
          </Grid>
          <Grid container item justify="center">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                LOG IN
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    )}
  </Formik>
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const FormPaper = ({ children }: PropsWithChildren<{}>) => {
  const styles = useStyles();
  return (
    <Paper className={styles.paper} elevation={2}>
      {children}
    </Paper>
  );
};

export default LoginForm;
