import { connect } from 'react-redux';
import Dashboard2Component from '../components/Dashboard2Component';
import { getDetailInformationDeviceApi, getNotificationApi, getRealChartBasedOnDayAPI, getRealChartBasedOnHourAPI, getAlldevicesActiveApi, getListNotificationApi, submitNewPlantIntoDeviceApi, getDeviceOfUserAPI } from '../api/api';
import { getDetailInformationDevice, getNotification, getRealChartBasedOnDay, getRealChartBasedOnHour, chooseOptionListDevice, getAlldevicesActive, getListNotification, submitAddPlantIntoDevice, getDeviceOfUser } from '../actions/Action';

const mapStateToProps = (state) => ({
    all_devices: state.all_devices,
    deviceFirst: state.deviceFirst,
    dashboardDevice: state.dashboardDevice,
    dashboardPlant: state.dashboardPlant,
    dashboardPhases: state.dashboardPhases,
    dashboardSolutions: state.dashboardSolutions,
    dashboardTotalDaysOfPhases: state.dashboardTotalDaysOfPhases,
    dashboardDevicesActive: state.dashboardDevicesActive,
    dashboardStartDate: state.dashboardStartDate,
    dashboardEndDate: state.dashboardEndDate,
    dashboardTotalPhases: state.dashboardTotalPhases,
    dashboardPicture: state.dashboardPicture,
    dashboardNow: state.dashboardNow,
    //notification
    notificationData: state.notificationData,
    notificationSolution: state.notificationSolution,
    notificationDeviceId: state.notificationDeviceId,
    notificationMessage: state.notificationMessage,
    notificationDatetime: state.notificationDatetime,
    notificationList: state.notificationList,
    //chart
    humidity: state.humidity_chart,
    temperature: state.temperature_chart,
    intervalTime: state.intervalTime,
    interval: state.intervalDashBoard,
    device: state.select_device,
    //type of showing devices
    showDevicesByList: state.showDevicesByList,
    showDevicesByMap: state.showDevicesByMap,
    showDevicesByGrid: state.showDevicesByGrid,
    //plant
    plantsOfUser: state.plantsOfUser
});

const mapDispatchToProps = (dispatch) => ({
    getDetailInformationDevice: (deviceId) => {
        getDetailInformationDeviceApi(dispatch, getDetailInformationDevice, deviceId);
    },
    getNotification: (deviceId) => {
        getNotificationApi(dispatch, getNotification, deviceId);
    },
    getRealDataOnChart: (device, interval) => {
        if (interval) {
            getRealChartBasedOnDayAPI(dispatch, getRealChartBasedOnDay, device);
        } else {
            getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, device);
        }
    },
    chooseOptionShowDevices: (message) => {
        dispatch( chooseOptionListDevice(message) );
    },
    getListNotification: () => {
        getListNotificationApi(dispatch, getListNotification);
    },
    submitAddNewPlant: (code, plant, startDate, phase) => {
        submitNewPlantIntoDeviceApi(
            dispatch, 
            getDetailInformationDeviceApi, 
            getDetailInformationDevice,
            getListNotificationApi,
            getListNotification,
            getDeviceOfUserAPI,
            getDeviceOfUser,
            getAlldevicesActiveApi,
            getAlldevicesActive, 
            {
                code: code,
                plant: plant,
                startDate: startDate,
                phase: phase
            }
        )
    }
});

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard2Component);