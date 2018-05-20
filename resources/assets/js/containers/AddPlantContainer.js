import { connect } from 'react-redux';
import { AddPlantComponent } from '../components/AddPlantComponent';
import { closeModal, addPlant, getPlantsOfUser } from '../actions/Action';
import { addPlantApi, getPlantsOfUserApi } from '../api/api';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },
    submit: (plant, phase, picture) => {
        addPlantApi(
            dispatch,
            addPlant,
            getPlantsOfUserApi,
            getPlantsOfUser,
            {
                plant: plant,
                phase: phase,
                picture: picture
            }
        )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlantComponent);