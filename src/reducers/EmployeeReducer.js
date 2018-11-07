import {
    EMPLOYEES_FETCH
} from '../actions/types';

const INITAL_STATE = {
    employees: ''
};

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEES_FETCH:
            return action.payload;
        default:
            return state;
    }
}