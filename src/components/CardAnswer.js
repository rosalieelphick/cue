import React, { Component } from 'react';
import firebase from './firebase';
import Icon from './Icon';
import swal from 'sweetalert';


class CardAnswer extends Component {
    
    addToReview = () => {
        const reviewRef = firebase.database().ref(`${this.props.selectedPack}-review`)
        reviewRef.push(this.props.randomCard)
        swal("Added to Review!", {
            buttons: false,
            timer: 900
        });
    }

    deleteFromReview = () => {
        const reviewRef = firebase.database().ref(this.props.selectedPack)

        console.log(reviewRef)

        let reviewArray = [];

        reviewRef.on("value", (snapshot) => {
            console.log(snapshot.val());
            reviewArray = Object.entries(snapshot.val());
        })

        let deleteKey;

        reviewArray.forEach((card) => {
            if (card[1].question === this.props.randomCard.question) {
                deleteKey = card[0]
            }
        })

        const deleteRef = reviewRef.child(deleteKey)
        deleteRef.remove()
    }

    render() {

        return (
            <div className="wrapper">

                <div className="card">

                    <div className="cardHeader">
                        <p>{this.props.selectedPack}</p>
                        <p>{`${this.props.progress} / ${this.props.deckLength}`}</p>
                    </div>

                    <div className="cardText">
                        <p>{this.props.answer}</p>
                    </div>

                    <div className="buttonHolder">

                        {this.props.review ?

                        <button className="leftAlign" onClick={this.deleteFromReview}>
                                <Icon className="icon" icon={"wrong"} />
                                delete from review
                        </button>

                        :

                        <button className="leftAlign" onClick={this.addToReview}>
                            <Icon className="icon" icon={"wrong"} />
                            add to review
                        </button>
                    
                        }

                        <button className="rightAlign" onClick={this.props.nextCard}>
                            next card
                            <Icon className="icon" icon={"check"} />
                        </button>

                    </div>

                </div>

            </div>
        );
    }
};

export default CardAnswer;