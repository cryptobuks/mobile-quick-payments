// @flow

import * as React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Colors, SafeAreaView } from 'mobile-quick-payments-shared';

import Dimensions from '../Dimensions';

type Props = {|
  childrenTop: React.Node,
  childrenBottom: React.Node,
  backgroundColor: string,
|};

function SplitScreen(props: Props) {
  const { width, height } = Dimensions.get();
  const styleSheet = createStyleSheet(
    width,
    height,
    props.backgroundColor,
    0.5,
  );

  return (
    <KeyboardAvoidingView
      style={styleSheet.wrapper}
      behavior="position"
      contentContainerStyle={styleSheet.wrapper} // the style of the content container(View) when behavior is 'position'
    >
      <View style={styleSheet.topArea}>
        <SafeAreaView style={styleSheet.safeAreaView}>
          {props.childrenTop}
        </SafeAreaView>
      </View>
      <View style={styleSheet.bottomTriangle} />
      <View style={styleSheet.bottomArea}>
        <SafeAreaView style={styleSheet.safeAreaView}>
          {props.childrenBottom}
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

SplitScreen.defaultProps = {
  backgroundColor: Colors.brandPrimary,
};

export default SplitScreen;

function createStyleSheet(
  screenWidth: number,
  screenHeight: number,
  backgroundColor: string,
  ratio: number,
) {
  const triangleHeight = screenWidth / 15;

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    topArea: {
      height: screenHeight * ratio - triangleHeight / 2,
      width: screenWidth,
      backgroundColor: backgroundColor,
    },
    bottomArea: {
      flex: 1,
    },
    bottomTriangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderRightWidth: screenWidth,
      borderRightColor: 'transparent',
      borderTopWidth: triangleHeight,
      borderTopColor: backgroundColor,
      zIndex: -1, // just to hide the shadow
      shadowColor: Colors.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
  });
}
