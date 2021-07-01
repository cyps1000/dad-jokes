import { Component } from "react";

/**
 * Imports components
 */
import JokeList from "./components/JokeList";

/**
 * Imports styling
 */
import "./App.css";

/**
 * Displays the App
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeList />
      </div>
    );
  }
}

export default App;
