import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Chat from './Chat';

export default class App extends Component
{
  render()
  {
    return(

      <Router>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
          integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
          crossorigin="anonymous"
        />
      </head>
      <body>
        <div class="join-container">
          <header class="join-header">
            <h1><i class="fas fa-comment"></i> IRC</h1>
          </header>
          <main class="join-main">
            <form>
              <div class="form-control">
                <label for="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username..."
                  required
                />
              </div>
              <div class="form-control">
                <label for="room">Room</label>
                <select name="room" id="room">
                  <option value="Global">Global</option>
                </select>
              </div>
              <Link to="/chat"><button type="submit" class="btn">Join Chat</button></Link>
            </form>
          </main>
        </div>
        <Route path="/chat" exact component={Chat} />
        <script src="/socket.io/socket.io.js"></script>
        <script src="js/index.js"></script>
      </body>
      </Router>

    );
  }
}
