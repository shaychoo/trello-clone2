import React from 'react'
import { AppBar,Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import UserAvatar from '../user/UserAvatar';
import { useStoreState } from '../../store';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar:{
    backgroundColor:"#1616176b"
  }
}));


function HeaderAppBar() {

  const title = useStoreState(store=>store.board.board.title);
  const classes = useStyles();
  return (
        <div>
            <AppBar position="static" className={classes.appbar}>
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      {title}
    </Typography>
    <UserAvatar />
  </Toolbar>
</AppBar>
        </div>
    )
}

export default HeaderAppBar
