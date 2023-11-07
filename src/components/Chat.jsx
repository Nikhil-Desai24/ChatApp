import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import Cam from '../img/cam.png';
import More from '../img/more.png';
import Add from '../img/add.png';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
console.log('ChatContext data:', data)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span> {/* Display user's name */}
        <div className="chatIcons">
          <img src={Cam} alt="Camera" />
          <img src={Add} alt="Add" />
          <img src={More} alt="More" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
