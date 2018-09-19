import React, { Component } from 'react';
import DeckPage from './DeckPage';
import Icon from './Icon';
import Header from './Header';
import AddPack from './AddPack';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import firebase from './firebase';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            display: true,
            decksArray: undefined
        }
    }

    handleClick = (e) => {
        this.setState({
            display: false,
            packSelected: e.target.id
        })
    }

    componentDidMount = () => {
        const dbRef = firebase.database().ref();
        let decksArray;
        let filteredArray = [];

        dbRef.once("value").then((snapshot) => {
            return (snapshot.val())
        }).then((decksArray) => {
            decksArray = Object.entries(decksArray);
            console.log(decksArray)

            console.log(decksArray.includes("review"))

            decksArray.map((deck) => {
                if (deck[0].includes("review") == false) {
                    filteredArray.push(deck)
                }       
            });

            this.setState({
                filteredArray: filteredArray,
                decksArray: decksArray
            });

        });
        
    }



    render() {
        
        return (

            <section>

                <Header />

                <div className="wrapper">

                    <h2>Select a pack to review</h2>

                    <Link to="/AddPack">
                        <div className="addPack">
                            <p>Add Custom Pack</p>
                        </div>
                    </Link>

                    {this.state.decksArray ? 

                    <div>

                        {this.state.filteredArray.map((deck) => {
                            return (
                                
                                <Link to="/DeckPage">

                                    <div className="packDisplay">
                                        <button
                                            className="landingPageButton"
                                            id={deck[0]}
                                            onClick={(e) => {
                                                this.props.selectPack(e.target.id)
                                            }}  
                                        >
                                            {deck[0]}

                                        </button>

                                        {this.state.decksArray.map((eachDeck) => {
                                            if (eachDeck[0] == `${deck[0]}-review`) {
                                                return (
                                                    <div className="buttonHolder">
                                                        <Link to="/ReviewPage" className="reviewLink">
                                                            <button
                                                                className="reviewButton"
                                                                id={`${deck[0]}-review`}
                                                                onClick={(e) => {
                                                                    this.props.selectPack(e.target.id)
                                                                }}
                                                            >
                                                                {`Review Wrong Answers`}
                                                            </button>
                                                        </Link>
                                                    </div>
                                                )

                                            }

                                        })} 

                                    </div>
                                    
                                </Link>   
                            )
                        })}

                    </div>

                    : null }

                </div>

            </section>      
        )
    }
}

export default LandingPage;