import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export interface Props {
  navigation: any;
}
export interface State { }

export default class SelfAssessment extends React.Component<Props, State> {
  static navigationOptions = {
    drawerIcon: <Icon name='person' />
  };

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
          <Body style={{flex: 6}}>
            <Title>Self-Assessment</Title>
          </Body>
          <Right></Right>
        </Header>

        <View style={styles.container}>
          <Text style={styles.heading}>Self-Assessment Detail</Text>
        </View>
      </Container>
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