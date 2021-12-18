import React, { useState, useEffect, useRef } from 'react'
import  styled  from 'styled-components'
import { useSubscription } from '@apollo/client';
import { v4 as id } from 'uuid'
import { cloneDeep } from 'lodash'
import { useParams } from 'react-router'

import { MESSAGE } from '../services/subscription'

import User from './User'

const Body = () => {
    const [users, setUsers] = useState([])
    const [started, setStarted] = useState(false)
    const containerRef = useRef()
    const { channel } = useParams()

    const { data } = useSubscription(MESSAGE, {
        variables: {
            channel
        }
    })

    const pick = () => {
        const winner = users[Math.floor(Math.random()*users.length)]
        const proxy = cloneDeep(users)
        proxy.forEach(p => {
            if (p?.id !== winner.id) {
                p.win = 'lose'
                const spaceX = winner.x - p.x
                const spaceY = winner.y - p.y
                if ((spaceX < 200 && spaceX > -200) && (spaceY < 120 && spaceY > -120)) {
                    let multiplicateurX = ((200 - Math.abs(spaceX)) * 4) / 200
                    let multiplicateurY = ((120 - Math.abs(spaceY)) * 7) / 120
                    p.x = p.x - (spaceX * multiplicateurX)
                    p.y = p.y - (spaceY * multiplicateurY)
                }
            } else {
                p.win = 'win'
            }
        })
        setUsers(proxy)
    }

    const start = () => {
        setStarted(true)
    }

    const stop = () => {
        setStarted(false)
    }

    const reset = () => {
        setUsers([])
    }

    useEffect(() => {
        const message = data?.message
        if (message?.command === 'start' && (message.author.roles.includes('BROADCASTER') || message.author.roles.includes('MODERATOR'))) {
            start()
        }
        if (message?.command === 'pick' && (message.author.roles.includes('BROADCASTER') || message.author.roles.includes('MODERATOR'))) {
            pick()
        }
        if (message?.command === 'reset' && (message.author.roles.includes('BROADCASTER') || message.author.roles.includes('MODERATOR'))) {
            reset()
        }
        if (message && started) {
            if (message.command === 'stop' && (message.author.roles.includes('BROADCASTER') || message.author.roles.includes('MODERATOR'))) {
                stop()
            }
            if (message.command === 'giveaway' /* && !users.find(u => u !== message.author.username)*/) {
                setUsers(prev => [...prev, {
                    id: id(), username: message.author.username,
                    x: Math.round(Math.random()*(containerRef.current.clientWidth - 50)),
                    y: Math.round(Math.random()*(containerRef.current.clientHeight - 50)),
                    win: 'none'
                }])
            }
        }
    }, [data?.message])


    return (
        <BodyContainer >
            <div className='user-wrapper' ref={containerRef}>
                {users.map(user => <User key={user.id} user={user} />)}
            </div>
        </BodyContainer>
    );
};

const BodyContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    padding: 30px;
    .user-wrapper{
        position: relative;
        height: 100%;
        width: 100%;
        button {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 20;
        }
    }
`

export default Body;
