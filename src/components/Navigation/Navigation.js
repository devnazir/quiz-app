import { makeStyles, styled } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box, Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
// import { Alert, AlertTitle } from "@material-ui/lab"
import { Link } from "react-router-dom";
import { Fragment, useState, useRef, useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import { Alert, AlertTitle } from "@material-ui/lab";

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
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  return (
    <Fragment>
      {alert ? <Alert severity="success"><AlertTitle>Logout Success</AlertTitle></Alert> : ""}
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
              <Button color="inherit" onClick={openDialog}>Logout</Button>
            ) : (
              <LinkButton to="/login" color="inherit">
                Login
              </LinkButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
        <Confirmation open={open} signOut={signOut} setOpen={setOpen} setAlert={setAlert} />
    </Fragment>
  );
}

function Confirmation({ open, signOut, setOpen, setAlert }) {

  const hiddenDialog = (button) => {
    if (button === "signOut") {
      setAlert(true)
      signOut()
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    }
    
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={hiddenDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Are you sure want to Logout?"}</DialogTitle>
      <DialogActions>
        <Button onClick={() => hiddenDialog("signOut")} color="primary">
          Logout
        </Button>

        <Button onClick={hiddenDialog} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Navigation;
