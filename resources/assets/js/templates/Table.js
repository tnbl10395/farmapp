import React, { Component } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';

var $ = require('jquery');
var dt = require('datatables.net');

export class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                data: this.props.dataSet,
                columns: this.props.columns,
            }
        )
    }

    render() {
        return (
            <div style={this.props.sideBar ? style.main_content_true : style.main_content_false} className="col-md-10">
                <div>
                    <lable style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{this.props.name} Table</lable>
                    {
                        this.props.name == "Data" ?
                            <div>
                                <button
                                    // onClick={() => this.props.change()}
                                    className="btn btn-success"
                                    style={{ position: 'absolute', right: 80, top: 5, fontSize: 12 }}>Export</button>
                                <button
                                    onClick={() => this.props.change()}
                                    className="btn btn-success"
                                    style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Chart</button>
                            </div>
                            :
                            <button
                                onClick={() => this.props.openModal(this.props.object) }
                                className="btn btn-success"
                                style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Add</button>
                    }
                </div>
                <hr style={{ opacity: 0.2, marginTop: 0 }} />
                <table style={style.table} className="display compact" width="100%" ref={el => this.el = el}></table>
            </div>
        )
    }
}

const style = {
    main_content_true: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        padding: 10,
        left: '15.5%',
        top: 120,
        // width: '83%',
        fontSize: 12,
        opacity: 0.8,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black"
    },
    main_content_false: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        padding: 10,
        left: '4%',
        top: 120,
        width: '95%',
        fontSize: 12,
        opacity: 0.8,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black"
    },
    table: {
        // tableLayout:'fixed',
        backgroundColor: '#4CAF50',
    },
}