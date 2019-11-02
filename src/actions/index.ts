import * as constants from "../constants";

export interface GetData {
    type: constants.GET_DATA;
}

export const getData = (): GetData => ({
    type: "GET_DATA",
});

export interface SetData {
    type: constants.SET_DATA;
    user: object;
}

export const setData = (json: object): SetData => ({
    type: "SET_DATA",
    user: json
});


export type Actions = GetData | SetData;