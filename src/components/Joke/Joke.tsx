import { Component } from "react";

/**
 * Imports styling
 */
import "./Joke.css";

/**
 * Defines the props interface
 */
interface JokeProps {
  votes: number;
  text: string;
  upvote: () => void;
  downvote: () => void;
}

/**
 * Displays the component
 */
class Joke extends Component<JokeProps, {}> {
  /**
   * Changes the color of vote based on its number
   */
  getColor = () => {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#CDDC39";
    } else if (this.props.votes >= 6) {
      return "#FFEB3B";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  };

  /**
   * Changes emoji based on the num of votes
   */
  getEmoji = () => {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  };

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote} />
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote} />
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smiley">
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
