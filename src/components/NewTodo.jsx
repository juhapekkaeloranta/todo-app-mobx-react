import React from "react";
import PropTypes from 'prop-types'

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({value: ""})
    this.props.handleFormSubmit(this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        New Todo:
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    )
  }
}

NewTodo.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
}

export default NewTodo