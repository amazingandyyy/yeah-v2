import {reducer as form} from 'redux-form'

const formReducer = form.plugin({
    createVolunteerResource: (state, action) => {
        if (action.type === 'SUCCESS') {
            return undefined
        }
        return state;
    }
})

export default formReducer;