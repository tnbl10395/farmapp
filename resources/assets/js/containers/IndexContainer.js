import { connect } from 'react-redux';
import Index from '../components/Index';
import { getDeviceOfUserAPI, getRealChartBasedOnHourAPI } from '../api/api';
import { getDeviceOfUser, getRealChartBasedOnHour } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    checkInterval: state.checkInterval,
    device: state.select_device
});
const mapDispatchToProps = (dispatch) => ({
    getDevicesOfUser: () => {
        getDeviceOfUserAPI(dispatch,getDeviceOfUser);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);