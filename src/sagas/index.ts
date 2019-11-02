import { put, takeLatest, all } from 'redux-saga/effects';

function* getDataSaga() {
    const json = yield fetch("https://api.github.com/users/jjplusplus")
        .then(response => response.json());

    yield put({ type: "SET_DATA", user: json });
}

function* getDataWatcher() {
    yield takeLatest('GET_DATA', getDataSaga)
}

export default function* rootSaga() {
    yield all([
        getDataWatcher()
    ]);
}
