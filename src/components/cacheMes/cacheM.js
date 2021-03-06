import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";
import { getUser } from "../App/FetchHelper";
import LoadB from "../logIn/loadButton";
import SaveB from "../saveApp/saveButton";

import { Fragment } from "react";
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class CustomizedSnackbars extends React.Component {
  state = {
    message: "hello! ",
    variant: "success"
  };

  componentDidMount = async () => {
    if (typeof Storage !== "undefined") {
      var user = window.localStorage.getItem("name");
      if (user != null) {
        this.setState({ message: "Hey " + user+" !", open: true }, async () => {
          var myJson = await getUser(user);
          if (myJson !== -1) await this.props.load(myJson);
        });
      }
    }
  };
  handleLoad = async person => {
    // var person = prompt("Please enter your username");
    if (person != null) {
      person = person.replace(/\s+/g, "");
      if (person.length > 0) {
        var myJson = await getUser(person);

        if (myJson !== -1) {
          this.setState(
            {
              open: true,
              message: "Hello " + person+" !",
              variant: "success"
            },
            async () => {
              this.props.load(myJson);
              window.localStorage.setItem("name", person);
            }
          );
        } else {
          this.setState({
            open: true,
            message: "No record found for " + person + " !",
            variant: "warning"
          });
        }
      }
    }
  };

  handleSave = async person => {
    // var person = prompt("Please enter your unique username");
    if (person != null) {
      person = person.replace(/\s+/g, "");
      if (person.length > 0) {
        this.setState({
          variant: "success",
          open: true,
          message: "saved under " + person+" !"
        });
        await this.props.save(person);
      }
    }
  };

  handleClose = ( reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
   

    return (
      <Fragment>
        <LoadB handleLoad={this.handleLoad}> </LoadB>
        <SaveB handleSave={this.handleSave} />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.variant}
            message={this.state.message}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(CustomizedSnackbars);
