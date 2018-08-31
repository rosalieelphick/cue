import React, { Component } from 'react';
import firebase from './firebase';

import Review from './Review'

const dbRef = firebase.database().ref()
console.log(dbRef)
let randomCard;

class DeckPage extends Component {

    constructor() {
        super();
        this.state = {

            display: true,
            packDisplay: false,
            nocards: false,
            vocabulary: {
                word1: {
                    question: "word1 name",
                    answer: "word1 definition"
                },
                word2: {
                    question: "word2 name",
                    answer: "word2 definition"
                },
                word3: {
                    question: "word3 name",
                    answer: "word3 definition"
                },
                word4: {
                    question: "word4 name",
                    answer: "word4 definition"
                },
                word5: {
                    question: "word5 name",
                    answer: "word5 definition"
                }
            },

            capitals: {
                capital1: {
                    question: "capital 1 name",
                    answer: "capital1 definition"
                }
            },

            answerShown: false,

            selectedPack: [],
            answer: '',
            question: '',
            review: false,

        }
    }

    displayDeck = () => {
        const deckObject = this.state[this.props.packSelected]
        const deckArray = Object.entries(deckObject);
        this.setState({
            display: false,
            packDisplay: true,
            selectedPack: deckArray,
        },()=>{

            this.displayCard();
        })
    }

    displayCard = () => {

        console.log("hey")
        // let randomCard;
        if (this.state.selectedPack.length) {
            randomCard = this.state.selectedPack[Math.floor(Math.random() * this.state.selectedPack.length)];
            console.log(randomCard)
            this.setState({
                question : randomCard[1].question,
                answer : randomCard[1].answer
            })
        } else {
            this.setState({
                nocards: true
            })
        }
       
        const index = this.state.selectedPack.indexOf(randomCard);
        const newState = Array.from(this.state.selectedPack);
        newState.splice(index, 1);
        this.setState({
            selectedPack: newState
        })
        
    }

    showAnswer = (e) => {
        e.preventDefault();
        this.setState({
            answerShown: true,
        })
    }

    nextCard = () => {
        this.setState({
            answerShown: false
        })
        this.displayCard()
    }

    addToDatabase = () => {
        const newRef = firebase.database().ref(this.props.packSelected)
        newRef.push(randomCard);
        console.log(dbRef)
    }

    review = () => {
        console.log("review")
        this.setState({
            review: true
        })
    }

    deckAgain = () => {
        this.setState({
            nocards: false,
            display: true
        })
    }


    render() {

        return (

            <div>

                {this.state.review ? 
                
                    <Review packSelected={this.props.packSelected}/>

                :

                    <div>
                
                        {this.state.nocards ? 

                        <div>
                            <h1>no more cards tho</h1>
                            <button onClick={this.deckAgain}>go through deck again</button>
                            <button onClick={this.review}>review wrong answers</button>
                            <button onClick={this.props.homePage}>home page</button>
                        </div>
                        

                        // <Review packSelected={this.packSelected}/>
                        // <h1>{this.state.selectedPack}</h1>

                    :
                        <div>
                            {this.state.display ? 
                            <div>
                                <p>this is where my deck will go</p>
                                <button onClick={this.displayDeck}>start deck</button>
                                <button onClick={this.review}>review wrong answers</button>
                            </div>
                            :
                            <div>
                                {this.state.answerShown ?
                                    <div>
                                        <p>{this.state.answer}</p>
                                        <button onClick={this.nextCard}>next card</button>
                                        <button onClick={this.addToDatabase}>add to database</button>
                                    </div>
                                    :
                                    <div>
                                        <p>{this.state.question}</p>
                                        <button onClick={this.showAnswer}>show answer</button>
                                    </div>
                                }
                            </div>       
                            }         
                        </div>
                    }

                    </div>
                    
                }

            </div>

        )      
    }
}

export default DeckPage;