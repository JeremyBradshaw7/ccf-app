import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export interface Props {
  navigation: any;
}
export interface State { }

export default class Assessment extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: <Icon name='person' />,
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon name='md-person' style={{ color: tintColor, fontSize: 34 }} />;
    }
  })

  constructor(props) {
    super(props);
    console.log('CTR', props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button transparent>
              {this.props.navigation.state.routeName === 'CoachAssessment' ?
                <Icon name='ios-arrow-back-outline' onPress={() => {
                  // want to go Back to the PARENT navigator's previous screen
                  // https://github.com/react-navigation/react-navigation/issues/335 suggests this:
                  this.props.navigation.goBack(null);
                }}/> :
                <Icon name='menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} />
              }
            </Button>
          </Left>
          <Body style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Assessment what if this is wide and wider still</Title>
          </Body>
          <Right style={{ flex: 1 }}></Right>
        </Header>

        <View style={styles.container}>
          <Text style={styles.heading}>Assessment detail here ...</Text>
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