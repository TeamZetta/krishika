import { ChatContext } from '@/context/ChatProvider'
import React, { useContext, useState, useEffect } from 'react'
import api from '../../../../packages/api-management/common'
import io from 'socket.io-client'
import { AppContext } from '@/context/ContextProvider'
import { ChevronRight } from 'lucide-react'

const ENDPOINT = 'http://localhost:5000'
var socket, selectedChatCompare

const ChatBody = () => {
    const { token, user } = useContext(AppContext)
    const { selectedChat } = useContext(ChatContext)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const fetchMessages = async () => {
        if (!selectedChat) return

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            setLoading(true)

            const { data } = await api.get(`/message/${selectedChat}`, config)

            setMessages(data)
            setLoading(false)

            socket.emit('join chat', selectedChat)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', user)
        socket.on('connected', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])

    useEffect(() => {
        fetchMessages()

        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        socket.on('message received', (msg) => {
            if (!selectedChatCompare || selectedChatCompare !== msg.chat._id) {
                if (!notification.includes(msg)) {
                    setNotification([msg, ...notification])
                    setFetchAgain(!fetchAgain)
                }
            }
            else {
                setMessages([...messages, msg])
            }
        })
    })

    const sendMessage = async (e) => {
        if (e.keyCode === 13 && newMessage) {
            socket.emit('stop typing', selectedChat)
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }

                const { data } = await api.post('/message', {
                    content: newMessage,
                    chatId: selectedChat
                }, config)
                setNewMessage('')


                socket.emit('new message', data)
                setMessages([...messages, data])
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        /* typing indicator logic */
        if (!socketConnected) return

        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id)
        }

        let lastTypingtime = new Date().getTime()
        var timerLength = 2000

        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDifference = timeNow - lastTypingtime

            if (timeDifference >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id)
                setTyping(false)
            }
        }, timerLength)
    }

    console.log(messages)

    return (
        <>
            {selectedChat ? <div>
                {messages.map((ele, idx) => {
                    return <div className='p-2 px-3 rounded-md shadow-sm bg-white my-2'>
                        <span>{ }</span>
                        <span>{ele.content}</span>
                    </div>
                })}


            </div> : <div></div>}

            <div className=" p-4 fixed z-20 bottom-0 left-0 right-0 flex gap-4 ">
                <input
                    onChange={typingHandler}
                    type="text"
                    className="w-[80vw] rounded-md shadow-md p-2 focus:outline-none "
                    placeholder="Enter your message"
                />
                <button className="bg-theme-blue shadow-md  text-white rounded-full p-3" onClick={sendMessage}>
                    <ChevronRight />
                </button>
            </div>
        </>
    )
}

export default ChatBody