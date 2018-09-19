import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class ReviewPage extends Component {
    render() {
        return (
            <div>

                <Header />

                <div className="wrapper">

                    <div className="card cardInfo">

                        <div className="cardText">
                            <p>{this.props.selectedPack}</p>
                            <p>{`${this.props.deckLength} cards`}</p>
                        </div>

                        <Link to="/Cards">
                            <button
                                className="startDeck">Start Deck
                            </button>
                        </Link>

                    </div>

                </div>

            </div>
        );
    }
};

export default ReviewPage;