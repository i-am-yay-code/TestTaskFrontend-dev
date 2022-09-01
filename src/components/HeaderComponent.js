import React, { Component } from 'react'
import '../css/HeaderComponent.css'
import Logo from '../assets/Logo.svg'
import { Link } from 'react-scroll'

export default class Header extends Component {

    render() {
        return (
            <div className='container-fluid'>
                <div className='header'>
                    <a href='/' className='header__home'>
                        <img src={Logo}></img>
                    </a>
                    <div className='header__buttons'>
                        <button className='button'><Link to="users" spy={true} smooth={true} offset={50} duration={500}>Users</Link></button>
                        <button className='button'><Link to="signUp" spy={true} smooth={true} offset={50} duration={500}>Sign Up</Link></button>
                    </div>
                </div>
            </div >
        )
    }
}