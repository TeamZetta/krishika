import { AppContext } from '@/context/ContextProvider'
import { isSameSenderMargin, isSameUser } from '@/lib/ChatLogics'
import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(AppContext)

  return (
    <ScrollableFeed>
      {messages && messages.map((msg, i) => (
        <div className='p-2 px-3 rounded-md shadow-sm bg-white my-2' key={msg._id}
          style={{
            marginLeft: isSameSenderMargin(messages, msg, i, user._id),
            marginTop: isSameUser(messages, msg, i) ? 3 : 8
          }}
        >
          <span>{ }</span>
          <span>{msg.content}</span>
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat