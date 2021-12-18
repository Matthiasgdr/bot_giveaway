import { gql } from '@apollo/client';

export const MESSAGE = gql`
    subscription message($channel: String!) {
        message(channel: $channel) {
            message
            author {
                username
                roles
            }
            emotes {
                id
                name
                locations
                images {
                    small
                    medium
                    large
                }
            }
            time
            ... on TwitchChatCommand {
                command
            }
        }
    }
`;

export const CHANNEL = gql`
    query channel($username: String!) {
        message(username: $username) {
            id
            username
        }
    }
`;
