// @flow

import React from 'react';
import {ScreenWithHeader, Pagination} from 'elements';
import BaseInfo, {hasError as BaseInfoAsError} from './steps/BaseInfo.step';
import Password, {hasError as PasswordAsError} from './steps/Password.step';
import PhoneNumber, {
  hasError as PhoneNumberAsError,
} from './steps/PhoneNumber.step';
import ConfirmPhoneNumber, {
  hasError as ConfirmPhoneNumberAsError,
} from './steps/ConfirmPhoneNumber.step';

import {connect} from 'react-redux';
import {EditSignupInfo} from 'StateUpdaters';
import {
  Signup as SignupSideEffect,
  ConfirmPhoneNumber as ConfirmPhoneNumberSideEffect,
} from 'SideEffects';

import strings from 'strings';

import type {State, Signup} from 'types';

type Props = {
  infoSignup: Signup,
  editSignupInfo: (string, string) => Promise<any>,
  signup: () => Promise<Boolean>,
  confirmPhoneNumber: () => Promise<any>,
};

const SignupScreen = ({
  infoSignup,
  editSignupInfo,
  signup,
  confirmPhoneNumber,
}: Props) => (
  <ScreenWithHeader title={strings.get('signup.title')}>
    <Pagination
      onNext={async index => {
        if (index === 0) {
          const errorBaseInfo = BaseInfoAsError(infoSignup);
          if (errorBaseInfo !== false) {
            alert(errorBaseInfo);
            return false;
          }
        }
        if (index === 1) {
          const errorPassword = PasswordAsError(infoSignup);
          if (errorPassword !== false) {
            alert(errorPassword);
            return false;
          }
        }
        if (index === 2) {
          const errorPhoneNumber = PhoneNumberAsError(infoSignup);
          if (errorPhoneNumber !== false) {
            alert(errorPhoneNumber);
            return false;
          }

          const signupResult = await signup();
          if (!signupResult) {
            return false;
          }
        }

        return true;
      }}
      onFinish={() => {
        const errorConfirmPhoneNumber = ConfirmPhoneNumberAsError(infoSignup);
        if (errorConfirmPhoneNumber !== false) {
          alert(errorConfirmPhoneNumber);
          return false;
        }

        confirmPhoneNumber();
      }}>
      <BaseInfo fields={infoSignup} onChangeField={editSignupInfo} />
      <Password fields={infoSignup} onChangeField={editSignupInfo} />
      <PhoneNumber fields={infoSignup} onChangeField={editSignupInfo} />
      <ConfirmPhoneNumber fields={infoSignup} onChangeField={editSignupInfo} />
    </Pagination>
  </ScreenWithHeader>
);

const mapStateToProps = (state: State) => ({
  infoSignup: state.signup ?? {},
});

const mapDispatchToProps = dispatch => ({
  editSignupInfo: (key: string, value: string) =>
    dispatch(EditSignupInfo(key, value)),
  signup: () => dispatch(SignupSideEffect()),
  confirmPhoneNumber: () => dispatch(ConfirmPhoneNumberSideEffect()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupScreen);
