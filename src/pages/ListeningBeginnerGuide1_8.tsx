
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_8 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.8: Mengasah Kemampuan Prediksi Konteks dan Jawaban</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide-1-7">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/curriculum">
              <ChevronRight className="ml-2 h-4 w-4" />
              Back to Curriculum
            </Link>
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 1: Menganalisis Pertanyaan Secara Mendalam Sebelum Mendengar</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Waktu beberapa puluh detik yang diberikan sebelum setiap bagian audio dimulai adalah emas murni. Memanfaatkannya secara maksimal untuk menganalisis pertanyaan adalah fondasi dari prediksi yang efektif.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Mengapa Analisis Awal Sangat Penting?</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Mengurangi Beban Kognitif:</strong> Saat audio mulai, otak Anda sudah 'disetel' untuk mencari informasi spesifik, bukan mencoba memahami pertanyaan dan audio secara bersamaan.</li>
            <li><strong>Mengarahkan Fokus Pendengaran:</strong> Anda tahu apa yang harus didengarkan, membantu menyaring kebisingan informasi yang tidak relevan.</li>
            <li><strong>Mengaktifkan Pengetahuan Latar:</strong> Membaca pertanyaan dan konteks dapat mengaktifkan kosakata dan pemahaman Anda tentang topik tersebut.</li>
            <li><strong>Memungkinkan Prediksi:</strong> Analisis adalah langkah pertama sebelum Anda bisa memprediksi jenis jawaban atau sinonim.</li>
            <li><strong>Mencegah Kesalahan Konyol:</strong> Memastikan Anda tahu batas kata dan apa yang sebenarnya ditanyakan.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Langkah-langkah Analisis Pertanyaan dalam Waktu Persiapan:</h3>
          
          <ol className="list-decimal pl-6 mb-4">
            <li className="mb-2"><strong>Baca Instruksi UTAMA:</strong> Selalu mulai dari sini! Berapa batas kata/angka? ("NO MORE THAN TWO WORDS AND/OR A NUMBER"). Apa jenis tugasnya secara umum (Choose, Complete, Label?). Lingkari atau garis bawahi instruksi ini. Ini tidak bisa ditawar!</li>
            
            <li className="mb-2"><strong>Identifikasi Tipe Pertanyaan Spesifik:</strong> Apakah ini Form Completion? Multiple Choice? Map Labelling? Matching? Short Answer? Mengenali tipe soal mengaktifkan strategi spesifik yang sudah Anda pelajari.</li>
            
            <li className="mb-2"><strong>Baca Pertanyaan/Pernyataan/Label SATU PER SATU:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Untuk Completion Tasks: Baca kata-kata di sekitar setiap gap. Pahami konteks kalimat atau field tersebut.</li>
                <li>Untuk Multiple Choice: Baca stem (pertanyaan) DAN semua options (A, B, C, ...). Pahami pertanyaan utama dan perbedaan antar opsi.</li>
                <li>Untuk Map/Plan Labelling: Lihat judul peta, orientasikan diri (pintu masuk, label yang ada), dan baca daftar tempat/area yang perlu diidentifikasi.</li>
                <li>Untuk Matching: Baca kedua daftar (misal, daftar pembicara dan daftar opini). Pahami apa yang perlu dicocokkan.</li>
                <li>Untuk Short Answer Questions: Baca pertanyaan dengan teliti, identifikasi kata tanya (What, Where, etc.).</li>
              </ul>
            </li>
            
            <li className="mb-2"><strong>Garis Bawahi KATA KUNCI (Keywords):</strong> Ini langkah aktif yang krusial! Di setiap pertanyaan/pernyataan/opsi/label, garis bawahi kata-kata yang membawa makna utama:
              <ul className="list-disc pl-6 mt-2">
                <li>Kata Benda (Nouns): Terutama yang spesifik.</li>
                <li>Kata Kerja (Verbs): Terutama yang menunjukkan aksi atau hubungan penting.</li>
                <li>Kata Sifat (Adjectives) &amp; Keterangan (Adverbs): Yang memberi detail penting atau kualifikasi.</li>
                <li>Nama Orang, Tempat, Organisasi.</li>
                <li>Angka, Tanggal, Waktu (jika ada dalam pertanyaan/opsi).</li>
                <li>Kata Tanya (Who, What, Where, When, Why, How).</li>
                <li>Kata Negatif atau Pembatas (not, except, only, main, primarily).</li>
              </ul>
              <p className="mt-2">Contoh: "What was the <em>main reason</em> for the <em>library closure</em> last <em>Tuesday</em>?" (Keywords digarisbawahi/dicetak miring).</p>
            </li>
            
            <li className="mb-2"><strong>Pahami Konteks Umum (Jika Memungkinkan):</strong> Lihat judul section, judul form/map, atau kalimat pengantar jika ada. Ini memberi gambaran topik.</li>
            
            <li><strong>Perhatikan Urutan Pertanyaan:</strong> Sebagian besar tipe soal (Completion, MCQ, SAQ, Map) mengikuti urutan informasi dalam audio. Kecuali untuk beberapa jenis Matching, Anda bisa mengandalkan ini untuk mengikuti alur.</li>
          </ol>

          <Separator className="my-6" />
          
          <h3 className="text-xl font-medium mb-2 mt-6">Manfaat Nyata dari Analisis Mendalam:</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Saat audio menyebutkan kata kunci yang Anda garis bawahi (atau sinonimnya), itu berfungsi sebagai 'lonceng' di kepala Anda: "Aha! Jawaban untuk nomor ini akan segera muncul!"</li>
            <li>Anda tidak akan membuang waktu mendengarkan bagian audio yang tidak relevan dengan pertanyaan yang ada.</li>
            <li>Anda lebih siap mengenali distraktor dalam MCQ karena sudah familiar dengan opsi-opsinya.</li>
            <li>Anda sudah tahu jenis informasi apa yang harus ditulis untuk completion task.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Mengatasi Tantangan Waktu Terbatas:</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Waktu persiapan memang singkat (seringkali hanya 30 detik untuk 5-7 pertanyaan). Kuncinya adalah latihan.</li>
            <li>Prioritaskan: Baca instruksi → Scan cepat semua pertanyaan → Garis bawahi kata kunci di beberapa pertanyaan pertama secara lebih mendalam. Jika waktu sisa, lanjutkan ke pertanyaan berikutnya.</li>
            <li>Jangan mencoba membaca setiap kata dengan sempurna. Fokus pada pemahaman inti dan kata kunci.</li>
            <li>Latih teknik ini setiap kali Anda mengerjakan latihan Listening agar menjadi otomatis dan cepat.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 2: Memprediksi Kata-kata dan Frasa Kunci Jawaban</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Setelah menganalisis pertanyaan, langkah berikutnya adalah mencoba memprediksi jenis kata atau bahkan kata/frasa spesifik yang mungkin menjadi jawaban, terutama untuk completion tasks.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Level Prediksi:</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Prediksi Tipe Kata (Word Type Prediction):</strong> Paling dasar dan sangat berguna. Apakah gap ini membutuhkan Noun, Verb, Adjective, Adverb, Number, Name, Date?</li>
            <li><strong>Prediksi Konten (Content Prediction):</strong> Berdasarkan konteks, bisakah kita memperkirakan topik atau kategori jawabannya?</li>
            <li><strong>Prediksi Kata Spesifik (Specific Word Prediction):</strong> Kadang mungkin, tapi jangan terlalu terpaku pada ini. Lebih fokus pada tipe dan konten.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Cara Melakukan Prediksi:</h3>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Berdasarkan Tata Bahasa (Grammar):</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Lihat kata sebelum dan sesudah gap. Struktur kalimat seringkali menentukan tipe kata yang dibutuhkan.</li>
            <li><strong>Contoh:</strong> "Students need to submit their ____ by Friday." (Kata setelah 'their' hampir pasti Noun)</li>
            <li><strong>Contoh:</strong> "The library offers workshops on ____ skills." (Setelah preposisi 'on' dan sebelum 'skills', kemungkinan Noun atau Adjective)</li>
          </ul>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Berdasarkan Konteks Field (Form/Table):</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Field "Occupation:" → Prediksi: Jenis pekerjaan (Noun, e.g., teacher, engineer, student).</li>
            <li>Field "Duration of stay:" → Prediksi: Angka + satuan waktu (e.g., 3 nights, 2 weeks, 6 months).</li>
            <li>Kolom Tabel "Advantages:" → Prediksi: Frasa benda atau kata sifat positif.</li>
          </ul>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Berdasarkan Konteks Topik:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Jika topik diskusi adalah "masalah lingkungan", prediksi jawaban mungkin melibatkan kata-kata seperti pollution, deforestation, recycling, waste, climate change, conservation.</li>
            <li>Jika konteksnya adalah "pendaftaran universitas", prediksi kata seperti application, deadline, fees, courses, subjects, requirements, accommodation, student ID.</li>
          </ul>

          <Separator className="my-6" />
          
          <h3 className="text-xl font-medium mb-2 mt-6">Manfaat Prediksi Jawaban:</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Mempersempit Fokus Pendengaran:</strong> Anda tidak lagi mencari 'kata apa saja', tapi mencari 'angka', 'nama tempat', 'alasan', 'kata benda terkait lingkungan'.</li>
            <li><strong>Meningkatkan Kemungkinan Menangkap Jawaban:</strong> Bahkan jika Anda hanya mendengar sebagian, prediksi tipe kata bisa membantu Anda melengkapi atau menebak dengan lebih akurat.</li>
            <li><strong>Memvalidasi Jawaban:</strong> Setelah Anda menulis jawaban, cek apakah cocok dengan prediksi tipe kata Anda. Jika Anda memprediksi Noun tapi menulis Verb, mungkin ada yang salah.</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
            <p className="italic text-blue-800">
              <strong>Penting untuk Diingat:</strong> Prediksi adalah tentang kemungkinan, bukan kepastian. Jangan abaikan apa yang sebenarnya Anda dengar hanya karena tidak cocok dengan prediksi spesifik Anda. Fokus utama tetap pada prediksi tipe kata dan konten umum, bukan menebak kata persisnya.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 3: Mengantisipasi Sinonim dan Parafrase</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Ini adalah puncak dari skill prediksi dan kunci mutlak untuk sukses di IELTS Listening, terutama di Section 2, 3, dan 4 (tapi juga relevan di Section 1 MCQ/SAQ). IELTS sengaja menggunakan kata-kata berbeda dalam audio dibandingkan dalam pertanyaan untuk menguji pemahaman makna, bukan sekadar pencocokan kata.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Mengapa IELTS Melakukan Ini?</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Menguji pemahaman kosa kata yang luas.</li>
            <li>Menguji kemampuan memahami ide bukan hanya kata individual.</li>
            <li>Merefleksikan komunikasi nyata di mana orang sering mengungkapkan ide yang sama dengan cara berbeda.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Bagaimana Cara Mengantisipasi Sinonim/Parafrase?</h3>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Saat Menganalisis Pertanyaan (Waktu Persiapan):</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Setelah menggarisbawahi kata kunci di pertanyaan/opsi, luangkan beberapa detik (jika sempat) untuk berpikir: "Bagaimana lagi cara mengatakan ini?"</li>
            <li>Fokus pada kata kunci utama (nouns, verbs, adjectives, adverbs).</li>
            <li><strong>Contoh:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Keyword di soal: difficulty → Pikirkan: problem, challenge, hard part, issue, complication, obstacle.</li>
                <li>Keyword di soal: benefits → Pikirkan: advantages, positive aspects, upsides, good points, value.</li>
                <li>Keyword di soal: to reduce → Pikirkan: to lower, decrease, cut down on, minimize.</li>
                <li>Keyword di soal: students → Pikirkan: learners, undergraduates, postgraduates, pupils.</li>
                <li>Keyword di soal: immediately → Pikirkan: right away, straight away, at once, promptly.</li>
              </ul>
            </li>
          </ul>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Saat Mendengarkan:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Jangan hanya 'menunggu' kata kunci persis dari pertanyaan. Dengarkan makna dan konsepnya.</li>
            <li>Bersiaplah mendengar ide yang sama diungkapkan dengan struktur kalimat yang berbeda atau kosakata yang berbeda.</li>
            <li><strong>Contoh:</strong> Pertanyaan: "What was the main drawback of the initial plan?" Audio: "The biggest problem with the first proposal was its cost." (Drawback = problem; initial plan = first proposal). Anda harus menangkap hubungan makna ini.</li>
          </ul>

          <Separator className="my-6" />
          
          <h3 className="text-xl font-medium mb-2 mt-6">Membangun Kemampuan Mengenali Sinonim/Parafrase:</h3>
          
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Belajar Kosakata Secara Aktif:</strong> Jangan hanya menghafal kata baru, tapi pelajari juga sinonim, antonim, dan contoh penggunaannya dalam kalimat.</li>
            <li><strong>Perhatikan Saat Latihan:</strong> Setiap kali Anda menemukan jawaban yang merupakan parafrase, catat! Analisis bagaimana ide tersebut diungkapkan secara berbeda.</li>
            <li><strong>Baca Secara Luas:</strong> Membaca artikel, berita, atau buku dalam bahasa Inggris akan memaparkan Anda pada berbagai cara untuk mengungkapkan ide yang sama.</li>
            <li><strong>Gunakan Thesaurus (dengan Hati-hati):</strong> Thesaurus bisa membantu mencari sinonim, tapi pastikan sinonim tersebut cocok dengan konteks kalimat.</li>
            <li><strong>Fokus pada Kata Kerja & Kata Sifat:</strong> Ini seringkali menjadi kunci parafrase ide.</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
            <h4 className="font-medium mb-2">Contoh Banyak Digunakan:</h4>
            <ul className="list-disc pl-6">
              <li>Soal: ancient → Audio: very old, from a long time ago, historical.</li>
              <li>Soal: staff → Audio: employees, workers, personnel, team members.</li>
              <li>Soal: obligatory → Audio: compulsory, required, mandatory, must do.</li>
              <li>Soal: various → Audio: different kinds of, a range of, several types of.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Prediksi adalah skill proaktif yang memberdayakan Anda dalam tes IELTS Listening. Dengan secara sistematis:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Menganalisis pertanyaan</strong> selama waktu persiapan (memahami instruksi, tipe soal, kata kunci)</li>
            <li><strong>Memprediksi jenis dan konten jawaban</strong> yang mungkin (terutama untuk completion tasks)</li>
            <li><strong>Secara aktif mengantisipasi sinonim dan parafrase</strong> dari kata kunci</li>
          </ul>
          
          <p className="mb-4">
            Anda secara signifikan meningkatkan peluang untuk fokus pada informasi yang tepat, mengenali jawaban meskipun diungkapkan secara berbeda, dan menjawab dengan lebih akurat dan efisien.
          </p>
          
          <p className="mb-4">
            Keterampilan ini tidak datang secara instan; ia membutuhkan latihan yang sadar dan konsisten. Jadikan analisis dan prediksi sebagai bagian integral dari setiap sesi latihan Listening Anda, dan Anda akan melihat dampaknya pada pemahaman dan skor Anda di semua bagian tes.
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-7">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Strategi Jitu Section 2
          </Link>
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

export default ListeningBeginnerGuide1_8;
