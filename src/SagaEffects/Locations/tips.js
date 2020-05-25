// @flow

import {put, takeLatest} from 'redux-saga/effects';
import type {Action} from 'reducers';
import Dependencies from 'dependencies';

function* actionTips(action): any {
  try {
    const user = yield Dependencies.Request(action.request);
    //yield put(stateupdater);
  } catch (e) {
    console.error(e);
    //yield put(stateupdater);
  }
}

export function* sagaTips(): any {
  yield takeLatest('TIPS_REQUESTED', actionTips);
}

const tips = (input: string, uuidSession: string) => ({
  type: 'TIPS_REQUESTED',
  request: {
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    method: 'GET',
    query: {
      input,
      key: Dependencies.googleConfig.places_api_key,
      types: 'address',
      sessiontoken: uuidSession,
    },
    disableCheck: true,
  },
});

export default tips;
