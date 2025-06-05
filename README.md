# Leongram

A modern chat application powered by AI that provides different personalities for different types of conversations.

## Features

- Multiple AI personalities for different types of conversations
- Real-time chat interface
- Modern, responsive UI built with React and Tailwind CSS
- AI-powered responses using OpenAI's GPT-3.5

## Project Structure

```
leongram/
├── front/               # Frontend React application
│   ├── src/
│   │   ├── modules/    # React components
│   │   └── ...
│   └── package.json
└── server/             # Backend Node.js server
    ├── index.js        # Express server setup
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd leongram
```

2. Install frontend dependencies

```bash
cd front
npm install
```

3. Install backend dependencies

```bash
cd ../server
npm install
```

4. Create a `.env` file in the server directory with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

### Running the Application

1. Start the backend server:

```bash
cd server
node index.js
```

The server will run on http://localhost:5001

2. In a new terminal, start the frontend:

```bash
cd front
npm run dev
```

The frontend will run on http://localhost:5173

## Available Chat Personalities

1. General Assistant - Helpful for any general questions
2. Code Helper - Programming and technical assistance
3. Creative Writer - Help with writing and storytelling
4. Math Tutor - Mathematics and problem-solving
5. Language Teacher - Language learning assistance

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Vite
- Backend:
  - Node.js
  - Express
  - OpenAI API

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
