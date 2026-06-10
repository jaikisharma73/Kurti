"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const Chatbot = () => {
    const { backendUrl, currency, navigate } = useContext(ShopContext);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const pathname = usePathname();
    const isHome = pathname === '/';
    const [showButton, setShowButton] = useState(!isHome);

    useEffect(() => {
        const handleScroll = () => {
            if (isHome) {
                if (window.scrollY > window.innerHeight * 0.8) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            } else {
                setShowButton(true);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome, pathname]);

    const initialWelcomeMessage = {
        sender: 'bot',
        text: "Hi there! I'm ZorryFash AI. 🛍️ How can I help you find clothes today?\n\nYou can search for clothes by category, color, or price. Try typing or clicking one of the suggestions below!",
        products: []
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedHistory = localStorage.getItem('zorryfash_chat_history');
            if (storedHistory) {
                try {
                    setMessages(JSON.parse(storedHistory));
                } catch (e) {
                    setMessages([initialWelcomeMessage]);
                }
            } else {
                setMessages([initialWelcomeMessage]);
            }
        } else {
            setMessages([initialWelcomeMessage]);
        }
    }, []);

    const saveMessages = (newMessages) => {
        setMessages(newMessages);
        if (typeof window !== 'undefined') {
            localStorage.setItem('zorryfash_chat_history', JSON.stringify(newMessages));
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isLoading, isOpen]);

    const handleSuggestionClick = (query) => {
        handleSendMessage(query);
    };

    const handleSendMessage = async (textToSend) => {
        const queryText = textToSend || inputText;
        if (!queryText.trim()) return;

        const userMsg = { sender: 'user', text: queryText, products: [] };
        const updatedMessages = [...messages, userMsg];
        saveMessages(updatedMessages);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/chat`, { message: queryText });
            if (response.data.success) {
                const botMsg = {
                    sender: 'bot',
                    text: response.data.text,
                    products: response.data.products || []
                };
                saveMessages([...updatedMessages, botMsg]);
            } else {
                const errorMsg = {
                    sender: 'bot',
                    text: "Sorry, I encountered an issue processing your request. Please try again.",
                    products: []
                };
                saveMessages([...updatedMessages, errorMsg]);
            }
        } catch (error) {
            console.error("Chatbot API Error:", error);
            const errorMsg = {
                sender: 'bot',
                text: "Unable to connect to ZorryFash AI. Please check your connection and try again.",
                products: []
            };
            saveMessages([...updatedMessages, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        if (typeof window !== 'undefined' && window.confirm("Are you sure you want to clear your chat history?")) {
            saveMessages([initialWelcomeMessage]);
        }
    };

    const parseMarkdown = (text) => {
        if (!text) return '';

        const boldRegex = /\*\*(.*?)\*\*/g;
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;

        let html = text
            .replace(boldRegex, '<strong>$1</strong>')
            .replace(linkRegex, '<a href="$2" class="underline text-[#c8a06e] font-semibold hover:text-[#b08a5b]">$1</a>')
            .replace(/\n/g, '<br />');

        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const suggestions = [
        "Show Bestsellers",
        "Black hoodies under 1000",
        "Men topwear under 500",
        "Women winterwear"
    ];

    return (
        <>
            {!isOpen && showButton && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 left-6 z-50 bg-[#c8a06e] text-white p-4 rounded-full shadow-lg shadow-[#c8a06e]/30 hover:scale-110 hover:bg-[#b08a5b] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group"
                    aria-label="Open Chatbot"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
                    </svg>
                    <span className="absolute left-14 bg-black text-white text-xs px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Chat with ZorryFash AI
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-0 left-0 w-full h-[85vh] sm:w-[380px] sm:h-[550px] sm:bottom-24 sm:left-6 z-50 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slideInScale">
                    
                    <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b border-[#c8a06e]/20">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#c8a06e] flex items-center justify-center font-bold text-black text-sm">
                                ZF
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm leading-tight">ZorryFash Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] text-gray-400">Online & Ready</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            
                            <button
                                onClick={handleClearChat}
                                className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-gray-800"
                                title="Clear Chat History"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-800"
                                aria-label="Close Chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-[#c8a06e] text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                        }`}
                                >
                                    {parseMarkdown(msg.text)}
                                </div>

                                
                                {msg.products && msg.products.length > 0 && (
                                    <div className="w-full mt-3 overflow-x-auto py-2 -mx-2 px-2 flex gap-3 scrollbar-hide">
                                        {msg.products.map((product) => (
                                            <div
                                                key={product._id}
                                                onClick={() => {
                                                    navigate(`/product/${product._id}`);
                                                    setIsOpen(false);
                                                }}
                                                className="min-w-[140px] max-w-[140px] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                            >
                                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                                    <img
                                                        src={product.image[0]}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-2 flex flex-col flex-1 justify-between">
                                                    <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mb-1">
                                                        {product.name}
                                                    </h4>
                                                    <div>
                                                        <p className="text-[#c8a06e] text-xs font-bold mb-1">
                                                            {currency}{product.price}
                                                        </p>
                                                        <button
                                                            className="w-full text-center py-1 bg-black text-white text-[9px] font-bold rounded hover:bg-[#c8a06e] hover:text-black transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(`/product/${product._id}`);
                                                                setIsOpen(false);
                                                            }}
                                                        >
                                                            View Item
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex flex-col items-start">
                                <div className="bg-white text-gray-400 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-1">
                                    <span className="text-xs mr-1 text-gray-400">AI is searching</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a06e] animate-[dotPulse_1.2s_infinite]"></span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a06e] animate-[dotPulse_1.2s_infinite_0.2s]"></span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a06e] animate-[dotPulse_1.2s_infinite_0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    
                    {messages.length <= 2 && !isLoading && (
                        <div className="px-4 py-2 bg-slate-50 border-t border-gray-100 overflow-x-auto flex gap-2 scrollbar-hide whitespace-nowrap">
                            {suggestions.map((sug, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(sug)}
                                    className="bg-white hover:bg-[#c8a06e]/10 border border-gray-200 hover:border-[#c8a06e] text-gray-600 hover:text-[#c8a06e] text-[11px] px-3 py-1.5 rounded-full transition-all cursor-pointer flex-shrink-0 font-medium shadow-sm"
                                >
                                    {sug}
                                </button>
                            ))}
                        </div>
                    )}

                    
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="bg-white px-4 py-3 border-t border-gray-100 flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Ask ZorryFash AI..."
                            disabled={isLoading}
                            className="flex-1 text-sm bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-[#c8a06e] rounded-full px-4 py-2 focus:outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isLoading}
                            className={`p-2.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${inputText.trim() && !isLoading
                                ? 'bg-black text-white hover:bg-[#c8a06e] hover:text-black'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                            aria-label="Send Message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
