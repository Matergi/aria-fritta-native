module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          state: './src/AppState/State',
          reducers: './src/AppState/Reducers',
          types: './src/AppState/Types',
          router: './src/Router',
          StateUpdaters: './src/StateUpdaters',
          SideEffects: './src/SideEffects',
          dependencies: './src/Dependencies',
          screens: './src/UI/Screens',
          components: './src/UI/Components',
          elements: './AF/elements',
          tools: './AF/tools',
          strings: './src/Resources/Strings',
          images: './src/Resources/Images',
          themes: './src/Resources/Themes',
          dimensions: './src/Resources/Dimensions',
          animations: './AF/animations',
          fcm: './AF/fcm',
          facebook: './AF/facebook',
          lottiefiles: './src/Resources/Lottiefiles',
          countriesNumber: './src/Resources/CountriesNumber',
          countriesVat: './src/Resources/CountriesVat',
          locale: './AF/locale',
        },
      },
    ],
  ],
};
