import React from 'react'
import {Link} from 'react-router-dom'

import { Typography} from '@material-ui/core'

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" style={{marginTop: '3rem'}} >
        {'Copyright © '}
        <Link color="inherit" to="/">
          Stevia
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }