
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ExaminerAvatarProps {
  examinerSpeaking: boolean;
}

const ExaminerAvatar: React.FC<ExaminerAvatarProps> = ({ examinerSpeaking }) => (
  <Avatar className={cn(
    "w-16 h-16 border-2",
    examinerSpeaking ? "border-green-500 animate-pulse" : "border-ielts-red"
  )}>
    <AvatarImage src="https://i.pravatar.cc/150?img=58" alt="Examiner" />
    <AvatarFallback>SW</AvatarFallback>
  </Avatar>
);

export default ExaminerAvatar;
