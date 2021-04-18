import { makeStyles, styled } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useAuth } from "../../hook/useAuth";

const useStyles = makeStyles({
  appBarStyle: {
    boxShadow: "none",
  },
  boxStyle: {
    width: "100%",
  },
  title: {
    cursor: "pointer",
  },
});

const LinkButton = styled(Link)({
  color: "white",
  textDecoration: "none",
});

function Navigation() {
  const classes = useStyles();
  const { auth, signOut } = useAuth()

  return (
    <Fragment>
      <AppBar position="absolute" className={classes.appBarStyle}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className={classes.boxStyle}
          >
            <Typography variant="h5">
              <LinkButton to="/">Quiz App</LinkButton>
            </Typography>
            {auth ? (
              <Button color="inherit" onClick={signOut}>Logout</Button>
            ) : (
              <LinkButton to="/login" color="inherit">
                Login
              </LinkButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Navigation;
