import React, { Component } from 'react'
import { connect } from 'react-redux'
import Overdrive from 'react-overdrive'

import './ThreadList.css'
import firebase from '../../firebase.js'
import { updateThreads, userChanged } from '../../reducers.js'

import Loading from '../Loading/Loading'
import ThreadListDisplay from '../ThreadListDisplay/ThreadListDisplay'
import SearchWidget from '../SearchWidget/SearchWidget'

class ThreadList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      sorted: false,
      sortedThreads: []
    }
    if (props.threads.length > 0) {
      let sortedThreads = this.getSortedThreadList(props.threads)
      this.state = {
        loading: false,
        sorted: true,
        sortedThreads
      }
    }

    this.handleClick = this.handleClick.bind(this)
    this.getUpdatedSortedThreads = this.getUpdatedSortedThreads.bind(this)
  }

  componentDidMount() {
    if (this.props.threads && this.props.threads.length > 0) {
      this.setState({ ...this.state, loading: false })
    }
    let threadsRef = firebase.database().ref('threads')
    threadsRef.on('value', snapshot => {
      this.props.threadsChanged(snapshot.val())
      this.setState({ ...this.state, loading: false })
    })
  }

  handleClick(key) {
    this.props.history.push('/thread/' + key)
  }

  getLikes(object) {
    let likes = []
    for (let like in object.data.likes) {
      if (object.data.likes[like]) likes.push(like)
    }
    return likes.length
  }

  componentWillReceiveProps(props) {
    // Sorting everyt time a post is liked is a mess
    if (props.threads.length > 0 && !this.state.sorted) {
      let sortedThreads = this.getSortedThreadList(props.threads)
      this.setState({
        ...this.state,
        sorted: true,
        sortedThreads
      })
    } else if (this.state.sorted) {
      let updatedThreads = this.getUpdatedSortedThreads(
        [...this.state.sortedThreads],
        props.threads
      )
      this.setState({
        ...this.state,
        sortedThreads: updatedThreads
      })
    }
  }

  getSortedThreadList(threads) {
    return threads.sort((a, b) => this.getLikes(a) < this.getLikes(b))
  }

  getThreadWithKey(key, threads) {
    for (let thread in threads) {
      if (threads[thread].id === key) {
        return threads[thread]
      }
    }
    return false
  }

  getUpdatedSortedThreads(sortedThreads, newThreads) {
    let newSortedThreads = []
    for (let thread in sortedThreads) {
      let sortedThreadData = this.getThreadWithKey(sortedThreads[thread].id, newThreads)
      if (sortedThreadData !== false) newSortedThreads[thread] = sortedThreadData
    }
    return newSortedThreads
  }

  render() {
    let threads = this.state.sortedThreads
    return (
      <div className="ThreadList">
        {this.state.loading ? (
          <Loading initialMessage="Loading thread list. Just hang on." />
        ) : (
          <div>
            <SearchWidget objects={this.props.threads} />
            <Overdrive id="threadShowcase">
              <ThreadListDisplay
                threads={threads}
                user={this.props.user}
                bordered={true}
                raiseOnHover={true}
                maxHeight="200px"
                handleClick={this.handleClick}
              />
            </Overdrive>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    threads: state.threads
  }
}

const mapDispatchToProps = dispatch => {
  return {
    threadsChanged: threads => {
      dispatch(updateThreads(threads))
    },
    userChanged: user => {
      dispatch(userChanged(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)
