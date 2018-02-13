import React, { Component } from 'react'
import './Doing.css'

import { Icon } from 'react-fa'

class Member extends Component {
  render() {
    return (
      <div className="Doing">
        <div className="Doing-detail">
          <div className="Doing-name">{this.props.data.name}</div>
          <div className="Doing-description">{this.props.data.description}</div>
          <a className="Doing-button" href={this.props.data.link} target="_blank">
            <div className="Doing-button-text" onClick={() => this.props.data.onClick()}>{this.props.data.button}{' '}</div>
            <Icon name="caret-right" />
          </a>
        </div>
      </div>
    )
  }
}

export default Member
