import { connect } from 'react-redux';
import LoginComponent from '../components/LoginComponent';
import { login } from '../actions/Action';
import { loginAPI } from '../api/api';

const mapStateToProps = (state) => ({
    token_expired: state.token_expired
});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        loginAPI(dispatch, login, username, password);
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);