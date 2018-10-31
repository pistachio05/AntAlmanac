import React, {Component, Fragment} from 'react';
import {CircularProgress} from "@material-ui/core";
import CourseRenderPane from "./CourseRenderPane";
import querystring from 'querystring';


class CoursePane extends Component {
    constructor(props) {
        super(props);
        this.state = {courseData: null, loading: 0};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state !== nextState || nextProps.formData !== this.props.formData || nextProps.view !== this.props.view;
    }

    static flatten(data) {
        return data.reduce((accumulator, school) => {
            accumulator.push(school);

            school.departments.forEach((dept) => {
                accumulator.push(dept);

                dept.courses.forEach((course) => {
                    accumulator.push(course);
                })
            });

            return accumulator;
        }, [])
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {dept, term, ge} = this.props.formData;

        if (prevProps.formData !== this.props.formData) {
            this.setState({loading: 1});
            const params = {department: dept, term: term, GE: ge};
            const url = "/api/websoc/?" + querystring.stringify(params);

            fetch(url).then((resp) => {
                    return resp.json();
                }
            ).then((jsonObj) => this.setState({courseData: CoursePane.flatten(jsonObj), loading: 2}));
        }
    }

    render() {
        const {loading, courseData} = this.state;

        if (loading === 2) {
            return <CourseRenderPane onAddClass={this.props.onAddClass}
                                  courseData={courseData}
                                  view={this.props.view}/>

        } else if (loading === 1) {
            return (
                <div style={{
                    height: '100%', width: '100%', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress size={50}/>
                </div>
            )
        } else {
            return <Fragment/>
        }
    }
}

export default CoursePane;