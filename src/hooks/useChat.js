import { useState, useEffect } from 'react';
import { MESSAGE } from '../services/subscription';
import { useSubscription } from '@apollo/client';
import { useParams } from 'react-router';

export const useChat = propChannel => {
    const { channel } = useParams();
    const [chat, setChat] = useState([]);
    const { data } = useSubscription(MESSAGE, {
        variables: {
            channel: propChannel || channel,
        },
    });

    useEffect(() => {
        if (
            data?.message &&
            (chat.length === 0 ||
                chat[chat.length - 1].time !== data?.message?.time)
        )
            setChat(prev => [...prev, data?.message]);
    }, [data?.message]);

    return { message: data?.message, chat };
};

export default useChat;
