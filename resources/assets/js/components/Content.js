import React, { Component } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'font-awesome/css/font-awesome.css';

var $ = require('jquery');
var dt = require('datatables.net');
var LineChart = require('react-chartjs').Line;

var w = window.innerWidth;
var h = window.innerHeight;

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={style.content}>
                </div>
                <div style={style.breadcrumb}>
                    <a style={style.tag_a}>Home</a> > Table
                </div>
                <Table />
                {/* <Chart /> */}
            </div>
        )
    }
}

var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(39, 174, 96,0.2)",
            strokeColor: "green",
            pointColor: "green",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "green",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(52, 152, 219,0.2)",
            strokeColor: "blue",
            pointColor: "blue",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "blue",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

var chartOptions = {
    scaleFontColor: "black",
    scaleShowGridLines: false,
    scaleGridLineColor: "black",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    offsetGridLines: false,
    responsive: true,
    // maintainAspectRatio: false,
};

class Chart extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={style.main_content} className="col-md-12 col-sm-12 col-12">
                <LineChart data={chartData} options={chartOptions} style={style.chart} height="100%" />
            </div>
        )
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.$el.DataTable.destroy(true);
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                data: dataSet,
                columns: [
                    { title: "Name" },
                    { title: "Position" },
                    { title: "Office" },
                    { title: "Extn" },
                    { title: "Start date" },
                    { title: "Action" }
                ]
            }
        )
    }

    render() {
        return (
            <div style={style.main_content}>
                <div>
                    <lable style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Name Table</lable>
                    <button className="btn btn-success" style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Add</button>
                </div>
                <hr style={{ opacity: 0.2, marginTop: 0 }} />
                <table style={style.table} className="display compact" cellspacing="0" width="100%" ref={el => this.el = el}></table>
            </div>
        )
    }
}

var style = {
    content: {
        // backgroundColor: 'gray',
        position: 'fixed',
        left: 200,
        width: '100%',
        height: '100%',
        top: 60,
        opacity: 0.7
    },
    breadcrumb: {
        position: 'absolute',
        // right: '100%',
        right: 40,
        top: 80,
        color: 'white',
        fontSize: 20,
    },
    tag_a: {
        cursor: 'pointer',
        fontSize: 20,
        color: 'green',
        textDecoration: 'none',
        fontWeight: 800

    },
    main_content: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        // right: w * 0.02,
        padding: 10,
        left: '18%',
        top: 120,
        width: '80%',
        fontSize: 12,
        opacity: 0.8,
        borderRadius: 5,
        fontWeight: 'bold',
        // webkitBoxShadow: "1px 3px 1px #9E9E9E",
        // mozBoxShadow: "1px 3px 1px #9E9E9E",
        boxShadow: "1px 7px 3px black"
    },
    table: {
        backgroundColor: '#4CAF50',
    },
    chart: {
        padding: 20,
    }

}

var edit = '<a href="" style="border-radius: 5px; padding: 5px 5px 5px 6px; background-color:#3498db; color:#fff;margin-right:10px;" class="fa fa-edit"></a>';
var remove = '<a href="" style="border-radius: 5px; padding: 5px 7px 5px 7px; background-color:#e74c3c; color:#fff" class="fa fa-remove"></a>';
var action = '<div style="text-align: center">' + edit + remove + '</div>';

var dataSet = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", action],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", action],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", action],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", action],
    ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", action],
    ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", action],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", action],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", action],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", action],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", action],
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", action],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", action],
    ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", action],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", action],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", action],
    ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", action],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", action],
    ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", action],
    ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", action],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", action],
    ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", action],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", action],
    ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", action],
    ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", action],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", action],
    ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", action],
    ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", action],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", action],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", action],
    ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", action],
    ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", action],
    ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
    ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", action],
    ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", action],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", action],
    ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", action]
];