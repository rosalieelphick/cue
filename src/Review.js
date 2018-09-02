import React, { Component } from 'react';
import firebase from 'firebase';

let duplicatePack = [];
let reviewPack = [];
let randomCard;

// const dbRef = firebase.database().ref();
let newRef;
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

        newRef = firebase.database().ref(`/${this.props.packSelected}`)
        let reviewItem;
        reviewPack = [];
        console.log(reviewPack)
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

            });

        }); 
        
    }

    displayDeck = () => {

        this.render();

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
        const newState = Array.from(this.state.reviewPack);
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
        })

        // this.displayDeck();
        this.displayCard();

    }

    homePage = () => {
        reviewPack.length = 0;
    }

    delete = (e) => {
        newRef.child(randomCard.key).remove();
    }

    render() {

        return (


            <div>

                {this.state.nocards ?

                    <div>
                        <h1>no more cards tho</h1>
                        {/* <button onClick={this.deckAgain}>go through deck again</button> */}
                        <button onClick={this.displayDeck}>review again</button>
                        <button onClick={(e) => {this.props.homePage(); this.homePage()}}>home page</button>
                    </div>

                    :

                    <div>
                        {this.state.display ?
                            <div>

                                <div>
                                    <h1>{this.props.packSelected}</h1>
                                    <button onClick={this.displayDeck}>start review</button>
                                    <button onClick={this.props.homePage}>home page</button>
                                </div>

                            </div>
                            :
                            <div>
                                {this.state.answerShown ?
                                    <div>
                                        <p>{this.state.answer}</p>

                                        <button onClick={this.nextCard}>next card</button>

                                        <button onClick={this.delete}>delete from review</button>

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
            
            
        )
    }
}

export default Review;