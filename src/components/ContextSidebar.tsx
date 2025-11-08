import type { Session, Student } from '../lib/mockData';

interface ContextSidebarProps {
  session: Session;
  student: Student;
}

export default function ContextSidebar({ session, student }: ContextSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Student Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{student.name}</h2>
          <div className="text-sm text-gray-600">
            <p>Study Buddy Companion</p>
          </div>
        </div>

        {/* Current Goals */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Current Goals
          </h3>
          <div className="space-y-2">
            {student.currentGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
              >
                <span className="text-sm text-blue-900">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Last Session */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Last Session
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-xs text-gray-500">
                {new Date(session.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-900">
                {session.subject} with {session.tutor}
              </span>
            </div>
            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-1">Topics:</div>
              <div className="flex flex-wrap gap-1">
                {session.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="text-xs bg-white border border-gray-300 rounded px-2 py-1"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            {session.struggles.length > 0 && (
              <div>
                <div className="text-xs text-gray-600 mb-1">Struggled with:</div>
                <div className="flex flex-wrap gap-1">
                  {session.struggles.map((struggle, index) => (
                    <span
                      key={index}
                      className="text-xs bg-yellow-50 border border-yellow-200 rounded px-2 py-1 text-yellow-800"
                    >
                      {struggle}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emotional Patterns */}
        {student.emotionalPatterns && student.emotionalPatterns.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Patterns
            </h3>
            <div className="space-y-2">
              {student.emotionalPatterns.map((pattern, index) => (
                <div
                  key={index}
                  className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2"
                >
                  <span className="text-xs text-purple-900">{pattern}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

