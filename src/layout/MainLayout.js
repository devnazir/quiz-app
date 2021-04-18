import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/styles";
import { Fragment } from "react";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    position: "relative",
    paddingTop: "6rem",
  },
});

function MainLayout({ children }) {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        {children}
      </Container>
    </Fragment>
  );
}

export default MainLayout