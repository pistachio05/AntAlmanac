import React, {Component} from 'react';
import { XAxis, YAxis, CartesianGrid, LineChart,Line,Legend, Label, Tooltip, ReferenceLine } from 'recharts';

export default class Graph extends Component {
    state = {
        enrolledColor:'#8884d8',
        reqColor:"#82ca9d",
        waitColor:"#fad700",

        data: [
            {name:"week7",max:180,enrolled:4,req:8,wait:0},
            {name:"week7",max:180,enrolled:20,req:8,wait:0},
            {name:"week7",max:180,enrolled:30,req:8,wait:0},
            {name:"week7",max:180,enrolled:31,req:8,wait:0},
            {name:"week7",max:180,enrolled:31,req:8,wait:0},
            {name:"week7",max:180,enrolled:31,req:8,wait:0},
            {name:"week7",max:180,enrolled:33,req:8,wait:0},
            {name:"week7",max:180,enrolled:45,req:8,wait:0},
            {name:"week7",max:180,enrolled:57,req:8,wait:0},
            {name:"week7",max:180,enrolled:66,req:32,wait:0},
            {name:"week7",max:180,enrolled:68,req:51,wait:0},
            {name:"week7",max:180,enrolled:68,req:55,wait:0},
            {name:"week7",max:180,enrolled:68,req:55,wait:0},
            {name:"week7",max:180,enrolled:68,req:56,wait:0},
            {name:"week7",max:180,enrolled:69,req:59,wait:0},
            {name:"week7",max:180,enrolled:69,req:80,wait:0},
            {name:"week7",max:180,enrolled:77,req:94,wait:0},
            {name:"week7",max:180,enrolled:77,req:107,wait:0},
            {name:"week7",max:180,enrolled:80,req:110,wait:0},
            {name:"week7",max:180,enrolled:81,req:112,wait:0},
            {name:"week7",max:180,enrolled:82,req:114,wait:0},
            {name:"week7",max:180,enrolled:84,req:114,wait:0},
            {name:"week7",max:180,enrolled:104,req:115,wait:0},
            {name:"week7",max:180,enrolled:112,req:115,wait:0},
            {name:"week7",max:180,enrolled:111,req:115,wait:0},
            {name:"week7",max:180,enrolled:110,req:115,wait:0},
        ]
    };

	render () {
  	return (
    	<LineChart width={950} height={500} data={this.state.data}
            margin={{top: 25, right: 30, left: 70, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend iconSize={35} iconType='circle' margin={ {top: 200,  right: 20 }}/>

       <ReferenceLine y={180} label="Max" stroke="red" alwaysShow/>
       <Line type="monotone" dataKey="enrolled" stroke={this.state.enrolledColor} activeDot={{ stroke: '#8884d8', strokeWidth: 4, r: 7 }}/>
       <Line type="monotone" dataKey="req"      stroke={this.state.reqColor}      activeDot={{ stroke: '#82ca9d', strokeWidth: 4, r: 7 }}/>
       <Line type="linearClosed" dataKey="wait" stroke={this.state.waitColor}     activeDot={{ stroke: '#fad700', strokeWidth: 4, r: 7 }}/>

      </LineChart>
    );
  }
}