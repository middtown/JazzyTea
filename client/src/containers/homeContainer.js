import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeas } from '../actions';
import TeaItem from '../widgetsUI/teaItem';

class HomeContainer extends Component {

  componentWillMount() {
    console.log('will mount');
    this.props.dispatch(getTeas());
  };

  renderTeas = (teas) => (
    teas.list ?
      teas.list.map(item => (
        <TeaItem {...item} key={item._id} />
      ))
    : null
  );

  // loadmore = () => {
  //   let count = this.props.teas.list.length;
  //   this.props.dispatch(getTeas(2, count, 'desc', this.props.list.teas));
  // };
  // <div className='loadmore' onClick={this.loadmore} > Load More </div>

  render() {
    //console.log(this.props);
    return (
    this.props.teas &&
      <div> {this.renderTeas(this.props.teas)}


      </div>

    );
  }
};

function mapStateToProps(state) {
  return {
    teas: state.teas,
  };
}

export default connect(mapStateToProps)(HomeContainer);
