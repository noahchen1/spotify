import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Client_ID = 'ee791348c2724f159aa8c08bd6783452'
const Redirect_URI = 'https://music-player-eigq.onrender.com'
// const Redirect_URI = 'http://localhost:3000'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${Client_ID}&response_type=code&redirect_uri=${Redirect_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const loginButtonContainer = {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    alignItems: 'center'
}

const LoginButton = styled.button`
    position: relative;
    padding: 1em 0.5em;
    border-radius: 12px; 
    border-style: none;
    background-color: #1DB954;
    color: white; 
    font-weight: 900;
    font-size: 1.1em;
    cursor: pointer; 

    &:before {
        content: '';
        position: absolute; 
        width: 100%;
        height: 100%;
        top: 0;
        background: linear-gradient(45deg, transparent, white, transparent);
        left: -100%;
        transition: 0.5s ease-in-out;
    }        

    &:hover::before {
        left: 150%;
    }

    &:before.is-avtive {
        background -color: black;
    }
`

const Ripple = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    background: #fff;
    border-radius: 50%;
    opacity: 1;
    animation: 0.9s ease 1 forwards ripple-effect;
    z-index: 99;

    @keyframes ripple-effect {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(20);
          opacity: 0.375;
        }
        100% {
          transform: scale(40);
          opacity: 0;
        }
`



export default function Login() {



    const [coords, setCoords] = useState({ x: -1, y: -1 })
    const [isRippling, setIsRippling] = useState(false)

    useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setIsRippling(true)
            setTimeout(() => setIsRippling(false), 300)
        } else setIsRippling(false)
    }, [coords])

    useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 })
    }, [isRippling])


    return (

        <div style={loginButtonContainer}>
            <a href={AUTH_URL}>
                <LoginButton

                    onClick={e => {
                        const rect = e.target.getBoundingClientRect()                                                 // Get mouse coordinate when click event occurs
                        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })                              // Update coordinates for ripple effect to take place 
                        //setTimeout(() => { window.location.href = AUTH_URL }, 1000)
                    }}>Log in with Spotify

                    {isRippling ? (
                        <Ripple
                            style={{
                                left: coords.x,                                                                          // Set x coordinate of ripple effect
                                top: coords.y                                                                            // Set y coordinate of ripple effect 
                            }}
                        />) : ('')}

                </LoginButton>
            </a>
        </div>
    )
}
