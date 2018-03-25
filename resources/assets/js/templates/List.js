import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            data: this.props.dataSet,
            itemsCountPerPage: 5
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps, () => {
            this.setState({
                data: nextProps.dataSet
            })
        });
    }

    render() {

        const { data, activePage, itemsCountPerPage } = this.state;
        const indexOfLastTodo = activePage * itemsCountPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsCountPerPage;
        const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <div style={this.props.sideBar ? style.main_content_true : style.main_content_false}>
                <div className="col-xs-12 col-sm-12 col-md-10" style={style.list}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            {
                                this.props.name == "Data"
                                    ? <div className="pull-right" style={{ margin: 5 }}>
                                        <button
                                            // onClick={() => this.props.change()}
                                            className="btn btn-success" style={{ marginRight: 10 }}><i className="fa fa-file-excel-o" style={{ marginRight: 5 }} />Export</button>
                                        <button
                                            onClick={() => this.props.change()}
                                            className="btn btn-success"><i className="fa fa-bar-chart" style={{ marginRight: 5 }} /> Chart</button>
                                    </div>
                                    : <button onClick={() => this.props.openModal(this.props.object)} className="btn btn-success pull-right" style={{ margin: 5 }}>
                                        <i className="fa fa-plus" /> New {this.props.name}
                                    </button>
                            }

                            <div className="form-group has-feedback col-xs-3 col-sm-3 col-md-2 pull-right" style={style.search}>
                                <input type="text" className="form-control" placeholder="Search ..." />
                                <span className="form-control-feedback glyphicon glyphicon-search" style={{ marginRight: 10 }}></span>
                            </div>
                        </div>
                    </div>
                    {
                        renderTable(this.props.name, currentData, this.props.openAlert)
                    }
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <Pagination
                            prevPageText='prev'
                            nextPageText='next'
                            firstPageText='first'
                            lastPageText='last'
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.data.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-2">
                    <div style={style.filter}>
                        <div className="form-group col-md-12">
                            <select value={this.state.itemsCountPerPage}
                                style={style.selectNumberPageDisplay}
                                className="form-control"
                                onChange={(event) => this.setState({ itemsCountPerPage: event.target.value })}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        <div className="form-group col-md-12">
                            <div className="form-check">
                                <label className="form-check-lable">
                                    <input type="checkbox" className="form-check-input-lg" style={style.checkbox} />
                                </label><span style={style.textCheckbox}> Active</span>
                            </div>
                            <div className="form-check">
                                <label className="form-check-lable">
                                    <input type="checkbox" className="form-check-input" style={style.checkbox} />
                                </label><span style={style.textCheckbox}> Inactive</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const renderTable = (name, currentData, openAlert) => {
    switch (name) {
        case 'Device':
            return device(currentData, openAlert);
        case 'User':
            return user(currentData, openAlert);
        case 'Data':
            return data(currentData, openAlert);
    }
}

const device = (currentData, openAlert) => (
    currentData.map((element, index) =>
        <div key={index} style={style.item} className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-xs-1 col-sm-1 col-md-1">
                <i className="fa fa-gears" style={style.picture} />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2" style={style.text}>{element.name}</div>
            <div className="col-xs-3 col-sm-3 col-md-3">
                <h6>Code</h6>
                {element.code}
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3">
                <h6>Manufacturing Date</h6>
                {element.manufacturing_date}
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2">
                {
                    element.status == 1 ?
                        <div className="col-md-8 label label-success" style={style.status}>Active</div>
                        :
                        <div className="col-md-8 label label-primary" style={style.status}>Inactive</div>
                }
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1" style={style.button}>
                <Link to={'device/'+element.id} style={style.edit} className="fa fa-edit"></Link>
                <a onClick={() => openAlert('DELETE_DEVICE', element.id)} style={style.delete} className="fa fa-remove"></a>
            </div>
        </div>
    )
)

const user = (currentData, openAlert) => (
    currentData.map((element, index) =>
        <div key={index} style={style.item} className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-xs-1 col-sm-1 col-md-1" style={{ display: 'flex', alignItems: 'center', height: 70 }}>
                <img src="/images/avatar.png" style={style.avatar} />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2" style={style.text}>
                <h6>Username</h6>
                <p>{element.username}</p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3" style={style.text}>
                <h6>Fullname</h6>
                <p>{element.fullname}</p>
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5" style={style.text}>
                <strong>Phone:</strong> {element.phone}
                <p>{element.address}</p>
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1" style={style.button}>
                <a style={style.edit} className="fa fa-edit"></a>
                <a onClick={() => openAlert('DELETE_USER', element.id)} style={style.delete} className="fa fa-remove"></a>
            </div>
        </div>
    )
)

const data = (currentData, openAlert) => (
    currentData.map((element, index) =>
        <div key={index} style={style.item} className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-xs-1 col-sm-1 col-md-1" style={style.text}>
                {/* <h6>Device</h6> */}
                <p>{element.name}</p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3" style={style.text}>
                <h6 style={style.title}>Humidity</h6>
                <p><i className="fa fa-tint" style={style.icon_humidity}/>{element.humidity} %</p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3" style={style.text}>
                <h6 style={style.title}>Temperature</h6>
                <p><i className="fa fa-thermometer-empty" style={style.icon_temperature}/>{element.temperature} °C</p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3" style={style.text}>
                <h6 style={style.title}>Date</h6>
                <p>{element.updated_at}</p>
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1" style={style.button}>
                <a onClick={() => openAlert('DELETE_DATA', element.id)} style={style.delete} className="fa fa-remove"></a>
            </div>
        </div>
    )
)

const style = {
    main_content_true: {
        color: 'black',
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        top: 50,
        right: 10,
        // width: '83%',
        fontSize: 12,
        // opacity: 0.7,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "0.5px 5px 3px grey",
        borderTop: '4px #2ab27b solid'
    },
    main_content_false: {
        color: 'black',
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        top: 50,
        right: 10,
        // width: '95%',
        fontSize: 12,
        // opacity: 0.7,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "0.5px 5px 3px grey",
        borderTop: '4px #2ab27b solid'
    },
    list: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        // display: 'inline-block'
    },
    item: {
        border: '2px solid gray',
        backgroundColor: '#ecf0f5',
        borderRadius: 5,
        margin: 2,
    },
    filter: {
        backgroundColor: '#ecf0f5',
        borderRadius: 5,
        marginTop: 10,
        height: 200,
    },
    avatar: {
        width: 35,
        height: 35,
        // marginTop: 20,
        borderRadius: 100
    },
    picture: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#4B77BE',
        color: 'white',
        fontSize: 15,
        borderRadius: 100
    },
    search: {
        margin: 5,
    },
    text: {
        fontSize: 11,
        fontFamily: "Helvetica",
        marginTop: 10,
    },
    status: {
        fontSize: '1vw',
        marginTop: 10
    },
    button: {
        marginTop: 10,
        display: 'flex',
        textAlign: 'center'
    },
    edit: {
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 7,
        paddingLeft: 7,
        backgroundColor: '#3498db',
        color: '#fff',
        marginRight: 5,
        cursor: 'pointer'
    },
    delete: {
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 8,
        paddingLeft: 8,
        backgroundColor: '#e74c3c',
        color: '#fff',
        cursor: 'pointer'
    },
    checkbox: {
        width: 18,
        height: 18
    },
    selectNumberPageDisplay: {
        marginTop: 5
    },
    textCheckbox: {
        fontSize: 12,
        color: '#777',
    },
    icon_humidity: {
        fontSize: 15,
        marginRight: 10,
        color: '#0984e3'
    },
    icon_temperature: {
        fontSize: 15,
        marginRight: 10,
        color: '#ff7675'
    },
    title: {
        color: '#777',
    }
}