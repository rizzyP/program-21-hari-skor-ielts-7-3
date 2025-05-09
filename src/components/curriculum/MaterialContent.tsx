
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MaterialContentProps {
  title: string;
  content: string | React.ReactNode;
  chapter?: string;
}

const MaterialContent: React.FC<MaterialContentProps> = ({ title, content, chapter }) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-2">{chapter && `${chapter}: `}{title}</h2>
        {typeof content === 'string' ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
        ) : (
          <div className="prose max-w-none">{content}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialContent;
