import React from 'react'

import './LandingPageAvatar.css'

import firebase from '../../firebase.js'

class LandingPageAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    // Loads user data
    firebase
      .database()
      .ref('/users/' + this.props.id)
      .once('value', snap => {
        this.setState({
          ...this.state,
          user: snap.val()
        })
      })
  }

  componentWillReceiveProps(props) {
    firebase
      .database()
      .ref('/users/' + props.id)
      .once('value', snap => {
        this.setState({
          ...this.state,
          user: snap.val()
        })
      })
  }

  render() {
    let user = this.state.user
    return (
      <div className="LandingPageAvatar">
        {user != null && (
          <div className="LandingPageAvatar-data">
            <img className="LandingPageAvatar-user-image" src={user.displayImage} alt={user.displayName} />
            <span>{user.displayName}</span>
          </div>
        )}
      </div>
    )
  }
}

export default LandingPageAvatar
