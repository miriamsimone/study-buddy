# Study Buddy - AI Study Companion

An AI companion that lives between tutoring sessions, providing emotional regulation, adaptive practice, and intelligent escalation to human tutors - with smart matching based on personal connection, not just subject expertise.

## ✨ Features

- 💬 **Conversational Interface** - Real-time chat with streaming responses and typing animation
- 🧠 **Context-Aware AI** - Remembers student's learning history, goals, and past struggles
- 👋 **Automatic Welcome Message** - Greets students with personalized context about their last session
- 🧘 **Emotional Regulation** - Detects stress signals and helps students calm down before diving into content
- 👥 **Smart Tutor Matching** - Escalates to human tutors with personal connection points (shared interests, learning styles)
- 📊 **Context Sidebar** - Displays current goals, last session details, and emotional patterns
- 🎯 **Learning Goal Tracking** - Keeps track of student progress and areas of struggle

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
```bash
cd study-buddy-vite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. Start the backend server (in one terminal):
```bash
node server.js
```

5. Start the frontend dev server (in another terminal):
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎬 Demo Flow

### 1. **Welcome Message** (Automatic on page load)
The AI automatically greets the student and references their last tutoring session, demonstrating the memory feature immediately.

### 2. **Emotional Regulation**
Send a stressed message:
```
I have so much to do! Calc exam tomorrow, chemistry lab due, essay for English. 
I haven't even started the practice problems and I'm so behind on everything. 
I don't know where to start.
```
The AI will:
- Validate feelings
- Help prioritize ONE thing
- Break down overwhelm into actionable steps

### 3. **Context-Aware Teaching**
Ask about the topic from the last session:
```
I'm still confused about factoring
```
The AI will reference:
- The specific struggle (grouping method)
- The previous tutor (Sarah)
- The date of the last session

### 4. **Tutor Escalation**
Express need for human help:
```
This is still really confusing. I think I need to talk to someone.
```
Tutor cards appear showing:
- Photos and bios
- Personal connection points (shared interests, learning styles)
- Availability
- "Book Session" buttons

## 🛠️ Tech Stack

- **Frontend:** Vite + React + TypeScript
- **Styling:** Tailwind CSS v3
- **Backend:** Express.js
- **AI:** Anthropic Claude API (Haiku model)
- **State Management:** React hooks

## 📁 Project Structure

```
study-buddy-vite/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx    # Main chat UI with welcome message
│   │   ├── ContextSidebar.tsx   # Student context display
│   │   └── TutorCard.tsx        # Tutor profile cards
│   ├── lib/
│   │   └── mockData.ts          # Mock student/session data
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles + Tailwind
├── server.js                    # Express backend for Claude API
├── .env                         # Environment variables (API key)
└── package.json
```

## 🎯 Key Features Explained

### Context Integration
The AI receives structured context about:
- Student name and learning goals
- Last tutoring session (date, tutor, topics, struggles)
- Emotional patterns (test anxiety, perfectionism, etc.)
- Personal interests (for tutor matching)

This context is injected into the system prompt on every message, allowing the AI to reference past sessions naturally.

### Emotional Regulation
The system prompt prioritizes emotional support:
1. Detects stress signals (rambling, negative self-talk, panic)
2. Validates feelings before teaching
3. Helps break down overwhelming situations
4. Knows when to escalate to human support

### Smart Tutor Matching
Tutors are suggested based on:
- **Subject expertise** (expected)
- **Personal connection** (unique!) - shared interests, learning differences, similar experiences
- **Availability**

Example: Suggests Jake (who also has ADHD) for a student with ADHD, or Marcus (who loves music production) for a student with that interest.

## 🚧 Future Enhancements

- Real session transcript integration (RAG with vector DB)
- Actual booking system integration
- Vector DB for long-term memory across multiple sessions
- Mobile app
- Analytics dashboard (engagement, regulation triggers)
- A/B testing emotional regulation vs. pure content focus

## 📝 Notes

- Backend runs on port 3001
- Frontend runs on port 5173
- The typing animation adds a human touch to responses
- Tutor photos use Unsplash for demo purposes

## 🤝 Contributing

This is a demo project. For production use, consider:
- Moving API key to server-only environment
- Adding authentication
- Implementing real database for student/session data
- Adding proper error handling and retry logic
- Rate limiting API calls

## 📄 License

MIT

---

Built with ❤️ for students who need more than just content help.
