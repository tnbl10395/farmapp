import { connect } from 'react-redux';
import DataComponent from '../components/DataComponent';
import { getDataValuesAPI, getRealChartBasedOnHourAPI, getOldChartBasedOnHourAPI } from '../api/api';
import { getDataValues, changeDisplayDataScreen, getRealChartBasedOnHour, getOldChartBasedOnHour } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_values,
    table: state.table,
    device: state.select_device,
    date: state.select_date,
    humidity: state.humidity_chart,
    temperature: state.temperature_chart,
    all_devices: state.all_devices
});
const mapDispatchToProps = (dispatch) => ({
    getDataValuesonTable: () => {
        getDataValuesAPI(dispatch, getDataValues);
    },
    getRealDataOnChart: (device, date) => {
        getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, device, date);
    },
    getOldDataOnChart: (device, date) => {
        getOldChartBasedOnHourAPI(dispatch, getOldChartBasedOnHour, device, date);
    },
    changeDisplayDataScreen: () => {
        dispatch(changeDisplayDataScreen());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);