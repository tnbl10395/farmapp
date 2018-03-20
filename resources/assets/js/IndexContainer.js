import { connect } from 'react-redux';
import { getUserAPI } from './api/api';
import { checkToken } from './actions/Action';
import App from './Index';

const mapStateToProps = (state) => ({
    token_expired: state.token_expired
});

const mapDispatchToProps = (dispatch) => ({
    checkToken: (token) => {
        getUserAPI(dispatch, checkToken, token);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

