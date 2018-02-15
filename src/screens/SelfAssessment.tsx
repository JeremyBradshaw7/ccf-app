import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

export interface Props { }
export interface State { }

export default class SelfAssessment extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Self-Assessment',
    drawerLabel: 'Self-Assessment',
    drawerIcon: () => (
      <Icon name='person' />
    ),
    headerLeft: <Icon name='ios-menu' style={{color: 'steelblue', paddingLeft: 10}} onPress={() => navigation.navigate('DrawerOpen')}></Icon>
  })

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Self-Assessment...</Text>
      </View>
    );
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
  heading: {
    fontSize: 24,
    margin: 12,
    color: 'steelblue'
  }
});