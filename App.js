/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GoogleReCaptcha from 'rn-google-recaptcha-v2';

const App = () => {
  const [ height, setHeight ] = useState(90)
  const onRecaptchaEvent = event => {
    if (event && event.nativeEvent.data) {
      const data = decodeURIComponent(
        decodeURIComponent(event.nativeEvent.data),
      );
      if (data.startsWith('CONTENT_PARAMS:')) {
        let params = JSON.parse(data.substring(15));
        let recaptchaViewHeight = params.visibility === 'visible' ? params.height : 90;
        setHeight(recaptchaViewHeight);
      } else if (['cancel', 'error', 'expired'].includes(data)) {
        console.log('cancel, error, expired')
        return;
      } else {
        console.log('Verified code from Google', data);
        //this.setState({ recaptchaToken: data });
      }
    }
  };
  const sitekey="6LfvBPMZAAAAAOP61log4pihxGeZPfXHBD3ZVZxr"
  const baseUrl = "http://cloudju.org"
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
        <Text style={styles.sectionTitle}>Step One</Text>
        <GoogleReCaptcha
          style={{ height: height }}
          siteKey={sitekey}
          url={baseUrl}
          languageCode="zh-CN"
          onMessage={onRecaptchaEvent} />
          <Text style={styles.sectionTitle}>Step two</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
