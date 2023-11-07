import React, { useState } from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'; // Import arrayUnion
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

 const handleSend = async () => {
  try {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress updates here if needed
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              const newMessage = {
                id: uuid(),
                senderId: currentUser.uid,
                date: new Date(), // Use a date object here, or you can use Firestore Timestamp if needed
                img: downloadURL,
              };

              await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion(newMessage),
              });
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        }
      );
    } else {
      const newMessage = {
        id: uuid(),
        senderId: currentUser.uid,
        date: new Date(), // Use a date object here, or you can use Firestore Timestamp if needed
        text, // Add text to the message object
      };

      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion(newMessage),
      });
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
await updateDoc(doc(db,'userChats',currentUser.uid),{
  [data.chatId+ '.lastMessage']:{
    text
  },
  [data.chatId+'.date']:serverTimestamp()
})
await updateDoc(doc(db,'userChats',data.user.uid),{
  [data.chatId+ '.lastMessage']:{
    text
  },
  [data.chatId+'.date']:serverTimestamp()
})
  setText('')
  setImg(null)
};


  return (
    <div className="input">
      <input type="text" placeholder="Type something...." onChange={(e) => setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: 'none' }} id="file" onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
