import React, { Component } from 'react'
import '../css/FirstScreen.css'
import { Link } from 'react-scroll';

export default class FirstScreen extends Component {
    render() {
        return (
            <div className='firstScreen-container'>
                <div className='firstScreen-content'>
                    <h1>Test assignment for front-end developer</h1>
                    <p>What defines a good front-end developer is
                        one that has skilled knowledge of HTML, CSS,
                        JS with a vast understanding of User design
                        thinking as they'll be building web interfaces
                        with accessibility in mind. They should also be
                        excited to learn, as the world of Front-End Development
                        keeps evolving.</p>
                    <button className='button'><Link to="signUp" spy={true} smooth={true} offset={50} duration={500}>Sign Up</Link></button>
                </div>
            </div>
        );
    }
}