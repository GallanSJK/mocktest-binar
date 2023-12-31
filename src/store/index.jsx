import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";


const initialState = ({});

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {...state, data: action.data}
        default: return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store