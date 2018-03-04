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
            <div style={style.main_content}>
                <div>
                    <lable style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Name Table</lable>
                    <button className="btn btn-success" style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Add</button>
                </div>
                <hr style={{ opacity: 0.2, marginTop: 0 }} />
                <table style={style.table} className="display compact" width="100%" ref={el => this.el = el}></table>
            </div>
        )
    }
}

const style = {
    main_content: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        padding: 10,
        left: '18%',
        top: 120,
        width: '80%',
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