import React from "react";
import { observer } from "mobx-react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import PropTypes from 'prop-types'

@observer
class TodoList extends React.Component {
  newTodoItem = (newTodoTitle) => {
    this.props.store.addTodo(newTodoTitle);
  }

  render() {
    return (
      <div>
        <NewTodo handleFormSubmit={this.newTodoItem}/>
        <hr />
        <ul>
          {this.props.store.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.store.unfinishedTodoCount}
      </div>
    );
  }
}

TodoList.propTypes = {
  store: PropTypes.object.isRequired
}

export default TodoList;