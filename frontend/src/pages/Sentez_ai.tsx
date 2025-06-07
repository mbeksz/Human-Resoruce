// frontend/src/pages/Sentez_ai.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import useSentezChat from '../../hooks/useSentezChat'; // Yolu dosya yapınıza göre kontrol edin
import ReactMarkdown from 'react-markdown'; // << Eklendi
import remarkGfm from 'remark-gfm'; // << Eklendi (Tablolar, görev listeleri vb. için)
import rehypeRaw from 'rehype-raw'; // << Eklendi (Ham HTML'i render etmek için)

const SentezChat: React.FC = () => {
    const { messages, isLoading, error, sendMessage } = useSentezChat();
    const [input, setInput] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        sendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-3xl mx-auto border rounded-lg shadow-sm bg-white">
            <div className="px-4 py-3 border-b font-semibold text-lg bg-gray-100">Sentez AI Chatbot</div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${msg.sender === 'user'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}
                        >
                            {/* Bot mesajı ise ReactMarkdown kullan, kullanıcı mesajı ise düz metin */}
                            {msg.sender === 'bot' ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    // Markdown çıktıları için Tailwind CSS sınıflarını özelleştirme
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mt-3 mb-1" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-base font-medium mt-2 mb-1" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 ml-4" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 ml-4" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                        img: ({ node, ...props }) => (
                                            <a href={props.src || ''} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    {...props}
                                                    className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition"
                                                    alt={props.alt || 'image'}
                                                />
                                            </a>
                                        ),
                                        video: ({ node, ...props }) => (
                                            <video
                                                {...props}
                                                controls
                                                className="w-full rounded-lg mt-2 mb-2"
                                            />
                                        ),
                                        // İsterseniz başka HTML etiketlerini de özelleştirebilirsiniz (tablolar, kod blokları vb.)
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[70%] px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 rounded-bl-none flex items-center">
                            <Loader2 className="animate-spin mr-2" size={16} />
                            Yazıyor...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {error && (
                <div className="p-3 text-red-600 text-sm text-center bg-red-50 border-t border-red-200">
                    {error}
                </div>
            )}

            <div className="p-3 border-t flex items-center gap-2 bg-gray-50">
                <input
                    type="text"
                    placeholder={isLoading ? "Yazıyor..." : "Mesajınızı yazın..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                </button>
            </div>
        </div>
    );
};

export default SentezChat;