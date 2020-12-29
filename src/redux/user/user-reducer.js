import { UserActionTypes } from './user.types'
const INITIAL_STATE = {
    currentUser:null
}

//state = INITIAL_STATE represents set the default state as INITIAL_STATE which is null
const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:action.payload
            };
        default:
            return state;
    }
}

export default userReducer;