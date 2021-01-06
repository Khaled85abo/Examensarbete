import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import Alert from '@material-ui/lab/Alert'
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './CopyRight'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignUp() {
  const classes = useStyles();
  const emailRef = useRef()
  const {resetPassword} = useAuth()
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