'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

// Simple markdown to HTML converter for chatbot messages
function formatMarkdown(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code style="background:rgba(46,72,50,0.08);padding:1px 5px;border-radius:4px;font-size:13px;">$1</code>')
        .replace(/\n/g, '<br/>');
}

// Format timestamp
function formatTime(ts: number): string {
    const d = new Date(ts);
    return d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
}

const WELCOME_MESSAGE: Message = {
    role: 'assistant',
    content:
        'مرحباً بك في جامعة المروزي! 🎓\nأنا مساعد المروزي الذكي، كيف يمكنني مساعدتك اليوم?\n\nWelcome to Almarwazi University! How can I help you?\n\nKu soo dhawoow Jaamacadda Almarwazi! Sideen kugu caawin karaa?',
    timestamp: Date.now(),
};

// Rotating quick action sets
const QUICK_ACTION_SETS = [
    [
        { label: '🎓 الكليات', text: 'ما هي كليات الجامعة؟' },
        { label: '📞 التواصل', text: 'كيف أتواصل مع الجامعة؟' },
        { label: '🌍 الفروع', text: 'أين فروع الجامعة حول العالم؟' },
        { label: '📋 القبول', text: 'كيف يمكنني التسجيل في الجامعة؟' },
    ],
    [
        { label: '👨‍🏫 الأساتذة', text: 'من هم أساتذة الجامعة؟' },
        { label: '🏛️ العمادات', text: 'ما هي عمادات الجامعة؟' },
        { label: '🤝 الشراكات', text: 'ما هي الجامعات الشريكة؟' },
        { label: '📖 الرؤية', text: 'ما هي رؤية ورسالة الجامعة؟' },
    ],
    [
        { label: '🏫 عن الجامعة', text: 'أخبرني عن جامعة المروزي' },
        { label: '🎯 الأهداف', text: 'ما هي أهداف الجامعة؟' },
        { label: '📚 المكتبة', text: 'هل تتوفر مكتبة في الجامعة؟' },
        { label: '🧑‍🎓 رئيس الجامعة', text: 'من هو رئيس الجامعة؟' },
    ],
];

const STORAGE_KEY = 'marwazi-chatbot-history';

// Parse follow-up suggestions from AI response
function extractFollowUps(text: string): string[] {
    const lines = text.split('\n');
    const suggestions: string[] = [];
    let inSuggestionBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.includes('يمكنك أيضاً') || trimmed.includes('You can also ask') || trimmed.includes('Waxaad sidoo kale')) {
            inSuggestionBlock = true;
            continue;
        }
        if (inSuggestionBlock && (trimmed.startsWith('•') || trimmed.startsWith('-'))) {
            const suggestion = trimmed.replace(/^[•\-]\s*/, '').trim();
            if (suggestion.length > 5) {
                suggestions.push(suggestion);
            }
        }
    }
    return suggestions.slice(0, 3);
}

// Subtle notification sound using Web Audio API
function playNotificationSound() {
    try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(1100, audioCtx.currentTime + 0.08);
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.25);
    } catch {
        // Silently fail if audio isn't available
    }
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [followUps, setFollowUps] = useState<string[]>([]);
    const [quickActionSet] = useState(() => Math.floor(Math.random() * QUICK_ACTION_SETS.length));
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const hasShownTooltip = useRef(false);

    // Load chat history from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            }
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    // Save chat history to localStorage
    useEffect(() => {
        if (messages.length > 1) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
            } catch {
                // Ignore storage full errors
            }
        }
    }, [messages]);

    // Show tooltip after 4 seconds for first-time visitors
    useEffect(() => {
        if (hasShownTooltip.current) return;
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowTooltip(true);
                hasShownTooltip.current = true;
                setTimeout(() => setShowTooltip(false), 5000);
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const clearChat = () => {
        const freshWelcome: Message = { ...WELCOME_MESSAGE, timestamp: Date.now() };
        setMessages([freshWelcome]);
        setFollowUps([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const sendMessage = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isLoading) return;

        const userMessage: Message = { role: 'user', content: messageText, timestamp: Date.now() };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setFollowUps([]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            const decoder = new TextDecoder();
            let assistantContent = '';

            // Add empty assistant message
            setMessages((prev) => [...prev, { role: 'assistant', content: '', timestamp: Date.now() }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter((line) => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.content) {
                                assistantContent += parsed.content;
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = {
                                        role: 'assistant',
                                        content: assistantContent,
                                        timestamp: Date.now(),
                                    };
                                    return updated;
                                });
                            }
                        } catch {
                            // Skip malformed chunks
                        }
                    }
                }
            }

            // Extract follow-up suggestions
            const suggestions = extractFollowUps(assistantContent);
            if (suggestions.length > 0) {
                setFollowUps(suggestions);
            }

            // Play notification sound
            playNotificationSound();
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى. 🔄\nSorry, a connection error occurred. Please try again.',
                    timestamp: Date.now(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowTooltip(false);
    };

    const currentQuickActions = QUICK_ACTION_SETS[quickActionSet];
    const showQuickActions = messages.length <= 1 && !isLoading;

    return (
        <>
            {/* Animated Tooltip */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        className="chatbot-tooltip"
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={toggleChat}
                    >
                        <span>اسألني أي شيء! 💬</span>
                        <div className="chatbot-tooltip-arrow" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                onClick={toggleChat}
                className="chatbot-fab"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
                aria-label="فتح المحادثة"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            <path d="M8 10h.01" />
                            <path d="M12 10h.01" />
                            <path d="M16 10h.01" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-content">
                                <div className="chatbot-avatar">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <div className="chatbot-header-text">
                                    <h3>مساعد المروزي 🤖</h3>
                                    <span className="chatbot-status">
                                        <span className="chatbot-status-dot" />
                                        متصل الآن
                                    </span>
                                </div>
                            </div>
                            <div className="chatbot-header-actions">
                                {/* New Chat Button */}
                                <button
                                    onClick={clearChat}
                                    className="chatbot-new-chat-btn"
                                    aria-label="محادثة جديدة"
                                    title="محادثة جديدة"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                    </svg>
                                </button>
                                {/* Close Button */}
                                <button
                                    onClick={toggleChat}
                                    className="chatbot-close-btn"
                                    aria-label="إغلاق المحادثة"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    className={`chatbot-message ${message.role === 'user' ? 'chatbot-message-user' : 'chatbot-message-assistant'}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0.1 : 0 }}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="chatbot-message-avatar">🎓</div>
                                    )}
                                    <div className="chatbot-bubble-wrapper">
                                        <div
                                            className={`chatbot-bubble ${message.role === 'user' ? 'chatbot-bubble-user' : 'chatbot-bubble-assistant'}`}
                                            dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
                                        />
                                        <span className="chatbot-timestamp">{formatTime(message.timestamp)}</span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Shimmer typing indicator */}
                            {isLoading && messages[messages.length - 1]?.content === '' && (
                                <motion.div
                                    className="chatbot-message chatbot-message-assistant"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="chatbot-message-avatar">🎓</div>
                                    <div className="chatbot-bubble chatbot-bubble-assistant">
                                        <div className="chatbot-shimmer">
                                            <div className="chatbot-shimmer-line chatbot-shimmer-line-1" />
                                            <div className="chatbot-shimmer-line chatbot-shimmer-line-2" />
                                            <div className="chatbot-shimmer-line chatbot-shimmer-line-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Follow-up Suggestions */}
                        <AnimatePresence>
                            {followUps.length > 0 && !isLoading && (
                                <motion.div
                                    className="chatbot-followups"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="chatbot-followups-label">💡 أسئلة مقترحة:</span>
                                    <div className="chatbot-followups-list">
                                        {followUps.map((q, i) => (
                                            <motion.button
                                                key={i}
                                                className="chatbot-followup-btn"
                                                onClick={() => { setFollowUps([]); sendMessage(q); }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                {q}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Quick Actions (on first open) */}
                        {showQuickActions && (
                            <motion.div
                                className="chatbot-quick-actions"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {currentQuickActions.map((action, index) => (
                                    <motion.button
                                        key={index}
                                        className="chatbot-quick-btn"
                                        onClick={() => sendMessage(action.text)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        {action.label}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}

                        {/* Input Area */}
                        <div className="chatbot-input-area">
                            <div className="chatbot-input-wrapper">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="اكتب رسالتك هنا... ✍️"
                                    className="chatbot-input"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || isLoading}
                                    className="chatbot-send-btn"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        style={{ transform: 'rotate(180deg)' }}
                                    >
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </motion.button>
                            </div>
                            <p className="chatbot-powered-by">مدعوم بالذكاء الاصطناعي 🧠</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
