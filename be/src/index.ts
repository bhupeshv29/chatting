import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
    name: string;
}

let users: User[] = [];

// Function to send periodic pings
function keepAlive() {
    users.forEach((user) => {
        if (user.socket.readyState === WebSocket.OPEN) {
            user.socket.ping();
        }
    });
}

// Set interval to send pings every 30 seconds
setInterval(keepAlive, 30000);

wss.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("message", (data) => {
        try {
            const msg = JSON.parse(data.toString());

            if (msg.type === "join") {
                users.push({ socket, room: msg.payload.roomId, name: msg.payload.name });
                console.log(`${msg.payload.name} joined room: ${msg.payload.roomId}`);
            }

            if (msg.type === "chat") {
                const user = users.find((u) => u.socket === socket);
                if (!user) return;

                const messageData = JSON.stringify({
                    sender: user.name,
                    message: msg.payload.message,
                });

                users.forEach((u) => {
                    if (u.room === user.room && u.socket.readyState === WebSocket.OPEN) {
                        u.socket.send(messageData);
                    }
                });
            }
        } catch (error) {
            console.error("Invalid message format:", error);
        }
    });

    socket.on("close", () => {
        users = users.filter((u) => u.socket !== socket);
        console.log("User disconnected.");
    });

    // Handle pong responses to detect active connections
    socket.on("pong", () => {
        console.log("Received pong from client.");
    });
});

console.log("WebSocket server running on ws://localhost:8080");