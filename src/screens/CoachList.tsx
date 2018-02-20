import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export interface Props {
  navigation: any;
}
export interface State { }

export default class CoachList extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    // NB. Icon type need this fix: https://github.com/GeekyAnts/NativeBase/pull/1594/files
    drawerIcon: ({ focused, tintColor }) => {
      return  <Icon type='FontAwesome' name='users' style={{color: tintColor, fontSize: 22}} />;
    },
    // NB. trying to put tabBarIcon directly in RootNavigator generates error: 'React' undefined!!
    tabBarIcon: ({ focused, tintColor }) => {
      return  <Icon type='FontAwesome' name='users' style={{color: tintColor, fontSize: 22}} />;
    }
  })

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Coach List</Title>
          </Body>
          <Right style={{ flex: 1 }}></Right>
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
            { key: 'zzzzzzzzzz' }
          ]}
          renderItem={({ item }) =>
            <Text
              onPress={() => this.props.navigation.navigate('CoachAssessment')}
              style={styles.listitem}>{item.key}
            </Text>
          }
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