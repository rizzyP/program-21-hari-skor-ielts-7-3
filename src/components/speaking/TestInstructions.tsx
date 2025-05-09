
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TestInstructionsProps {
  onStart: () => void;
}

const TestInstructions: React.FC<TestInstructionsProps> = ({ onStart }) => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-center">IELTS Speaking Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-red-50 p-4 rounded-md">
          <h3 className="font-medium text-lg mb-2">Instructions:</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>This is a simulation of the IELTS Speaking Test.</li>
            <li>You'll interact with a simulated examiner who will ask you questions.</li>
            <li>The test consists of three parts:</li>
            <li>Part 1 (4-5 minutes): Introduction and questions on familiar topics.</li>
            <li>Part 2 (3-4 minutes): A longer talk on a specific topic with 1 minute preparation time.</li>
            <li>Part 3 (4-5 minutes): A discussion related to the Part 2 topic.</li>
            <li>Speak clearly and provide detailed responses as you would in a real test.</li>
            <li><strong>When the examiner stops speaking, recording will automatically start.</strong></li>
            <li><strong>Press the "Stop Speaking" button when you've finished answering.</strong></li>
          </ul>
        </div>
        <div className="text-center">
          <Button onClick={onStart} size="lg" className="bg-ielts-red hover:bg-ielts-blue">
            Start Speaking Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestInstructions;
