import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ContextSidebar from './components/ContextSidebar';
import { mockSession, mockTutors, mockStudent, type Goal } from './lib/mockData';

function App() {
  const [showTutors, setShowTutors] = useState(false);
  const [studentGoals, setStudentGoals] = useState<Goal[]>(mockStudent.currentGoals);

  // Function to update goal progress
  const updateGoalProgress = (goalId: string, progress: number, status?: 'active' | 'completed') => {
    setStudentGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId 
          ? { ...goal, progress, status: status || goal.status }
          : goal
      )
    );
  };

  // Function to add a new goal
  const addGoal = (newGoal: Goal) => {
    setStudentGoals(prevGoals => [...prevGoals, newGoal]);
  };

  // Create updated student object with current goals
  const currentStudent = {
    ...mockStudent,
    currentGoals: studentGoals
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ContextSidebar 
        session={mockSession}
        student={currentStudent}
      />
      <div className="flex-1 flex flex-col">
        <ChatInterface 
          showTutors={showTutors}
          setShowTutors={setShowTutors}
          tutors={mockTutors}
          session={mockSession}
          student={currentStudent}
          updateGoalProgress={updateGoalProgress}
          addGoal={addGoal}
        />
      </div>
    </div>
  );
}

export default App;
