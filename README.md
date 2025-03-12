

# LLM Chatbot Application Documentation

## 1. Project Overview

The **LLM Chatbot Application** is a full-stack chat application that leverages Groq’s Chat API to generate human-like responses. The system supports persistent conversation history and provides a scalable, production-ready design for 10,000+ users. It includes:

- **Backend:** An Express.js server that handles API requests, manages conversation history (in memory for this demo), and integrates with Groq’s Chat API.
- **Frontend:** A React.js application that provides a clean and responsive chat interface with preserved formatting for readability.

## 2. System Architecture Diagram

Below is the high-level architecture of the system:
![NoteGPT-Flowchart-1741781029170](https://github.com/user-attachments/assets/0f378e24-e899-45c1-af3e-8b781e4e7d3d)


*Figure: High-Level System Architecture*

## 3. Features & Requirements

- **Core Functionality:**
  - Interactive chat interface powered by a large language model.
  - Persistent conversation history for context.
  - AI response formatting for improved readability.
  
- **Scalability & Reliability:**
  - Stateless REST endpoints that allow horizontal scaling.
  - Distributed in-memory session management (or a database in production).
  - Use of containerization (e.g., Docker) and orchestration (e.g., Kubernetes) for production deployment.
  
- **LLM Integration:**
  - Integration with Groq’s Chat API using the correct endpoint and payload.
  - Flexible prompt formatting to maintain conversational context.
  - Improved error handling and logging.

## 4. Technical Details & Design Decisions

### Backend
- **Language & Framework:** Node.js with Express.
- **Key Components:**
  - **Chat Controller:** Exposes REST endpoints (`/api/chat`) for sending and retrieving messages.
  - **Chat Service:** Maintains conversation history and orchestrates calls to the Groq service.
  - **Groq Service:** Interfaces with Groq’s Chat API (`POST https://api.groq.com/openai/v1/chat/completions`), formats prompts, and parses responses.
- **Error Handling:** Detailed error logging and fallback responses ensure the system remains responsive even if the external API fails.

### Frontend
- **Framework:** React.js (created with Create React App).
- **Key Components:**
  - **App Component:** Sets the context (e.g., user session) and renders the Chat component.
  - **Chat Component:** Handles user input, displays conversation history with proper formatting (using CSS `white-space: pre-wrap`), and communicates with the backend via Axios.

### LLM Integration & Prompt Engineering
- **Groq Chat API Integration:**  
  - Uses the endpoint `https://api.groq.com/openai/v1/chat/completions` with the required payload.
  - Conversation history is mapped to the required format with keys `role` and `content`.
- **Prompt Formatting:**  
  - Converts conversation history into an array of messages without losing newlines and formatting.
- **Response Parsing:**  
  - Extracts the assistant’s message from the response and applies a simple formatting function for improved readability.

### Scalability & Cost Considerations
- **Scalability:**  
  - Stateless API design allows horizontal scaling.
  - Conversation history management can be moved to a distributed cache (e.g., Redis) or a database when scaling beyond the demo.
- **Cost:**  
  - The application minimizes API calls by caching responses and efficiently managing sessions.
  - Auto-scaling containerized services to optimize resource usage.

## 5. Setup & Deployment Instructions

### Prerequisites
- **Backend:**  
  - Node.js (v14 or later)
  - npm (Node Package Manager)
  - Groq API Key
- **Frontend:**  
  - Node.js
  - npm

### Backend Setup
1. **Navigate to the Backend Folder:**
   ```bash
   cd llm-chat-app/backend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Your Groq API Key:**
   - **PowerShell:**
     ```powershell
     $env:GROQ_API_KEY="your_groq_api_key_here"
     ```
   - **CMD:**
     ```cmd
     set GROQ_API_KEY=your_groq_api_key_here
     ```
   - **macOS/Linux:**
     ```bash
     export GROQ_API_KEY=your_groq_api_key_here
     ```
4. **Start the Backend Server:**
   ```bash
   npm start
   ```
   The server runs on port 3001.

### Frontend Setup
1. **Navigate to the Frontend Folder:**
   ```bash
   cd llm-chat-app/frontend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start the Frontend Development Server:**
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

### Deployment Considerations
- **Containerization:**  
  - Create Dockerfiles for both backend and frontend.
- **Orchestration:**  
  - Use Kubernetes or Docker Compose for multi-container deployment.
- **Environment Variables:**  
  - Securely manage API keys and configuration using environment variables or a secrets manager.
- **Scaling:**  
  - Set up auto-scaling policies and load balancers to handle high traffic.

## 6. Testing the Application

### End-to-End Testing
1. Open the frontend at [http://localhost:3000](http://localhost:3000).
2. Type a message (e.g., "Hello, how are you?") and press Enter or click **Send**.
3. The message is sent to the backend, which updates the conversation history, sends the prompt to Groq’s API, receives an AI-generated response, and updates the frontend with the full conversation.

### Troubleshooting
- **Backend Logs:** Check the console for any errors from Groq’s API.
- **Network Requests:** Use the browser developer tools to inspect API calls.
- **Response Formatting:** Ensure the assistant’s message maintains formatting (newlines, bullet points).

## 7. Code Repository Structure

```
llm-chat-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── chatController.js
│   ├── chatService.js
│   └── groqService.js
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.js
        └── Chat.js
```

- **backend/**: Contains the server code and Groq integration.
- **frontend/**: Contains the React application for the chat interface.
- **Documentation:** This README and additional architectural diagrams are included for clarity.

## 8. Future Enhancements

- **Persistent Data Storage:**  
  Replace the in-memory conversation history with a database (e.g., PostgreSQL or MongoDB) for long-term storage.
- **Authentication & Session Management:**  
  Implement user authentication and secure session management.
- **Advanced Error Handling & Monitoring:**  
  Integrate with monitoring tools (e.g., Prometheus, ELK stack) for real-time error tracking.
- **Optimized Prompt Engineering:**  
  Enhance the prompt engineering strategy for more contextually relevant responses.
- **UI/UX Improvements:**  
  Improve the chat interface with richer formatting and real-time updates.

---
