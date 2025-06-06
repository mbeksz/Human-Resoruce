// frontend/hooks/useSentezChat.ts
import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../api/config'; // API_BASE_URL'ı doğru yoldan çekiyoruz

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    id: number;
}

interface UseSentezChatReturn {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (message: string) => Promise<void>;
}

const useSentezChat = (): UseSentezChatReturn => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isLoading) return;

        const userMessageId = Date.now();
        const newUserMessage: ChatMessage = { sender: 'user', text: message.trim(), id: userMessageId };
        setMessages((prev) => [...prev, newUserMessage]);
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/sentez/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Kimlik doğrulama token'ı varsa buraya ekleyin
                    // Örn: 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ message: message.trim() }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'API hatası oluştu');
            }

            const data = await response.json();
            const botMessage: ChatMessage = { sender: 'bot', text: data.response || 'Cevap alınamadı.', id: Date.now() + 1 };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err: any) {
            console.error('Mesaj gönderirken hata oluştu:', err);
            setError(`Hata: ${err.message}. Lütfen tekrar deneyin.`);
            const errorMessage: ChatMessage = { sender: 'bot', text: `Üzgünüm, mesajınız gönderilemedi: ${err.message}`, id: Date.now() + 1 };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]); // isLoading bağımlılığı önemli, döngüye girmemesi için

    return { messages, isLoading, error, sendMessage };
};

export default useSentezChat;