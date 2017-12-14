import React, { Component } from 'react'
import Markdown from 'react-markdown'
import Overdrive from 'react-overdrive'

import './Thread.css'

import ThreadFooter from '../ThreadFooter/ThreadFooter'
import Loading from '../Loading/Loading'
import CodeBlock from '../CodeBlock/CodeBlock'

class Thread extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messageBubbled: false
    }

    // this.doneLoading = this.doneLoading.bind(this)
  }

  // doneLoading(){
  //   if (!this.state.messageBubbled){
  //     if (this.props.doneLoading)
  //       this.props.doneLoading()
  //     this.setState({
  //       ...this.state,
  //       messageBubbled: true,
  //     })
  //   }
  // }

  render() {
    let title = this.props.data.title
    let isAnswered = this.props.data.posts ? true : false
    let content = this.props.data.content
    let raise = this.props.raiseOnHover ? (isAnswered ? 'raise' : 'raise-faded') : ''
    let maxHeight = this.props.maxHeight ? this.props.maxHeight : 'none'
    let overflow = this.props.maxHeight ? 'auto' : 'none'
    let overdriveId = this.props.overdriveId ? this.props.overdriveId : ''
    if (this.props.data.user === undefined) {
      return <Loading initialMessage="Loading question, Just a sec." />
    }
    // this.doneLoading()
    let legend = 'Question'
    return (
      <div className={'Thread'} onClick={this.props.handleClick}>
        <Overdrive id={overdriveId}>
          <fieldset className={raise}>
            <legend>{legend}</legend>
            <h2 className="Thread-title">{title}</h2>
            {this.props.data.posts ? (
              <mark>Answered</mark>
            ) : (
              <mark className="Thread-prop-unanswered">Unanswered</mark>
            )}
            <hr className="Thread-seperator" />
            <div style={{ maxHeight: maxHeight, overflowY: overflow }}>
              <Markdown
                className={'Thread-content-markdown ' + (this.props.zoomout ? 'zoomout' : '')}
                source={content}
                escapeHtml={true}
                renderers={{
                  code: CodeBlock
                }}
              />
            </div>
            <ThreadFooter
              dockBottom={this.props.dockBottom}
              user={this.props.user}
              postKey={this.props.postKey}
              data={this.props.data}
            />
          </fieldset>
        </Overdrive>
      </div>
    )
  }
}

export default Thread
