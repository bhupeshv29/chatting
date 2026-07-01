# Modern Chat

A real-time chat application built with React, TypeScript, and WebSockets.

## Architecture

- **`be/`** — Backend WebSocket server (Node.js + `ws` library, TypeScript). Listens on port 8080 and handles room-based messaging.
- **`fe/`** — Frontend SPA (React 18 + TypeScript + Vite + Tailwind CSS). Features a landing page and a chat interface with real-time messaging.

## Features

- Real-time messaging via WebSockets
- Room-based conversations (default: "general")
- Username-based identity
- Responsive, modern UI with Tailwind CSS

## Getting Started

### Backend

```bash
cd be
npm install
npm run dev
```

Starts the WebSocket server at `ws://localhost:8080`.

### Frontend

```bash
cd fe
npm install
npm run dev
```

Starts the Vite dev server (default `http://localhost:5173`).

Set `VITE_WS_URL` in `fe/.env` to customize the WebSocket URL (defaults to `ws://localhost:8080`).

## How It Works

1. A user enters their name on the chat page.
2. The client opens a WebSocket connection and sends a `join` message with the username.
3. Messages sent via the `chat` message type are broadcast to all users in the same room.
4. The backend relays messages with the sender's name attached.

<img width="1431" height="490" alt="image" src="https://github.com/user-attachments/assets/2d0670c7-b3df-4397-8b58-d27bde1da0bc" />
<img width="703" height="414" alt="image" src="https://github.com/user-attachments/assets/46c83f22-2495-4da9-9d05-23b2109e57e5" />
<img width="495" height="495" alt="image" src="https://github.com/user-attachments/assets/9601e071-17c4-4c82-95d3-cecd63fc84b1" />
