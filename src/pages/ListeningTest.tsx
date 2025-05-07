
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import { ListeningHeader } from '@/components/listening/ListeningHeader';
import { AudioPlayer } from '@/components/listening/AudioPlayer';
import { QuestionCard } from '@/components/listening/QuestionCard';
import { ActionButtons } from '@/components/listening/ActionButtons';
import { useListeningTest } from '@/hooks/useListeningTest';
import { toast } from 'sonner';
import { Phase } from '@/components/test/TestPhases';

const ListeningTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection, 
    isTestActive
  } = useTest();
  
  // Initialize our custom hook that contains most of the component logic
  const {
    currentPhase,
    currentSectionIndex,
    previewTimeRemaining,
    transitionTimeRemaining,
    reviewTimeRemaining,
    audioProgress,
    audioMuted,
    userInteracted,
    isPlaying,
    handleManualPlay,
    toggleMute,
    handleSkipSection,
    handleSkipReview,
    handleForceSubmit,
    handleAnswerChange,
    skipPreview
  } = useListeningTest(startSection, saveAnswer, () => {
    submitSection();
    navigate('/test/reading');
  });

  useEffect(() => {
    // Load the listening section if not already loaded
    if (currentTest) {
      const listeningSection = currentTest.sections.find(section => section.type === 'listening');
      if (listeningSection) {
        startSection(listeningSection.id);
      }
    }
  }, [currentTest, startSection]);

  const listeningSection = currentTest?.sections.find(section => section.type === 'listening');
  const listeningContent = listeningSection?.content as any;

  return (
    <Layout className="pb-16">
      <div className="max-w-4xl mx-auto space-y-6 px-4 md:px-6">
        <div className="space-y-6">
          <ListeningHeader 
            currentPhase={currentPhase}
            currentSectionIndex={currentSectionIndex}
            previewTimeRemaining={previewTimeRemaining}
            transitionTimeRemaining={transitionTimeRemaining}
            reviewTimeRemaining={reviewTimeRemaining}
            handleForceSubmit={handleForceSubmit}
          />

          {/* Audio player with progress bar */}
          {currentPhase === Phase.LISTENING && (
            <AudioPlayer
              isPlaying={isPlaying}
              audioProgress={audioProgress}
              audioMuted={audioMuted}
              currentSectionIndex={currentSectionIndex}
              userInteracted={userInteracted}
              handleManualPlay={handleManualPlay}
              toggleMute={toggleMute}
              handleSkipSection={handleSkipSection}
            />
          )}

          {/* Questions for current section */}
          <QuestionCard
            currentPhase={currentPhase}
            currentSectionIndex={currentSectionIndex}
            listeningSection={listeningSection}
            listeningContent={listeningContent}
            userAnswers={userAnswers}
            handleAnswerChange={handleAnswerChange}
            isPlaying={isPlaying}
          />

          {/* Action buttons */}
          <ActionButtons
            currentPhase={currentPhase}
            handleSkipReview={handleSkipReview}
            handleForceSubmit={handleForceSubmit}
            skipPreview={skipPreview}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ListeningTest;
