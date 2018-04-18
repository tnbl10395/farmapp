import { connect } from 'react-redux';
import Dashboard2Component from '../components/Dashboard2Component';
import { getDetailInformationDeviceApi, getNotificationApi } from '../api/api';
import { getDetailInformationDevice, getNotification } from '../actions/Action';

const mapStateToProps = (state) => ({
    all_devices: state.all_devices,
    deviceFirst: state.deviceFirst,
    dashboardDevice: state.dashboardDevice,
    dashboardPlant: state.dashboardPlant,
    dashboardPhases: state.dashboardPhases,
    dashboardSolutions: state.dashboardSolutions,
    dashboardTotalDaysOfPhases: state.dashboardTotalDaysOfPhases,
    notificationData: state.notificationData,
});

const mapDispatchToProps = (dispatch) => ({
    getDetailInformationDevice: (deviceId) => {
        getDetailInformationDeviceApi(dispatch, getDetailInformationDevice, deviceId);
    },
    getNotification: (deviceId) => {
        getNotificationApi(dispatch, getNotification, deviceId);
    }
});

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard2Component);