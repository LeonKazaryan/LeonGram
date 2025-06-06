# Leongram

A modern chat application powered by AI that provides different personalities for different types of conversations.

## Features

- Multiple AI personalities for different types of conversations
- Real-time chat interface with optimistic updates powered by TanStack Query
- Automatic data caching and background refetching
- Error handling with automatic retries and rollbacks
- Built-in dev tools for debugging and monitoring queries
- Modern, responsive UI built with React and Tailwind CSS
- AI-powered responses using OpenAI's GPT-3.5

## Project Structure

```
leongram/
├── front/               # Frontend React application
│   ├── src/
│   │   ├── modules/    # React components
│   │   ├── hooks/      # Custom hooks (including TanStack Query hooks)
│   │   ├── api/        # API integration layer
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
6. Polish Language Tutor - Polish language learning
7. Russian Gopnik - Russian language with a twist

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - TanStack Query (React Query) for data fetching and state management
  - Tailwind CSS for styling
  - Vite for build tooling
  - React Router for navigation
- Backend:
  - Node.js
  - Express
  - OpenAI API

## Data Management with TanStack Query

The application uses TanStack Query for efficient data management:

- Automatic caching of chat messages
- Real-time updates with optimistic UI
- Background data refetching
- Automatic error handling and retries
- Built-in dev tools for debugging

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
