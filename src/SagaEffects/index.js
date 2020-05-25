// @flow
import {all} from 'redux-saga/effects';
import {tips, sagaTips} from './Locations';

export {tips};

function* watchAll(): any {
  yield all([sagaTips()]);
}

export default watchAll;
