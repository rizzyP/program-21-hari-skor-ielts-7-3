
import React from 'react';
import Layout from '@/components/layout/Layout';
import { TestPhases, Phase } from '@/components/test/TestPhases';
import Timer from '@/components/test/Timer';
import { useSpeakingTest } from '@/hooks/useSpeakingTest';
import TestInstructions from '@/components/speaking/TestInstructions';
import ExaminationPanel from '@/components/speaking/ExaminationPanel';
import ProgressIndicator from '@/components/speaking/ProgressIndicator';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SpeakingTest = () => {
  const {
    currentPhase,
    isStarted,
    isRecording,
    isTranscribing,
    isPreparing,
    prepTime,
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
    audioSrc,
    isPlayingAudio,
    playExaminerAudio,
    pauseExaminerAudio,
    getCurrentSrc,
    audioError
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
        {audioError && (
          <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {audioError}
            </AlertDescription>
          </Alert>
        )}
        
        {!isStarted ? (
          <TestInstructions onStart={handleStart} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <TestPhases currentPhase={currentPhase} currentSection={1} totalSections={1} />
              <div className="text-sm font-medium bg-slate-100 rounded px-3 py-1">
                Total: {questionNumber} / {totalQuestions}
              </div>
            </div>

            {/* Show overall test timer only when not recording */}
            {!isRecording && !isPreparing && (
              <div className="flex justify-end">
                <Timer />
              </div>
            )}

            <ExaminationPanel
              currentPhase={currentPhase}
              examinerSpeaking={examinerSpeaking}
              examinerMessage={examinerMessage}
              isRecording={isRecording}
              isPreparing={isPreparing}
              prepTime={prepTime}
              isTranscribing={isTranscribing}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              handleNavigateResults={handleNavigateResults}
              fadeIn={fadeIn}
              currentPart={currentPart}
              currentQuestion={currentQuestion}
              transcripts={transcripts}
              audioSrc={audioSrc}
              isPlayingAudio={isPlayingAudio}
              onPlayAudio={playExaminerAudio}
              onPauseAudio={pauseExaminerAudio}
              getCurrentSrc={getCurrentSrc}
            />
            
            {/* Progress indicator */}
            {currentPhase !== Phase.INSTRUCTIONS && 
             currentPhase !== Phase.COMPLETED && 
             currentPhase !== Phase.SPEAKING_INTRO && (
              <ProgressIndicator
                currentPart={currentPart}
                currentQuestion={currentQuestion}
                totalQuestions={getCurrentPartQuestions(currentPart).length}
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
