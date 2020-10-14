import React, {Component} from 'react';
import {View,BackHandler,Platform,} from 'react-native';
import {WebView} from 'react-native-webview';




export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  webView = {
    canGoBack: false,
    ref: null,
    allowsInlineMediaPlayback: true
  }

  onAndroidBackPress = () => {
    

    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <WebView
          ref={(webView) => { this.webView.ref = webView; }}
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
          automaticallyAdjustContentInsets={false}
          source={{uri: 'https://matargasthi.github.io/index.html'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsFullscreenVideo={true}
          style={{marginTop: 25}}
          mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"

        />
    </View>
    )
  }
  
}