import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, {
            withCredentials: true,
            // extraHeaders: {
            //     'my-custom-header': 'abcd'
            // }
        });
        setName(name);
        setRoom(room);

        console.log(socket);
    }, [location.search]);

    return (
        <h1>Chat</h1>
    );
}

export default Chat;