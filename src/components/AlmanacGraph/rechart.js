import React from 'react'
import { XAxis, YAxis, CartesianGrid, LineChart,Line,Legend, Label, Tooltip } from 'recharts';

const Rechart = (props)=>{
        return(
        <LineChart width={950} height={500} data={props.data} margin={{top: 25, right: 30, left: 70, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis name="Number of Students"/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend iconSize={30} iconType='circle' margin={ {top: 200,  right: 20 }}/>
       
       <Line dataKey="max" label="Max" stroke="red" />
       <Line type="monotone" dataKey="enrolled" stroke={"#82ca9d"} activeDot={{ stroke: '#4542f4', strokeWidth: 4, r: 7 }}/>
       <Line type="monotone" dataKey="req"      stroke={"#8884d8"} activeDot={{ stroke: '#4542f4', strokeWidth: 4, r: 7 }}/>
       <Line type="monotone" dataKey="wait"     stroke={"#fad700"} activeDot={{ stroke: '#4542f4', strokeWidth: 4, r: 7 }}/>

      </LineChart>
        )
    }
export default Rechart;