import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export default createMuiTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: green[500],
    },
  },
});
