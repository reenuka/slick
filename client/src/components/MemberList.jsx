import React, { Component } from 'react';
import { Alert, Row, Col } from 'reactstrap';
import Member from './Member.jsx';
import CreateWorkSpace from './CreateWorkSpace.jsx';
import PropTypes from 'prop-types';

//Container for all workspaces
export default class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ["a", "b", "c"]
    }
  }

  //renders everything to do with workspaces, including creation
  render() {
    return (
      <div>
        <h3>Member List</h3>
        <ul>
          {this.state.users.map(member => (
            <Member member={member}/>
          ))}
        </ul>
      </div>
    );
  }
}
//required prop types
// MemberList.propTypes = {
//   members: PropTypes.array,
//   currentWorkSpaceId: PropTypes.number,
// }
