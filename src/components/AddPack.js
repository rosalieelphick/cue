import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Icon from './Icon';
import firebase from './firebase';
import swal from 'sweetalert';


class AddPack extends Component {
    constructor() {
        super();
        this.state = {
            readyToAdd: false,
            cardList: [],
            currentEditQuestion: "",
            currentEditAnswer: "",
            title: "Add Custom Pack"
        }
    }


    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    submitTitle = (e) => {
        e.preventDefault();
        this.setState({
            readyToAdd: true
        })
    }

    handleQuestionChange = (e) => {
        console.log(e.target.value)
        this.setState({
            currentQuestion: e.target.value,
        })
    }

    handleAnswerChange = (e) => {
        console.log(e.target.value)
        this.setState({
            currentAnswer: e.target.value,
        })
    }

    addCard = (e) => {
        e.preventDefault();
        const cardArray = Array.from(this.state.cardList)
        const cardObject = {
            question: this.state.currentQuestion,
            answer: this.state.currentAnswer,
            edit: false
        }

        cardArray.push(cardObject)

        this.setState({
            cardList: cardArray
        })

        document.getElementById("addCardForm").reset();
    }

    removeCard = (index) => {
        console.log(index)
        const cardArray = Array.from(this.state.cardList)
        cardArray.splice(index, 1)
        this.setState({
            cardList: cardArray
        })
    }

    editCard = (index) => {
        const cardArray = Array.from(this.state.cardList)

        const cardObject = {
            question: cardArray[index].question,
            answer: cardArray[index].answer,
            edit: true
        }

        cardArray.splice(index, 1, cardObject)
        this.setState({
            cardList: cardArray,
            currentEditQuestion: cardArray[index].question,
            currentEditAnswer: cardArray[index].answer,
        })
    }

    handleEditQuestion = (e) => {
        this.setState({
            currentEditQuestion: e.target.value
        })
    }

    handleEditAnswer = (e) => {        
        this.setState({
            currentEditAnswer: e.target.value
        })
    }

    saveEdit = (e, index) => {
        e.preventDefault();
        const cardArray = Array.from(this.state.cardList) 

        const editedObject = {
            question: this.state.currentEditQuestion,
            answer: this.state.currentEditAnswer,
            edit: false
        }

        cardArray.splice(index, 1, editedObject);

        this.setState({
            cardList: cardArray
        })
    }

    createPack = () => {

        const cardArray = Array.from(this.state.cardList);

        cardArray.forEach((card) => {
            delete card.edit
        })

        console.log(cardArray);

        const newRef = firebase.database().ref(this.state.title);

        cardArray.forEach((card) => {
            newRef.push(card)
        })

        swal("Pack Created!", {
            icon: "success",
            buttons: false,
            timer: 1000,
        });
        
    }

    render() {
        
        return (
            <section>

                <Header />
                <div className="wrapper">
                    <h2>{this.state.title}</h2>  
                    <form action="" className="addTitleForm">
                        <input type="text" id="packTitle" className="packTitle" placeholder="pack title" onChange={(e) => {this.handleTitleChange(e) }}/> 
                        <input type="submit" className="submitPackTitle" value="submit title" onClick={(e) => { this.submitTitle(e)}}/>
                    </form>
                </div>

                {this.state.readyToAdd

                ?

                <div>

                <div className="wrapper">
                <ul className="cardList">
                    {this.state.cardList.map((card) => {
                        return (

                            <div>

                            {card.edit ?

                            <li>
                                <form action="" className="formEdit">

                                    <button className="saveEdit" onClick={(e) => {this.saveEdit(e, this.state.cardList.indexOf(card))}}>
                                        <Icon className="icon" icon={"check"} />
                                    </button>

                                    <input type="text" onChange={(e) => {this.handleEditQuestion(e)}} defaultValue={card.question}/>
                                    <input type="text" onChange={(e) => { this.handleEditAnswer(e) }}defaultValue={card.answer}/>
                                </form>
                            </li>

                            :

                            <li>
                                <button className="deleteCard" onClick={(e) => {this.removeCard(this.state.cardList.indexOf(card))}}>
                                    <Icon className="icon" icon={"wrong"} />
                                </button>
                                <button className="editCard" onClick={(e) => {this.editCard(this.state.cardList.indexOf(card))}}>
                                    <Icon className="icon" icon={"write"} />
                                </button>
                                <h3>{card.question}</h3>
                                <p>{card.answer}</p>
                            </li>

                            }

                            </div>
                        ) 
                    })}
                </ul>
                </div>

                <div className="wrapper">
                <form action="" id="addCardForm" className="addCardForm clearfix">
                    <input type="text" className="addCardQuestion" onChange={(e) => {this.handleQuestionChange(e)}} placeholder="question"/>
                    <input type="text" className="addCardQuestion" onChange={(e) => { this.handleAnswerChange(e) }}placeholder="answer" />
                    <input type="submit" className="addCardSubmit" value="+" onClick={this.addCard}/>
                </form>
                </div>


                {this.state.cardList.length 
                ? 
                
                <div className="wrapper">
                    <Link to="/">
                        <button className="createPack" onClick={() => {this.createPack()}}>create pack</button>
                    </Link>
                </div>
                
                : null }
        
                </div>
        
                : null }
                

            </section>
        );
    }
};

export default AddPack;