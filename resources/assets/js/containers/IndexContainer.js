import { connect } from 'react-redux';
import Index from '../components/Index';
import { getDeviceOfUserAPI } from '../api/api';
import { getDeviceOfUser } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
});
const mapDispatchToProps = (dispatch) => ({
    // getDataDevices: () => {
    //     getDataDevicesAPI(dispatch,getDataDevices);
    // },
    getDevicesOfUser: () => {
        getDeviceOfUserAPI(dispatch,getDeviceOfUser);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);