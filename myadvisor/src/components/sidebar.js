import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LinearWithValueLabel from './LinearDeterminate';
//import Button from '@material-ui/core/Button';
import { palette } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import { ListItemSecondaryAction } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
const percentage = 70;
export default function PermanentDrawerRight() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
 
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20}}>Your Advising Progress:</Typography>

        </Box>
<br></br>
        <div className="progressBar">
       <ProgressBar label={`${percentage} %`} now={percentage} />
    </div>
    <br></br>
    <div style={{paddingLeft:"50px"}}><Button href="#" style={{color:"white", fontWeight:600}}>Begin Advising</Button> </div>
    

       <Box component='span' m={7}> </Box>

        <Box component="span" m={0.1}>
        <Typography style={{ fontWeight: 600, fontSize: 20}} >Your Degree Progress:</Typography>
        </Box>
        <br></br>
        <div className="progressBar">
       <ProgressBar label={`${percentage} %`} now={percentage} />
    </div>


      </Drawer>
    </div>
  );
}
