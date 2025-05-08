
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
        <CardTitle className="text-center">Tes Speaking IELTS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-red-50 p-4 rounded-md">
          <h3 className="font-medium text-lg mb-2">Instruksi:</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Ini adalah simulasi dari Tes Speaking IELTS.</li>
            <li>Anda akan berinteraksi dengan penguji simulasi yang akan mengajukan pertanyaan.</li>
            <li>Tes terdiri dari tiga bagian:</li>
            <li>Bagian 1 (4-5 menit): Perkenalan dan pertanyaan tentang topik yang akrab.</li>
            <li>Bagian 2 (3-4 menit): Presentasi yang lebih panjang tentang topik tertentu dengan 1 menit waktu persiapan.</li>
            <li>Bagian 3 (4-5 menit): Diskusi terkait topik pada Bagian 2.</li>
            <li>Bicaralah dengan jelas dan berikan jawaban terperinci seperti yang Anda lakukan dalam tes nyata.</li>
            <li><strong>Ketika penguji berhenti berbicara, rekaman akan dimulai secara otomatis.</strong></li>
            <li><strong>Tekan tombol "Berhenti Berbicara" ketika Anda selesai menjawab.</strong></li>
          </ul>
        </div>
        <div className="text-center">
          <Button onClick={onStart} size="lg" className="bg-ielts-red hover:bg-ielts-blue">
            Mulai Tes Speaking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestInstructions;
