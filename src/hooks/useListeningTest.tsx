import { useState, useEffect, useRef } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { toast } from 'sonner';
import { Phase } from '@/components/test/TestPhases';

export const useListeningTest = (startSectionFn: (id: string) => void, saveAnswerFn: (questionId: string, value: string) => void, submitSectionFn: () => void) => {
  // Set initial phase directly to PREVIEW
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.PREVIEW);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [previewTimeRemaining, setPreviewTimeRemaining] = useState<number>(30);
  const [transitionTimeRemaining, setTransitionTimeRemaining] = useState<number>(5);
  const [reviewTimeRemaining, setReviewTimeRemaining] = useState<number>(120);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  
  // Use the enhanced audio player hook
  const { isPlaying, isReady, playAudio, forcePlayAudio, stopAudio, audioRef } = useAudioPlayer();
  
  // Refs for timers
  const previewTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reviewTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update audio progress when playing
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        
        if (duration) {
          const progress = (currentTime / duration) * 100;
          setAudioProgress(progress);
        }
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [audioRef]);
  
  // Handle audio ended event
  useEffect(() => {
    const handleAudioEnd = () => {
      if (currentPhase === Phase.LISTENING) {
        if (currentSectionIndex < 1) {
          startSectionTransition();
        } else {
          startFinalReview();
        }
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [currentPhase, currentSectionIndex]);
  
  // Effect for document-level interaction detection
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
    };
    
    // Listen for any user interaction with the page
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);
  
  // Load audio source when section changes
  useEffect(() => {
    if (currentPhase === Phase.LISTENING) {
      const audioSource = currentSectionIndex === 0 ? 
        '/media/assessment/listening-1.mp3' : 
        '/media/assessment/listening-2.mp3';
      
      if (audioRef.current) {
        audioRef.current.src = audioSource;
        audioRef.current.load();
      }
    }
  }, [currentPhase, currentSectionIndex]);
  
  const startPreviewTimer = () => {
    setPreviewTimeRemaining(30);
    if (previewTimerRef.current) clearInterval(previewTimerRef.current);
    
    previewTimerRef.current = setInterval(() => {
      setPreviewTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(previewTimerRef.current!);
          startAudioPlayback();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const startAudioPlayback = () => {
    setCurrentPhase(Phase.LISTENING);
    
    // Set the appropriate audio source based on the current section
    const audioSource = currentSectionIndex === 0 ? 
      '/media/assessment/listening-1.mp3' : 
      '/media/assessment/listening-2.mp3';
    
    // Prepare audio playback with enhanced handling
    if (audioRef.current) {
      audioRef.current.muted = audioMuted;
      
      // Try to play the audio
      playAudio(audioSource)
        .then(() => {
          toast.info('Audio is now playing', {
            description: 'Listen carefully as it will only play once.'
          });
        })
        .catch(error => {
          console.error('Audio failed to play automatically:', error);
          
          // Show a message to the user that they need to interact
          toast.error('Audio failed to play automatically', {
            description: 'Please click the play button to start the audio.',
            duration: 5000
          });
        });
    }
  };
  
  const skipPreview = () => {
    if (previewTimerRef.current) clearInterval(previewTimerRef.current);
    startAudioPlayback();
  };
  
  // Handle play button click (for when autoplay fails)
  const handleManualPlay = () => {
    if (audioRef.current) {
      // Set user as having interacted
      setUserInteracted(true);
      
      if (!isPlaying) {
        forcePlayAudio()
          .then(() => {
            toast.success('Audio now playing', {
              description: 'Listen carefully as it will only play once.'
            });
          })
          .catch(error => {
            console.error('Manual play failed:', error);
            toast.error('Audio failed to play', {
              description: 'Please check your audio settings and try again.'
            });
          });
      } else {
        stopAudio();
      }
    }
  };
  
  // Toggle audio mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioMuted;
      setAudioMuted(!audioMuted);
    }
  };

  const startSectionTransition = () => {
    setCurrentPhase(Phase.SECTION_TRANSITION);
    setTransitionTimeRemaining(5);
    toast.info('Section completed', {
      description: 'Moving to next section in 5 seconds.'
    });

    if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
    
    transitionTimerRef.current = setInterval(() => {
      setTransitionTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(transitionTimerRef.current!);
          setCurrentSectionIndex(prev => prev + 1);
          setCurrentPhase(Phase.PREVIEW);
          startPreviewTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFinalReview = () => {
    setCurrentPhase(Phase.FINAL_REVIEW);
    setReviewTimeRemaining(120); // 2 minutes for review
    toast.info('Final review period', {
      description: 'You have 2 minutes to review and finalize all your answers.'
    });

    if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
    
    reviewTimerRef.current = setInterval(() => {
      setReviewTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(reviewTimerRef.current!);
          handleCompleteTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCompleteTest = () => {
    setCurrentPhase(Phase.COMPLETED);
    toast.success('Test completed', {
      description: 'Your answers are being submitted.'
    });
    
    // Allow a brief moment to see the completion message
    setTimeout(() => {
      submitSectionFn();
    }, 2000);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    saveAnswerFn(questionId, value);
  };

  // Skip this section and move to the next one (for demo purposes)
  const handleSkipSection = () => {
    stopAudio();
    setAudioProgress(100);
    
    if (currentSectionIndex < 1) {
      startSectionTransition();
    } else {
      startFinalReview();
    }
  };

  // Skip review and submit (for demo purposes)
  const handleSkipReview = () => {
    if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
    handleCompleteTest();
  };

  // Force submission (manual override)
  const handleForceSubmit = () => {
    // Clear all timers
    if (previewTimerRef.current) clearInterval(previewTimerRef.current);
    if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
    if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
    
    // Stop audio
    stopAudio();
    
    submitSectionFn();
    toast.success('Test submitted', {
      description: 'Your answers have been submitted.'
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewTimerRef.current) clearInterval(previewTimerRef.current);
      if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
      if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
      stopAudio();
    };
  }, []);

  return {
    currentPhase,
    currentSectionIndex,
    previewTimeRemaining,
    transitionTimeRemaining,
    reviewTimeRemaining,
    audioProgress,
    audioMuted,
    userInteracted,
    isPlaying,
    isReady,
    handleManualPlay,
    toggleMute,
    handleSkipSection,
    handleSkipReview,
    handleForceSubmit,
    handleAnswerChange,
    startPreviewTimer,
    skipPreview,
    audioRef
  };
};
