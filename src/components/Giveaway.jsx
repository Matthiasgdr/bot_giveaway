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
    const containerRef = useRef()
    const { channel } = useParams()

    const { data } = useSubscription(MESSAGE, {
        variables: {
            channel
        }
    })

    const pick = () => {
        const winner = users[Math.round(Math.random()*users.length)]
        const proxy = cloneDeep(users)
        proxy.forEach(p => {
            if (p?.id !== winner.id) {
                p.win = 'lose'
                const spaceX = winner.x - p.x
                const spaceY = winner.y - p.y
                if ((spaceX < 200 && spaceX > -200) && (spaceY < 120 && spaceY > -120)) {
                    let multiplicateurX = ((200 - Math.abs(spaceX)) * 4) / 200
                    let multiplicateurY = ((120 - Math.abs(spaceY)) * 7) / 120
                    p.x = p.x - (spaceX * multiplicateurX + 20)
                    p.y = p.y - (spaceY * multiplicateurY + 20)
                }
            } else {
                p.win = 'win'
            }
        })
        setUsers(proxy)
    }

    useEffect(() => {
        const message = data?.message
        if (message) {
            if (message.author.username === 'Bardolino' && message.message === 'pick') {
                pick()
            }
            setUsers(prev => [...prev, {
                id: id(), username: message.author.username,
                x: Math.round(Math.random()*(containerRef.current.clientWidth - 50)),
                y: Math.round(Math.random()*(containerRef.current.clientHeight - 50)),
                win: 'none'
            }])
        }
    }, [data?.message])


    return (
        <BodyContainer >
            <div className='user-wrapper' ref={containerRef}>
                <button className='button' onClick={pick}>pick</button>
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
