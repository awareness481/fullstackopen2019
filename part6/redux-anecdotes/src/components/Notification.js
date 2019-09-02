import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => async () => {
    await sleep(5000);
    props.removeNotification()
  }, [props.notification]);

 

    if (props.notification) {
      return (
      <div style={style}>
        {props.notification}
       </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    } 
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)