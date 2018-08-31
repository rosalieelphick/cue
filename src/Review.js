import React, { Component } from 'react';
import firebase from 'firebase';


const dbRef = firebase.database().ref()
class Review extends Component {


    componentDidMount() {
        const newRef = firebase.database().ref(`/${this.props.packSelected}`)
        newRef.on("value", (snapshot) => {
            console.log(snapshot.val());
        })

    }
    
    render() {

        
        // console.log(newRef.database)
        return (
            <div>
                <h1>{this.props.packSelected}</h1>
            </div>
            
        )
    }
}

export default Review;