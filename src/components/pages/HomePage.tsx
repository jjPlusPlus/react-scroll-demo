import React, { Component } from 'react';
import ScrollWrapper from '../ScrollWrapper';

import * as c3 from "c3";

const JSONA = [
    {
        "key": {
            "day": "int",
            "id": "uuid",
        },
        "value": "int"
    }
];

const JSONB = [
    {
        day: 1,
        values: [
            {
                "id": "a",
                "value": 7
            }, {
                "id": "b",
                "value": 8
            }, {
                "id": "c",
                "value": 9
            }
        ]
    },
    {
        day: 2,
        values: [
            {
                "id": "d",
                "value": 10
            },
            {
                "id": "e",
                "value": 11
            },
            {
                "id": "f",
                "value": 12
            },
        ]
    },
    {
        day: 3,
        values: [
            {
                "id": "g",
                "value": 13
            },
            {
                "id": "h",
                "value": 14
            },
            {
                "id": "i",
                "value": 15
            },
        ]
    }
];

const JSONB2 = [
    {
        columns: [
            ["Day 1", 7, 8, 9],
            ["Day 2", 17, 18, 19],
            ["Day 3", 27, 28, 29]
        ]
    }
]

const JSONC = [
    { day: 1, value: 7, id: "a" },
    { day: 1, value: 8, id: "b" },
    { day: 1, value: 9, id: "c" },
    { day: 2, value: 17, id: "a" },
    { day: 2, value: 18, id: "b" },
    { day: 2, value: 19, id: "c" },
    { day: 3, value: 27, id: "a" },
    { day: 3, value: 28, id: "b" },
    { day: 3, value: 29, id: "c" },
];

interface Props {
    verticalPosition: number;
    scrollPercentage: number;
    isBottom: Boolean;
    isTop: Boolean;
}

interface State {
    hasReachedBottom: Boolean,
    loading: boolean,
    data: any
}

class HomePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            hasReachedBottom: false,
            loading: false,
            data: null
        }
    }

    componentDidMount() {
        c3.generate({
            bindto: "#c3-chart",
            data: {
                columns: [
                    ["Day 1", 7, 8, 9],
                    ["Day 2", 17, 18, 19],
                    ["Day 3", 27, 28, 29]
                ]
            }
        });
    }

    componentDidUpdate() {
        const { isBottom } = this.props;
        const { hasReachedBottom } = this.state;

        if (isBottom && hasReachedBottom !== true) {
            this.getData();
            this.setState({ 
                "hasReachedBottom": true, 
                "loading": true 
            });
        }
    }

    getData() {
        fetch("https://api.github.com/users/jjplusplus")
            .then(res => res.json())
            .then(result => {
                return this.setState({
                    "data": result,
                    "loading": false
                })
            }).catch(error => {
                window.alert("There was a problem with the network request");
                return this.setState({
                    "loading": false,
                })
            });
    }

    render() {
        const {verticalPosition, scrollPercentage, isBottom, isTop } = this.props;
        const { data, loading } = this.state;



        return (
            <div className="react-scroll-demo">
                <div className="scroll-info">
                    <p>Vertical Scroll: {verticalPosition}</p>
                    <p>Scroll Percentage: {scrollPercentage}%</p>
                    <p>Is at Bottom: {isBottom === true ? "True" : "False"}</p>
                    <p>Is at Top: {isTop === true ? "True" : "False"}</p>
                </div>
                <div className="page-content">
                    <section className="page-section">
                        <h1>About this project</h1>
                        <p>This project is build using React, strictly typed in Typescript, managed by Redux & Sagas, and tested with Jest.</p>
                        <p>A bit about the technologies used</p>
                        <ul>
                            <li><strong>React:</strong> <br /> A light front-end UI library with a cult-like following, built by Facebook.</li>
                            <li><strong>Redux & Redux Saga:</strong> <br /> A state-management library, strong for handling side-effects. Sagas allow for asynchronous state management using new-JS generators.</li>
                            <li><strong>Typescript:</strong> <br /> A pain to implement, but highly useful for catching bugs that even unit tests will miss.</li>
                            <li><strong>Jest/Enzyme:</strong> <br /> Unit testing libraries that work really well with React. (Jest is build in to React's generator tool, CRA) Used to unit test the main components.</li>
                        </ul>
                    </section>
                </div>

                <div className="page-content">
                    <section className="page-section">
                        <h1>On Formatting JSON  </h1>
                        <p>The content of this project is an article describing how to manipulate JSON-formatted payloads for different tasks.</p>
                        <p>Given a payload that looks like this: </p>
                        <pre>{JSON.stringify(JSONA, null, 2)}</pre>
                        <p>Format the data so that it could be used to render charts or tables.</p>
                    </section>
                </div>
                <div className="page-content">
                    <section className="page-section">
                        <h1>JSON Parsing for Charts</h1>
                        <p>When parsing JSON data for charts, two main things need to be taken into consideration. First, consider the type of chart being rendered.
                            For instance, you may want to format the data differently for pie charts than time-sequential bar charts. Second, consider the library being used 
                            to render the chart. For example, the JS chart libraries for D3/C3 are opinionated about the format of the JSON input.
                        </p>

                        <p>All that said, after looking at the sample data there is a format that makes sense to comprehensively format the data for charts. 
                            For use in a chart, I would make use of an adapter that parses the JSON such that the data is grouped by day. 
                        </p>
                        <pre>{JSON.stringify(JSONB, null, 2)}</pre>

                        <p>However, for use in C3 chart below the JSON would be formatted like this: </p>
                        <pre>{JSON.stringify(JSONB2, null, 2)}</pre>
                        <div id="c3-chart"></div>
                    </section>
                </div>
                <div className="page-content">
                    <section className="page-section">
                        <h1>JSON Parsing for tables</h1>
                        <p>For a table layout, you could write an adapter that parses the JSON such that the data fits the layout of a table (rows).</p>
                        <pre>{JSON.stringify(JSONC, null, 2)}</pre>
                        <table>
                            <thead> 
                                <tr>
                                    <th>Day</th>
                                    <th>ID</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    JSONC.map((row, index) => {
                                        return (
                                            <tr>
                                                <td>{row.day}</td>
                                                <td>{row.id}</td>
                                                <td>{row.value}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                </div>

                <div className="page-content">
                    <section className="page-section">
                        <h1>User Info</h1>
                        {
                            loading === true ? (
                                <p>LOADING...</p>
                            ) : null
                        }
                        {data && (
                            <div className="user">
                                <p>{data.name}</p>
                                <p>{data.blog}</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        )
    }
}

export default ScrollWrapper(HomePage);