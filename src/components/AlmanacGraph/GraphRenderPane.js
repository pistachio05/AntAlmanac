import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Rechart from './rechart'

const styles = () => ({
  multiline: {
    whiteSpace: "pre"
  }
});

class GraphRenderPane extends Component {
  state = { 
    graph: null,
    data: null
    };

  componentDidMount() {
     this.fetchclassData()
      this.fetchGraph(this.props.quarter,this.props.year, this.props.section.classCode);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps !== this.props ) {
      if(this.props.quarter === 'w') this.fetchclassData()
      else
      this.setState( () => {
        this.fetchGraph(this.props.quarter,this.props.year,this.props.section.classCode);
      });
    }
  }


  // will display w18 graphs only
  fetchclassData = async () =>{
    const res = await fetch(`https://antgraph.herokuapp.com/w18/${this.props.section.classCode}`)
    const data = await res.json()
    this.setState({data})
  }

  fetchGraph(quarter, year, code) {
    const url = `https://l5qp88skv9.execute-api.us-west-1.amazonaws.com/dev/${quarter}/${year}/${code}`;

    fetch(url).then(resp => resp.text()).then(resp => {
        this.setState({ graph: { __html: resp } });
      });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Instructors</th>
              <th>Times</th>
              <th>Places</th>
              <th>Max Cap</th>
            </tr>
            <tr>
              <td className={this.props.classes.multiline}>
                {`${this.props.section.classType}
                Section: ${this.props.section.sectionCode}
                Units: ${this.props.section.units}`}
              </td>
              <td className={this.props.classes.multiline}>
                {this.props.section.instructors.join("\n")}
              </td>
              <td className={this.props.classes.multiline}>
                {this.props.section.meetings
                  .map(meeting => meeting[0])
                  .join("\n")}
              </td>
              <td className={this.props.classes.multiline}>
                {this.props.section.meetings
                  .map(meeting => meeting[1])
                  .join("\n")}
              </td>
              <td>{this.props.section.maxCapacity}</td>
            </tr>
          </tbody>
        </table>
        {
          this.props.quarter ==='w'?(  <Rechart data={this.state.data} />): 
          (<div style={{ width: "85%" }} dangerouslySetInnerHTML={this.state.graph}/>)
        }
      </div>
    );
  }
}

export default withStyles(styles)(GraphRenderPane);