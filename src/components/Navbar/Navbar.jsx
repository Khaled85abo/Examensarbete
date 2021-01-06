import React, {useState} from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Typography, Icon} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import logo from '../../assets/iconpng.png'
import {Link, useLocation,  useHistory} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import useStyles from './styles'

const Navbar = ({totalItems}) => {

    const classes = useStyles()
    const location = useLocation()
    const history = useHistory()
    const[error, setError] = useState('')
    const { currentUser, logout } = useAuth()


console.log('location: ' + location.pathname)
console.log(history.location.pathname)


    
    const handleLogout = async () => {
        setError('')

        if (window.confirm('Vill du logga ut?')){
            try{
                await logout()
                history.push('/')
            } catch(error){
                setError('Faliled to log out')
            }
        }
       
    }

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='commerce.js' height='25px' className={classes.image} />
                        <span className={classes.moto}>For a Healthy Life</span>
                    </Typography>
                    <div style={{display: 'flex', flexDirection: 'column'}}>

                        { currentUser 
                        ? (
                            <div>
                                <Typography  component={Link}  onClick={handleLogout}>Log Out</Typography>
                                <Typography  component={Link} to='/update-profile' >Profile</Typography>
                            </div>
                        ) 
                        :  <Typography  component={Link} to='/login' >Log In</Typography>

                        }
                   
                    </div>
                    <div className={classes.grow} />
                    {location.pathname === '/' &&   (
                    <div className={classes.button}>
                         <IconButton component={Link} to='/cart' aria-label='show cart item' color='inherit' >
                             <Badge badgeContent={totalItems}  color='secondary'>
                                 <ShoppingCart />
                             </Badge>
                         </IconButton>
                     </div>
                    )}
                   
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
