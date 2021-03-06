import React, { Component } from 'react';
import Icon from './Icon';
import Header from './Header';
import { Link } from 'react-router-dom';

class DeckPage extends Component {

    render() {
        return (

            <div>

                <Header />

                <div className="wrapper">

                    <div className="card cardInfo">

                        <div className="cardText">
                            <h2>{this.props.selectedPack}</h2>
                            <p className="cardNumber">{`${this.props.deckLength} cards`}</p>
                        </div>

                        <Link to="/Cards">
                            <button
                                className="startDeck">Start Deck
                                <Icon className="icon" icon={"start"} />
                            </button>
                        </Link> 

                    </div>

                </div>
            
            </div>

        )
    }

}

export default DeckPage;