import React from 'react'
import { activitySentence } from '../helpers/activityHelpers'

const Activity = ({ activities, users }) => {

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const activityList = activities.map(activity => {
    return (
      <li key={`Activity-ID-${activity.id}`}>{activitySentence(users[activity.user_id]['name'], activity.verb, activity.object, activity.value )} <span className="text-muted">on {new Date(activity.created_at).toLocaleDateString('en-US', dateOptions)}</span></li>
    )
  })
  return (

    <ul className="list-unstyled">
    { activityList }
    </ul>
  )
}

export default Activity