import { Component } from "react";

/**
 * External Imports
 */
import axios from "axios";
import { v4 } from "uuid";

/**
 * Imports components
 */
import Joke from "../Joke";

/**
 * Imports styling
 */
import "./JokeList.css";

/**
 * Defines the props interface
 */
interface JokeListProps {
  numJokesToGet: number;
}

/**
 * Defines the state interface
 */
interface JokeListState {
  jokes: TheJoke[];
  loading: boolean;
}

/**
 * Defines the Joke interface
 */
interface TheJoke {
  id: string;
  joke: string;
  votes: number;
}

/**
 * Displays the component
 */
class JokeList extends Component<JokeListProps, JokeListState> {
  seenJokes: Set<string>;
  constructor(props: JokeListProps) {
    super(props);
    this.seenJokes = new Set(this.state.jokes.map((j) => j.joke));
  }
  /**
   * Defines the default props
   */
  static defaultProps: JokeListProps = {
    numJokesToGet: 10
  };

  /**
   * Defines the default state
   */
  state: JokeListState = {
    jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    loading: false
  };

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  /**
   * Handles fetching jokes
   */
  getJokes = async () => {
    /**
     * Defines the default header
     */
    const header = {
      headers: { Accept: "application/json" }
    };
    let jokes: TheJoke[] = [];

    try {
      /**
       * Handles getting `numJokesToGet: number` jokes
       */
      while (jokes.length < this.props.numJokesToGet) {
        const { data } = await axios.get("https://icanhazdadjoke.com/", header);

        if (data) {
          if (!this.seenJokes.has(data.joke)) {
            jokes.push({ joke: data.joke, votes: 0, id: v4() });
          } else {
            console.log("Duplicate: ", data.joke);
          }
        }
      }
      this.setState(
        (state) => ({
          jokes: [...state.jokes, ...jokes],
          loading: false
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
      window.localStorage.setItem("jokes", JSON.stringify(jokes));
    } catch (error) {
      alert(error);
      this.setState({ loading: false });
    }
  };

  /**
   * Handles upvoting / downvoting a joke
   */
  handleVote = (id: string, delta: number) => {
    this.setState(
      (state) => ({
        jokes: state.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  };

  /**
   * Handles fetching new jokes
   */
  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  };

  render() {
    /**
     * Loading spinner while fetching data
     */
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading</h1>
        </div>
      );
    }

    /**
     * Sorts the jokes in descending order based on the vote
     */
    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://icanhazdadjoke.com/static/smile.svg" alt="" />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            More Jokes
          </button>
        </div>

        <div className="JokeList-jokes">
          {jokes.map((j) => (
            <Joke
              key={j.id}
              votes={j.votes}
              text={j.joke}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
