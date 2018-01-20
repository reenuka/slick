import React from 'react';

//Individual message container
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { member } = this.props.member;

    //Styles for individual message component
    // const styles = {
    //   body: {
    //     padding: '15px 0 15px 0',
    //   },
    //   timeStamp: {
    //     fontSize: '10px',
    //     color: '#bdbdbd',
    //     marginLeft: '10px',
    //   },
    //   username: {
    //     fontSize: '24',
    //     fontWeight: 'bold',
    //     display: 'block',
    //     paddingBottom: '5px',
    //   },
    //   message: {
    //     fontSize: '0.9em',
    //     overflowWrap: 'break-word',
    //     textAlign: 'left',
    //     display: 'fixed',
    //     left: '63.99',
    //   },
    //   egg: {
    //     backgroundColor: color(),
    //     float: 'left',
    //     marginRight: '7px',
    //   },
    // };

    return (
      <div>
        <li member={this.member}>{this.member}</li>
      </div>
    );
  }
}
