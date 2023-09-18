import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state,action) => {
    switch(action.type){
      case "VOTE":
        return `voted for ${action.payload}`
      case "CREATE":
        return `${action.payload} created`
    case "REMOVE":
        state=null
       return state
    }
   }

const NotificationContext = createContext()


export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 'initial')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext