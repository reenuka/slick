import React from 'react';
import { connect, sendMessage, sendTyping } from '../socketHelpers';
import { Input, Button, Popover, PopoverHeader, PopoverBody, Alert } from 'reactstrap';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import TypingAlert from './TypingAlert.jsx';
import ProgressBar from './ProgressBar.jsx';
import Body from './Body.jsx';
import Dropzone from 'react-dropzone';
import upload from 'superagent';

// The main component of the App. Renders the core functionality of the project.
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: null,
      progressValue: 0,
      popoverOpener: false,
      typer: '',
      typingWorkSpaceID: null,
      renderTyping: false,
      // Default message informs the user to select a workspace
      messages: [
        {
          text: 'Welcome to slackk-casa! Please select or create a workspace!',
          username: 'Slack-bot',
          id: 0,
          createdAt: new Date(),
          workspaceId: 0,
        },
      ],
      users: [],
      workSpaces: [],
      query: '',
      currentWorkSpaceId: 0,
      currentWorkSpaceName: '',
    };
    this.onDrop = this.onDrop.bind(this);
    this.toggler = this.toggler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    let server = location.origin.replace(/^http/, 'ws');
    // connect to the websocket server
    connect(server, this);
  }

  toggler() {
    this.setState({
      popoverOpener: !this.state.popoverOpener,
    });
  }


  onDrop(files) {
    this.messageStart();
    upload.post('/uploadimage')
      .attach('theseNamesMustMatch', files[0])
      .on('progress', (e) => {
        console.log('Percentage done: ', e.percent);
        this.setState({ progressValue: e.percent });
      })
      .end((err, res) => {
        if (err) console.log('ONDROP ERR ', err);
        console.log('SUCCESS ONDROP ', res);
        event.preventDefault();
        sendMessage({
          username: this.props.location.state.username,
          text: res.text,
          workspaceId: this.state.currentWorkSpaceId,
        });
      });
  }
  // changes the query state based on user input in text field
  handleChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  // sends message on enter key pressed and clears form
  // only when shift+enter pressed breaks to new line
  handleKeyPress(event) {
    // on key press enter send message and reset text box
    if (event.charCode === 13 && !event.shiftKey) {
      event.preventDefault();
      sendMessage({
        username: this.props.location.state.username,
        text: this.state.query,
        workspaceId: this.state.currentWorkSpaceId,
      });
      this.messageStart();
      // resets text box to blank string
      this.setState({
        query: '',
      });
    }
  }

  // sends keydown event to server to handle typing event
  handleKeyDown(event) {
    sendTyping({
      username: this.props.location.state.username,
      workspaceId: this.state.currentWorkSpaceId,
    });
  }

  // grabs all existing workspaces
  loadWorkSpaces() {
    fetch('/workspaces')
      .then(resp => resp.json())
      .then(workSpaces => this.setState({ workSpaces }))
      .catch(console.error);
  }

  messageStart() {
    this.setState({ progress: true });
  }

  messageProgressEnd() {
    this.setState({
      progressValue: 0,
      progress: null,
    });
  }


  // Helper function to reassign current workspace
  changeCurrentWorkSpace(id, name) {
    this.setState({ currentWorkSpaceId: id, currentWorkSpaceName: name });
  }
  // renders nav bar, body(which contains all message components other than input), and message input
  render() {
    let {
      messages, query, workSpaces, currentWorkSpaceId, currentWorkSpaceName,
    } = this.state;
    let typing;
    const timer = 5000;
    return (
      <div className="app-container">
        <NavBar currentWorkSpaceName={currentWorkSpaceName} username={this.props.location.state.username} />
        <ProgressBar progress={this.state.progress} progressValue={this.state.progressValue} />
        <Body
          messages={messages}
          workSpaces={workSpaces}
          loadWorkSpaces={() => this.loadWorkSpaces()}
          changeCurrentWorkSpace={(id, name) => this.changeCurrentWorkSpace(id, name)}
          currentWorkSpaceId={currentWorkSpaceId}
        />
        <div className="messages-input">
          <div className="image-input">
            <Button
              style={{
 height: '60px', width: '60px', color: 'black', 'background-color': '#ffffff', border: '1px solid #ced4da',
}}
              id="Popover2"
              onClick={this.toggler}
            >
            +
            </Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpener} target="Popover2" toggle={this.toggler}>
              <PopoverHeader>Upload a file!</PopoverHeader>
              <PopoverBody>
                <Dropzone onDrop={this.onDrop} >
                  <div> click here or drag and drop! </div>
                </Dropzone>
              </PopoverBody>
            </Popover>
          </div>
          <div className="input-container">
            <div className="typing-alert">
              {this.state.renderTyping && (this.state.currentWorkSpaceId === this.state.typingWorkSpaceID) && (this.state.typer !== this.props.location.state.username) ? <TypingAlert username={this.state.typer} /> : <Alert color="light" style={{ padding: '0 0 0 0', margin: '0 0 0 0', color: 'white' }} > you cant see this </Alert> }
            </div>
            <Input
              value={query}
              className="message-input-box"
              type="textarea"
              name="text"
              placeholder={`Message #${currentWorkSpaceName || 'select a workspace!'}`}
              onChange={event => this.handleChange(event)}
              onKeyPress={event => this.handleKeyPress(event)}
              onKeyDown={event => this.handleKeyDown(event)}
              // onKeyDown={clearTimeout(typing)}
              // onKeyUp={typing = setTimeout(() => { this.setState({ renderTyping: false }); }), timer}
            />
          </div>
        </div>
      </div>
    );
  }
}
