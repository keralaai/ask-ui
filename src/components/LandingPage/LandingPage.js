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
          let admins = [...snap.val()]
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
        <div className="stripes-container">
          <div className="stripe stripe-white" />
          <div className="stripe stripe-black" />
          <div className="stripe stripe-white" />
          <div className="stripe stripe-black" />
          <div className="stripe stripe-white" />
          <div className="stripe stripe-black" />
          <div className="stripe stripe-white" />
        </div>
        <h1 className="LandingPage-header">Kerala AI Initiative</h1>
        <div className="LandingPage-banner-container">
          <div className="LandingPage-banner">
            A group of guys from Kerala who like ML and would like to build an ML community in Kerala.
            <br/>
            Well that is pretty much all we got to describe ourself.
          </div>
        </div>
        <h1 className="LandingPage-ask">
          Got a question to <span onClick={() => this.props.history.push('/ask')}>ask</span> us?
        </h1>
        {admins.length > 0 && (
          <div className="LandingPage-container-container">
            <h3 className="LandingPage-admin-header">Admins</h3>
            <div className="LandingPage-admins-container">
              <div className="LandingPage-admins">
                {admins.map(admin => <LandingPageAvatar key={admin.uid} id={admin.uid} history={this.props.history} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LandingPage
