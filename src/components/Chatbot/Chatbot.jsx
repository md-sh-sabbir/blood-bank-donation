import React, { useState, useRef, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I help you with the Blood Bank system today?' }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const axios = useAxios();

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };

    // Create new messages array first
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
        const response = await axios.post('/api/chatbot', {
            messages: newMessages,           // ← Now sending correct data
        });

        if (response.data?.reply) {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: response.data.reply }
            ]);
        } else {
            throw new Error("No reply from server");
        }
    } catch (error) {
        console.error("Chatbot Error:", error);

        const errorMessage = error.response?.status === 500 
            ? "Sorry, the AI is having trouble right now." 
            : "Sorry, I'm having trouble connecting to the server.";

        setMessages(prev => [
            ...prev,
            { role: 'assistant', content: errorMessage }
        ]);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
            >
                {isOpen ? (
                    <span className="text-xl font-bold">✕</span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-red-600 p-4 text-white font-bold">
                        Blood Bank Assistant
                    </div>

                    {/* Messages */}
                    <div className="h-96 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                                    msg.role === 'user'
                                        ? 'bg-red-600 text-white rounded-tr-none'
                                        : 'bg-white border text-gray-800 rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="text-xs text-gray-400 animate-pulse italic">
                                Assistant is typing...
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t bg-white flex gap-2">
                        <input
                            type="text"
                            value={input}
                            disabled={loading} // ✅ disable while loading
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={loading}
                            className={`bg-red-600 text-white p-2 rounded-full hover:bg-red-700 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;