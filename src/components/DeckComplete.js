import React, { Component } from 'react';
import Icon from './Icon';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class DeckComplete extends Component {
    render() {
        return (
        <div className="deckComplete">

            <h2>Deck Complete</h2>

            <button className="deckAgain" onClick={this.props.deckAgain}>
                <div className="buttonIcon">
                    <Icon className="icon" icon={"redo"} />
                </div>
                <div className="buttonText">
                    Go through deck again
                </div>
            </button>

            {this.props.review ?

            null

            :

            <Link to="/ReviewPage">
                <button className="buttonText"
                    id={`${this.props.selectedPack}-review`}
                    onClick={(e) => {
                        this.props.reviewWrongAnswers(e.target.id)
                    }}
                >
                    <div className="buttonIcon">
                        <Icon className="icon" icon={"wrong"} />
                    </div>
                    Review wrong answers
                </button>
            </Link>

            }

            <Link to="/" >
                <button className="buttonText">
                    <div className="buttonIcon">
                        <Icon className="icon" icon={"allPacks"} />
                    </div>
                    Home page
                </button>
            </Link>
                
        </div> 
        );
    }
};

export default DeckComplete;