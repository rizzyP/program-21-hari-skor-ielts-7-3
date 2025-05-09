
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { TestPhases, Phase } from '@/components/test/TestPhases';
import Timer from '@/components/test/Timer';
import { useSpeakingTest } from '@/hooks/useSpeakingTest';
import TestInstructions from '@/components/speaking/TestInstructions';
import ExaminationPanel from '@/components/speaking/ExaminationPanel';
import ProgressIndicator from '@/components/speaking/ProgressIndicator';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpeakingTest = () => {
  const {
    currentPhase,
    isStarted,
    isRecording,
    isTranscribing,
    currentQuestion,
    currentPart,
    transcripts,
    examinerSpeaking,
    partCompleted,
    fadeIn,
    examinerMessage,
    speakingSection,
    speakingContent,
    totalQuestions,
    questionNumber,
    getCurrentPartQuestions,
    handleStart,
    handleStartRecording,
    handleStopRecording,
    handleNavigateResults,
    hasUserInteracted,
    simulateUserInteraction,
    audioError
  } = useSpeakingTest();

  // Effect to attempt auto-unlock of audio context
  useEffect(() => {
    // Try to unlock audio as soon as component mounts
    simulateUserInteraction();
  }, [simulateUserInteraction]);

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
        {!hasUserInteracted && (
          <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription className="flex items-center justify-between w-full">
              <span>Audio playback requires user interaction. Please click the button below to enable audio:</span>
              <Button 
                onClick={simulateUserInteraction}
                variant="outline" 
                size="sm" 
                className="ml-4 flex items-center gap-2 bg-white"
              >
                <Volume2 className="h-4 w-4" /> Enable Audio
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {audioError && (
          <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {audioError} Please click anywhere on the page to enable audio playback.
            </AlertDescription>
          </Alert>
        )}
        
        {!isStarted ? (
          <TestInstructions onStart={() => {
            simulateUserInteraction(); // Try to unlock audio
            handleStart(); // Start the test
          }} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <TestPhases currentPhase={currentPhase} currentSection={1} totalSections={1} />
              <div className="text-sm font-medium bg-slate-100 rounded px-3 py-1">
                Total: {questionNumber} / {totalQuestions}
              </div>
            </div>

            {/* Show overall test timer only when not recording */}
            {!isRecording && (
              <div className="flex justify-end">
                <Timer />
              </div>
            )}

            <ExaminationPanel
              currentPhase={currentPhase}
              examinerSpeaking={examinerSpeaking}
              examinerMessage={examinerMessage}
              isRecording={isRecording}
              isTranscribing={isTranscribing}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              handleNavigateResults={handleNavigateResults}
              fadeIn={fadeIn}
              currentPart={currentPart}
              currentQuestion={currentQuestion}
              transcripts={transcripts}
              hasUserInteracted={hasUserInteracted}
              onEnableAudio={simulateUserInteraction}
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
