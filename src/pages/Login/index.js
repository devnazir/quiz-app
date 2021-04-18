import { TextField, makeStyles, Button, Box } from "@material-ui/core";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from '../../hook/useAuth'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
}));

function Login() {
  const classes = useStyles()
  const { auth, signInWithGoogle } = useAuth()

  if (auth) {
    return <Redirect to="/"></Redirect>
  }

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Login</h1>
        <form className={classes.root}>
          <TextField id="standard-basic" label="Email" name="email" />
          <TextField id="standard-basic" label="Password" name="password" />
          <Box display="flex" marginTop={1}>
            <Button>Sign In</Button>
            <Button>Sign Up</Button>
          </Box>
        </form>

        <Button onClick={signInWithGoogle}>Login With Google</Button>
      </Box>
    </Fragment>
  );
}

export default Login;
