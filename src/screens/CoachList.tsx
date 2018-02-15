import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

export interface Props { }
export interface State { }

export default class SignedIn extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Coach List',
    // drawerLabel: 'Coaches',
    drawerIcon: () => (
      <Icon name='home' />
    ),
    headerLeft: <Icon name='ios-menu' style={{color: 'steelblue', paddingLeft: 10}} onPress={() => navigation.navigate('DrawerOpen')}></Icon>
  })

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Coaches...</Text>
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