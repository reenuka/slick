import React, { Component } from 'react';
import { Alert, Row, Col } from 'reactstrap';
import DirectMessageEntry from './DirectMessageEntry.jsx';
import CreateDirectMessage from './CreateDirectMessage.jsx';
import PropTypes from 'prop-types';

//Container for all workspaces
export default class DirectMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directMessager: '',
      //createFail usually happens if a workspace already exists
      createFail: false,
    };
    this.handleFail = this.handleFail.bind(this);
    this.getDirectMessager = this.getDirectMessager.bind(this);
    this.createWorkSpace = this.createWorkSpace.bind(this);
  }

  //grabs the value from the input field
  getDirectMessager(query) {
    this.setState({ directMessageQuery: query });
  }

  //posts the query to the server that results in a success or failed creation
  createWorkSpace() {
    let { loadWorkSpaces } = this.props;
    let { directMessageQuery, createFail } = this.state;
    this.setState({ createFail: false });
    if (directMessageQuery.length > 0) {
      fetch('/workspaces', {
        method: 'POST',
        body: JSON.stringify({ name: directMessageQuery }),
        headers: { 'content-type': 'application/json' },
      })
        .then(resp => (resp.status === 201 ? loadWorkSpaces() : this.setState({ createFail: true })))
        .catch(console.error);
    }
  }
  //helper for createWorkSpace
  handleFail() {
    this.setState({ createFail: false });
  }
  //renders everything to do with workspaces, including creation
  render() {
    let { changeCurrentWorkSpace, currentWorkSpaceId, workSpaces } = this.props;
    let { createFail, createStatus, directMessageQuery } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <h3 className="workSpace-header"> Workspaces </h3>{' '}
          </Col>
          <Col className="mt-2">
            <CreateWorkSpace
              getDirectMessager={this.getDirectMessager}
              createWorkSpace={this.createWorkSpace}
            />
          </Col>
        </Row>
        {workSpaces.map(workSpace => (
          <DirectMessage
            workSpace={workSpace}
            handleFail={() => this.handleFail}
            key={workSpace.id}
            changeCurrentWorkSpace={changeCurrentWorkSpace}
            currentWorkSpaceId={currentWorkSpaceId}
          />
        ))}
        <br />
        <br />
        {createFail ? <Alert color="danger"> Failed to create direct message </Alert> : undefined}
      </div>
    );
  }
}
//required prop types
DirectMessageList.propTypes = {
  workSpaces: PropTypes.array,
  currentWorkSpaceId: PropTypes.number,
}
