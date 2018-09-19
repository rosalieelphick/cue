import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Icon from './Icon';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="wrapper">

                    <Link to="/">
                        <Icon className="icon" icon={"allPacks"} />
                    </Link>

                    <h1>cue</h1>

                    <Link to="/AddPack">
                        <Icon className="icon" icon={"write"} />
                    </Link>
                </div>
            </header>  
        );
    }
};

export default Header;