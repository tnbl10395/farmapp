import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';
import { getRealChartBasedOnDayAPI, getRealChartBasedOnHourAPI, getOneDeviceAPI, getCurrentDataApi, getOneLocationAPI,  } from '../api/api';
import { getRealChartBasedOnDay, getRealChartBasedOnHour, getOneDevice, getCurrentData, getOneLocation,  } from '../actions/Action';

const mapStateToProps = (state) => ({
    checkInterval: state.checkInterval,
    humidity: state.humidity_chart,
    temperature: state.temperature_chart,
    all_devices: state.all_devices,
    device: state.select_device,
    name: state.nameDevice,
    code: state.codeDevice,
    currentHumidity: state.currentHumidity,
    currentTemperature: state.currentTemperature,
    latitude: state.latitude,
    longitude: state.longitude
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
    getCurrentData: (id) => {
        getCurrentDataApi(dispatch, getCurrentData, id);
    },
    getOneLocation: (id) => {
        getOneLocationAPI(dispatch, getOneLocation, id);
    }
});

export default connect (mapStateToProps, mapDispatchToProps) (DashboardComponent);