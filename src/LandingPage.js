import React, { Component } from 'react';
import DeckPage from './DeckPage'


class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            display: true,
        }
    }

    handleClick = (e) => {
        this.setState({
            display: false,
            packSelected: e.target.id
        })
    }

    homePage = () => {
        this.setState({
            display: true
        })
    }

    render() {

        return (
            <section>

                {this.state.display ? 

                <div>
                    <h2>select a pack to review</h2>
                    <button onClick={this.handleClick} id="vocabulary">Vocabulary</button>
                    <button onClick={this.handleClick} id="capitals">capitals</button>
                </div>
                
                :
                
                <DeckPage packSelected={this.state.packSelected} homePage={this.homePage}/>

                }

            </section>
            
        )
    }
}

export default LandingPage;