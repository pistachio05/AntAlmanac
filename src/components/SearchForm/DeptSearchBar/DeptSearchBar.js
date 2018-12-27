import React from "react";
import Downshift from "mui-downshift";
import depts from "./depts";
import { isMobile } from "react-device-detect";

class DeptSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filteredItems: depts }; // Inital state is the whole list of depts
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState !== this.state;
  }

  determineDropdownLength() {
    if (isMobile) {
      return 80;
    }
    return 450;
  }

  handleStateChange(changes) {
    if (typeof changes.inputValue === "string") {
      // Match depts by label (ignoring case) and filter out the non matching depts
      const filteredItems = depts.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems });
    }
  }

  render() {
    return (
      <Downshift
        items={this.state.filteredItems}
        onStateChange={this.handleStateChange}
        onChange={this.props.setDept}
        getInputProps={() => ({
          // Downshift requires this syntax to pass down these props to the text field
          label: "Department",
          required: true
        })}
        menuHeight={this.determineDropdownLength()}
        {...this.props} //Pass down other props to the Downshift layer
      />
    );
  }
}
export default DeptSearchBar;
