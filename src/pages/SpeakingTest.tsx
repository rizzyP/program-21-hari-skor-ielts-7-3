
import React from 'react';
import Layout from '@/components/layout/Layout';
import { TestPhases, Phase } from '@/components/test/TestPhases';
import Timer from '@/components/test/Timer';
import { useSpeakingTest } from '@/hooks/useSpeakingTest';
import TestInstructions from '@/components/speaking/TestInstructions';
import ExaminationPanel from '@/components/speaking/ExaminationPanel';
import ProgressIndicator from '@/components/speaking/ProgressIndicator';

const SpeakingTest = () => {
  const {
    currentPhase,
    isStarted,
    isRecording,
    currentQuestion,
    currentPart,
    transcripts,
    examinerSpeaking,
    partCompleted,
    fadeIn,
    examinerMessage,
    speakingSection,
    speakingContent,
    getCurrentPartQuestions,
    handleStart,
    handleStopRecording,
    handleNavigateResults
  } = useSpeakingTest();

  if (!speakingSection || !speakingContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading speaking test...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="pb-16">
      <div className="max-w-4xl mx-auto space-y-6">
        {!isStarted ? (
          <TestInstructions onStart={handleStart} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <TestPhases currentPhase={currentPhase} currentSection={1} totalSections={1} />
              {(currentPhase === Phase.SPEAKING_PART2_PREP || currentPhase === Phase.SPEAKING_PART2_ANSWER) && <Timer />}
            </div>

            <ExaminationPanel
              currentPhase={currentPhase}
              examinerSpeaking={examinerSpeaking}
              examinerMessage={examinerMessage}
              isRecording={isRecording}
              onStopRecording={handleStopRecording}
              handleNavigateResults={handleNavigateResults}
              fadeIn={fadeIn}
              currentPart={currentPart}
              currentQuestion={currentQuestion}
              transcripts={transcripts}
            />
            
            {/* Progress indicator */}
            {currentPhase !== Phase.INSTRUCTIONS && 
             currentPhase !== Phase.COMPLETED && 
             currentPhase !== Phase.SPEAKING_INTRO && (
              <ProgressIndicator
                currentPart={currentPart}
                currentQuestion={currentQuestion}
                totalQuestions={getCurrentPartQuestions().length}
                partCompleted={partCompleted}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SpeakingTest;
