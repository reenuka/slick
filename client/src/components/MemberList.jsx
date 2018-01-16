import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import Member from './Member.jsx';

//container for member components
export default ({ member, currentWorkSpaceId }) => (
  <div>
    <Container>
      <Member />
    </Container>
  </div>
);

// {member.map(member => <Member member={member} key={member.id} />)}
