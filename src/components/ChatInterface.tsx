import { useState, useEffect, useRef } from 'react';
import TutorCard from './TutorCard';
import type { Tutor, Session, Student, Goal } from '../lib/mockData';

interface ChatInterfaceProps {
  showTutors: boolean;
  setShowTutors: (show: boolean) => void;
  tutors: Tutor[];
  session: Session;
  student: Student;
  updateGoalProgress: (goalId: string, progress: number, status?: 'active' | 'completed') => void;
  addGoal: (newGoal: Goal) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Helper to get API URL based on environment
const getApiUrl = () => {
  // In production (Vercel), use relative path
  // In development, use localhost
  return import.meta.env.PROD ? '/api/chat' : 'http://localhost:3001/api/chat';
};

const SYSTEM_PROMPT = `You are a study companion for high school/college students. Your role is to:

1. **Regulate first, teach second**: When students are overwhelmed, anxious, or spiraling, help them ground and focus before diving into content.

2. **Detect stress signals**:
   - Long rambling messages covering many topics
   - Negative self-talk ("I'm so behind", "I'll never get this")
   - Panic about timelines
   - Analysis paralysis

3. **Respond with empathy and action**:
   - Validate feelings
   - Help prioritize (pick ONE thing)
   - Reframe catastrophizing
   - Break big problems into tiny steps

4. **Know when to escalate to humans**:
   - Complex emotional situations
   - When student explicitly asks for human connection
   - When you've hit your limits on a concept
   - When you detect they need personal support
   
   When escalating, mention that you can connect them with a tutor who might be a good match.

5. **Use context naturally**:
   - Reference past struggles and wins if mentioned
   - Build on previous lessons
   - Celebrate progress

6. **Drive retention and growth**:
   - When student completes or nears a goal, celebrate and suggest related subjects:
     * SAT prep complete → mention college essays, AP courses, study skills
     * Chemistry mastered → suggest physics or other STEM subjects
     * Math goal achieved → recommend advanced math or related areas
   - If conversation suggests they haven't had a session recently, gently encourage booking with their tutor
   - Highlight progress across multiple goals to show growth

Remember: You're a study buddy, not a therapist. For serious mental health concerns, encourage them to talk to a counselor or trusted adult.

Be conversational, warm, and supportive.`;

export default function ChatInterface({ showTutors, setShowTutors, tutors, session, student, updateGoalProgress, addGoal }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedWelcome, setHasLoadedWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedMessageIds = useRef<Set<string>>(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load welcome message on mount
  useEffect(() => {
    if (!hasLoadedWelcome && messages.length === 0) {
      setHasLoadedWelcome(true);
      loadWelcomeMessage();
    }
  }, [hasLoadedWelcome, messages.length]);

  const loadWelcomeMessage = async () => {
    setIsLoading(true);
    
    const welcomePrompt = {
      role: 'user' as const,
      content: 'Hi! (This is the student opening the app. Greet them warmly and naturally reference their last session, what they worked on, and what they struggled with. Keep it friendly and conversational - 2-3 sentences max.)',
    };

    try {
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [welcomePrompt],
          studentContext: {
            studentName: student.name,
            currentGoals: student.currentGoals.map(g => `${g.name} (${g.progress}% complete)`),
            lastSession: session,
            emotionalPatterns: student.emotionalPatterns,
            interests: student.interests,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantContent = data.content[0].text;

      let assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '',
      };

      setMessages([assistantMessage]);

      // Wait a bit before starting to type (like a person thinking)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

      // Split response into paragraphs
      const paragraphs = assistantContent
        .split(/\n\s*\n/)
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0);

      // Display each paragraph
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        
        if (i === 0) {
          assistantMessage.content = '';
        } else {
          assistantMessage = {
            id: (Date.now() + i).toString(),
            role: 'assistant',
            content: '',
          };
          setMessages((prev) => [...prev, assistantMessage]);
          await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 800));
        }
        
        // Type out this paragraph character by character
        let displayedContent = '';
        for (let j = 0; j < paragraph.length; j++) {
          displayedContent += paragraph[j];
          assistantMessage.content = displayedContent;
          setMessages((prev) => {
            const updated = [...prev];
            const messageIndex = updated.findIndex(m => m.id === assistantMessage.id);
            if (messageIndex !== -1) {
              updated[messageIndex] = { ...assistantMessage };
            }
            return updated;
          });
          
          const char = paragraph[j];
          let delay = 20 + Math.random() * 30;
          if (char === ' ') delay *= 0.3;
          if (char === '.' || char === '!' || char === '?') delay *= 2;
          if (char === ',') delay *= 1.5;
          
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        if (i < paragraphs.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
        }
      }
    } catch (error) {
      console.error('Error loading welcome:', error);
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hey! Welcome back. What would you like to work on today?',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect if AI suggests tutor escalation
  useEffect(() => {
    // Only process if not currently loading (message is complete)
    if (isLoading) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && !processedMessageIds.current.has(lastMessage.id)) {
      // Mark this message as processed
      processedMessageIds.current.add(lastMessage.id);
      
      const content = lastMessage.content.toLowerCase();
      
      console.log('Processing message:', content);
      
      // Check for tutor escalation
      if (content.includes('tutor') || content.includes('connect') || content.includes('human')) {
        setShowTutors(true);
      }
      
      // Check for SAT completion and trigger goal update
      // More flexible keyword matching for SAT progress
      const hasSAT = content.includes('sat');
      const hasPositive = content.includes('great') || content.includes('awesome') || 
                          content.includes('excellent') || content.includes('good') ||
                          content.includes('going well') || content.includes('confident') ||
                          content.includes('progress') || content.includes('doing well') ||
                          content.includes('fantastic') || content.includes('congrats') ||
                          content.includes('well done');
      const hasCompletion = content.includes('complete') || content.includes('finished') || 
                           content.includes('done') || content.includes('ready');
      
      console.log('SAT detection:', { hasSAT, hasPositive, hasCompletion });
      
      if (hasSAT && (hasCompletion || hasPositive)) {
        console.log('SAT trigger detected!');
        // Update SAT goal to completed and add new goals
        const satGoal = student.currentGoals.find(g => g.name.toLowerCase().includes('sat'));
        console.log('SAT Goal found:', satGoal);
        
        if (satGoal && satGoal.progress < 100) {
          console.log('Updating SAT goal to 100%');
          setTimeout(() => {
            updateGoalProgress(satGoal.id, 100, 'completed');
            
            // Add new suggested goals after a delay
            setTimeout(() => {
              const hasEssayGoal = student.currentGoals.some(g => g.name.toLowerCase().includes('essay'));
              if (!hasEssayGoal) {
                console.log('Adding college essay goal');
                addGoal({
                  id: 'goal_essays',
                  name: 'College Essays',
                  progress: 0,
                  status: 'active'
                });
                
                // Add a follow-up message about the new goal
                setTimeout(() => {
                  const followUpMessage: Message = {
                    id: (Date.now() + 999).toString(),
                    role: 'assistant',
                    content: "Oh! I just added College Essays to your goals. Since you're crushing the SAT, that's the natural next step. Want to start brainstorming topics?"
                  };
                  setMessages((prev) => [...prev, followUpMessage]);
                }, 500);
              }
            }, 1500);
          }, 2000);
        }
      }
    }
  }, [messages, isLoading, setShowTutors, student.currentGoals, updateGoalProgress, addGoal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call local backend which proxies to Claude API
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [...messages, userMessage]
            .filter((m) => m.content && m.content.trim().length > 0)
            .map((m) => ({
              role: m.role,
              content: m.content.trim(),
            })),
          studentContext: {
            studentName: student.name,
            currentGoals: student.currentGoals.map(g => `${g.name} (${g.progress}% complete)`),
            lastSession: session,
            emotionalPatterns: student.emotionalPatterns,
            interests: student.interests,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantContent = data.content[0].text;

      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      // Create empty message immediately to show loading state
      setMessages((prev) => [...prev, assistantMessage]);

      // Wait a bit before starting to type (like a person thinking)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

      // Split response into paragraphs (split on double newlines or single newlines)
      const paragraphs = assistantContent
        .split(/\n\s*\n/)
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0);

      // Display each paragraph as a separate message
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        
        // Create a new message for this paragraph (or use the first one)
        if (i === 0) {
          // Use the existing assistant message
          assistantMessage.content = '';
        } else {
          // Create a new message for subsequent paragraphs
          assistantMessage = {
            id: (Date.now() + i).toString(),
            role: 'assistant',
            content: '',
          };
          setMessages((prev) => [...prev, assistantMessage]);
          // Show typing indicator by keeping content empty briefly
          await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 800));
        }
        
        // Type out this paragraph character by character (with variable speed)
        let displayedContent = '';
        for (let j = 0; j < paragraph.length; j++) {
          displayedContent += paragraph[j];
          assistantMessage.content = displayedContent;
          setMessages((prev) => {
            const updated = [...prev];
            // Find the right message to update
            const messageIndex = updated.findIndex(m => m.id === assistantMessage.id);
            if (messageIndex !== -1) {
              updated[messageIndex] = { ...assistantMessage };
            }
            return updated;
          });
          
          // Variable typing speed (faster for spaces, slower for punctuation)
          const char = paragraph[j];
          let delay = 20 + Math.random() * 30; // Base typing speed
          if (char === ' ') delay *= 0.3; // Faster for spaces
          if (char === '.' || char === '!' || char === '?') delay *= 2; // Pause at punctuation
          if (char === ',') delay *= 1.5;
          
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Pause after completing this paragraph before starting the next one
        if (i < paragraphs.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Study Buddy</h1>
        <p className="text-sm text-gray-600">Your AI study companion</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Study Buddy!</h2>
              <p className="text-gray-600">
                I'm here to help you study, manage stress, and connect you with tutors when you need them.
                What would you like to work on today?
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Tutor Escalation Panel */}
      {showTutors && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1">Suggested Tutors</h3>
            <p className="text-sm text-gray-600">Here are some tutors who might be a good match:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tutors.slice(0, 3).map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
          <button
            onClick={() => setShowTutors(false)}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
