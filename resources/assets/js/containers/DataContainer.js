import { connect } from 'react-redux';
import DataComponent from '../components/DataComponent';
import { getDataValuesAPI } from '../api/api';
import { getDataValues } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_values
});
const mapDispatchToProps = (dispatch) => ({
    getDataValues: () => {
        getDataValuesAPI(dispatch,getDataValues);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(DataComponent);