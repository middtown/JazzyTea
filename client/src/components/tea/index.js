import React, { Component } from 'react';
import { getTeaByOwner, clearTeaByOwner } from '../../actions';
import { connect } from 'react-redux';

class TeaView extends Component {

  componentWillMount() {
    this.props.dispatch(getTeaByOwner(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearTeaByOwner(this.props.match.params.id));
  }

  renderTea = (tea) => (
    tea.tea ?
      <div className='br_container'>
        <div className='br_header'>
          <h2> {tea.tea.title}</h2>
            <div className='br_reviewer'>
              <span> Created By: </span> {tea.tea.creator}
               <br/>
          </div>
          <h4> Description: </h4> {tea.tea.descriptoin}
        </div>
        <div className='br_header'>
          <h3> Ingredients: </h3> {tea.tea.ingredients}
          <h3> Steeping: </h3> {tea.tea.steeping}
        </div>
      </div>
    : null
  );

  render() {
    let tea = this.props.tea;

    //console.log(`tea index props`);
    //console.log(this.props.tea);
    return (
      <div>
        {this.renderTea(tea)}
      </div>
    );
  }
};

function mapStateToProps(state) {
  console.log(state);

  return {
    tea: state.teas,
  };

}

export default connect(mapStateToProps)(TeaView);
