import { connect } from 'react-redux';
import Dashboard2Component from '../components/Dashboard2Component';
import { getDetailInformationDeviceApi } from '../api/api';
import { getDetailInformationDevice } from '../actions/Action';

const mapStateToProps = (state) => ({
    all_devices: state.all_devices,
    deviceFirst: state.deviceFirst,
    dashboardDevice: state.dashboardDevice,
    dashboardPlant: state.dashboardPlant,
    dashboardPhases: state.dashboardPhases,
    dashboardSolutions: state.dashboardSolutions,
});

const mapDispatchToProps = (dispatch) => ({
    getDetailInformationDevice: (deviceId) => {
        getDetailInformationDeviceApi(dispatch, getDetailInformationDevice, deviceId);
    }
});

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard2Component);