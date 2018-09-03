import React, { Component } from 'react';

class ProgressBar extends Component {

    getStyles = () => {

        const percentage = ((this.props.progress) / (this.props.deckLength))

        let barStyle = {
            backgroundColor: '#2d3848',
            height: '10px',
            width: `${percentage*100}%`,
            borderRadius: "5px",
            transition: "all 0.5s"
        };

        return (
            <div style={barStyle}></div>
        )
    }

    render() {
        return(

            <div className="barContainer">
                <div>{this.getStyles()}</div>
            </div>
            
        )
    }
}

export default ProgressBar;

