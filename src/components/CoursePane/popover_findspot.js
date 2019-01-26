import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Input from '@material-ui/core/Input';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class SPopover extends React.Component {
  state = {
    anchorEl: null,
    userEmail: "",
    userFB: ""
  };


  handleClick = event => {
    if (!event)  event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    var email ="";
    if (typeof Storage !== "undefined") {
         email = window.localStorage.getItem("email");
      }

      this.setState({ anchorEl: event.currentTarget,userEmail: email });

  };

  handleClose = (event) => {
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    this.setState({
      anchorEl: null,
    });
  };

  signupEmail = () =>{
    const code = this.props.code;
    const email = this.state.userEmail;
    const name = this.props.name[1] + " " + this.props.name[2]


    let url = "https://mediaont.herokuapp.com/email/"

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email))
    this.setState({
        anchorEl: null,
      },()=>{
      this.props.handleSave(-1,email,code)});
    else
    {
        url = url + code +"/"+ name + "/" + email;
        window.localStorage.setItem("email", email);
        this.setState({
            anchorEl: null,
          },()=>{
            fetch(url)
            this.props.handleSave(1,email,code);
          });
    }
    // url = url + code +"/"+ name + "/" + email;
    // window.localStorage.setItem("email", email);
    // this.handleClose();
    // this.props.handleSave()
    // fetch(url)
    // alert(email+" added to the notification list for "+ code +" !!!")
  }

  signupFB = () =>{
    const code = this.props.code;
    const fb = this.state.userFB;
    const name = this.props.name[1] + " " + this.props.name[2]

    let url = "https://mediaont.herokuapp.com/facebook"

    url = url + code +"/"+ name + "/" + fb;
    window.localStorage.setItem("fb", fb);
    this.setState({
        anchorEl: null,
      },()=>{
        fetch(url)
        this.props.handleSave(1,fb,code);
      });
  }


  inputChange = (event) =>{
    if (!event)  event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    this.setState({userEmail: event.target.value})
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>

        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="outlined"
          color="inherit"
          className={'multiline'}
          onClick={this.handleClick}
        >
         {this.props.full}
        </Button>
        <Popover
          id="paul-revere"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          onClick={event=>{if (!event) var event = window.event;
            event.cancelBubble = true;
            if (event.stopPropagation) event.stopPropagation();}}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
        <Typography variant="title" className={classes.typography}>Get notified when space opens!</Typography>

        <div className={classes.container}>
          <typography variant='h2' className={classes.typography} style={{ marginLeft: 30 }}>
            Email:
          </typography>
          <Input
           style={{ margin: 10 }}
            onChange={this.inputChange}
            placeholder="Email"
            className={classes.input}
            defaultValue={this.state.userEmail}
            inputProps={{
              'aria-label': 'Description',
            }}
          />

          <Button variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.signupEmail}>
            Add
          </Button>

        </div>

        <div className={classes.container}>
          <typography variant='h2' className={classes.typography} style={{ marginLeft: 30, marginBottom: 10 }}>
            FB ID:
          </typography>
          <Input
           style={{ margin: 10 }}
            onChange={this.inputChange}
            placeholder="Facebook ID**"
            className={classes.input}
            defaultValue={this.state.userFB}
            inputProps={{
              'aria-label': 'Description',
            }}
          />

          <Button variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.signupFB}>
            Add</Button>
        </div>

        <ExpansionPanel style = {{width : 450}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>**Facebook ID? What? Why?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>Sorry fam, but you're not unique. That's why getting your name won't help me find you on FB. Instead, please enter the unique serial code with which FB has objectified you. Thanks!</p>
              <p>Don't know what it is? <a href="https://findmyfbid.com" target="_blank">Find it here; no login requried</a>.</p>
              <p>First time? Please check Settings >> People >> Message Requests >> filtered requests in the Messenger App for a confirmation message. Reply to it and you're all set!</p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        </Popover>
      </React.Fragment>
    );
  }
}

SPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SPopover);
