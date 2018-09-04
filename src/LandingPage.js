import React, { Component } from 'react';
import DeckPage from './DeckPage';
import Icon from './Icon';


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

            <header>
                <div className="wrapper">
                <button onClick={this.homePage}>
                    <Icon className="icon" icon={"allPacks"} />
                </button>
                <h1>cue</h1>
                <button>
                    <Icon className="icon" icon={"write"} />
                </button>
                </div>
            </header>        

                {this.state.display ? 

                <div className="wrapper">

                    <h2>Select a pack to review</h2>

                    <button className="packDisplay addPack" onClick={this.handleClick} id="vocabulary">
                        <Icon className="icon" icon={"plus"} />
                        Add custom pack
                    </button>

                    <button className="packDisplay" onClick={this.handleClick} id="vocabulary">
                        Vocabulary
                    </button>

                    <button className="packDisplay" onClick={this.handleClick} id="capitals">
                        Capitals
                    </button>
                </div>
                
                :
                
                <DeckPage packSelected={this.state.packSelected} homePage={this.homePage}/>

                }

            </section>
            
        )
    }
}

export default LandingPage;