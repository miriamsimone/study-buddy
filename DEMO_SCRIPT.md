# Study Buddy - Demo Script

## 🎬 Setup Before Recording

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd /Users/miriam/projects/study-buddy-vite
   node server.js
   
   # Terminal 2 - Frontend
   npm run dev
   ```

2. Open http://localhost:5173 in a **clean browser window** (or private/incognito mode)
3. Set up screen recording (QuickTime, Loom, or OBS)
4. Close any distracting tabs/notifications

---

## 🎯 Demo Flow (3-5 minutes)

### Scene 1: Welcome Message & Memory (30 seconds)

**What happens automatically:**
- Page loads
- AI automatically types out a personalized welcome message
- References last session with Sarah on Oct 30
- Mentions quadratic equations and grouping method struggle

**What to say:**
> "Here's Study Buddy - an AI companion that lives between tutoring sessions. Watch - it automatically greets the student and references their specific history. Notice the sidebar showing Alex's learning goals, last session details, and emotional patterns like test anxiety and perfectionism."

**Action:** Point to the sidebar while the AI is typing the welcome message.

---

### Scene 2: Context Memory Demo (30 seconds)

**Type this message:**
```
What did we work on last time?
```

**What happens:**
- AI references the October 30 session with Sarah
- Mentions quadratic equations and factoring
- Specifically calls out the grouping method struggle

**What to say:**
> "The AI has full context of the student's history. It knows exactly what they worked on, who they worked with, and what they struggled with. This isn't just keyword matching - it's genuine memory."

---

### Scene 3: Emotional Regulation (60 seconds)

**Type this message:**
```
I have so much to do! Calc exam tomorrow, chemistry lab due, essay for English. I haven't even started the practice problems and I'm so behind on everything. I don't know where to start.
```

**What happens:**
- AI detects stress signals (multiple topics, panic, overwhelm)
- Validates feelings first
- Helps prioritize ONE thing
- Breaks down the overwhelm into manageable steps

**What to say:**
> "This is the key differentiator - emotional regulation. Instead of jumping straight into teaching, it recognizes the student is overwhelmed. It validates their feelings, helps them breathe, and gets them to focus on just one thing. This is especially valuable for students with test anxiety or ADHD - which the system knows about from their profile."

---

### Scene 4: Retention Logic (30 seconds)

**Type this message:**
```
I think I'm doing pretty well with my SAT Math prep now, feeling way more confident!
```

**What happens:**
- AI celebrates the progress
- Suggests related next steps (college essays, AP courses, study skills)
- References their multi-goal progress

**What to say:**
> "The system also drives retention. When a student progresses on a goal, it suggests related subjects to keep them engaged. SAT prep leads to college essays, chemistry to physics - addressing the challenge of students churning out after completing a single goal."

---

### Scene 5: Tutor Escalation with Smart Matching (60 seconds)

**Type this message:**
```
This is still really confusing. I think I need to talk to someone about this.
```

**What happens:**
- AI recognizes need for human support
- Tutor cards appear at bottom showing Jake, Sarah, and Marcus
- Each card shows:
  - Photo and bio
  - Subjects
  - **Personal connection points** (the special sauce!)
  - Availability
  - Book Session button

**What to say:**
> "Here's the smart escalation feature. Instead of just saying 'contact a tutor,' it shows specific matches with personal connection points. Look - Jake also has ADHD like Alex, Sarah was their last tutor and specializes in math anxiety, and Marcus loves music production - same as Alex. This matching goes beyond just subject expertise to build real human connections. The AI knows when to bring in humans, and makes smart suggestions about WHO based on more than just what subject they teach."

**Action:** Hover over each tutor card and point out the connection points.

---

### Scene 6: Wrap Up (20 seconds)

**What to say:**
> "So in summary, Study Buddy provides:
> - Persistent memory of past tutoring sessions
> - Emotional regulation before content delivery
> - Retention logic to suggest next learning goals
> - Smart tutor matching based on personal connection, not just subject expertise
> 
> It lives between tutoring sessions, providing 24/7 support while driving students back to human tutors when they need that connection. The goal is better retention and better learning outcomes through emotional support and personalized guidance."

---

## 🎯 Key Points to Emphasize

### ✨ What Makes This Special:
1. **Emotional regulation first** - Not just a homework helper
2. **Personal tutor matching** - ADHD to ADHD, shared interests, learning styles
3. **True memory** - Not just showing data in a sidebar, AI actually uses it
4. **Retention without manipulation** - Genuinely helpful suggestions, not just nudges

### 📊 Addresses Requirements:
- ✅ Persistent AI companion with memory
- ✅ Remembers previous lessons and struggles
- ✅ Answers questions conversationally
- ✅ Drives students back to human tutors when needed
- ✅ Multi-goal progress tracking
- ✅ Retention enhancement (goal completion → suggestions)
- ✅ Session recording integration (mock data for demo)

---

## 💡 Tips for Great Demo Video

1. **Slow down** - Let the typing animation complete before moving on
2. **Point at screen elements** - Use cursor to highlight sidebar, tutor cards
3. **Show the emotional angle** - This is your differentiation
4. **Keep it under 5 minutes** - Respect attention spans
5. **Practice once first** - Catch any issues before final recording

---

## 🐛 Troubleshooting

**If welcome message doesn't load:**
- Hard refresh (Cmd+Shift+R)
- Check backend server is running on port 3001
- Check browser console for errors

**If tutor cards don't appear:**
- Make sure to include keywords like "need to talk to someone" or "confusing"
- The AI needs to suggest human help in its response

**If responses are slow:**
- Normal! Claude Haiku takes 2-3 seconds
- The typing animation makes it feel more natural

---

## 📝 Talking Points for Grading/Presentation

### Technical Implementation:
- Vite + React + TypeScript frontend
- Express backend with Anthropic Claude API
- Context injection via enhanced system prompts
- Real-time streaming with typing animation
- Tailwind CSS for responsive design

### Business Value:
- Addresses 52% churn from "goal achieved" students
- Provides 24/7 support between tutoring sessions
- Emotional regulation improves learning outcomes
- Personal matching increases tutor-student connection
- Multi-goal tracking keeps students engaged longer

### What Would Come Next:
- Integration with actual session recordings (RAG/vector DB)
- Real booking system
- Analytics dashboard for engagement metrics
- A/B testing regulation vs. pure content approach
- Mobile app for on-the-go support

---

**You got this! 🚀**

