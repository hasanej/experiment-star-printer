import React, {Fragment} from 'react';
import { Button } from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { StarPRNT } from 'react-native-star-prnt';

async function portDiscovery() {
  try {
    let printers = await StarPRNT.portDiscovery('All');
    Alert.alert(
      'Star Printer Lists',
      JSON.stringify(printers),
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    console.log(printers);
  } catch (e) {
    console.error(e);
  }
}

let portName = "BT:00:12:F3:2B:FE:F8";
let emulation = "StarPRNT";
let commands = [];
commands.push({
  appendLogo:1,  //Logo number configured using Star Print utility
  logoSize:StarPRNT.LogoSize.Normal
});
commands.push({appendAlignment: StarPRNT.AlignmentPosition.Center});
commands.push({append:
        "Star M Pop Print Test\n" +
        "Print Test 25 Jul 2019\n\n"});
commands.push({appendAlignment: StarPRNT.AlignmentPosition.Left});
commands.push({append:
        "No Java/Kotlin coding needed x1\n" +
        " Rp100.000\n" +
        "No Swift coding needed x1\n" +
        " Rp200.000\n" +
        "\n"});
commands.push({appendBarcode:'{BHasan}', BarcodeSymbology:'Code128'});
commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});

let commandOpen = [];
commandOpen.push({openCashDrawer: 1});

async function print() {
  try {
    var printResult = await StarPRNT.print(emulation, commands, portName);
    Alert.alert(
      'Print Success',
      'Go check your StarMPop printer!',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    console.log(printResult); // Success!
  } catch (e) {
    Alert.alert(
      'Connection Failed',
      'Make sure your Star Printer is turned on and have thermal paper in it.',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    // console.error(e);
  }
}

async function openCash() {
  try {
    var printResult = await StarPRNT.print(emulation, commandOpen, portName);
    Alert.alert(
      'Cash Drawer Opened',
      'Go close your cash drawer!',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    console.log(printResult); // Success!
  } catch (e) {
    Alert.alert(
      'Connection Failed',
      'Make sure your Star Printer is turned on and have thermal paper in it. Then make sure your Cash Drawer is closed.',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    // console.error(e);
  }
}

async function connect() {
  try {
    var connect = await StarPRNT.connect(portName, emulation, false);
    Alert.alert(
      'Printer Connected',
      'Go ahead, print some awesome things!',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    console.log(connect); // Printer Connected!
  } catch (e) {
    Alert.alert(
      'Connection Failed',
      'Make sure your Star Printer is turned on.',
      [
        {text: 'OK', onPress: () => null},
      ],
      { cancelable: false }
    )
    // console.error(e);
  }
}

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <Text>HASANELJABIR_EXPERIMENTSTARMPOP_240719</Text>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Star Micronics Print Test</Text>
              <Text style={styles.sectionDescription}>
                Press <Text style={styles.highlight}>Print</Text> and see something
                wonderful.
              </Text>
              <Text style={styles.sectionDescription}>
                Press <Text style={styles.highlight}>Open Cash Drawer</Text> to scare your friends
                as the Cash Drawer will be opened {String.fromCodePoint(0x1F631)}.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>How to Use:</Text>
              <Text style={styles.sectionPoint}>
                1. Turn on your device bluetooth
              </Text>
              <Text style={styles.sectionPoint}>
                2. Turn on your Star printer
              </Text>
              <Text style={styles.sectionPoint}>
                3. Pair your device bluetooth with Star printer
              </Text>
              <Text style={styles.sectionPoint}>
                4. Go ahead, play with this app!
              </Text>
            </View>
            <View style={styles.sectionButton}>
              <Button
                onPress={portDiscovery}
                title="Port Discovery"
                containerViewStyle={{width: '100%', marginLeft: 0}}
              />
            </View>
            <View style={styles.sectionButton}>
              <Button
                onPress={connect}
                title="Connect"
                containerViewStyle={{width: '100%', marginLeft: 0}}
              />
            </View>
            <View style={styles.sectionButton}>
              <Button
                onPress={print}
                title="Print"
                containerViewStyle={{width: '100%', marginLeft: 0}}
              />
            </View>
            <View style={styles.sectionButtonLast}>
              <Button
                onPress={openCash}
                title="Open Cash Drawer"
                containerViewStyle={{width: '100%', marginLeft: 0}}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
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
    marginBottom: 22,
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
  sectionPoint: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  sectionButton: {
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    flex: 1,
    justifyContent: 'center'
  },
  sectionButtonLast: {
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 32,
    flex: 1,
    justifyContent: 'center'
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
