import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import Alert from '@material-ui/lab/Alert'
import { Button, CssBaseline, TextField, Grid,  Typography, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';





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
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {currentUser, updateEmail, updatePassword} = useAuth()
  const history = useHistory()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)



function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('Passwords do not match')
    }
    const promises = []
    setLoading(true)
    setError('')
    if(emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
    }
    Promise.all(promises).then(() => {
        history.push('/')
    }).catch((error) => {
        setError(error.message)
    }).finally( () => {
        setLoading(false)
    })
}





  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
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
                defaultValue={currentUser.email}
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef ={passwordConfirmRef} 
                name="password-confirm"
                label="Password Confirmation"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Update Profile
          </Button>

        </form>
      </div>

    </Container>
  );


}