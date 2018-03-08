import React, { Component } from 'react';
import { Table } from "../templates/Table";

export default class DevicesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table dataSet={dataSet} columns={columns} sideBar={this.props.sideBar}/>
        );
    }
}

var edit = '<a href="" style="border-radius: 5px; padding: 5px 5px 5px 6px; background-color:#3498db; color:#fff;margin-right:10px;" class="fa fa-edit"></a>';
var remove = '<a href="" style="border-radius: 5px; padding: 5px 7px 5px 7px; background-color:#e74c3c; color:#fff" class="fa fa-remove"></a>';
var action = '<div style="text-align: center">' + edit + remove + '</div>';

var columns = [
    { title: "Name" },
    { title: "Position" },
    { title: "Office" },
    { title: "Extn" },
    { title: "Start date" },
    { title: "Action" }
];

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