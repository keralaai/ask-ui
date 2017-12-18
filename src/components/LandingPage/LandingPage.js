import React from 'react'

import './LandingPage.css'

import firebase from '../../firebase.js'

import LandingPageAvatar from '../LandingPageAvatar/LandingPageAvatar'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      admins: []
    }
  }

  componentWillMount() {
    // Populates admin ids, each seperate admin will be obtained in the AdminAvatar component
    firebase
      .database()
      .ref('/private/mods')
      .once(
        'value',
        snap => {
          let admins = [...snap.val(), ...snap.val(), ...snap.val()]
          this.setState({
            ...this.state,
            admins
          })
        },
        error => console.error(error)
      )
  }

  render() {
    let admins = this.state.admins
    return (
      <div className="LandingPage">
        <h1 className="LandingPage-header">Kerala AI Initiative</h1>
        <div className="LandingPage-banner-container">
          <div className="LandingPage-banner">
            A lot of content here with maybe an image on the right to maybe just spice up things a bit.
          </div>
        </div>
        <h1 className="LandingPage-header">
          Got a question to <mark onClick={() => this.props.history.push('/ask')}>Ask</mark> us?
        </h1>
        {admins.length > 0 && (
          <div className="LandingPage-container-container">
            <h3 className="LandingPage-admin-header">Admins</h3>
            <div className="LandingPage-admins-container">
              <div className="LandingPage-admins">
                {admins.map(admin => <LandingPageAvatar key={admin.uid} id={admin.uid} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LandingPage
