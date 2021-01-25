const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', message => {
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message from server
socket.on('messageSave', message => {
  socket.emit('addMessageDB', message);
});

// Message from server Not Save in DB
socket.on('messageNoSave', message => {
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  const roomName = msg.substring(6, msg.length);

  if (!msg){
    return false;
  }
  else if (msg.startsWith("/join" + " ")) {
    const roomName = msg.substring(6, msg.length);
    window.location.replace("http://localhost:3000/chat.html?username=" + username + "&room=" + roomName);
  }
  else if (msg === "/quit") {
    window.location.replace("http://localhost:3000/index.html");
  }
  else if(msg.startsWith("/nick" + " ")) {
    const newName = msg.substring(6, msg.length);
    window.location.replace("http://localhost:3000/chat.html?username=" + newName + "&room=" + room);
  }

  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {

  //BotMessage
  if (message.username === "Chat Bot") {
    const div = document.createElement('div');
    div.classList.add('botmessage');
    const bg = document.createElement('div');
    bg.classList.add('botbackground');
    div.appendChild(bg);
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span> [${message.time}]</span>`;
    bg.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    bg.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }

  //ThisUserMessage
  else if (message.username === username) {
    //ThisUserPrivateMessage
    if ((message.text).startsWith("[Private]")) {
      const div = document.createElement('div');
      div.classList.add('usermessage');
      const bg = document.createElement('div');
      bg.classList.add('userbackground');
      div.appendChild(bg);
      const p = document.createElement('p');
      p.classList.add('meta');
      p.innerText = message.username;
      p.innerHTML += `<span> [${message.time}]</span>`;
      bg.appendChild(p);
      const para = document.createElement('p');
      para.classList.add('text');
      para.classList.add('text-muted');
      para.innerText = message.text;
      bg.appendChild(para);
      document.querySelector('.chat-messages').appendChild(div);
    }
    //ThisUserNormalMessage
    else {
      const div = document.createElement('div');
      div.classList.add('usermessage');
      const bg = document.createElement('div');
      bg.classList.add('userbackground');
      div.appendChild(bg);
      const p = document.createElement('p');
      p.classList.add('meta');
      p.innerText = message.username;
      p.innerHTML += `<span> [${message.time}]</span>`;
      bg.appendChild(p);
      const para = document.createElement('p');
      para.classList.add('text');
      para.innerText = message.text;
      bg.appendChild(para);
      document.querySelector('.chat-messages').appendChild(div);
    }
  }

  //NormalMessage
  else {
    if ((message.text).startsWith("[Private]")) {
      const div = document.createElement('div');
      div.classList.add('message');
      const bg = document.createElement('div');
      bg.classList.add('background');
      div.appendChild(bg);
      const p = document.createElement('p');
      p.classList.add('meta');
      p.innerText = message.username;
      p.innerHTML += `<span> [${message.time}]</span>`;
      bg.appendChild(p);
      const para = document.createElement('p');
      para.classList.add('text');
      para.classList.add('text-muted');
      para.innerText = message.text;
      bg.appendChild(para);
      document.querySelector('.chat-messages').appendChild(div);
    }
    else {
      const div = document.createElement('div');
      div.classList.add('message');
      const bg = document.createElement('div');
      bg.classList.add('background');
      div.appendChild(bg);
      const p = document.createElement('p');
      p.classList.add('meta');
      p.innerText = message.username;
      p.innerHTML += `<span> [${message.time}]</span>`;
      bg.appendChild(p);
      const para = document.createElement('p');
      para.classList.add('text');
      para.innerText = message.text;
      bg.appendChild(para);
      document.querySelector('.chat-messages').appendChild(div);
    }
  }
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }
