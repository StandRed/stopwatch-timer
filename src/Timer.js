import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleStartStopButton} from './actionCreators';

class Timer extends Component {
  props= {
  }
  constructor() {
    super();
    this.state = {
      currentHr: 0,
      currentMin: 0,
      currentSec: 0,
      currentMillisec: 0,
      intervalId: '',
      startStopButton: 'Start',
    };
  }

  timerButton(){
    if(this.props.startStopButton === 'Start'){
      this.props.toggleStartStopButton('Stop')
      this.startTimer()
    } else if(this.props.startStopButton === 'Stop'){
      this.props.toggleStartStopButton('Start')
      this.stopTimer()
    }
  }

  startTimer(){
    let timerInterval= setInterval(()=>{
      let ms = this.state.currentMillisec+1;
      this.setState({
        currentMillisec: ms});
      if(this.state.currentMillisec === 100){
        this.setState({
          currentMillisec: 0
        })
        let sec=this.state.currentSec+1;
        this.setState({
          currentSec: sec
        })
      }
      if(this.state.currentSec === 60){
        this.setState({
          currentSec: 0
        })
        let min=this.state.currentMin+1;
        this.setState({
          currentMin: min
        })
      }
      if(this.state.currentMin === 60){
        this.setState({
          currentMin: 0
        })
        let hr=this.state.currentHr+1;
        this.setState({
          currentHr: hr
        })
      }
    },10)
    this.setState({intervalId: timerInterval})
  }

  stopTimer(){
    clearInterval(this.state.intervalId)
    let ms = this.state.currentMillisec;
    this.setState({
      currentMillisec: ms
    })
  }

  resetTimer(){
    this.setState({
      currentHr: 0
    })
    this.setState({
      currentMin: 0
    })
    this.setState({
      currentSec: 0
    })
    this.setState({
      currentMillisec: 0
    })
  }

  render() {
    return (
      <div>
        <TimerDisplay
        hr={this.state.currentHr}
        min={this.state.currentMin} 
        sec={this.state.currentSec}
        milliSec={this.state.currentMillisec} 
        />
        <button onClick={this.timerButton.bind(this)} >{this.state.startStopButton}</button>
      </div>
    );
  }
}

const TimerDisplay =(props)=> (
      <div>
        <p>
        <span>{props.hr.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </span> :  
        <span>{props.min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </span> :
        <span> {props.sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span> :
        <span> {props.milliSec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </span>
        </p>
      </div>
    )

const mapStateToProps = state => ({
      currentHr: state.currentHr,
      currentMin: state.currentMin,
      currentSec: state.currentSec,
      currentMillisec: state.currentMillisec,
      intervalId: state.intervalId,
      startStopButton: state.startStopButton,
})
const mapDispatchToProps = (dispatch) => ({
  toggleStartStopButton(label) {
    dispatch(toggleStartStopButton(label));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer);