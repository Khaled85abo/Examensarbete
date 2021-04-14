import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useReactContext} from '../../contexts/ReactContext'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Alert from '@material-ui/lab/Alert'
import {Avatar, Button, CssBaseline, TextField, Link, Grid,  Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './authStyles'







export default function SignUp() {
  const classes = useStyles();
  const emailRef = useRef()
  const passwordRef = useRef()
  const {login} = useReactContext()
  const history = useHistory()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => {
      history.goBack()
    },
  },
};

  async function handleSubmit(e) {
    e.preventDefault()
    try{
        setError('')
        setLoading(true)
      await  login(emailRef.current.value, passwordRef.current.value)
        history.goBack()
    } catch(error){
        setError(error.message)
    }
    setLoading(false)
}




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
          {error ? (<Alert severity="warning">{error}</Alert>) : ''}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={emailRef}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={passwordRef} 
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Log In
          </Button>

          <Grid container justify='center'>
            <Grid item>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );


}