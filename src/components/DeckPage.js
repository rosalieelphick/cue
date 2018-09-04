import React, { Component } from 'react';
import firebase from './firebase';

import Review from './Review';
import Icon from './Icon';
import ProgressBar from './ProgressBar';

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
                    question: "Abnegation",
                    answer: "the denial and rejection of a doctrine or belief"
                },
                word2: {
                    question: "Beguile",
                    answer: "influence by slyness"
                },
                word3: {
                    question: "Circumlocution",
                    answer: "an indirect way of expressing something"
                },
                word4: {
                    question: "Didactic",
                    answer: "instructive, especially excessively"
                },
                word5: {
                    question: "Equanimity",
                    answer: "steadiness of mind under stress"
                },
                word6: {
                    question: "Intransigent",
                    answer: "impervious to pleas, persuasion, requests, or reason"
                },
                word7: {
                    question: "Penchant",
                    answer: "a strong liking"
                },
                word8: {
                    question: "Serendipity",
                    answer: "good luck in making unexpected and fortunate discoveries"
                },
                word9: {
                    question: "Umbrage",
                    answer: "a feeling of anger caused by being offended"
                },
                word10: {
                    question: "Vociferous",
                    answer: "conspicuously and offensively loud"
                }
            },

            capitals: {
                capital1: {
                    question: "Afghanistan",
                    answer: "Kabul"
                },
                capital2: {
                    question: "Austria",
                    answer: "Vienna"
                },
                capital3: {
                    question: "Chile",
                    answer: "Santiago"
                },
                capital4: {
                    question: "Czech Republic",
                    answer: "Prague"
                },
                capital5: {
                    question: "Finland",
                    answer: "Helsinki"
                },
                capital6: {
                    question: "Israel",
                    answer: "Tel Aviv"
                },
                capital7: {
                    question: "Latvia",
                    answer: "Riga"
                },
                capital8: {
                    question: "Pakistan",
                    answer: "Islamabad"
                },
                capital9: {
                    question: "Syria",
                    answer: "Damascus"
                },
                capital10: {
                    question: "Yemen",
                    answer: "Sanaa"
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

        if (this.state.selectedPack.length) {
            randomCard = this.state.selectedPack[Math.floor(Math.random() * this.state.selectedPack.length)];
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
        return childCount
    }

    render() {
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