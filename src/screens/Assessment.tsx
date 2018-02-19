import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export interface Props {
  navigation: any;
}
export interface State { }

export default class Assessment extends React.Component<Props, State> {

  private mode: string; // 'CoachAssessment' or 'SelfAssessment'

  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ focused, tintColor }) => {
      return <Icon type='FontAwesome' name='user' style={{ color: tintColor, fontSize: 26 }} />;
    },
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon type='FontAwesome' name='user' style={{ color: tintColor, fontSize: 26 }} />;
    }
  })

  constructor(props) {
    super(props);
    this.mode = props.navigation.state.routeName;
    // console.log('CTR', props, this.mode);
  }

  render() {
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }}>
            {this.mode === 'CoachAssessment' ?
              <Button transparent onPress={() => {
                // want to go Back to the PARENT navigator's previous screen
                // https://github.com/react-navigation/react-navigation/issues/335 suggests this:
                this.props.navigation.goBack(null);
              }} >
                <Icon name='ios-arrow-back-outline' />
              </Button> :
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')} >
                <Icon name='menu'/>
              </Button>
            }
          </Left>
          <Body style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Assessment</Title>
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