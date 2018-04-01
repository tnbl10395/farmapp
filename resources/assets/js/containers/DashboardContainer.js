import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';
import { getRealChartBasedOnDayAPI, getRealChartBasedOnHourAPI } from '../api/api';
import { getRealChartBasedOnDay, getRealChartBasedOnHour } from '../actions/Action';

const mapStateToProps = (state) => ({
    checkInterval: state.checkInterval,
    humidity: state.humidity_chart,
    temperature: state.temperature_chart,
});

const mapDispatchToProps = (dispatch) => ({
    getRealDataOnChart: (device, interval) => {
        if (interval) {
            getRealChartBasedOnDayAPI(dispatch, getRealChartBasedOnDay, device);
        } else {
            getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, device);
        }
    },
});

export default connect (mapStateToProps, mapDispatchToProps) (DashboardComponent);