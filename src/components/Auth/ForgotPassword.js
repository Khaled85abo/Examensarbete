import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useReactContext} from '../../contexts/ReactContext'
import Alert from '@material-ui/lab/Alert'
import { Button, CssBaseline, TextField, Link, Grid,  Typography, Container} from '@material-ui/core'
 import useStyles from './authStyles'






export default function SignUp() {
  const classes = useStyles();
  const emailRef = useRef()
  const {resetPassword} = useReactContext()
  const history = useHistory()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault()



    
    try{
        setError('')
        setLoading(true)
      await  resetPassword(emailRef.current.value)
        history.push('/')
    } catch(error){
        setError(error.message)
    }
    setLoading(false)
}




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12}>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Reset My Password
          </Button>
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