import {NativeModules} from 'react-native';

const BridgeInfo = NativeModules.BridgeInfo;

export const getCountry = BridgeInfo.getCountry;
