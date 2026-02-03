import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import storeAuth from '../context/storeAuth';
import { FaPaperPlane, FaComments } from 'react-icons/fa';

// Conexión fuera del componente para evitar reconexiones múltiples
const socket = io(import.meta.env.VITE_BACKEND_URL.replace('/api', ''), {
    transports: ['websocket', 'polling']
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const { nombre } = storeAuth();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Debug connection
        socket.on('connect', () => {
            console.log("Connected to socket server:", socket.id);
        });

        socket.on('connect_error', (err) => {
            console.error("Socket connection error:", err);
        });

        // Escuchar mensajes entrantes
        socket.on('chat_message', (data) => {
            console.log("Message received:", data);
            setMessages((prev) => [...prev, data]);
        });

        // Limpiar listener al desmontar
        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('chat_message');
        };
    }, []);

    useEffect(() => {
        // Auto-scroll al fondo
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (currentMessage.trim()) {
            const messageData = {
                user: nombre || "Estudiante",
                message: currentMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                socketId: socket.id // Para identificar mis propios mensajes
            };

            socket.emit('chat_message', messageData);
            setCurrentMessage("");
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-170px)] bg-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-primary p-4 flex items-center shadow-md z-10">
                <FaComments className="text-white text-2xl mr-3" />
                <h2 className="text-white text-xl font-bold">Chat Comunitario</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pattern">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-10 italic">
                        No hay mensajes aún. ¡Sé el primero en saludar!
                    </div>
                )}

                {messages.map((msg, index) => {
                    const isMyMessage = msg.user === (nombre || "Estudiante") && msg.socketId === socket.id;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}
                        >
                            <div
                                className={`max-w-[80%] md:max-w-[60%] p-3 rounded-2xl shadow-sm relative ${isMyMessage
                                    ? "bg-secondary text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                                    }`}
                            >
                                <div className={`text-xs font-bold mb-1 ${isMyMessage ? "text-indigo-100" : "text-primary"}`}>
                                    {msg.user}
                                </div>
                                <p className="leading-relaxed breaks-words">{msg.message}</p>
                                <div className={`text-[10px] text-right mt-1 ${isMyMessage ? "text-indigo-100" : "text-gray-400"}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-2">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-md transition-colors flex items-center justify-center w-12 h-12"
                    disabled={!currentMessage.trim()}
                >
                    <FaPaperPlane className="ml-[-2px] mt-px" />
                </button>
            </form>
        </div>
    );
};

export default Chat;
