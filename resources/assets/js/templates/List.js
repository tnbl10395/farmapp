import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const profile = JSON.parse(sessionStorage.getItem('profile'));

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            data: this.props.dataSet,
            itemsCountPerPage: 5,
            active: true,
            inactive: true,
            listSensors: this.props.listSensors
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.filterList = this.filterList.bind(this);
        this.selectActive = this.selectActive.bind(this);
        this.selectInactive = this.selectInactive.bind(this);
    }

    selectActive(e) {
        this.setState({ active: !this.state.active });
    }

    selectInactive(e) {
        this.setState({ inactive: !this.state.inactive })
    }

    filterList(e) {
        var updateList = this.props.dataSet;
        updateList = updateList.filter(item => {
            return JSON.stringify(item).toLowerCase().includes(e.target.value.toLowerCase())
        });
        this.setState({ data: updateList });
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
            <div style={style.main_content_true}>
                <style dangerouslySetInnerHTML={{
                    __html: [
                        '.item:hover {',
                        '  box-shadow: inset 2px 0 gray;',
                        '}',
                    ].join('\n')
                }}>
                </style>
                <div className="col-xs-12 col-sm-12 col-md-12" style={style.list}>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="col-xs-sm-6 col-sm-6 col-md-6" style={{ marginTop: 20 }}>
                            <label>
                                Show
                                <select value={this.state.itemsCountPerPage}
                                    style={style.selectNumberPageDisplay}
                                    className="input-sm"
                                    onChange={(event) => this.setState({ itemsCountPerPage: event.target.value })}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                entries
                            </label>
                        </div>
                        {
                            this.props.name == "Plant" && profile.role == '1'
                                ? null
                                : <button onClick={() => this.props.openModal(this.props.object, null)} className="btn btn-success pull-right" style={{ margin: 5, marginTop: 20 }}>
                                    <i className="fa fa-plus" /> New {this.props.name}
                                 </button>
                                // <div className="pull-right" style={{ margin: 5, marginTop: 20 }}>
                                //     <button
                                //         className="btn btn-success" style={{ marginRight: 10 }}><i className="fa fa-file-excel-o" style={{ marginRight: 5 }} />Export</button>
                                //     <button onClick={() => this.props.change()}
                                //         className="btn btn-success">
                                //         <i className="fa fa-bar-chart" style={{ marginRight: 5 }} /> Chart
                                //     </button>
                                // </div>

                        }

                        <div className="form-group has-feedback col-xs-7 col-sm-3 col-md-3 pull-right" style={style.search}>
                            <input type="text" className="form-control" placeholder="Search ..." onChange={this.filterList} />
                            <span className="form-control-feedback glyphicon glyphicon-search" style={{ marginRight: 10 }}></span>
                        </div>
                    </div>
                    {
                        this.state.data.length > 0
                            ? renderTable(
                                            this.props.name, 
                                            currentData, 
                                            this.props.openAlert, 
                                            this.props.openModal, 
                                            this.props.objectUpdate,
                                            this.state.listSensors,
                                            this.props.getOnePlant
                                        )
                            : <div style={style.item} className="col-xs-12 col-sm-12 col-md-12"><h3 style={{ textAlign: 'center' }}>No data</h3></div>

                    }
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="col-md-6">
                            <span>Showing {this.state.data.length == 0 ? '0' : '1'} to {this.state.itemsCountPerPage < this.state.data.length ? this.state.itemsCountPerPage : this.state.data.length} of {this.state.data.length} entries</span>
                        </div>
                        <div className="pull-right">
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
                </div>
                {/* <div className="col-xs-12 col-sm-12 col-md-2">
                    <div style={style.filter}>
                        <div className="form-group col-md-12">
                            <div className="form-check">
                                <label className="form-check-lable">
                                    <input type="checkbox" className="form-check-input-lg" style={style.checkbox} onChange={this.selectActive} defaultChecked={this.state.active} />
                                </label><span style={style.textCheckbox}> Active</span>
                            </div>
                            <div className="form-check">
                                <label className="form-check-lable">
                                    <input type="checkbox" className="form-check-input" style={style.checkbox} onChange={this.selectInactive} defaultChecked={this.state.inactive} />
                                </label><span style={style.textCheckbox}> Inactive</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

const renderTable = (name, currentData, openAlert, openModal, object, listSensors, getOnePlant) => {
    switch (name) {
        case 'Device':
            return <Device currentData={currentData}
                            openAlert={openAlert}
                            openModal={openModal}
                            object={object} 
                            listSensors={listSensors}/>
        // return device(currentData, openAlert, openModal, object);
        case 'User':
            return user(currentData, openAlert, openModal, object);
        case 'Data':
            return data(currentData, openAlert);
        case 'Plant':
            return <Plant currentData={currentData}
                            openAlert={openAlert}
                            openModal={openModal}
                            object={object} 
                            getOnePlant={getOnePlant}/>
    }
}
// Device-------------------------------------------------------------------------------------------------------------------------
class Device extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.currentData.map((element, index) => 
                        <ItemDevice key={index} element={element} 
                                    object={this.props.object} 
                                    openAlert={this.props.openAlert}
                                    openModal={this.props.openModal} 
                                    listSensors={this.props.listSensors[element.id]} />
                    )
                }
            </div>

        );
    }
}

class ItemDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDetail: false
        }
    }

    onClickToShowDetail() {
        this.setState({ isDetail: !this.state.isDetail })
    }

    render() {
        return (
            <div style={style.item} onClick={this.onClickToShowDetail.bind(this)} className="col-xs-12 col-sm-12 col-md-12 item">
                <div className="col-xs-1 col-sm-1 col-md-1">
                    <i className="fa fa-gears" style={style.picture} />
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2" style={style.text}><h5 style={{fontWeight: 'bold'}}>{this.props.element.name}</h5></div>
                <div className={profile.role == "1" ? "col-xs-2 col-sm-2 col-md-2": "col-xs-3 col-sm-3 col-md-3"}>
                    <h6>Code</h6>
                    {this.props.element.code}
                </div>
                <div className={profile.role == "1" ? "col-xs-2 col-sm-2 col-md-2": "col-xs-3 col-sm-3 col-md-3"}>
                    <h6>Manufacturing Date</h6>
                    {this.props.element.manufacturing_date}
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2">
                    {
                        this.props.element.isActive == 1 ?
                            <div className="col-md-8 label label-success" style={style.status}>Active</div>
                            :
                            <div className="col-md-8 label label-primary" style={style.status}>Inactive</div>
                    }
                </div>
                {
                    profile.role == "0" ?
                        null
                        :
                        <div className="col-xs-2 col-sm-2 col-md-2">
                            {
                                this.props.element.status == 1 ?
                                    <div>
                                        <h6>Owner</h6>
                                        {this.props.element.username}
                                    </div>
                                    :
                                    <div>
                                        <h6>No owner</h6>
                                    </div>
                            }
                        </div>
                }
                <div className="col-xs-1 col-sm-1 col-md-1" style={style.button}>
                    {profile.role == '0' ? null : <a onClick={() => this.props.openModal(this.props.object, this.props.element)} style={style.edit} className="fa fa-edit"></a>}
                    <a onClick={() => this.props.openAlert('DELETE_DEVICE', this.props.element.id)} style={style.delete} className="fa fa-remove"></a>
                </div>
                {this.state.isDetail ? 
                    <div className="col-md-12">
                        <hr/>
                        <h5>Sensors in {this.props.element.name}</h5>
                        {this.props.listSensors != null && profile.role == "1" ? <button className="btn btn-success col-md-offset-11" onClick={() => this.props.openModal(objectSensorAdd, null)}>New One</button> : null}
                        <div className="row" style={{padding: 0, overflowX: 'auto', whiteSpace: 'nowrap'}}>
                            {
                                this.props.listSensors != null ?
                                this.props.listSensors.map((element, index) => {
                                    return <div key={index}  className="col-md-4" style={{padding: 0, float: 'none', display: 'inline-block'}}>
                                        <ItemSensor element={element}/>
                                    </div>
                                })
                                : <div className="text-center" style={{border: '1px solid gray', marginBottom: 3}}>
                                    <h5>This device doesn't have information about sensors</h5>
                                    {profile.role == "1" ? <button className="btn btn-success" style={{ marginBottom: 20 }} onClick={() => this.props.openModal(objectSensorAdd, null)}>New One</button> : null}
                                </div>
                            }
                        </div>
                    </div> 
                    : null
                }
            </div>
        );
    }
}

var objectSensorAdd = {
    title: "ADD SENSOR",
    property: [
        { name: "Name", placeholder: 'Please input name' },
        { name: "Description", placeholder: 'Please input description' },
    ]
};

var objectSensorUpdate = {
    title: "UPDATE SENSOR",
    property: [
        { name: "Name", placeholder: 'Please input name' },
        { name: "Description", placeholder: 'Please input description' },
    ]
};

class ItemSensor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styleItemSensor.body} onClick={()=> alert('ok')}>
                <img src={'data:image/png;base64,' + this.props.element.picture} className="col-md-5" style={styleItemSensor.image}/>
                <div className="col-md-7" style={{ padding:0 }}>
                    <div className="col-md-12">{profile == "1" ? <a className="pull-right">x</a> : null}</div>
                    <div className="col-md-12">
                        <span style={{ fontWeight: 'bold'}}>Name: </span> {this.props.element.sensorName}
                    </div>
                    <div className="col-md-12">
                        <span style={{ fontWeight: 'bold'}}>Manufacturing Date: </span> {this.props.element.manufacturing_date}
                    </div>
                    <div className="col-md-12">
                        <span style={{ fontWeight: 'bold'}}>Made In: </span> {this.props.element.madeIn}
                    </div>
                    <div className="col-md-12">
                        <span style={{ fontWeight: 'bold'}}>Code: </span> {this.props.element.code}
                    </div>
                    {/* <div className="col-md-12" style={{ height: '100%', overflow: 'auto' }}>
                        <span style={{ fontWeight: 'bold'}}>Specification: </span> {this.props.element.specification}
                    </div> */}
                </div>
            </div>
        );
    }
}

const styleItemSensor = {
    body: {
        padding: 5,
        height: 150,
        border: '1px solid gray',
        margin: 3,
    },
    image: {
        padding: 0,
        objectFit: 'cover',
        height: '100%'
    }
}
// User-------------------------------------------------------------------------------------------------------------------------
const user = (currentData, openAlert, openModal, object) => (
    currentData.map((element, index) =>
        <div key={index} style={style.item} className="col-xs-12 col-sm-12 col-md-12 item">
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
                <a onClick={() => openModal(object, element)} style={style.edit} className="fa fa-edit"></a>
                {
                    profile.id === element.id && element.role == '1' ? null : <a onClick={() => openAlert('DELETE_USER', element.id)} style={style.delete} className="fa fa-remove"></a>
                }
            </div>
        </div>
    )
)
// Data-------------------------------------------------------------------------------------------------------------------------
const data = (currentData, openAlert) => (
    currentData.map((element, index) =>
        <div key={index} style={style.item} className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-xs-1 col-sm-1 col-md-1" style={style.text}>
                {/* <h6>Device</h6> */}
                <p>{element.name}</p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3" style={style.text}>
                <h6 style={style.title}>Humidity</h6>
                <p><i className="fa fa-tint" style={style.icon_humidity} />{element.humidity} %</p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3" style={style.text}>
                <h6 style={style.title}>Temperature</h6>
                <p><i className="fa fa-thermometer-empty" style={style.icon_temperature} />{element.temperature} °C</p>
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
// Plant-------------------------------------------------------------------------------------------------------------------------
class Plant extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                {
                    this.props.currentData.map((element, index) =>
                        <ItemPlant key={index} 
                                   element={element} 
                                   object={this.props.object} 
                                   openModal={this.props.openModal}
                                   openAlert={this.props.openAlert} 
                                   getOnePlant={this.props.getOnePlant}/>
                    )
                }
            </div>
        );
    }
}

class ItemPlant extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.item} className="col-xs-12 col-sm-12 col-md-12 item">
                <div className="col-xs-2 col-sm-2 col-md-2">
                    {
                        this.props.element.picture == null 
                            ? <img src="images/leaf.jpg" style={stylePlant.image} />
                            : <img src={this.props.element.picture} style={stylePlant.image} />
                    }
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2" style={stylePlant.name}><h5>{this.props.element.name}</h5></div>
                <div className="col-xs-2 col-sm-2 col-md-2" style={stylePlant.totalPhase}>
                    <span style={stylePlant.textTotalPhase}>Total Phase: </span> {this.props.element.totalPhases}
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2" style={stylePlant.totalPhase}>
                    <span style={stylePlant.textTotalPhase}>Total Days: </span> {this.props.element.totalDays}
                </div>
                {
                    profile.role == '1'
                        ? <div className="col-xs-2 col-sm-2 col-md-2" style={stylePlant.totalPhase}>
                            <span style={stylePlant.textTotalPhase}>Owner: </span> {this.props.element.username}
                        </div>
                        : <div className="col-xs-2 col-sm-2 col-md-2"></div>
                }
                {
                    profile.role == '1' 
                        ? <div className="col-xs-1 col-sm-1 col-md-1" style={style.button}>
                            <a onClick={() => this.props.getOnePlant(this.props.element.id)} style={style.info} className="fa fa-info"></a>
                        </div>
                        : <div className="col-xs-1 col-sm-1 col-md-1" style={style.button}>
                            <a onClick={() => this.props.getOnePlant(this.props.element.id)} style={style.edit} className="fa fa-edit"></a>
                            <a onClick={() => this.props.openAlert('DELETE_DATA', this.props.element.id)} style={style.delete} className="fa fa-remove"></a>
                        </div>
                }
            </div>
        );
    }
    
}

const stylePlant = {
    image: {
        marginTop: 5,
        marginBottom: 5,
        width: 100,
        height: 48,
        objectFit: 'cover'
    },
    name: {
        fontWeight: 'bold',
        marginTop: 6,
    },
    totalPhase: {
        marginTop: 15,
    },
    textTotalPhase: {
        fontWeight: 'bold',
    }
}
//-------------------------------------------------------------------------------------------------------------------------
const style = {
    main_content_true: {
        position: 'absolute',
        top: 45,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
    },
    list: {
        backgroundColor: '#fff',
        borderRadius: 5,
        position: 'relative',
        overflowY: 'auto',
        height: '100%',
    },
    item: {
        border: '1px solid gray',
        borderRadius: 5,
        margin: 2,
        cursor: 'pointer'
    },
    filter: {
        backgroundColor: '#ecf0f5',
        borderRadius: 5,
        marginTop: 65,
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
        marginTop: 20
    },
    text: {
        fontSize: 11,
        fontFamily: "Helvetica",
        marginTop: 10,
        fontWeight: 'bold'
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
    info: {
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 9,
        paddingLeft: 9,
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
        margin: 5
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