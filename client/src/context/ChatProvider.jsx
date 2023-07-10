"use client"

const { createContext, useState } = require("react")


export const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider