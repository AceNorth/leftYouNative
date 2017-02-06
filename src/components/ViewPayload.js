import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button } from './common';
import axios from 'axios';
import { tunnelIP } from '../TUNNELIP';
import { Actions } from 'react-native-router-flux';


class ViewPayload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEgg: props.allEggs[props.selectedEgg],
        goHereImage:{},
        payloadImage:{}
    }
  }

  componentWillMount(){
    this.setState({viewEgg: this.props.allEggs[this.props.selectedEgg]})
      let goHereImage2;
      axios.get(`${tunnelIP}/api/egg/goHereImage/`+ this.props.selectedEgg)
          .then(response => {
              goHereImage2 = response.data;
              this.setState({goHereImage: goHereImage2});
          })
      let payloadImage2;
      axios.get(`${tunnelIP}/api/egg/payloadImage/`+ this.props.allEggs[this.props.selectedEgg].payloadId)
          .then(response => {
              payloadImage2 = response.data;
              this.setState({payloadImage: payloadImage2});
          })
  }


  onSubmitPickup(){
    let eggId = this.state.viewEgg.id
    axios.put(`${tunnelIP}/api/egg/picked/${eggId}`)
    .then( res => {
      this.setState({viewEgg: res.data})
    })
    .catch(err => console.log('onSubmit Egg Update error', err))
  }

  render() {
    return (
      <Card>
        <CardSection style={{flex: 1}}>
          <Text style={{fontSize: 30, paddingTop: 50}}> Here's your message! </Text>
        </CardSection>
        <CardSection>
          { this.onSubmitPickup() }
          <View>
            <Image style={{width: 50, height: 50}} source={{uri: this.state.goHereImage.uri}}></Image>
            <Text>{ this.state.viewEgg.goHereText }</Text>

            <Image style={{width: 50, height: 50}} source={{uri: this.state.payloadImage.uri}}></Image>
            <Text>{ this.state.viewEgg.payload.text }</Text>
          </View>
        </CardSection>
        <CardSection>
          <Button
              color='#517fa4'
              onPress={Actions.landingPage}
          >Go Back
          </Button>
        </CardSection>
      </Card>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
    const selectedEgg = state.eggs.selectedEgg;
    const allEggs = state.eggs.allEggs;
    return { selectedEgg, allEggs };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPayload);