import React from 'react';
import Message from './Message';
import NewMessage from './NewMessage';
import firebase from 'firebase/firebase-browser';

const ROOM_STYLE = {
  padding: '10px 30px'
};

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      messages: []
    };
    this.db = firebase.database();
    this.handleMessagePost = this.handleMessagePost.bind(this);
  }

  componentDidMount() {
    const { roomId } = this.props.params;
    // display the detail information for chat room when after component loaded
    this.fetchRoom();
  }

  // this will invoke when props is changed
  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps.params;
    if (roomId === this.props.params.roomId) {
      // Id is not changed
      return;
    }

    if (this.stream) {
      // remove the watching the message
      this.stream.off();
    }

    // Init the state again
    this.setState({ messages: [] });

    // display the detail information for chat room again
    this.fetchRoom(roomId);
  }

  // this will invoke when props was after updated
  componentDidUpdate() {
    setTimeout(() => {
      // scrolling to bottom of display
      this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
    }, 0);
  }

  // this will invoke when component is removed
  componentWillUnmount() {
    if (this.stream) {
      this.stream.off();
    }
  }

  // processing the sending message
  handleMessagePost(message) {
    const newItemRef = this.fbChatRoomRef.child('message').push();
    // using firebase user as chat user
    this.user = this.user || firebase.auth().currentUser;
    return newItemRef.update({
      writtenBy: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      },
      time: Date.now(),
      text: message
    });
  }

  fetchRoom(roomId) {
    // getting reference of chat room from firebase
    this.fbChatRoomRef = this.db.ref('/chatrooms/' + roomId);
    this.fbChatRoomRef.once('value').then(snapshot => {
      const { description } = snapshot.val();
      this.setState({ description });
      window.document.title = description;
    });

    this.stream = this.fbChatRoomRef.child('message').limitToLast(10);

    // listen child_added event on stream
    this.stream.on('child_added', item => {
      const { messages } = this.state || [];
      messages.push(Object.assign({ key: item.key }, item.val()));
      this.setState({ messages });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div style={ROOM_STYLE} ref={room => this.room = room}>
        <div className='list-group'>
          {messages.map(m => <Message key={m.key} message={m} />)}
        </div>
        <NewMessage onMessagePost={this.handleMessagePost} />
      </div>
    );
  }
}
