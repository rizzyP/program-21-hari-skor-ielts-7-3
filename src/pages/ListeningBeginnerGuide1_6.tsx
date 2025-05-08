
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_6 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.6: Strategi Jitu Section 1 (Percakapan Sehari-hari)</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide-1-5">
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
        <h2 className="text-2xl font-semibold mb-4">1. Form Filling dan Formulir Pendaftaran</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Ini adalah raja dari Section 1. Sebagian besar tes IELTS akan menyajikan setidaknya satu tugas melengkapi formulir, 
            catatan, atau tabel di bagian ini, seringkali mencakup 5-7 pertanyaan sekaligus. Kemampuan mengisi detail secara akurat sangatlah penting.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Mengapa Dominan di Section 1?</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Sangat cocok dengan konteks percakapan transaksional dan pengumpulan informasi (reservasi, pendaftaran, permintaan detail) yang umum di Section 1.</li>
            <li>Menguji kemampuan mendengarkan detail faktual spesifik (nama, angka, tanggal, alamat) secara langsung.</li>
            <li>Strukturnya logis dan biasanya mengikuti alur percakapan.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SEBELUM Mendengarkan (Waktu Persiapan):</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>WAJIB Gunakan Waktu Persiapan (30 detik atau lebih):</strong> Jangan sia-siakan! Ini krusial.</li>
            <li><strong>Baca Judul/Konteks:</strong> Pahami jenis formulir/catatan apa ini (e.g., "Library Membership Form", "Hotel Booking Enquiry"). Ini memberi gambaran umum.</li>
            <li><strong>Scan Cepat Seluruh Pertanyaan (Gap):</strong> Lihat semua nomor yang perlu diisi.</li>
            <li><strong>FOKUS pada Kata di Sekitar Gap:</strong> Baca kata-kata sebelum dan sesudah setiap bagian kosong.</li>
            <li><strong>PREDIKSI Jenis Jawaban:</strong> Ini langkah paling penting! Untuk setiap gap, prediksi:
              <ul className="list-disc pl-6 mt-2">
                <li>Apakah butuh Angka? (e.g., setelah "Phone:", "Postcode:", "Age:", "Price: $", "Number of nights:")</li>
                <li>Apakah butuh Nama/Tempat? (e.g., setelah "Name:", "Street:", "Town/City:", "Contact Person:") {'->'} Kemungkinan dieja!</li>
                <li>Apakah butuh Tanggal/Waktu? (e.g., setelah "Date of Birth:", "Arrival Date:", "Time:")</li>
                <li>Apakah butuh Kata Benda (Noun)? (e.g., setelah "Type of Room:", "Subject:", "Reason for calling:")</li>
                <li>Apakah butuh Kata Sifat (Adjective)? (e.g., sebelum noun: "... insurance type", "Level of difficulty: ...")</li>
                <li>Apakah butuh Kata Kerja (Verb)? (Jarang di form, mungkin di note/sentence completion)</li>
              </ul>
            </li>
            <li><strong>Perhatikan BATAS KATA (Word Limit):</strong> Lihat instruksi di atas set pertanyaan. Lingkari atau garis bawahi ini! Ini mutlak harus dipatuhi.</li>
            <li><strong>Antisipasi Urutan:</strong> Jawaban untuk form/note/table completion hampir selalu muncul berurutan dalam audio sesuai dengan urutan gap pada kertas soal.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SAAT Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Ikuti Alur Percakapan:</strong> Gunakan gap pertama sebagai titik awal. Begitu jawaban nomor 1 terlewati, segera fokus pada gap nomor 2.</li>
            <li><strong>Dengarkan Kata Kunci dari Sekitar Gap:</strong> Kata-kata yang Anda baca di sekitar gap akan menjadi penanda kuat bahwa jawaban akan segera muncul.</li>
            <li><strong>Tangkap Jawaban Persis Seperti Didengar:</strong> Tulis jawaban langsung di lembar soal (question paper) di samping gap.</li>
            <li><strong>Perhatian Ekstra pada Detail Kritis:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li><em>Ejaan:</em> Jika nama atau alamat dieja, tulis huruf per huruf dengan cermat.</li>
                <li><em>Angka:</em> Tulis digitnya dengan jelas. Bedakan 0/'oh', -teen/-ty.</li>
                <li><em>Tanggal/Waktu:</em> Tangkap semua komponen (hari, bulan, tahun, jam, menit, AM/PM).</li>
              </ul>
            </li>
            <li><strong>Jangan Panik Jika Terlewat:</strong> Jika Anda melewatkan satu jawaban, segera lupakan dan fokus ke gap berikutnya.</li>
            <li><strong>Gunakan Konfirmasi dalam Audio:</strong> Kadang pembicara mengulang atau mengkonfirmasi detail.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SETELAH Mendengarkan (10 Menit Transfer):</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Transfer dengan Hati-hati:</strong> Salin jawaban dari lembar soal ke lembar jawaban resmi.</li>
            <li><strong>Periksa Ejaan (SP):</strong> WAJIB! Cek setiap huruf pada nama, tempat, atau kata benda yang Anda tulis.</li>
            <li><strong>Periksa Angka (Num):</strong> Pastikan semua digit benar dan jelas.</li>
            <li><strong>Periksa Tata Bahasa (Grammar - jika relevan):</strong> Terutama untuk note/table completion.</li>
            <li><strong>Periksa Batas Kata (WL):</strong> KRUSIAL! Hitung jumlah kata dan/atau angka Anda.</li>
            <li><strong>Periksa Keterbacaan (Legibility):</strong> Tulisan harus bisa dibaca pemeriksa.</li>
            <li><strong>Jangan Kosongkan:</strong> Jika ada yang terlewat, coba tebak berdasarkan konteks.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Common Pitfalls (Kesalahan Umum):</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Salah eja nama umum (Smith vs Smyth, Johnson vs Johnston).</li>
            <li>Salah dengar angka (13/30, 15/50, 0/'oh').</li>
            <li>Format tanggal/waktu salah (menulis 5/10 padahal diminta 10th May).</li>
            <li>Melebihi batas kata (menulis "the blue car" padahal batasnya 2 kata).</li>
            <li>Tulisan tidak terbaca.</li>
            <li>Menulis jawaban di nomor yang salah pada answer sheet.</li>
            <li>Panik saat terlewat satu jawaban dan akhirnya ketinggalan beberapa jawaban berikutnya.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Multiple Choice Questions (MCQ) untuk Percakapan Sehari-hari</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Meskipun tidak sebanyak form filling, MCQ bisa muncul di Section 1, biasanya menanyakan detail spesifik, 
            alasan tindakan, atau keputusan yang dibuat dalam percakapan.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Format Umum di Section 1:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Biasanya lebih sederhana dan lugas daripada MCQ di Section 3 atau 4.</li>
            <li>Fokus pada informasi faktual atau pilihan sederhana.</li>
            <li>Umumnya hanya satu jawaban benar (pilih A, B, atau C).</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SEBELUM Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Gunakan Waktu Persiapan:</strong> Sama pentingnya seperti form filling.</li>
            <li><strong>Baca Pertanyaan (Stem) Dulu:</strong> Pahami apa yang ditanyakan. Garis bawahi kata kunci.</li>
            <li><strong>Baca SEMUA Pilihan Jawaban (A, B, C):</strong> Garis bawahi kata kunci di setiap pilihan.</li>
            <li><strong>Antisipasi Parafrase:</strong> Pikirkan cara lain untuk mengatakan ide di setiap pilihan.</li>
            <li><strong>Waspadai Negatif/Kualifikasi:</strong> Perhatikan kata seperti "not", "except", "main reason", "only".</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SAAT Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Dengarkan Kata Kunci Pertanyaan:</strong> Ini membantu Anda tahu kapan bagian relevan dari percakapan dimulai.</li>
            <li><strong>Dengarkan Pembahasan Terkait Pilihan:</strong> Pembicara mungkin akan menyebutkan sesuatu yang berkaitan dengan semua pilihan jawaban.</li>
            <li><strong>Identifikasi Distraktor:</strong> Ini adalah seni utama MCQ. Distraktor adalah pilihan yang:
              <ul className="list-disc pl-6 mt-2">
                <li>Disebutkan, tapi dinegasikan ("We considered option A, but decided against it.").</li>
                <li>Disebutkan, tapi tidak benar atau tidak relevan dengan pertanyaan.</li>
                <li>Disebutkan, tapi hanya sebagian benar atau bukan jawaban utama.</li>
                <li>Menggunakan kata yang sama, tapi maknanya berbeda dalam konteks.</li>
              </ul>
            </li>
            <li><strong>Dengarkan Sinonim & Parafrase Jawaban Benar:</strong> Jawaban yang benar seringkali diungkapkan dengan kata-kata berbeda.</li>
            <li><strong>Eliminasi Jawaban Salah:</strong> Ini mempersempit pilihan.</li>
            <li><strong>Pilih Jawaban Terbaik:</strong> Setelah mendengarkan semua pembahasan terkait, pilih opsi yang paling akurat.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Contoh Walkthrough Singkat (MCQ Section 1):</h3>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="mb-2"><strong>Pertanyaan:</strong> Why did the man choose the morning appointment?</p>
            <p className="mb-1">A. It was the only time available.</p>
            <p className="mb-1">B. He wants to go shopping afterwards.</p>
            <p className="mb-1">C. His afternoons are usually busy.</p>
            <p className="mt-3"><strong>Audio Snippet:</strong> (Woman) "We have appointments at 10 AM or 3 PM." (Man) "Hmm, 10 AM would be better for me. My afternoons tend to fill up with meetings, so the morning slot works well."</p>
            <p className="mt-3"><strong>Analisis:</strong></p>
            <ul className="list-disc pl-6">
              <li>Opsi A salah: Ada dua waktu tersedia (10 AM & 3 PM), jadi bukan "only time available". Ini distraktor.</li>
              <li>Opsi B tidak disebutkan sama sekali.</li>
              <li>Opsi C benar: Pria itu bilang "My afternoons tend to fill up with meetings" yang merupakan parafrase dari "His afternoons are usually busy".</li>
            </ul>
            <p className="mt-2"><strong>Jawaban:</strong> C</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Short Answer Questions (SAQ)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Jenis soal ini meminta Anda menjawab pertanyaan spesifik dengan beberapa kata atau angka, diambil langsung dari percakapan.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Format Umum di Section 1:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Pertanyaan langsung dimulai dengan Who, What, Where, When, Why, How many, How much.</li>
            <li>Jawaban biasanya berupa detail faktual singkat.</li>
            <li>Instruksi batas kata sangat penting dan harus dipatuhi!</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SEBELUM Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Baca Pertanyaan dengan Cermat:</strong> Pahami apa yang ditanyakan.</li>
            <li><strong>Periksa Batas Kata:</strong> Lingkari instruksi "NO MORE THAN [X] WORDS AND/OR A NUMBER".</li>
            <li><strong>Prediksi Jenis Jawaban:</strong> "Where...?" butuh tempat. "How many...?" butuh angka. "Who...?" butuh nama/jabatan.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Kunci SAAT Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Dengarkan Kata Kunci Pertanyaan:</strong> Ini memandu Anda ke bagian relevan dalam audio.</li>
            <li><strong>Identifikasi Jawaban Langsung:</strong> Dengarkan informasi spesifik yang menjawab pertanyaan tersebut.</li>
            <li><strong>Tangkap Kata-kata Persis:</strong> Jawaban SAQ seringkali bisa diambil langsung dari kata-kata yang diucapkan pembicara.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Contoh Walkthrough Singkat (SAQ Section 1):</h3>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="mb-2"><strong>Pertanyaan:</strong> (NO MORE THAN ONE WORD AND/OR A NUMBER) How much is the membership fee per month?</p>
            <p className="mb-3"><strong>Audio:</strong> "The standard membership costs £35 each month, but there's a student discount, so it's only £25 per month if you have a student card." (Percakapan melibatkan seorang siswa).</p>
            <p className="mb-2"><strong>Analisis:</strong> Pertanyaan menanyakan biaya per bulan. Ada dua harga disebut (£35 dan £25). Konteksnya siswa. Batasnya satu kata dan/atau satu angka.</p>
            <p><strong>Jawaban Benar:</strong> £25 (Satu angka) atau 25 (Satu angka, simbol mata uang sering tidak wajib kecuali diminta).</p>
            <p><strong>Jawaban Salah:</strong> £25 per month (terlalu banyak kata), standard membership £35 (informasi salah untuk konteks siswa dan terlalu banyak kata).</p>
          </div>

          <h3 className="text-xl font-medium mb-2 mt-6">Common Pitfalls:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Melebihi batas kata – ini kesalahan paling umum!</li>
            <li>Jawaban benar secara fakta tapi tidak menjawab pertanyaan spesifik.</li>
            <li>Salah eja kata kunci.</li>
            <li>Memberi jawaban tidak lengkap.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Section 1 adalah tentang kecepatan, akurasi detail, dan pemahaman konteks percakapan sehari-hari. Dengan menguasai strategi spesifik untuk:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Form Filling:</strong> Prediksi, perhatian detail, cek batas kata</li>
            <li><strong>Multiple Choice:</strong> Identifikasi distraktor, kenali parafrase</li>
            <li><strong>Short Answer Questions:</strong> Jawab langsung, patuhi batas kata</li>
          </ul>
          
          <p className="mb-4">
            Anda dapat memaksimalkan potensi skor di bagian ini. Kunci sukses terletak pada pemanfaatan waktu persiapan secara efektif, 
            mendengarkan secara aktif dan terarah, serta melakukan pengecekan jawaban yang teliti selama waktu transfer. 
            Terus latih strategi ini dengan materi Section 1 asli hingga Anda merasa percaya diri dan akurat.
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-5">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Mendalami Percakapan Sehari-hari
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

export default ListeningBeginnerGuide1_6;
