# Aria Fritta Native


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
