import React, { Component } from 'react';
import CardQuestion from './CardQuestion';
import CardAnswer from './CardAnswer';
import DeckComplete from './DeckComplete';
import Header from './Header';
import ProgressBar from './ProgressBar';

let randomCard;

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            answerShown: false,
            noCards: false,
            review: false
        }
    }

    componentDidMount () {
        console.log(this.props.packArray.length)
        this.setState({
            packArray: this.props.packArray,
            selectedPack: this.props.selectedPack,
            deckLength: this.props.deckLength
        }, () => {
            if (this.state.selectedPack.includes("review")) {
                this.setState({
                    review: true
                })
            }
            this.displayCard();
        })
    }

    displayCard = () => {
        if (this.state.packArray.length) {
            randomCard = this.state.packArray[Math.floor(Math.random() * this.state.packArray.length)];
            console.log(randomCard)
            this.setState({
                question: randomCard.question,
                answer: randomCard.answer,
            })
        } else {
            this.setState({
                noCards: true
            })
        }

        const index = this.state.packArray.indexOf(randomCard);
        const newState = Array.from(this.state.packArray);
        newState.splice(index, 1);
        this.setState({
            packArray: newState,
            progress: this.state.deckLength - newState.length
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

    deckAgain = () => {
        this.setState({
            packArray: this.props.packArray,
            noCards: false,
            deckLength: this.props.deckLength,
            progress: 0
        }, () => {
            this.displayCard()
        })
    }

    reviewWrongAnswers = (packId) => {
        this.props.selectPack(packId);
    }

    render() {

        return (

            <section>

                <Header />

                {this.state.noCards ? 
                    <DeckComplete 
                        deckAgain={this.deckAgain}
                        review={this.state.review}
                        reviewWrongAnswers={this.reviewWrongAnswers}
                        selectedPack={this.state.selectedPack}
                    />
                : 
            
                    <div>

                    {this.state.answerShown ?

                        <CardAnswer 
                            deckLength={this.state.deckLength}
                            answer={this.state.answer}
                            nextCard={this.nextCard}
                            randomCard={randomCard}
                            selectedPack={this.state.selectedPack}
                            review={this.state.review}
                            progress={this.state.progress}
                        />
                    
                        :

                        <CardQuestion 
                            deckLength={this.state.deckLength}
                            question={this.state.question}
                            showAnswer={this.showAnswer}
                            progress={this.state.progress}
                            selectedPack={this.state.selectedPack}
                        />

                    }

                    <ProgressBar 
                        deckLength={this.state.deckLength}
                        progress={this.state.progress}
                    />

                    </div>

                }

            </section>

        )
    }
};

export default Cards;