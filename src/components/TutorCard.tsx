import type { Tutor } from '../lib/mockData';

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3 mb-3">
        <img
          src={tutor.photo}
          alt={tutor.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{tutor.name}</h4>
          <p className="text-xs text-gray-600">{tutor.bio}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-600 mb-1">Subjects:</div>
        <div className="flex flex-wrap gap-1">
          {tutor.subjects.map((subject, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-1"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {tutor.connectionPoints && tutor.connectionPoints.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">Why this match:</div>
          <ul className="text-xs text-gray-700 space-y-1">
            {tutor.connectionPoints.slice(0, 2).map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tutor.availability && tutor.availability.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">Available:</div>
          <div className="text-xs text-gray-700">
            {tutor.availability[0]}
          </div>
        </div>
      )}

      <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Book Session
      </button>
    </div>
  );
}
