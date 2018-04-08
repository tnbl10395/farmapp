import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';
import { getRealChartBasedOnDayAPI, getRealChartBasedOnHourAPI, getOneDeviceAPI, getCurrentDataApi, getOneLocationAPI, getRealChartDashboardBasedOnDayAPI, getRealChartDashboardBasedOnHourAPI,  } from '../api/api';
import { getRealChartBasedOnDay, getRealChartBasedOnHour, getOneDevice, getCurrentData, getOneLocation, changeIntervalDashboard,  } from '../actions/Action';

const mapStateToProps = (state) => ({
    humidity: state.humidity_chart,
    temperature: state.temperature_chart,
    all_devices: state.all_devices,
    device: state.select_device,
    name: state.nameDevice,
    code: state.codeDevice,
    currentHumidity: state.currentHumidity,
    currentTemperature: state.currentTemperature,
    latitude: state.latitude,
    longitude: state.longitude,
    interval: state.intervalDashBoard,
    intervalTime: state.intervalTime
});

const mapDispatchToProps = (dispatch) => ({
    getRealDataOnChart: (device, interval) => {
        if (interval) {
            getRealChartBasedOnDayAPI(dispatch, getRealChartBasedOnDay, device);
        } else {
            getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, device);
        }
    },
    getOneDevice: (id) => {
        getOneDeviceAPI(dispatch, getOneDevice, id);
    },
    getCurrentData: (id, interval) => {
        getCurrentDataApi(dispatch, getCurrentData, id, interval);
    },
    getOneLocation: (id) => {
        getOneLocationAPI(dispatch, getOneLocation, id);
    },
    changeInterval: (interval, device) => {
        if (interval) {
            getRealChartDashboardBasedOnDayAPI(dispatch, changeIntervalDashboard, device, interval);
        }else {
            getRealChartDashboardBasedOnHourAPI(dispatch, changeIntervalDashboard, device, interval);
        }
    }
});

export default connect (mapStateToProps, mapDispatchToProps) (DashboardComponent);