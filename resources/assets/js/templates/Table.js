import React, { Component } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'font-awesome/css/font-awesome.css';

var $ = require('jquery');
var dt = require('datatables.net');

export class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentWillUnmount() {
    //     this.$el.DataTable.destroy(true);
    // }

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
            <div style={this.props.sideBar?style.main_content_true:style.main_content_false}>
                <div>
                    <lable style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Name Table</lable>
                    {
                        this.props.name=="data"?
                        <button className="btn btn-success" style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Export</button>
                        :
                        <button className="btn btn-success" style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Add</button>
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
        left: '16%',
        top: 120,
        width: '83%',
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
        backgroundColor: '#4CAF50',
    },
}