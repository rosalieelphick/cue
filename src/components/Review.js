import React, { Component } from 'react';
import firebase from 'firebase';
import Icon from './Icon';
import ProgressBar from './ProgressBar';

let duplicatePack = [];
let reviewPack = [];
let randomCard;
let newRef;
let newState;

class Review extends Component {

    constructor() {
        super();
        this.state = {
            packDisplay: false,
            nocards: false,
            answerShown: false,
            answer: '',
            question: '',
            display: true,
        }
    }

    componentDidMount() {
        newRef = firebase.database().ref(`/${this.props.packSelected}`);
        let reviewItem;
        newRef.on("value", (snapshot) => {
            snapshot.forEach((i) => {
                reviewItem = {
                    key: i.key,
                    value: i.val(),
                    duplicateCheck: i.val()[0]
                }

                duplicatePack.push(reviewItem)
                function removeDuplicates(myArr, prop) {
                    return myArr.filter((obj, pos, arr) => {
                        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                    });
                }

                reviewPack = removeDuplicates(duplicatePack, "duplicateCheck");
                console.log(reviewPack)
            });

        }); 
        
    }

    displayDeck = () => {
        
        this.componentDidMount();
        this.setState({
            reviewPack: reviewPack,
            display: false,
            packDisplay: true,
            nocards: false
        }, () => {
            this.displayCard();
        })
    }


    displayCard = () => {

        if (this.state.reviewPack.length) {

            randomCard = this.state.reviewPack[Math.floor(Math.random() * this.state.reviewPack.length)];

            this.setState({
                question: randomCard.value[1].question,
                answer: randomCard.value[1].answer
            })

        } else {
            this.setState({
                nocards: true
            })
        }

        const index = this.state.reviewPack.indexOf(randomCard);
        newState = Array.from(this.state.reviewPack);
        newState.splice(index, 1);
        this.setState({
            reviewPack: newState
        });

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
        });

        this.displayCard();
    }

    homePage = () => {
        reviewPack.length = 0;
    }

    delete = () => {

        const deleteRef = newRef.child(randomCard.key);
        deleteRef.set({}).then(() => {
            const index = reviewPack.indexOf(randomCard)
            reviewPack.splice(index, 1)
        });
    }

    render() {

        return (


            <div>

                {this.state.nocards ?

                    <div className="deckComplete">
                        <h2>Deck Complete</h2>

                        <button className="deckAgain" onClick={this.displayDeck}>
                            <div className="buttonIcon">
                                <Icon className="icon" icon={"redo"} />
                            </div>
                            <div className="buttonText">
                                Review deck again
                                </div>
                        </button>

                        <button onClick={(e) => { this.props.homePage(); this.homePage() }}>
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

                                <div className="card cardInfo cardReview">
                                    <div className="cardText">
                                    <p>Pack Review</p>
                                    <p className="packReview">{`${this.props.packSelected}`}</p>
                                    </div>

                                    <button className="startDeck" onClick={this.displayDeck}>
                                        start review
                                        <Icon className="icon" icon={"start"}/>
                                    </button>
                                </div>

                            </div>
                            :
                            <div>
                                {this.state.answerShown ?

                                    <div className="wrapper">

                                    <div className="card">

                                        <div className="cardHeader">
                                            <p>{`${this.props.packSelected}: review`}</p>
                                            <p>{`${(reviewPack.length) - (this.state.reviewPack.length)} / ${reviewPack.length}`}</p>
                                        </div>

                                        <div className="cardText">
                                            <p>{this.state.answer}</p>
                                        </div>

                                        <div className="buttonHolder">
                                            <button className="leftAlign" onClick={this.delete}>
                                                <Icon className="icon" icon={"wrong"} />
                                                delete from review
                                                </button>
                                            <button className="rightAlign" onClick={this.nextCard}>
                                                next card
                                                <Icon className="icon" icon={"check"} />
                                            </button>
                                        </div>
                                    </div>

                                        <ProgressBar deckLength={reviewPack.length} progress={(reviewPack.length) - (this.state.reviewPack.length)} />

                                    </div>

                                    :
                                    <div className="wrapper">


                                        <div className="card">
                                            <div className="cardHeader">
                                                <p>{`${this.props.packSelected}: review`}</p>
                                                <p>{`${(reviewPack.length) - (this.state.reviewPack.length)} / ${reviewPack.length}`}</p>
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
                                    
                                        <ProgressBar deckLength={reviewPack.length} progress={(reviewPack.length) - (this.state.reviewPack.length)} />

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

export default Review;