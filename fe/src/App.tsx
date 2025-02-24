import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
    const [username, setUsername] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8080";

    useEffect(() => {
        if (!username) return;

        const newWs = new WebSocket(WS_URL);
        setWs(newWs);

        newWs.onopen = () => {
            newWs.send(JSON.stringify({ type: "join", payload: { roomId: "general", name: username } }));
        };

        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, data]);

            // Auto-scroll to bottom
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        };

        return () => newWs.close();
    }, [username]);

    const sendMessage = () => {
        const message = inputRef.current?.value.trim();
        if (!message || !ws) return;

        ws.send(JSON.stringify({ type: "chat", payload: { message } }));
        inputRef.current.value = "";
    };

    // Handle "Enter" key press for chat
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") sendMessage();
    };

    // Handle clicking "Join Chat" button
    const joinChat = () => {
        if (inputName.trim()) setUsername(inputName.trim());
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            {!username ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-2xl font-bold mb-4">Enter your name to start chatting</h2>
                    <input
                        className="p-2 text-black rounded-md mb-2"
                        placeholder="Your name..."
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <button
                        onClick={joinChat}
                        className="px-4 py-2 bg-blue-600 rounded text-white"
                    >
                        Join Chat
                    </button>
                </div>
            ) : (
                <>
                    <div className="p-4 text-center text-xl font-bold bg-gray-800">Modern Chat</div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.sender === username ? "items-end" : "items-start"}`}>
                                <span className="text-sm text-gray-400">{msg.sender}</span>
                                <span className={`p-3 rounded-lg max-w-xs break-words ${msg.sender === username ? "bg-blue-500" : "bg-gray-700"}`}>
                                    {msg.message}
                                </span>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                    <div className="flex p-4 bg-gray-800">
                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            className="flex-1 p-2 rounded bg-gray-700 text-white"
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 rounded">
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;