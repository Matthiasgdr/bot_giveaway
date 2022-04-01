import { MESSAGE } from '../services/subscription';
import { useSubscription } from '@apollo/client';
import { useParams } from 'react-router';

const useChat = propChannel => {
    const { channel } = useParams();

    const { data } = useSubscription(MESSAGE, {
        variables: {
            channel: propChannel || channel,
        },
    });

    return data?.message;
};

export default useChat;
