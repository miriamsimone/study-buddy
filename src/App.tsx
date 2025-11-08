import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ContextSidebar from './components/ContextSidebar';
import { mockSession, mockTutors, mockStudent } from './lib/mockData';

function App() {
  const [showTutors, setShowTutors] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <ContextSidebar 
        session={mockSession}
        student={mockStudent}
      />
      <div className="flex-1 flex flex-col">
        <ChatInterface 
          showTutors={showTutors}
          setShowTutors={setShowTutors}
          tutors={mockTutors}
          session={mockSession}
          student={mockStudent}
        />
      </div>
    </div>
  );
}

export default App;
