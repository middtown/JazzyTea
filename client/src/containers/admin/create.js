import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTea, clearNewTea } from '../../actions';

class CreateTea extends Component {

  state = {
    formdata: {
        title: '',
        description: '',
        creator: '',
        taste: '',
        steeping: '',
        ingredients: '',
        type: '',
        image: '',
      },
  };

  handleInput = (event, name) => {
    const newFormData = { ... this.state.formdata };
    newFormData[name] = event.target.value;

    this.setState({
      formdata: newFormData,
    });
  };

  showNewTea = (tea) => (
    tea.post ?
    <div className='conf_link'>
      New Tea !! <Link to={`/tea/${tea.teaId}`}>
      new
    </Link>
    </div>
    : null

  );

  submitForm = (event) => {
    event.preventDefault();
    console.log(this.state.formdata);
    this.props.dispatch(createTea({
      ...this.state.formdata,
      creatorId: this.props.user.login.id,
    }));
  };

  componentWillMount() {
    this.props.dispatch(clearNewTea());
  }

  render() {
    return (
      <div className='rl_container article'>
        <form onSubmit={this.submitForm}>
          <h2> Create Your Own Tea </h2>
          <div className='form_element'>
            <input type='text' placeholder='Enter Title'
              value={this.state.formdata.title}
              onChange={(event) => this.handleInput(event, 'title')}
              />
          </div>

          <div className='form_element'>
            <input type='text' placeholder='Enter Creator'
              value={this.state.formdata.creator}
              onChange={(event) => this.handleInput(event, 'creator')}
              />
          </div>

          <textarea
            placeholder='Enter Description'
            value={this.state.formdata.description}
            onChange={(event) => this.handleInput(event, 'description')}
          />

          <div className='form_element'>
            <input type='text' placeholder='Taste Like ?'
              value={this.state.formdata.taste}
              onChange={(event) => this.handleInput(event, 'taste')}
              />
          </div>

          <textarea
            placeholder='Made with?'
            value={this.state.formdata.ingredients}
            onChange={(event) => this.handleInput(event, 'ingredients')}
          />

          <textarea
            placeholder='How to make'
            value={this.state.formdata.steeping}
            onChange={(event) => this.handleInput(event, 'steeping')}
          />

          <div className='form_element'>
            <input type='text' placeholder='Tea Type'
              value={this.state.formdata.type}
              onChange={(event) => this.handleInput(event, 'type')}
              />
          </div>

          <div className='form_element'>
            <input type='text' placeholder='Image Link'
              value={this.state.formdata.image}
              onChange={(event) => this.handleInput(event, 'image')}
              />
          </div>

          <button type='submit'> Create Tea</button>

          {
            this.props.teas.newTea ?
            this.showNewTea(this.props.teas.newTea)
            : null
          }

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    teas: state.teas,
  };
}

export default connect(mapStateToProps)(CreateTea);
