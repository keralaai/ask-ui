import React, { Component } from 'react'
import { connect } from 'react-redux'
import fuzzysearch from 'fuzzysearch'
import Icon from 'react-fa'
import lunr from 'lunr'

import './SearchPage.css'

import ThreadListDisplay from '../ThreadListDisplay/ThreadListDisplay'
import SearchWidget from '../SearchWidget/SearchWidget'

class SearchPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      threads: props.threads,
      lunr: lunr(function() {
        this.ref('id')
        this.field('title')
        this.field('content')

        props.threads.forEach(function(doc) {
          this.add({
            id: doc.id,
            title: doc.data.title,
            content: doc.data.content
          })
        }, this)
      })
    }

    this.handleClick = this.handleClick.bind(this)
  }

  filterThreads(threads, query) {
    let searchResult = this.state.lunr.search(query)
    let resultKeys = searchResult.map(result => {
      return result.ref
    })
    let resultObjects = threads.filter(object => resultKeys.indexOf(object.id) > -1)
    if (resultObjects.length === 0) {
      threads = threads.filter(object =>
        fuzzysearch(query.toLowerCase(), object.data.title.toLowerCase())
      )
    } else {
      threads = resultObjects
    }
    return threads
  }

  componentDidMount() {
    let searchTerm = this.props.match.params.searchTerm
    this.setState({
      ...this.state,
      threads: this.filterThreads(this.props.threads, searchTerm)
    })
  }

  componentWillReceiveProps(props) {
    let searchTerm = props.match.params.searchTerm
    this.setState({
      ...this.state,
      threads: this.filterThreads(props.threads, searchTerm),
      lunr: lunr(function() {
        this.ref('id')
        this.field('title')
        this.field('content')

        props.threads.forEach(function(doc) {
          this.add({
            id: doc.id,
            title: doc.data.title,
            content: doc.data.content
          })
        }, this)
      })
    })
  }

  handleClick(key) {
    this.props.history.push('/thread/' + key)
  }

  render() {
    let searchTerm = this.props.match.params.searchTerm
    let threads = this.state.threads
    return (
      <div className="SearchPage">
        <h2 className="page-title">Search results</h2>
        <SearchWidget objects={this.props.threads} />
        {threads.length > 0 ? (
          <ThreadListDisplay
            threads={threads}
            user={this.props.user}
            maxHeight="300px"
            handleClick={this.handleClick}
          />
        ) : (
          <p className="SearchPage-none">
            <Icon name="search" />
            <var>No results to show</var>
          </p>
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

export default connect(mapStateToProps)(SearchPage)
