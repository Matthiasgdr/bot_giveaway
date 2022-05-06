import React from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatContainer } from './style.Chat';

const Chat = () => {
    const { chat } = useChat();

    return (
        <ChatContainer>
            {chat.map(message => (
                <div key={`${message.time}-${message.author}`}>
                    {message.author.username + ': ' + message.message}
                </div>
            ))}
        </ChatContainer>
    );
};

export default Chat;
