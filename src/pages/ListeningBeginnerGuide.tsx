
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.1: Format Dasar IELTS Listening</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/curriculum">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Curriculum
            </Link>
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 1: Struktur Dasar Tes IELTS Listening</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Tes IELTS Listening terdiri dari 40 pertanyaan yang dibagi ke dalam 4 bagian (Sections). Anda akan mendengarkan rekaman audio (sekitar 30 menit) yang berisi percakapan dan monolog, lalu Anda memiliki 10 menit ekstra di akhir untuk mentransfer jawaban Anda dari lembar soal (question paper) ke lembar jawaban (answer sheet). Ingat, audio hanya diputar SATU KALI. Tidak ada pengulangan!
          </p>
          
          <h3 className="text-xl font-medium mb-2">Berikut rincian keempat bagian tersebut:</h3>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Section 1: Konteks Sosial Sehari-hari (Percakapan)</h4>
          <p className="mb-2"><strong>Format:</strong> Percakapan antara dua orang (misalnya, percakapan telepon untuk memesan sesuatu, menanyakan informasi tentang layanan, mendaftar kursus, dll.).</p>
          <p className="mb-2"><strong>Konteks:</strong> Situasi sosial yang umum terjadi dalam kehidupan sehari-hari. Fokusnya seringkali pada pertukaran informasi faktual.</p>
          <p className="mb-2"><strong>Tingkat Kesulitan:</strong> Dianggap paling mudah. Ini adalah "pemanasan" Anda.</p>
          <p className="mb-2"><strong>Tipe Pertanyaan Umum:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Form Completion (mengisi formulir)</li>
            <li>Note Completion (melengkapi catatan)</li>
            <li>Table Completion (melengkapi tabel)</li>
            <li>Short Answer Questions (jawaban singkat)</li>
            <li>Sentence Completion (melengkapi kalimat)</li>
          </ul>
          <p className="mb-2"><strong>Fokus Pendengar:</strong> Menangkap detail spesifik seperti nama (yang sering dieja), nomor telepon, alamat, tanggal, harga, waktu, dll. Perhatikan baik-baik ejaan dan angka!</p>
          <p className="mb-4"><strong>Contoh Skenario:</strong> Seseorang menelepon agen travel untuk menanyakan paket liburan, seorang mahasiswa baru mendaftar ke klub olahraga kampus, seseorang memesan meja di restoran.</p>

          <h4 className="text-lg font-medium mb-2 mt-4">Section 2: Konteks Sosial Sehari-hari (Monolog)</h4>
          <p className="mb-2"><strong>Format:</strong> Monolog (satu orang berbicara) tentang topik sosial sehari-hari. Bisa berupa pidato sambutan, penjelasan tentang fasilitas umum, panduan tur, siaran radio, atau presentasi informatif.</p>
          <p className="mb-2"><strong>Konteks:</strong> Masih dalam lingkup sosial umum, tetapi biasanya lebih terstruktur daripada Section 1.</p>
          <p className="mb-2"><strong>Tingkat Kesulitan:</strong> Sedikit lebih sulit dari Section 1. Anda perlu mengikuti alur pembicaraan satu orang.</p>
          <p className="mb-2"><strong>Tipe Pertanyaan Umum:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Multiple Choice (pilihan ganda)</li>
            <li>Matching (mencocokkan daftar)</li>
            <li>Plan/Map/Diagram Labelling (memberi label pada peta/denah/diagram)</li>
            <li>Note Completion</li>
            <li>Sentence Completion</li>
          </ul>
          <p className="mb-2"><strong>Fokus Pendengar:</strong> Memahami informasi deskriptif, mengikuti arahan (untuk soal peta/denah), mengidentifikasi tujuan atau fungsi suatu tempat/acara.</p>
          <p className="mb-4"><strong>Contoh Skenario:</strong> Pemandu wisata menjelaskan rute tur museum, kepala perpustakaan menjelaskan fasilitas dan aturan, siaran radio tentang acara lokal, penjelasan tentang tata letak taman baru.</p>

          <h4 className="text-lg font-medium mb-2 mt-4">Section 3: Konteks Akademik/Pendidikan (Percakapan)</h4>
          <p className="mb-2"><strong>Format:</strong> Percakapan antara beberapa orang (bisa 2, 3, atau bahkan 4 orang) dalam konteks pendidikan atau pelatihan. Seringkali melibatkan mahasiswa dan dosen, atau antar mahasiswa yang sedang berdiskusi.</p>
          <p className="mb-2"><strong>Konteks:</strong> Topik akademis, diskusi tugas kuliah, perencanaan proyek penelitian, seminar, tutorial.</p>
          <p className="mb-2"><strong>Tingkat Kesulitan:</strong> Jauh lebih menantang daripada Section 1 dan 2. Anda perlu mengikuti interaksi beberapa pembicara, mengidentifikasi pendapat yang berbeda, dan memahami argumen atau sudut pandang.</p>
          <p className="mb-2"><strong>Tipe Pertanyaan Umum:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Multiple Choice (seringkali menanyakan opini, sikap, atau kesepakatan/ketidaksepakatan)</li>
            <li>Matching (mencocokkan pendapat dengan pembicara, atau ide dengan kategori)</li>
            <li>Flow-chart Completion (melengkapi diagram alir proses)</li>
            <li>Sentence Completion</li>
            <li>Short Answer Questions</li>
          </ul>
          <p className="mb-2"><strong>Fokus Pendengar:</strong> Mengidentifikasi pembicara, memahami opini, sikap, tujuan, kesepakatan/ketidaksepakatan antar pembicara, mengikuti alur diskusi akademis.</p>
          <p className="mb-4"><strong>Contoh Skenario:</strong> Dua mahasiswa berdiskusi dengan dosen tentang outline esai mereka, tiga mahasiswa merencanakan presentasi kelompok, diskusi dalam sebuah seminar tentang hasil penelitian.</p>

          <h4 className="text-lg font-medium mb-2 mt-4">Section 4: Konteks Akademik (Monolog)</h4>
          <p className="mb-2"><strong>Format:</strong> Monolog (satu orang berbicara) dalam bentuk kuliah atau presentasi akademis. Mirip seperti mendengarkan dosen memberikan kuliah singkat.</p>
          <p className="mb-2"><strong>Konteks:</strong> Topik akademis yang spesifik (bisa dari bidang sains, humaniora, sosial, dll.).</p>
          <p className="mb-2"><strong>Tingkat Kesulitan:</strong> Dianggap paling sulit. Biasanya tidak ada jeda di tengah-tengah seperti di Section 1-3. Anda perlu mempertahankan konsentrasi tinggi untuk waktu yang lebih lama dan memahami struktur argumen atau penjelasan yang kompleks.</p>
          <p className="mb-2"><strong>Tipe Pertanyaan Umum:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Note Completion (seringkali dalam format catatan kuliah)</li>
            <li>Summary Completion (melengkapi ringkasan kuliah)</li>
            <li>Table Completion</li>
            <li>Flow-chart Completion</li>
            <li>Sentence Completion</li>
          </ul>
          <p className="mb-2"><strong>Fokus Pendengar:</strong> Mengidentifikasi ide utama, gagasan pendukung, struktur kuliah (misalnya, sebab-akibat, klasifikasi, proses), definisi istilah, contoh-contoh yang diberikan.</p>
          <p className="mb-4"><strong>Contoh Skenario:</strong> Kuliah tentang dampak perubahan iklim di suatu wilayah, presentasi tentang sejarah perkembangan teknologi tertentu, penjelasan tentang teori psikologi.</p>

          <h4 className="text-lg font-medium mb-2 mt-4">Karakteristik Penting Lainnya:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Peningkatan Kesulitan:</strong> Seperti yang dijelaskan, tingkat kesulitan umumnya meningkat dari Section 1 ke Section 4.</li>
            <li><strong>Hanya Didengarkan Sekali:</strong> Ini adalah aturan emas. Latih konsentrasi Anda!</li>
            <li><strong>Beragam Aksen:</strong> Anda akan mendengar berbagai aksen penutur asli bahasa Inggris (British, Australian, New Zealander, American, Canadian). Biasakan telinga Anda dengan berbagai aksen ini melalui latihan.</li>
            <li><strong>Waktu Membaca Pertanyaan:</strong> Sebelum setiap bagian dimulai (dan kadang di tengah bagian untuk set pertanyaan berikutnya), Anda akan diberi waktu singkat (misalnya 30 detik) untuk membaca pertanyaan. Manfaatkan waktu ini sebaik mungkin!</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 2: Strategi Mentransfer Jawaban ke Answer Sheet (10 Menit Krusial!)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Setelah 30 menit mendengarkan audio dan menulis jawaban sementara di lembar soal, Anda akan diberikan waktu 10 menit khusus untuk memindahkan jawaban Anda ke lembar jawaban resmi (IELTS Listening Answer Sheet). Jangan anggap remeh waktu ini! Ini adalah kesempatan terakhir Anda untuk memastikan jawaban Anda terbaca jelas dan akurat.
          </p>
          
          <h3 className="text-xl font-medium mb-2">Mengapa Menulis di Lembar Soal Dulu?</h3>
          <p className="mb-4">
            Saat audio diputar, fokus utama Anda adalah mendengarkan dan memahami. Mencoba menulis langsung di answer sheet yang rapi bisa memecah konsentrasi. Anda mungkin jadi khawatir tentang tulisan, ejaan, atau mencari nomor yang benar di answer sheet, sehingga melewatkan informasi penting dari audio. Oleh karena itu, sangat disarankan:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Dengarkan dan Tulis Cepat di Lembar Soal:</strong> Tulis jawaban Anda secepat mungkin di samping nomor pertanyaan pada lembar soal (question paper). Gunakan singkatan atau simbol jika perlu (tapi pastikan Anda ingat artinya!), fokus pada menangkap kata kunci.</li>
            <li><strong>Gunakan 10 Menit Transfer dengan Efektif:</strong> Setelah audio selesai, barulah gunakan 10 menit ini untuk menyalin jawaban dengan hati-hati ke answer sheet.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">Strategi Efektif Selama 10 Menit Transfer:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Fokus Penuh:</strong> Jauhkan pikiran dari audio yang baru saja selesai. Konsentrasikan diri pada tugas menyalin dan memeriksa.</li>
            <li><strong>Periksa Ejaan (Spelling):</strong> Ini sangat penting! Kesalahan ejaan, sekecil apa pun, akan membuat jawaban Anda salah.</li>
            <li><strong>Periksa Tata Bahasa (Grammar):</strong> Pastikan singular/plural sesuai dengan konteks kalimat.</li>
            <li><strong>Patuhi Batas Kata (Word Limit):</strong> Instruksi seperti "NO MORE THAN TWO WORDS AND/OR A NUMBER" harus dipatuhi dengan ketat.</li>
            <li><strong>Tulisan Jelas dan Terbaca (Legibility):</strong> Pastikan tulisan tangan Anda mudah dibaca oleh pemeriksa.</li>
            <li><strong>Nomor Jawaban yang Benar:</strong> Pastikan jawaban untuk nomor 5 Anda tulis di baris nomor 5 pada answer sheet, bukan di baris nomor 6!</li>
            <li><strong>Jangan Biarkan Kosong:</strong> Jika ada jawaban yang Anda tidak yakin atau terlewat saat mendengarkan, tetap usahakan untuk menebak selama 10 menit transfer ini.</li>
            <li><strong>Manajemen Waktu Transfer:</strong> Alokasikan waktu dengan bijak. Jangan habiskan 5 menit hanya untuk memeriksa ejaan satu kata.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 3: Jenis Pertanyaan Umum dan Memahami Instruksi</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Mengenali berbagai jenis pertanyaan dan memahami instruksinya secara akurat adalah pilar ketiga untuk sukses di IELTS Listening.
          </p>
          
          <h3 className="text-xl font-medium mb-2">Aturan Emas: BACA INSTRUKSI DENGAN SAKSAMA!</h3>
          <p className="mb-4">
            Sebelum menjawab setiap set pertanyaan, selalu baca instruksinya terlebih dahulu. Perhatikan secara khusus:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Jenis tugas: Apa yang harus Anda lakukan? (Mencocokkan, mengisi, memilih, memberi label?)</li>
            <li>Batas kata/angka: "NO MORE THAN THREE WORDS AND/OR A NUMBER", "ONE WORD ONLY", dll. Ini krusial!</li>
            <li>Format jawaban: Apakah harus memilih huruf (A, B, C)? Menulis kata? Angka?</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">Sekarang, mari kita lihat jenis-jenis pertanyaan yang paling umum:</h3>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Multiple Choice (Pilihan Ganda)</h4>
          <p className="mb-2"><strong>Format:</strong> Pertanyaan diikuti beberapa pilihan jawaban (biasanya 3 atau 4). Anda harus memilih satu jawaban yang benar (Single Answer) ATAU beberapa jawaban yang benar sesuai instruksi (Multiple Answers - misal "Choose TWO letters").</p>
          <p className="mb-2"><strong>Strategi:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Baca pertanyaan dan pilihan jawaban sebelum audio dimulai. Garis bawahi kata kunci.</li>
            <li>Waspadai distractors (pengecoh). Audio mungkin menyebutkan beberapa kata dari pilihan jawaban, tetapi hanya satu yang benar-benar menjawab pertanyaan.</li>
            <li>Dengarkan sinonim dan parafrase. Jawaban yang benar seringkali tidak menggunakan kata-kata yang persis sama dengan pilihan jawaban.</li>
            <li>Untuk Multiple Answers, catat semua pilihan yang relevan saat mendengarkan, lalu pilih jumlah yang diminta di akhir.</li>
            <li>Eliminasi pilihan yang jelas salah.</li>
          </ul>
          
          <Separator className="my-6" />
          
          <h3 className="text-xl font-medium mb-2">Tips Tambahan untuk Sukses:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Latihan Rutin:</strong> Tidak ada jalan pintas. Latih pendengaran Anda setiap hari dengan berbagai materi audio.</li>
            <li><strong>Biasakan dengan Aksen:</strong> Dengarkan berita, podcast, film, atau acara TV dari negara-negara berbahasa Inggris yang berbeda.</li>
            <li><strong>Tingkatkan Kosakata:</strong> Semakin banyak kosakata yang Anda kuasai, semakin mudah memahami sinonim dan parafrase.</li>
            <li><strong>Latih Konsentrasi:</strong> Tes ini butuh fokus selama 30 menit tanpa henti.</li>
            <li><strong>Simulasi Kondisi Tes:</strong> Saat berlatih, coba kerjakan satu tes Listening penuh dalam kondisi senyap.</li>
            <li><strong>Kenali Jebakan:</strong> Waspadai distractors, informasi yang disebutkan tapi kemudian dikoreksi.</li>
            <li><strong>Jangan Panik Jika Terlewat:</strong> Jika Anda melewatkan satu jawaban, lupakan saja dan segera fokus pada pertanyaan berikutnya.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Menguasai format IELTS Listening adalah langkah pertama dan paling fundamental menuju skor impian Anda. Dengan memahami struktur 4 bagian, strategi transfer jawaban yang efektif, serta mengenali berbagai jenis pertanyaan dan instruksinya, Anda sudah memiliki bekal yang sangat kuat.
          </p>
          <p className="mb-4">
            Ingat, kunci berikutnya adalah latihan, latihan, dan latihan! Terapkan semua yang telah kita bahas ini dalam sesi latihan Anda. Analisis kesalahan Anda, pelajari mengapa Anda salah, dan terus perbaiki strategi Anda.
          </p>
          <p className="mb-4">
            Saya yakin, dengan kerja keras, pemahaman format yang solid, dan strategi yang tepat, Anda, para pejuang IELTS Indonesia, pasti bisa menaklukkan tes Listening ini dan meraih skor yang membanggakan!
          </p>
          <p className="mb-4">
            Selamat berlatih, tetap semangat, dan semoga sukses! Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya.
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/curriculum">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Curriculum
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-2">
            <ChevronRight className="ml-2 h-4 w-4" />
            Next: Mendengarkan Detail Faktual
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ListeningBeginnerGuide;
