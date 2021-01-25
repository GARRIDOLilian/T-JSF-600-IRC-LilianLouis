import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Chat extends Component
{
    render()
    {
        return(

            <Router>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
                    integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
                    crossorigin="anonymous"
                />
                <link rel="stylesheet" href="css/style.css" />
            </head>
            <body>
                <div class="chat-container">
                    <header class="chat-header">
                    <h1><i class="fas fa-comment"></i> IRC</h1>
                    <a href="index.html" class="btn2">Leave Room</a>
                    </header>
                    <main class="chat-main">
                    <div class="chat-sidebar">
                        <h3><i class="fas fa-comments"></i> Room</h3>
                        <h2 id="room-name"></h2>
                        <h3><i class="fas fa-users"></i> Users</h3>
                        <ul id="users"></ul>
                    </div>
                    <div class="chat-messages"></div>
                    </main>
                    <div class="chat-form-container">
                    <form id="chat-form">
                        <input
                        id="msg"
                        type="text"
                        placeholder="Enter your message ..."
                        autocomplete="off"
                        />
                        <button class="btn2"><i class="fas fa-paper-plane"></i> Send</button>
                    </form>
                    </div>
                </div>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.4/qs.js" integrity="sha512-53y53BQwxZvk4YGd9SkHPqI7nDwlIIFZ4D2BSJG08Co7y6O3YsWeRtO6trPtdoyqfTCTkTbCulNosIAI6E4UvQ==" crossorigin="anonymous"></script>
                <script src="/socket.io/socket.io.js"></script>
                <script src="js/main.js"></script>
            </body>
            </Router>
        );
    }
}