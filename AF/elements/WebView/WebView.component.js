// @flow

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import Press from '../Press';
import Text from '../Text';

type Props = {
  route: any,
  executePay: (string, string) => void,
};

// const getQueryParams = qs => {
//   qs = qs.split('+').join(' ');

//   var params = {},
//     tokens,
//     re = /[?&]?([^=]+)=([^&]*)/g;

//   while ((tokens = re.exec(qs))) {
//     params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
//   }

//   return params;
// };

const INJECTEDJAVASCRIPT =
  "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); ";

const WebViewComponent = (props: Props) => {
  const [ready, setReady] = useState(false);

  const {callbackUrl, cancel, url, headers} = props.route.params ?? {};

  const onNavigationStateChange = webViewState => {
    !ready && setReady(true);
    const urlFinded = callbackUrl.find(detail =>
      webViewState.url.includes(detail.url),
    );
    urlFinded && urlFinded.callback();
  };

  return (
    <View style={styles.container}>
      <View style={styles.webView}>
        <View style={styles.wrapPage}>
          <View style={styles.action}>
            <Press style={styles.close} onPress={cancel}>
              <Text>Close</Text>
            </Press>
          </View>
          <WebView
            style={styles.page}
            source={{
              uri: url,
              headers: headers,
            }}
            onNavigationStateChange={onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            injectedJavaScript={INJECTEDJAVASCRIPT}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'rgba(150,150,150,0.8)',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  action: {
    position: 'relative',
    height: '5%',
    width: '100%',
    backgroundColor: 'white',
  },
  close: {
    position: 'absolute',
    right: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    width: '100%',
    height: '90%',
    bottom: 0,
    position: 'absolute',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
  },
  wrapPage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  page: {
    width: '100%',
    height: '100%',
  },
});

WebViewComponent.defaultProps = {
  route: {},
};

export default WebViewComponent;
