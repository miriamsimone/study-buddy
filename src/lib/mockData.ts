export type Session = {
  id: string;
  date: string;
  tutor: string;
  subject: string;
  topics: string[];
  struggles: string[];
  transcript: string;
}

export type Tutor = {
  id: string;
  name: string;
  photo: string;
  subjects: string[];
  interests: string[];
  bio: string;
  learningDifferences?: string[];
  availability: string[];
  connectionPoints?: string[];
}

export type Student = {
  id: string;
  name: string;
  currentGoals: string[];
  interests: string[];
  sessionHistory: Session[];
  emotionalPatterns?: string[];
}

export const mockSession: Session = {
  id: "session_123",
  date: "2024-10-30",
  tutor: "Sarah Chen",
  subject: "Algebra",
  topics: ["Quadratic equations", "Factoring"],
  struggles: ["Grouping method"],
  transcript: "Student struggled with factoring by grouping. We practiced several examples and discussed patterns. Next session: more practice with grouping method."
};

export const mockTutors: Tutor[] = [
  {
    id: "tutor_456",
    name: "Jake Morrison",
    photo: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop&crop=center",
    subjects: ["Math", "Physics"],
    interests: ["Rock climbing", "Video games"],
    bio: "CS grad student who loves making math click",
    learningDifferences: ["ADHD"],
    availability: ["Tomorrow 3pm", "Friday 2pm", "Saturday 10am"],
    connectionPoints: ["Also has ADHD", "Loves video games", "Great at breaking down complex problems"]
  },
  {
    id: "tutor_789",
    name: "Sarah Chen",
    photo: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&h=400&fit=crop&crop=center",
    subjects: ["Algebra", "Calculus"],
    interests: ["Music", "Basketball"],
    bio: "Former teacher, now tutor specializing in math anxiety",
    availability: ["Today 4pm", "Thursday 3pm"],
    connectionPoints: ["Your last tutor", "Specializes in test anxiety", "Plays basketball too"]
  },
  {
    id: "tutor_101",
    name: "Marcus Johnson",
    photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=center",
    subjects: ["Chemistry", "Physics"],
    interests: ["Music production", "Science experiments"],
    bio: "Chemistry PhD student who makes learning fun",
    availability: ["Friday 5pm", "Sunday 2pm"],
    connectionPoints: ["Also loves music production", "Great at time management", "Knows the struggle"]
  }
];

export const mockStudent: Student = {
  id: "student_789",
  name: "Alex",
  currentGoals: ["SAT Math", "Calc AB"],
  interests: ["Basketball", "Music production"],
  sessionHistory: [mockSession],
  emotionalPatterns: ["Test anxiety", "Perfectionism"]
};
