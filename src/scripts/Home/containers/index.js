import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class Home extends Component {
  componentDidMount () {
    // calls here
  }

  render () {
    return (
      <div className='main-wrapper'>
        <div className='header'>
          <span className='header__text'>All items</span>
        </div>
      </div>
    )
  }
}

// Prop Validation
Home.propTypes = {
}

// const mapStateToProps = (store) => ({
// })

// const mapDispatchToProps = (dispatch) => (
//   bindActionCreators({
//   }, dispatch)
// )

export default withRouter(Home)
