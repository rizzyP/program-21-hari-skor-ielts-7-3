
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCurriculum } from "@/hooks/useCurriculum";

const ListeningBeginnerGuide = () => {
  const { markAsCompleted } = useCurriculum();
  const dayNumber = 2; // Day 2 contains this material
  const materialIndex = 0; // First material in the day
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.1: Format Dasar IELTS Listening</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/curriculum">
              <ChevronRight className="ml-2 h-4 w-4" />
              Back to Curriculum
            </Link>
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Struktur Dasar IELTS Listening</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Tes IELTS Listening terdiri dari 4 "section" (bagian) dengan total durasi sekitar 30 menit plus 10 menit untuk mentransfer jawaban ke lembar jawaban. Setiap section memiliki 10 pertanyaan, jadi total ada 40 soal.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Section 1: Dialog Sosial/Layanan</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Dialog/percakapan antara 2 orang</li>
            <li><strong>Konteks:</strong> Situasi sosial sehari-hari atau transaksi layanan</li>
            <li><strong>Contoh Situasi:</strong> Reservasi hotel, pemesanan tiket, pendaftaran keanggotaan, permintaan informasi</li>
            <li><strong>Jenis Soal Umum:</strong> Form completion, multiple choice, matching</li>
            <li><strong>Tingkat Kesulitan:</strong> Paling mudah (secara teori)</li>
            <li><strong>Tip:</strong> Fokus pada angka, ejaan nama, tanggal, harga, detail kontak</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Section 2: Monolog Sosial</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Satu orang berbicara (monolog)</li>
            <li><strong>Konteks:</strong> Informasi umum untuk publik</li>
            <li><strong>Contoh Situasi:</strong> Tur, pengumuman publik, pidato singkat, deskripsi tempat/fasilitas</li>
            <li><strong>Jenis Soal Umum:</strong> Map labelling, multiple choice, note/summary completion</li>
            <li><strong>Tingkat Kesulitan:</strong> Menengah-rendah</li>
            <li><strong>Tip:</strong> Perhatikan signposting language ("firstly", "another feature", "finally") dan hubungan spasial ("to the left", "opposite", "next to")</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Section 3: Dialog Akademik</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Dialog/diskusi antara 2-4 orang</li>
            <li><strong>Konteks:</strong> Pendidikan/akademik</li>
            <li><strong>Contoh Situasi:</strong> Diskusi tugas/proyek, konsultasi dengan tutor, perencanaan penelitian</li>
            <li><strong>Jenis Soal Umum:</strong> Multiple choice, matching, sentence/summary completion</li>
            <li><strong>Tingkat Kesulitan:</strong> Menengah-tinggi</li>
            <li><strong>Tip:</strong> Identifikasi siapa mengatakan apa, perhatikan opini berbeda, & academic vocabulary</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Section 4: Monolog Akademik</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Satu orang berbicara (mini-lecture)</li>
            <li><strong>Konteks:</strong> Akademik murni</li>
            <li><strong>Contoh Situasi:</strong> Kuliah universitas, presentasi akademik</li>
            <li><strong>Jenis Soal Umum:</strong> Sentence/summary/table completion, multiple choice, note-taking</li>
            <li><strong>Tingkat Kesulitan:</strong> Paling sulit</li>
            <li><strong>Tip:</strong> Fokus pada struktur ceramah, hubungan sebab-akibat, terminologi khusus</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Format Soal dalam IELTS Listening</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            IELTS Listening menggunakan berbagai format soal untuk menguji pemahaman Anda. Berikut adalah tipe-tipe soal yang akan Anda temui:
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">1. Form/Note/Table/Summary/Flow-chart Completion</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Mengisi informasi yang hilang dalam formulir, catatan, tabel, ringkasan, atau diagram alur.</li>
            <li><strong>Batasan Kata:</strong> Biasanya "NO MORE THAN TWO/THREE WORDS AND/OR A NUMBER".</li>
            <li><strong>Yang Diuji:</strong> Kemampuan menangkap informasi faktual spesifik.</li>
            <li><strong>Tips:</strong> Baca instruksi dengan teliti (word limit), prediksi jenis jawaban, perhatikan urutan informasi dalam audio.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">2. Multiple Choice</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Pilihan ganda dengan 3 atau lebih opsi (A, B, C, [D]).</li>
            <li><strong>Variasi:</strong> Bisa berupa pertanyaan dengan satu jawaban benar atau "choose TWO letters" untuk dua jawaban.</li>
            <li><strong>Yang Diuji:</strong> Pemahaman detail, pendapat, tujuan, dan kesimpulan.</li>
            <li><strong>Tips:</strong> Baca semua opsi sebelum mendengar, waspadai parafrase (audio jarang menggunakan kata yang sama persis), waspada opsi yang "hampir benar".</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">3. Matching</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Mencocokkan item dari dua daftar, misal mencocokkan orang dengan pendapat/aktivitas.</li>
            <li><strong>Variasi:</strong> Bisa berupa mencocokkan speaker dengan statement, atau mencocokkan item dengan lokasi.</li>
            <li><strong>Yang Diuji:</strong> Kemampuan membedakan perspektif dan mengklasifikasikan informasi.</li>
            <li><strong>Tips:</strong> Perhatikan nama orang, pahami opsi sebelum mendengarkan, fokus pada kata kunci opini/sikap, waspada informasi berulang.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">4. Plan/Map/Diagram Labelling</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Mengidentifikasi lokasi, benda, atau ruangan pada peta atau diagram.</li>
            <li><strong>Variasi:</strong> Bisa berupa memilih label dari daftar opsi atau menulis label sendiri.</li>
            <li><strong>Yang Diuji:</strong> Kemampuan memahami deskripsi spasial dan mengikuti arah.</li>
            <li><strong>Tips:</strong> Orientasikan diri pada peta sebelum mendengarkan (cari entrance, north/south, landmark), perhatikan preposisi tempat, ikuti rute deskripsi dengan pensil Anda.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">5. Short-Answer Questions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Format:</strong> Pertanyaan yang membutuhkan jawaban singkat.</li>
            <li><strong>Batasan Kata:</strong> Biasanya "NO MORE THAN THREE WORDS AND/OR A NUMBER".</li>
            <li><strong>Yang Diuji:</strong> Kemampuan memahami dan mengekstrak informasi faktual.</li>
            <li><strong>Tips:</strong> Baca pertanyaan dan prediksi jenis jawaban yang dibutuhkan (nama, tempat, alasan, angka?), perhatikan kata tanya (who, what, when, where, why, how).</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan dan Strategi Umum</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Memahami struktur tes dan format soal IELTS Listening adalah langkah pertama yang sangat penting. Beberapa strategi umum yang perlu diingat:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Gunakan waktu persiapan dengan efektif:</strong> Sekitar 30-40 detik diberikan sebelum setiap section untuk membaca soal. Manfaatkan waktu ini untuk memprediksi jawaban dan mengidentifikasi kata kunci.</li>
            <li><strong>Audio hanya diputar sekali:</strong> Konsentrasi penuh sangat penting.</li>
            <li><strong>Urutan Jawaban:</strong> Jawaban biasanya muncul sesuai urutan pertanyaan (kecuali tipe matching tertentu).</li>
            <li><strong>Aksen Beragam:</strong> IELTS menggunakan aksen British, American, Australian, dan aksen native speaker lainnya.</li>
            <li><strong>Transfer Jawaban:</strong> Di akhir tes, Anda diberi 10 menit untuk memindahkan jawaban ke answer sheet. Gunakan waktu ini untuk memeriksa ejaan dan grammar.</li>
            <li><strong>Dengarkan Instruksi:</strong> Instruksi untuk setiap bagian akan dibacakan. Dengarkan dengan baik.</li>
            <li><strong>Berlatih dengan timing:</strong> Biasakan diri dengan tekanan waktu saat berlatih.</li>
          </ul>
          
          <p className="mb-4">
            Persiapan yang efektif dan latihan konsisten akan membantu Anda membiasakan diri dengan format tes dan mengembangkan strategi personalmu untuk menjawab setiap tipe soal. Ingat, memahami cara tes distruktur adalah bagian penting dari persiapan IELTS Listening.
          </p>
        </div>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="default" 
          onClick={() => markAsCompleted(dayNumber, materialIndex)}
        >
          <Check className="mr-2 h-4 w-4" />
          Mark as Completed
        </Button>
        <Button variant="outline" asChild>
          <Link to="/curriculum">
            <ChevronRight className="ml-2 h-4 w-4" />
            Back to Curriculum
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ListeningBeginnerGuide;
