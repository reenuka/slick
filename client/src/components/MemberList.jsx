import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import Member from './Member.jsx';

//container for member components
export default ({ member, currentWorkSpaceId }) => (
  <div>
    <Container>
      <h1>testing testing testing</h1>
      <Member />
    </Container>
  </div>
);

// {member.map(member => <Member member={member} key={member.id} />)}
