import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class FormDialog extends React.Component {
  state = {
    open: false,
    name: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseYes = () => {
    this.setState({ open: false }, () => {
      this.props.handleSave(this.state.name);
    });
  };

  loginClicked = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      var user = window.localStorage.getItem("name");
      if (user !== null) {
        this.setState({ name: user });
      }
    }
    document.addEventListener("keydown", this.enterEvent, false);
  }
  componentWillUnmount() {
    document.addEventListener("keydown", this.enterEvent, false);
  }
  enterEvent = event => {
    var charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode === 13 || charCode === 10) &&
      document.activeElement.id === "nameSave"
    ) {
      event.preventDefault();
      this.setState({ open: false }, () => {
        this.props.handleSave(this.state.name);
      });

      // this.refs.input.blur();
      return false;
    }
  };
  setName = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} color="inherit">
          Save
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To save to this website, please enter your User ID here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nameSave"
              label="User ID"
              type="text"
              fullWidth
              placeholder="Enter here"
            defaultValue={this.state.name}
              // call the parent function handle change
              onChange={this.setName}
            />
         
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseYes} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
