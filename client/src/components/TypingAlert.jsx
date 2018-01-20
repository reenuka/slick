import React from 'react';
import { Alert } from 'reactstrap';


export default class TypingAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  randomEmoji() {
    const emojis = ['🧐', '🤔', '😡', '🤪', '😬', '🙄', '😂', '🍻', '🔥', '🍑', '💩', '🌚', '🍔', '🍆', '👨‍💻', '👩🏻‍💻', '❤️', '🐶'];
    let randomEmoji = Math.floor(Math.random() * Math.floor(emojis.length));
    return emojis[randomEmoji];
  }

  render() {
    console.log('username typing: ', this.props.username)
    return (
      <div>
        <Alert color="light" style={{padding: '0 0 0 0', margin: '0 0 0 0'}}>
          {this.randomEmoji()} {this.props.username} is typing {this.randomEmoji()}
        </Alert>
      </div>
    );
  }
}
