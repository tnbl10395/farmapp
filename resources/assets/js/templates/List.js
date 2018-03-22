import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            data: this.props.dataSet,
            itemsCountPerPage: 10
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    render() {

        const { data, activePage, itemsCountPerPage } = this.state;
        const indexOfLastTodo = activePage * itemsCountPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsCountPerPage;
        const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <div style={this.props.sideBar ? style.main_content_true : style.main_content_false} className="col-md-10">
                <div className="col-xs-12 col-sm-12 col-md-10" style={style.list}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="form-group has-feedback has-feedback-left col-md-2" style={style.search}>
                                <input type="text" className="form-control" placeholder="Search ..." />
                                <span className="form-control-feedback glyphicon glyphicon-search" style={{ marginRight: 10 }}></span>
                            </div>
                            <button onClick={() => this.props.openModal(this.props.object)} className="btn btn-success" style={{ margin: 5 }}>
                                <i className="fa fa-plus" /> New {this.props.name}
                            </button>
                        </div>
                    </div>
                    {
                        renderTable(this.props.name, currentData)
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
                    <div style={style.filter}></div>
                </div>
            </div>
        )
    }
}

const renderTable = (name, currentData) => {
    switch (name) {
        case 'Device':
            return device(currentData);
        case 'User':
            return user(currentData);
    }
}

const device = (currentData) => (
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
                <a style={style.edit} className="fa fa-edit"></a>
                <a style={style.delete} className="fa fa-remove"></a>
            </div>
        </div>
    )
)

const user = (currentData) => (
    currentData.map((element, index) =>
        <div key={index} style={style.item} className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-xs-1 col-sm-1 col-md-1">
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
                <a style={style.delete} className="fa fa-remove"></a>
            </div>
        </div>
    )
)

const style = {
    main_content_true: {
        color: 'black',
        backgroundColor: 'black',
        position: 'absolute',
        left: '15.5%',
        top: 80,
        // width: '83%',
        fontSize: 12,
        opacity: 0.7,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black"
    },
    main_content_false: {
        color: 'black',
        backgroundColor: 'black',
        position: 'absolute',
        padding: 10,
        left: '4%',
        top: 80,
        width: '95%',
        fontSize: 12,
        opacity: 0.7,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black"
    },
    list: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        display: 'inline-block'
    },
    item: {
        border: '2px solid gray',
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 2,
    },
    filter: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        height: 200,
    },
    avatar: {
        width: 70,
        height: 70,
        marginTop: 5,
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
        margin: 5
    },
    text: {
        fontSize: 15,
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
    }
}