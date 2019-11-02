import { AppState } from "../types";

import * as constants from "../constants";

import { Actions } from "../actions";

import { Reducer } from "redux";

const initialState = {
    data: null
};

const reducer: Reducer = (state = initialState, action: Actions) => {

    switch (action.type) {
        case constants.GET_DATA: {
            return {
                ...state,
                loading: true
            };
        }
        case constants.SET_DATA: {
            return {
                ...state,
                loading: false,
                data: action.user
            }
        }
        default:
            return state;
    }
};

export default reducer;
