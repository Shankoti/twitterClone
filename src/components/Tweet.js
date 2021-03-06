import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";

class Tweet extends Component {
  state = {};
  toParent = (e, id) => {
    e.preventDefault();
    // todo: Redirect to parent Tweet.
  };
  handleLike = (e) => {
    e.preventDefault();
  };
  render() {
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>this tweet doesnt exist</p>;
    }
    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent,
    } = tweet;

    console.log(this.props);
    return (
      <div className="tweet">
        <img alt={name} className="avatar" src={avatar}></img>
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div> {formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const perentTweet = tweets[tweet.replyingTo];
  return {
    authUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authUser, perentTweet)
      : null,
  };
}

export default connect(mapStateToProps)(Tweet);
