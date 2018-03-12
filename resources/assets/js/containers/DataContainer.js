import { connect } from 'react-redux';
import DataComponent from '../components/DataComponent';
import { getDataValuesAPI, getRealChartBasedOnHourAPI, getOldChartBasedOnHourAPI, getOldChartBasedOnDayAPI } from '../api/api';
import { getDataValues, changeDisplayDataScreen, getRealChartBasedOnHour, getOldChartBasedOnHour, changeInterval, getOldChartBasedOnDay } from '../actions/Action';

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
    getOldDataOnChart: (device, date, interval, time) => {
        if (interval) {
            getOldChartBasedOnDayAPI(dispatch, getOldChartBasedOnDay, device, date, time);
        } else {
            getOldChartBasedOnHourAPI(dispatch, getOldChartBasedOnHour, device, date, time);
        }
    },
    changeDisplayDataScreen: () => {
        dispatch(changeDisplayDataScreen());
    },
    changeInterval: (option) => {
        dispatch(changeInterval(option));
    },
    getRealDataOnChart: (device, interval) => {
        // console.log(device)
        if (interval) {
        }else{
            getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, device);
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);