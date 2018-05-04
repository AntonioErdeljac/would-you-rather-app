import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import window from '../constants/Layout';
import questions from '../constants/questions';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    tabBarVisible: false,
  }

  constructor(props) {
    super(props);

    const randomCombination = questions[Math.floor(Math.random() * questions.length)];

    this.state = {
      optionA: randomCombination.optionA.toUpperCase(),
      optionASize: 20,
      optionBSize: 20,
      optionB: randomCombination.optionB.toUpperCase(),
    }

    this.handleChoose = this.handleChoose.bind(this);
  }

  handleChoose(option) {
    const randomPercent = Math.round(Math.random() * 100);
    Promise.all([
      this.textA.bounceOut(300),
      this.textB.bounceOut(300)
    ])
      .then(() => {
        this.setState({
          optionASize: 40,
          optionBSize: 40,
          optionA: `${randomPercent}%`,
          optionB: `${100 - randomPercent}%`,
        }, () => {
          Promise.all([
            this.textA.bounceIn(300),
            this.textB.bounceIn(300),
          ])
          .then(() => {
              setTimeout(() => {
                Promise.all([
                  this.optionA.fadeOutLeftBig(800),
                  this.optionB.fadeOutRightBig(800)
                ])
                  .then(() => {
                    const randomCombination = questions[Math.floor(Math.random() * questions.length)];
                    this.setState({
                      optionASize: 20,
                      optionBSize: 20,
                      optionA: randomCombination.optionA.toUpperCase(),
                      optionB: randomCombination.optionB.toUpperCase(),
                    }, () => {
                      this.optionA.fadeInRightBig(800);
                      this.optionB.fadeInLeftBig(800);
                    })
                })
              }, 2000);
            });
          })
      })

  }

  render() {
    const { optionA, optionB, optionASize, optionBSize } = this.state;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.handleChoose('optionA')}>
          <Animatable.View ref={ref => this.optionA = ref} animation="fadeInRightBig" style={{ backgroundColor: "#fa6e57", flex: 2, justifyContent: 'space-around' }}>
            <Animatable.Text ref={ref => this.textA = ref} style={{ fontFamily: 'nunito', padding: 20, color: '#fff', textAlign: 'center', fontSize: optionASize }}>{optionA}</Animatable.Text>
          </Animatable.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handleChoose('optionA')}>
          <Animatable.View ref={ref => this.optionB = ref} animation="fadeInLeftBig"  style={{ backgroundColor: "#4695d6", flex: 2, justifyContent: 'space-around' }}>
            <Animatable.Text ref={ref => this.textB = ref} style={{ fontFamily: 'nunito', padding: 20, color: '#fff', textAlign: 'center', fontSize: optionBSize }}>{optionB}</Animatable.Text>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: window.height,
  },
});
