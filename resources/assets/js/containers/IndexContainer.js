import { connect } from 'react-redux';
import Index from '../components/Index';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Index);