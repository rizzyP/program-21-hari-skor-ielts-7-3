
import React from 'react';

interface CueCardProps {
  topic: string;
  bulletPoints?: string[];
}

const CueCard: React.FC<CueCardProps> = ({ 
  topic, 
  bulletPoints = [
    "when this was",
    "who the teacher was",
    "what subject they taught",
    "why they influenced you so much"
  ] 
}) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 my-4">
      <p className="font-medium mb-2">{topic}</p>
      <p className="text-sm mb-3">You should say:</p>
      <ul className="list-disc list-inside text-sm space-y-1">
        {bulletPoints.map((point, index) => (
          <li key={index} className="text-slate-700">{point}</li>
        ))}
      </ul>
      <p className="text-sm mt-3">You will have 1 minute to prepare. Then you'll need to talk for 1-2 minutes.</p>
    </div>
  );
};

export default CueCard;
