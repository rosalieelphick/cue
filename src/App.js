import React, { Component } from 'react';
import './style.css';
import LandingPage from './components/LandingPage';
import DeckPage from './components/DeckPage';
import ReviewPage from './components/ReviewPage';
import AddPack from './components/AddPack';
import AddCard from './components/AddCard';
import Cards from './components/Cards';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import firebase from './components/firebase';
import swal from 'sweetalert';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  selectPack = (packId) => {
    const newRef = firebase.database().ref(packId);
    console.log(packId)

    newRef.on("value", (snapshot) => {

      if (snapshot.val()) {
        const refArray = Object.entries(snapshot.val());
        const emptyArray = [];
        refArray.map((card) => {
          emptyArray.push(card[1])
        })
        const deckLength = emptyArray.length
        this.setStatePack(packId, emptyArray, deckLength)
      } else {
        swal({
          icon: 'error',
          title: "Review Pack Empty!",
          text: "You haven't added any cards to this review pack yet. Go through the deck again to add some.",
        })
      }
    })
  }

  setStatePack = (packId, emptyArray, deckLength) => {
    this.setState({
      selectedPack: packId,
      deckLength: deckLength,
      packArray: emptyArray
    }, () => {
      console.log(this.state.packId,this.state.deckLength,this.state.packArray)
    })
  }

  render() {
    return (
      <Router basename="/cue">

        <div className="App">

          <Route exact path="/" render={(props) =>
            <LandingPage {...props}
              selectPack={this.selectPack}
          />} />

          <Route exact path="/AddPack" render={(props) => 
            <AddPack {...props}
          /> } /> 

          <Route exact path="/AddCard" render={(props) =>
            <AddCard {...props}
          />} /> 

          <Route exact path="/DeckPage" render={(props) =>
            <DeckPage {...props}
              selectedPack={this.state.selectedPack}
              deckLength={this.state.deckLength}
              packArray={this.state.packArray}
        />} /> 

          <Route exact path="/ReviewPage" render={(props) =>
            <ReviewPage {...props}
              selectedPack={this.state.selectedPack}
              deckLength={this.state.deckLength}
              packArray={this.state.packArray}
            />} /> 

          <Route exact path="/Cards" render={(props) =>
            <Cards {...props}
              selectedPack={this.state.selectedPack}
              deckLength={this.state.deckLength}
              packArray={this.state.packArray}
              selectPack={this.selectPack}
            />} /> 

          

        </div>
      </Router>
    );
  }
}

export default App;
