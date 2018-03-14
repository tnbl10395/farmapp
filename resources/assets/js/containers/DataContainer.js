import { connect } from 'react-redux';
import DataComponent from '../components/DataComponent';
import {
    getDataValuesAPI,
    getRealChartBasedOnHourAPI,
    getOldChartBasedOnHourAPI,
    etOldChartBasedOnDayAPI,
    getRealChartBasedOnDayAPI,
    getRealChartWithIntervalAPI,
    getOldChartWithIntervalAPI,
    getOldChartBasedOnDayAPI
} from '../api/api';
import {
    getDataValues,
    changeDisplayDataScreen,
    getRealChartBasedOnHour,
    getOldChartBasedOnHour,
    changeInterval,
    getOldChartBasedOnDay,
    getRealChartBasedOnDay
} from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_values,
    table: state.table,
    device: state.select_device,
    date: state.select_date,
    humidity: state.humidity_chart,
    temperature: state.temperature_chart,
    all_devices: state.all_devices,
    checkInterval: state.checkInterval,
    interval: state.interval
});
const mapDispatchToProps = (dispatch) => ({
    getDataValuesonTable: () => {
        getDataValuesAPI(dispatch, getDataValues);
    },
    changeDisplayDataScreen: () => {
        dispatch(changeDisplayDataScreen());
    },
    changeInterval: (option, device, date, subDate) => {
        var time = new Date();
        if (time.toDateString() == date.toDateString()) {
            getRealChartWithIntervalAPI(dispatch, changeInterval, device, date, subDate, option);
        } else {
            getOldChartWithIntervalAPI(dispatch, changeInterval, device, date, subDate, option);
        }
    },
    getOldDataOnChart: (device, date, interval, time) => {
        if (interval) {
            getOldChartBasedOnDayAPI(dispatch, getOldChartBasedOnDay, device, date, time);
        } else {
            getOldChartBasedOnHourAPI(dispatch, getOldChartBasedOnHour, device, date, time);
        }
    },
    getRealDataOnChart: (device, interval) => {
        if (interval) {
            getRealChartBasedOnDayAPI(dispatch, getRealChartBasedOnDay, device);
        } else {
            getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, device);
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);