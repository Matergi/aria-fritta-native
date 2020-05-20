// @flow

import React from 'react';
import {ScreenWithHeader, Pagination} from 'elements';
import PhoneNumber, {
  hasError as PhoneNumberAsError,
} from './steps/PhoneNumber.step';
import ConfirmPhoneNumber, {
  hasError as ConfirmPhoneNumberAsError,
} from './steps/ConfirmPhoneNumber.step';
import Password, {hasError as PasswordAsError} from './steps/Password.step';

import {connect} from 'react-redux';
import {EditRecoverPasswordInfo} from 'StateUpdaters';
import {
  RecoverPassword as RecoverPasswordSideEffect,
  ConfirmPhoneNumberForRecoverPassword as ConfirmPhoneNumberForRecoverPasswordSideEffect,
  ResetPassword as ResetPasswordSideEffect,
} from 'SideEffects';

import strings from 'strings';

import type {State, RecoverPassword} from 'types';

type Props = {
  infoRecoverPassword: RecoverPassword,
  editRecoverPasswordInfo: (string, string) => Promise<any>,
  recoverPassword: () => Promise<Boolean>,
  confirmPhoneNumber: () => Promise<Boolean>,
  resetPasswordSideEffect: () => Promise<any>,
};

const RecoverPasswordScreen = ({
  infoRecoverPassword,
  editRecoverPasswordInfo,
  recoverPassword,
  confirmPhoneNumber,
  resetPasswordSideEffect,
}: Props) => (
  <ScreenWithHeader title={strings.get('recoverPassword.title')}>
    <Pagination
      onNext={async index => {
        if (index === 0) {
          const errorBaseInfo = PhoneNumberAsError(infoRecoverPassword);
          if (errorBaseInfo !== false) {
            alert(errorBaseInfo);
            return false;
          }

          const resultRecoverPassword = await recoverPassword();
          if (!resultRecoverPassword) {
            return false;
          }
        }
        if (index === 1) {
          const errorPassword = ConfirmPhoneNumberAsError(infoRecoverPassword);
          if (errorPassword !== false) {
            alert(errorPassword);
            return false;
          }

          const resultConfirmPhoneNumber = await confirmPhoneNumber();
          if (!resultConfirmPhoneNumber) {
            return false;
          }
        }

        return true;
      }}
      onFinish={() => {
        const errorConfirmPhoneNumber = PasswordAsError(infoRecoverPassword);
        if (errorConfirmPhoneNumber !== false) {
          alert(errorConfirmPhoneNumber);
          return false;
        }

        resetPasswordSideEffect();
      }}>
      <PhoneNumber
        fields={infoRecoverPassword}
        onChangeField={editRecoverPasswordInfo}
      />
      <ConfirmPhoneNumber
        fields={infoRecoverPassword}
        onChangeField={editRecoverPasswordInfo}
      />
      <Password
        fields={infoRecoverPassword}
        onChangeField={editRecoverPasswordInfo}
      />
    </Pagination>
  </ScreenWithHeader>
);

const mapStateToProps = (state: State) => ({
  infoRecoverPassword: state.recoverPassword ?? {},
});

const mapDispatchToProps = dispatch => ({
  editRecoverPasswordInfo: (key: string, value: string) =>
    dispatch(EditRecoverPasswordInfo(key, value)),
  recoverPassword: () => dispatch(RecoverPasswordSideEffect()),
  confirmPhoneNumber: () =>
    dispatch(ConfirmPhoneNumberForRecoverPasswordSideEffect()),
  resetPasswordSideEffect: () => dispatch(ResetPasswordSideEffect()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecoverPasswordScreen);
