import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export interface Props {
  navigation: any;
}
export interface State { }

export default class SignedIn extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: <Icon name='home' />,
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      // let iconName;
      console.log(routeName, focused, tintColor);
      // if (routeName === 'SelfAssessment1') {
      //   iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      // } else if (routeName === 'SelfAssessment2') {
      //   iconName = `ios-options${focused ? '' : '-outline'}`;
      // }
      // console.log(iconName);

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Icon name='person' color={tintColor} />;
    }
  })

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} />
            </Button>
          </Left>
          <Body style={{ flex: 6 }}>
            <Title>Coach List</Title>
          </Body>
          <Right></Right>
        </Header>

        <FlatList
          data={[
            { key: 'aaaaaa' },
            { key: 'b' },
            { key: 'c' },
            { key: 'd' },
            { key: 'e' },
            { key: 'f' },
            { key: 'g' },
            { key: 'h' },
            { key: 'i' },
            { key: 'j' },
            { key: 'k' },
            { key: 'l' },
            { key: 'm' },
            { key: 'n' },
            { key: 'o' },
            { key: 'p' },
            { key: 'q' },
            { key: 'r' },
            { key: 's' },
            { key: 't' },
            { key: 'u' },
            { key: 'v' },
            { key: 'w' },
            { key: 'x' },
            { key: 'y' },
            { key: 'zzzzzzzzz' }
          ]}
          renderItem={({ item }) => <Text style={styles.listitem}>{item.key}</Text>}
        />

      </Container>
    );
  }
}

const styles: any = StyleSheet.create({
  listitem: {
    padding: 12,
    backgroundColor: 'whitesmoke',
    borderColor: 'lightgray',
    borderWidth: 0.5
  }
});