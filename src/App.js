import React, {Component} from 'react';
import {database} from './firebase'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      newData: ''
    };

    this.dataRef = database.ref('/');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRef.on('value', (snapshot) => {
      this.setState({
          data: snapshot.val(),
        }
      )
    });
  }

  handleChange(event) {
    this.setState({
      newData: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.dataRef.push(this.state.newData);
    this.setState({ newData: '' });
  }

  render() {
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase</h2>
        </div>
        <pre className="App--data">
          {JSON.stringify(this.state.data, null, 2)}
        </pre>
        <form classID="App--form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newData} onChange={this.handleChange} />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;
