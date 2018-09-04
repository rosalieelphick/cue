import React, { Component } from 'react';
import firebase from './firebase';

import Review from './Review';
import Icon from './Icon';
import ProgressBar from './ProgressBar';

// emptyArray = [];
const dbRef = firebase.database().ref()
console.log(dbRef)
let randomCard;
let deckLength;
let childCount;

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
        }, () => {
            this.displayCard();
        })

        deckLength = deckArray.length
    }

    deckLength = () => {
        const deckObject = this.state[this.props.packSelected]
        const deckArray = Object.entries(deckObject);
        deckLength = deckArray.length
        return deckLength;
    }

    displayCard = () => {

        console.log("hey")
        // let randomCard;
        if (this.state.selectedPack.length) {
            randomCard = this.state.selectedPack[Math.floor(Math.random() * this.state.selectedPack.length)];
            console.log(randomCard)
            this.setState({
                question: randomCard[1].question,
                answer: randomCard[1].answer
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
    }

    review = () => {
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

    lengthOfPack = (object) => {
        let length = 0;
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    }

    getStats = () => {
        const newRef = firebase.database().ref(this.props.packSelected)
        let count;
        newRef.once("value", (snapshot) => {
            count = snapshot.numChildren();
            this.displayStats(count);
        })
    }

    displayStats = (count) => {
        childCount = count;
        console.log(childCount)
        return childCount
    }

    render() {

        console.log(deckLength)

        return (

            <div>

                {this.state.review ?

                    <Review packSelected={this.props.packSelected} homePage={this.props.homePage} />

                    :

                    <div>

                        {this.state.nocards ?

                            <div className="deckComplete">
                                <h2>Deck Complete</h2>

                                <button className="deckAgain" onClick={this.deckAgain}>
                                    <div className="buttonIcon">
                                        <Icon className="icon" icon={"redo"} />
                                    </div>
                                    <div className="buttonText">
                                        Go through deck again
                                </div>
                                </button>

                                <button onClick={this.review}>
                                    <div className="buttonIcon">
                                        <Icon className="icon" icon={"wrong"} />
                                    </div>
                                    <div className="buttonText">
                                        Review wrong answers
                                </div>
                                </button>

                                <button onClick={this.props.homePage}>
                                    <div className="buttonIcon">
                                        <Icon className="icon" icon={"allPacks"} />
                                    </div>
                                    <div className="buttonText">
                                        Home page
                                </div>
                                </button>
                            </div>


                            // <Review packSelected={this.packSelected}/>
                            // <h1>{this.state.selectedPack}</h1>

                            :
                            <div>
                                {this.state.display ?
                                    <div className="wrapper">

                                        <div className="card cardInfo">
                                            <div className="cardText">
                                                <p>{this.props.packSelected}</p>
                                                <p class="deckLength">{`${this.deckLength()} cards`}</p>
                                            </div>

                                            <button className="startDeck" onClick={this.displayDeck}>
                                                start deck
                                        <Icon className="icon" icon={"start"} />
                                            </button>

                                            <div className="buttonHolder">
                                                <button className="review" onClick={this.review}>review wrong answers</button>
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <div>
                                        {this.state.answerShown ?
                                            <div className="wrapper">

                                                <div className="card">

                                                    <div className="cardHeader">
                                                        <p>{this.props.packSelected}</p>
                                                        <p>{`${deckLength - this.state.selectedPack.length} / ${deckLength}`}</p>
                                                    </div>

                                                    <div className="cardText">
                                                        <p>{this.state.answer}</p>
                                                    </div>

                                                    <div className="buttonHolder">
                                                        <button className="leftAlign" onClick={this.addToDatabase}>
                                                            <Icon className="icon" icon={"wrong"} />
                                                            add to review
                                                </button>
                                                        <button className="rightAlign" onClick={this.nextCard}>
                                                            next card
                                                    <Icon className="icon" icon={"check"} />
                                                        </button>
                                                    </div>



                                                </div>

                                                <ProgressBar deckLength={deckLength} progress={deckLength - this.state.selectedPack.length} />

                                            </div>
                                            :
                                            <div className="wrapper">
                                                <div className="card">
                                                    <div className="cardHeader">
                                                        <p>{this.props.packSelected}</p>
                                                        <p>{`${deckLength - this.state.selectedPack.length} / ${deckLength}`}</p>
                                                    </div>
                                                    <div className="cardText">
                                                        <p>{this.state.question}</p>
                                                    </div>

                                                    <div className="buttonHolder">
                                                        <button className="rightAlign" onClick={this.showAnswer}>
                                                            show answer
                                                <Icon className="icon" icon={"rightArrow"} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <ProgressBar deckLength={deckLength} progress={deckLength - this.state.selectedPack.length} />

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