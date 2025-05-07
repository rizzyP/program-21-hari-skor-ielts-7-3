import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import Timer from '@/components/test/Timer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Clock, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { TestPhases, Phase } from '@/components/test/TestPhases';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

const ListeningTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection, 
    isTestActive,
    timeRemaining
  } = useTest();
  
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
  
  useEffect(() => {
    // Load the listening section if not already loaded
    if (currentTest) {
      const listeningSection = currentTest.sections.find(section => section.type === 'listening');
      if (listeningSection) {
        startSection(listeningSection.id);
      }
    }
    
    // Start preview timer immediately when component mounts
    startPreviewTimer();
    toast.info('Preview time started', {
      description: 'You have 30 seconds to preview the questions before the audio begins.'
    });
    
    // Cleanup timers on unmount
    return () => {
      if (previewTimerRef.current) clearInterval(previewTimerRef.current);
      if (transitionTimerRef.current) clearInterval(transitionTimerRef.current);
      if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
    };
  }, [currentTest, startSection]);

  const listeningSection = currentTest?.sections.find(section => section.type === 'listening');
  const listeningContent = listeningSection?.content as any;

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
      submitSection();
      navigate('/test/reading');
    }, 2000);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    saveAnswer(questionId, value);
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
    
    submitSection();
    toast.success('Test submitted', {
      description: 'Your answers have been submitted.'
    });
    navigate('/test/reading');
  };

  if (!listeningSection || !listeningContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading listening test...</p>
        </div>
      </Layout>
    );
  }

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout className="pb-16">
      <div className="max-w-4xl mx-auto space-y-6 px-4 md:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">IELTS Listening Test</h1>
              <TestPhases 
                currentPhase={currentPhase} 
                currentSection={currentSectionIndex + 1}
                totalSections={2}
              />
            </div>
            
            {/* Dynamic timer display based on current phase */}
            {currentPhase === Phase.PREVIEW && (
              <div className="flex items-center gap-2 font-mono text-lg bg-yellow-50 rounded-md px-3 py-1 border border-yellow-200 text-yellow-700">
                <Clock className="w-5 h-5" />
                <span>Preview: {formatTime(previewTimeRemaining)}</span>
              </div>
            )}
            
            {currentPhase === Phase.SECTION_TRANSITION && (
              <div className="flex items-center gap-2 font-mono text-lg bg-blue-50 rounded-md px-3 py-1 border border-blue-200 text-blue-700">
                <Clock className="w-5 h-5" />
                <span>Next section: {transitionTimeRemaining}s</span>
              </div>
            )}
            
            {currentPhase === Phase.FINAL_REVIEW && (
              <div className="flex items-center gap-2 font-mono text-lg bg-green-50 rounded-md px-3 py-1 border border-green-200 text-green-700">
                <Clock className="w-5 h-5" />
                <span>Review: {formatTime(reviewTimeRemaining)}</span>
              </div>
            )}
            
            {currentPhase === Phase.LISTENING && <Timer onTimeUp={handleForceSubmit} />}
          </div>

          {/* Audio player with progress bar */}
          {currentPhase === Phase.LISTENING && (
            <div className="bg-slate-100 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Audio Player - Section {currentSectionIndex + 1}
                  {currentSectionIndex === 0 ? " (listening-1.mp3)" : " (listening-2.mp3)"}
                </span>
                <span className={`text-xs px-2 py-1 ${isPlaying ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded-full`}>
                  {isPlaying ? 'Playing...' : 'Paused'}
                </span>
              </div>
              <Progress value={audioProgress} className="h-2 mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleManualPlay}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-white hover:bg-blue-50"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded hover:bg-slate-200 transition-colors"
                  >
                    {audioMuted ? (
                      <VolumeX className="text-gray-600 w-5 h-5" />
                    ) : (
                      <Volume2 className="text-blue-600 w-5 h-5" />
                    )}
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  {!userInteracted && !isPlaying ? 
                    "Click Play to start audio" : 
                    "Listening to authentic audio recording"}
                </span>
                {/* Skip button for demo purposes (would not exist in real test) */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSkipSection}
                  className="text-xs"
                >
                  Demo: Skip Audio
                </Button>
              </div>
            </div>
          )}

          {/* Questions for current section */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {currentPhase === Phase.FINAL_REVIEW 
                  ? "Review All Sections" 
                  : `Section ${currentSectionIndex === 0 ? '1' : '4'} Questions`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Section 1: Questions 1-5 (Multiple choice) */}
              {(currentSectionIndex === 0 || currentPhase === Phase.FINAL_REVIEW) && (
                <div className={currentPhase !== Phase.FINAL_REVIEW || currentSectionIndex === 0 ? '' : 'mt-8 pt-8 border-t'}>
                  <h3 className="font-medium mb-4">Section 1: Questions 1-5</h3>
                  <p className="text-sm mb-2">Complete the information below about the courses available at Southmead Art College.</p>
                  <p className="text-sm mb-4 italic">Which five courses are available? Choose from options A-I.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-4 text-sm">
                    <div>A. Fibre Art classes</div>
                    <div>B. Oil Painting classes</div>
                    <div>C. Digital Art classes</div>
                    <div>D. Print making classes</div>
                    <div>E. Fine Art classes</div>
                    <div>F. Photography classes</div>
                    <div>G. Weekend courses</div>
                    <div>H. Ceramic and Pottery classes</div>
                    <div>I. Jewellery design classes</div>
                  </div>
                  
                  {listeningContent.sections[0].questions.map((question: any, index: number) => {
                    if (index > 4) return null; // Only show first 5 questions
                      
                    const savedAnswer = userAnswers.find(a => a.questionId === question.id)?.userResponse || '';
                      
                    return (
                      <div key={question.id} className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{index + 1}.</span>
                          <RadioGroup 
                            value={savedAnswer} 
                            onValueChange={(value) => handleAnswerChange(question.id, value)}
                            className="flex flex-wrap gap-4"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying}
                          >
                            {question.options.map((option: string) => (
                              <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                                <Label htmlFor={`q${question.id}-${option}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* Section 1B: Questions 6-10 (Notes format) */}
              {(currentSectionIndex === 0 || currentPhase === Phase.FINAL_REVIEW) && (
                <div className="mt-8 pt-4 border-t">
                  <h3 className="font-medium mb-4">Section 1: Questions 6-10</h3>
                  <p className="text-sm mb-4">Complete the notes about the Enrolment Plans.</p>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Plan 5</h4>
                      <ul className="list-disc list-inside pl-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <span>Question 6:</span>
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q6')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q6', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying}
                          /> evening courses
                        </li>
                        <li>Basic fee: $450</li>
                        <li>Plus $50 enrolment fee</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Plan 3</h4>
                      <ul className="list-disc list-inside pl-2 space-y-2">
                        <li>One evening course</li>
                        <li className="flex items-center gap-2">
                          <span>Basic fee (Question 7):</span>
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q7')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q7', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying}
                          />
                        </li>
                        <li>Plus $50 enrolment fee</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Plan 2</h4>
                      <ul className="list-disc list-inside pl-2 space-y-2">
                        <li>One evening course</li>
                        <li className="flex items-center gap-2">
                          <span>Basic fee (Question 8):</span>
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q8')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q8', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying}
                          />
                        </li>
                        <li className="flex items-center gap-2">
                          <span>Enrol before (Question 9):</span>
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q9')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q9', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying}
                          /> of this month
                        </li>
                        <li className="flex items-center gap-2">
                          <span>Contact name (Question 10):</span>
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q10')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q10', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Section 4: Questions 11-15 (Art World changes) */}
              {(currentSectionIndex === 1 || currentPhase === Phase.FINAL_REVIEW) && (
                <div className={currentPhase !== Phase.FINAL_REVIEW ? '' : 'mt-8 pt-8 border-t'}>
                  <h3 className="font-medium mb-4">Section 4: Questions 11-15</h3>
                  <p className="text-sm mb-4">Complete the notes about changes in the Art World.</p>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Two main factors:</h4>
                      <ul className="list-disc list-inside pl-2 space-y-3">
                        <li>
                          <strong>Technology</strong>
                          <ul className="list-disc list-inside pl-6 pt-1">
                            <li className="flex flex-wrap items-center gap-2">
                              Digital - the 
                              <Input 
                                placeholder="Type your answer" 
                                value={userAnswers.find(a => a.questionId === 'l-q11')?.userResponse || ''}
                                onChange={(e) => handleAnswerChange('l-q11', e.target.value)}
                                className="w-32 inline-block h-7"
                                disabled={currentPhase === Phase.LISTENING && audioPlaying && currentSectionIndex !== 1}
                              /> 
                              'high art' and 'popular culture' is not so clear (Question 11)
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Globalization</strong>
                          <ul className="list-disc list-inside pl-6 pt-1">
                            <li className="flex flex-wrap items-center gap-2">
                              New art collectors are moving the 
                              <Input 
                                placeholder="Type your answer" 
                                value={userAnswers.find(a => a.questionId === 'l-q12')?.userResponse || ''}
                                onChange={(e) => handleAnswerChange('l-q12', e.target.value)}
                                className="w-32 inline-block h-7"
                                disabled={currentPhase === Phase.LISTENING && audioPlaying && currentSectionIndex !== 1}
                              /> 
                              away from the US and Europe (Question 12)
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Changing Definition:</h4>
                      <ul className="list-disc list-inside pl-2 space-y-2">
                        <li className="flex flex-wrap items-center gap-2">
                          Traditional definitions of 'high art' contained strong connections to 
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q13')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q13', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying && currentSectionIndex !== 1}
                          /> (Question 13)
                        </li>
                        <li className="flex flex-wrap items-center gap-2">
                          Contemporary art seems outside 
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q14')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q14', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying && currentSectionIndex !== 1}
                          /> 
                          of previous definitions (Question 14)
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Art Nationality:</h4>
                      <ul className="list-disc list-inside pl-2 space-y-2">
                        <li>More difficult to define</li>
                        <li className="flex flex-wrap items-center gap-2">
                          Easier movement of artists 
                          <Input 
                            placeholder="Type your answer" 
                            value={userAnswers.find(a => a.questionId === 'l-q15')?.userResponse || ''}
                            onChange={(e) => handleAnswerChange('l-q15', e.target.value)}
                            className="w-32 inline-block h-7"
                            disabled={currentPhase === Phase.LISTENING && audioPlaying && currentSectionIndex !== 1}
                          /> (Question 15)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex justify-between pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
            {/* Show different buttons based on the current phase */}
            {currentPhase === Phase.FINAL_REVIEW && (
              <>
                <Button variant="outline" onClick={handleSkipReview}>
                  Demo: Skip Review
                </Button>
                <Button 
                  onClick={handleForceSubmit} 
                  className="bg-ielts-blue hover:bg-ielts-lightblue"
                >
                  Submit Test
                </Button>
              </>
            )}
            
            {currentPhase === Phase.PREVIEW && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (previewTimerRef.current) clearInterval(previewTimerRef.current);
                  startAudioPlayback();
                }}
                className="ml-auto"
              >
                Skip Preview
              </Button>
            )}
            
            {/* Emergency submit button (administrative use only) */}
            {currentPhase !== Phase.COMPLETED && 
             currentPhase !== Phase.FINAL_REVIEW && (
              <Button 
                variant="outline" 
                onClick={handleForceSubmit}
                className="ml-auto"
              >
                Force Submit (Admin)
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListeningTest;
