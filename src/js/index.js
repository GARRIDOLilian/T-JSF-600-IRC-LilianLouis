const socket = io();

socket.emit('getAllRoom');

socket.on('getRooms', res => {
  getRoomForIndex(res);
});

function getRoomForIndex(allRoom) {
  for (var i = 0; i < allRoom.length; i++) {
    const option = document.createElement('option');
    option.value = allRoom[i] ;
    option.innerText = allRoom[i];
    document.querySelector('#room').appendChild(option);
  }
};