import { connect } from 'react-redux';
import DevicesComponent from '../components/DevicesComponent';
import { chooseOptionSidebar, getDataDevices } from "../actions/Action";
import { getDataDevicesAPI } from '../api/api';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_devices
});
const mapDispatchToProps = (dispatch) => ({
    getDataDevices: () => {
        getDataDevicesAPI(dispatch,getDataDevices);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(DevicesComponent);