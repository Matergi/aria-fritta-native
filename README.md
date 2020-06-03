# Boilerplate in Beta

doc: http://giacomo-materozzi.gitbook.io/aria-fritta-native

# Todo
- [ ] rewrite in typescript

# Aria Fritta Native
Http & Apollo 

## Services implemented
* Firebase
* Stripe
* Google Places
* Facebook Login

## Library to manage state 
* Redux
* Redux-thunk https://github.com/reduxjs/redux-thunk
* Redux-saga https://redux-saga.js.org/

android:

```
npx jetify
cd android/app && keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

ios:

```
cd ios && pod install
```

permissions: https://github.com/react-native-community/react-native-permissions  
  
Symbol for crashlytics:

```
mdfind "com_apple_xcode_dsym_uuids == {uuid}"
// example: mdfind "com_apple_xcode_dsym_uuids == 333EF8BB-5DB2-3AFB-A66C-6DF25FC99C3E"
```
