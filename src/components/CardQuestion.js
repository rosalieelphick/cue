import React, { Component } from 'react';
import Icon from './Icon';

class CardQuestion extends Component {
    render() {
        return (

            <div className="wrapper">
                <div className="card">

                    <div className="cardHeader">
                        <p>{this.props.selectedPack}</p>
                        <p>{`${this.props.progress} / ${this.props.deckLength}`}</p>
                    </div>

                    <div className="cardText">
                        <h3>{this.props.question}</h3>
                    </div>

                    <div className="buttonHolder">
                        <button className="rightAlign" onClick={this.props.showAnswer}>
                            show answer
                            <Icon className="icon" icon={"rightArrow"} />
                        </button>
                    </div>
                </div>
            </div>
            
        );
    }
};

export default CardQuestion;