import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MaterialContent from '@/components/curriculum/MaterialContent';
import { Button } from '@/components/ui/button';
import { markSectionCompleted } from '@/services/curriculumService';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CurriculumDay2 = () => {
  const [activeChapter, setActiveChapter] = useState<string>("1.5");
  
  // Function to mark section as completed
  const handleMarkComplete = async (chapter: string) => {
    try {
      await markSectionCompleted(2, chapter);
      toast.success(`Chapter ${chapter} marked as completed!`);
    } catch (error) {
      console.error("Error marking section as completed:", error);
      toast.error("Failed to mark section as completed. Please try again.");
    }
  };

  // This object contains all the content for the different chapters
  const chapterContent = {
    "1.5": {
      title: "Mendalami Percakapan Sehari-hari (Everyday Conversations)",
      content: (
        <div className="space-y-4">
          <p>Chapter ini adalah jembatan antara pemahaman teori dan praktik nyata di Section 1 IELTS Listening. Section 1 selalu menyajikan percakapan antara dua orang dalam konteks sosial sehari-hari. Ini bisa berupa transaksi, permintaan informasi, atau interaksi umum lainnya. Meskipun dianggap bagian termudah, Section 1 membangun fondasi skor Anda dan memberikan kesempatan untuk meraih poin penuh jika Anda tahu apa yang diharapkan dan bagaimana cara mendengarkannya. Menguasai konteks percakapan sehari-hari ini adalah langkah pertama menuju kesuksesan di bagian ini. Kita akan bedah tiga skenario paling umum.</p>
          
          <h3 className="text-xl font-bold mt-6">1. Reservasi dan Pemesanan (Reservations and Bookings)</h3>
          <p>Ini adalah salah satu skenario paling klasik dan sering muncul di Section 1. Kemampuan untuk memahami dan mencatat detail saat seseorang memesan sesuatu sangatlah krusial dalam kehidupan nyata, dan IELTS mengujinya secara langsung.</p>
          
          <h4 className="text-lg font-semibold">Konteks Umum:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Akomodasi: Memesan kamar hotel, hostel, B&B, atau apartemen sewaan.</li>
            <li>Transportasi: Memesan tiket pesawat, kereta api, bus, atau feri. Menyewa mobil.</li>
            <li>Restoran/Acara: Reservasi meja di restoran, memesan tiket konser, teater, bioskop, atau acara olahraga.</li>
            <li>Layanan: Membuat janji temu dengan dokter, dokter gigi, salon, atau layanan perbaikan (misalnya, memanggil tukang ledeng). Mendaftar kursus singkat.</li>
          </ul>

          <h4 className="text-lg font-semibold">Informasi Kunci yang Sering Dipertukarkan (dan Diuji):</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nama: Ejaan nama depan dan belakang (surname/family name) pemesan. Seringkali dieja!</li>
            <li>Tanggal dan Waktu: Tanggal kedatangan/keberangkatan, tanggal acara, tanggal janji temu, waktu spesifik.</li>
            <li>Jumlah: Jumlah orang (dewasa, anak-anak), jumlah malam menginap, jumlah tiket, jumlah barang.</li>
            <li>Detail Spesifikasi: Tipe kamar (single, double, twin, suite), preferensi (non-smoking, sea view), kebutuhan diet, jenis layanan.</li>
            <li>Kontak Detail: Nomor telepon, alamat email, alamat rumah/kantor (termasuk kode pos).</li>
            <li>Detail Pembayaran: Jenis kartu, nama pemegang kartu, tanggal kadaluarsa, kode keamanan.</li>
            <li>Nomor Referensi: Kombinasi huruf dan angka sebagai bukti pemesanan.</li>
          </ul>

          <h4 className="text-lg font-semibold">Bahasa yang Umum Digunakan:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Membuat Permintaan: "I'd like to book...", "I want to make a reservation for...", "Could I reserve a table/room/ticket?"</li>
            <li>Memberi Detail: "It's for two adults and one child.", "We'll be staying for three nights.", "My name is [Nama], that's spelled..."</li>
            <li>Mengkonfirmasi: "Okay, so that's one double room for two nights, arriving on the 10th of June?", "Your booking reference is..."</li>
            <li>Menanyakan Detail: "What date were you looking for?", "How many people is the booking for?", "Could I take your name, please?"</li>
            <li>Kesopanan: Penggunaan "please", "thank you", "could you", "would you mind" sangat umum.</li>
          </ul>

          <h4 className="text-lg font-semibold">Potensi Tantangan:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Kecepatan: Detail bisa disebutkan dengan cepat secara beruntun.</li>
            <li>Akurasi Angka & Ejaan: Kesalahan kecil pada nomor telepon, tanggal, harga, atau ejaan nama bisa fatal.</li>
            <li>Distraktor/Koreksi: Pemesan mungkin ragu atau salah sebut tanggal/jumlah lalu merawatnya.</li>
            <li>Aksen: Petugas atau pemesan bisa memiliki aksen yang berbeda.</li>
          </ul>

          <h4 className="text-lg font-semibold">Strategi Mendengarkan untuk Reservasi/Pemesanan:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Antisipasi: Jika dari pertanyaan Anda tahu ini adalah konteks pemesanan, siapkan mental untuk mencatat jenis informasi di atas.</li>
            <li>Gunakan Struktur Form (jika ada): Gunakan field di form sebagai panduan informasi apa yang harus dicari.</li>
            <li>Note-taking Cepat & Fokus: Gunakan singkatan. Tulis angka dan ejaan segera di lembar soal.</li>
            <li>Dengarkan Konfirmasi: Bagian akhir percakapan sering berisi rangkuman atau konfirmasi detail.</li>
            <li>Waspada Koreksi: Dengarkan kata-kata seperti "sorry", "actually", "oh wait", "I meant...".</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">2. Permintaan Informasi (Information Requests)</h3>
          <p>Skenario umum lainnya adalah ketika seseorang menghubungi suatu tempat atau orang lain untuk menanyakan informasi spesifik.</p>
          
          <h4 className="text-lg font-semibold">Konteks Umum:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Bisnis/Layanan: Menanyakan jam buka toko, biaya keanggotaan gym, detail produk, layanan bank, prosedur pengiriman.</li>
            <li>Pendidikan/Pelatihan: Bertanya tentang detail kursus, fasilitas perpustakaan, cara mendaftar klub mahasiswa.</li>
            <li>Turisme/Perjalanan: Bertanya di pusat informasi turis tentang atraksi lokal, transportasi umum, peta, acara.</li>
            <li>Umum: Menanyakan tentang suatu acara komunitas, peraturan di tempat umum (taman, museum).</li>
          </ul>

          <h4 className="text-lg font-semibold">Informasi Kunci yang Sering Dipertukarkan (dan Diuji):</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Detail Operasional: Jam buka/tutup, hari operasional.</li>
            <li>Biaya/Harga: Biaya masuk, biaya keanggotaan, harga tiket, biaya kursus, diskon yang tersedia.</li>
            <li>Lokasi/Alamat: Alamat fisik, petunjuk arah, lokasi gedung/ruangan di dalam kompleks yang lebih besar.</li>
            <li>Fitur/Fasilitas/Spesifikasi: Apa saja yang termasuk dalam layanan, fitur produk, fasilitas tersedia.</li>
            <li>Prosedur/Cara: Langkah-langkah untuk mendaftar, cara menggunakan layanan, apa yang perlu dibawa.</li>
            <li>Jadwal/Waktu: Jadwal kursus, jadwal acara, waktu keberangkatan transportasi.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">3. Interaksi di Tempat Umum (Interactions in Public Places)</h3>
          <p>Ini mencakup berbagai transaksi dan interaksi singkat yang terjadi di lokasi-lokasi publik.</p>
          
          <h4 className="text-lg font-semibold">Konteks Umum:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Toko/Ritel: Membeli barang, menanyakan ketersediaan/harga/ukuran/warna, melakukan pembayaran, mengembalikan barang.</li>
            <li>Transportasi Hub: Membeli tiket di loket stasiun/bandara, menanyakan platform/gate, check-in bagasi, melaporkan kehilangan.</li>
            <li>Bank/Kantor Pos: Melakukan transaksi dasar, mengirim surat/paket, menanyakan layanan.</li>
            <li>Layanan Publik Lainnya: Berinteraksi dengan petugas di perpustakaan, museum, kantor pemerintah.</li>
          </ul>

          <div className="bg-slate-100 p-4 rounded-lg mt-6">
            <h4 className="font-semibold">Kesimpulan:</h4>
            <p>Memahami skenario percakapan sehari-hari seperti reservasi, permintaan informasi, dan interaksi di tempat umum adalah inti dari Section 1. Anda perlu terbiasa dengan jenis informasi yang biasanya dipertukarkan dan bahasa yang digunakan. Tantangan utamanya adalah menangkap detail secara akurat dan cepat. Strategi kunci melibatkan antisipasi berdasarkan konteks, note-taking yang fokus pada detail faktual, mendengarkan konfirmasi atau koreksi, dan memahami tujuan utama percakapan.</p>
          </div>
        </div>
      )
    },
    "1.6": {
      title: "Strategi Jitu Section 1 (Percakapan Sehari-hari)",
      content: (
        <div className="space-y-4">
          <p>Selamat datang di Chapter 1.6! Setelah kita mendalami jenis-jenis percakapan sehari-hari di Chapter 1.5, sekarang saatnya kita fokus pada strategi spesifik untuk menjawab tipe-tipe pertanyaan yang paling sering muncul di Section 1 IELTS Listening. Section 1 adalah kesempatan emas Anda untuk mengumpulkan poin dengan relatif lebih mudah dibandingkan section lainnya, asalkan Anda tahu cara mendekati setiap jenis pertanyaan. Di chapter ini, kita akan membedah tiga format soal utama di Section 1: Form Filling (termasuk Note/Table Completion), Multiple Choice Questions (MCQ), dan Short Answer Questions. Menguasai strategi ini akan membantu Anda memaksimalkan skor di bagian pembuka tes Listening.</p>

          <h3 className="text-xl font-bold mt-6">1. Form Filling dan Formulir Pendaftaran (Form/Note/Table Completion)</h3>
          <p>Ini adalah raja dari Section 1. Sebagian besar tes IELTS akan menyajikan setidaknya satu tugas melengkapi formulir, catatan, atau tabel di bagian ini, seringkali mencakup 5-7 pertanyaan sekaligus. Kemampuan mengisi detail secara akurat sangatlah penting.</p>

          <h4 className="text-lg font-semibold">Mengapa Dominan di Section 1?</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Sangat cocok dengan konteks percakapan transaksional dan pengumpulan informasi yang umum di Section 1.</li>
            <li>Menguji kemampuan mendengarkan detail faktual spesifik secara langsung.</li>
            <li>Strukturnya logis dan biasanya mengikuti alur percakapan.</li>
          </ul>

          <h4 className="text-lg font-semibold">Strategi Kunci SEBELUM Mendengarkan (Waktu Persiapan):</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li className="font-medium">WAJIB Gunakan Waktu Persiapan (30 detik atau lebih): Jangan sia-siakan! Ini krusial.</li>
            <li>Baca Judul/Konteks: Pahami jenis formulir/catatan apa ini.</li>
            <li>Scan Cepat Seluruh Pertanyaan (Gap): Lihat semua nomor yang perlu diisi.</li>
            <li className="font-medium">FOKUS pada Kata di Sekitar Gap: Baca kata-kata sebelum dan sesudah setiap bagian kosong.</li>
            <li className="font-medium">PREDIKSI Jenis Jawaban: Ini langkah paling penting!</li>
            <li>Perhatikan BATAS KATA (Word Limit): Lingkari atau garis bawahi instruksi pembatasan kata.</li>
            <li>Antisipasi Urutan: Jawaban hampir selalu muncul berurutan dalam audio sesuai dengan urutan gap.</li>
          </ul>

          <h4 className="text-lg font-semibold">Strategi Kunci SAAT Mendengarkan:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ikuti Alur Percakapan: Gunakan gap pertama sebagai titik awal.</li>
            <li>Dengarkan Kata Kunci dari Sekitar Gap: Kata-kata sekitar gap adalah penanda jawaban.</li>
            <li>Tangkap Jawaban Persis Seperti Didengar: Tulis jawaban langsung di lembar soal.</li>
            <li>Perhatian Ekstra pada Detail Kritis: Ejaan nama, format angka, format tanggal dan waktu.</li>
            <li>Jangan Panik Jika Terlewat: Fokus ke gap berikutnya jika terlewat.</li>
            <li>Gunakan Konfirmasi dalam Audio: Manfaatkan saat pembicara mengulang atau konfirmasi.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">2. Multiple Choice Questions (MCQ) untuk Percakapan Sehari-hari</h3>
          <p>Meskipun tidak sebanyak form filling, MCQ bisa muncul di Section 1, biasanya menanyakan detail spesifik, alasan tindakan, atau keputusan yang dibuat dalam percakapan.</p>

          <h4 className="text-lg font-semibold">Format Umum di Section 1:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Biasanya lebih sederhana dan lugas daripada MCQ di Section 3 atau 4.</li>
            <li>Fokus pada informasi faktual atau pilihan sederhana.</li>
            <li>Umumnya hanya satu jawaban benar (pilih A, B, atau C).</li>
          </ul>

          <h4 className="text-lg font-semibold">Strategi Kunci SEBELUM Mendengarkan:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gunakan Waktu Persiapan: Sama pentingnya seperti form filling.</li>
            <li>Baca Pertanyaan (Stem) Dulu: Pahami apa yang ditanyakan.</li>
            <li>Baca SEMUA Pilihan Jawaban (A, B, C): Garis bawahi kata kunci di setiap pilihan.</li>
            <li>Antisipasi Parafrase: Jawaban benar jarang menggunakan kata-kata yang persis sama.</li>
            <li>Waspadai Negatif/Kualifikasi: Perhatikan kata seperti "not", "except", "main reason".</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">3. Short Answer Questions (SAQ)</h3>
          <p>Jenis soal ini meminta Anda menjawab pertanyaan spesifik dengan beberapa kata atau angka, diambil langsung dari percakapan.</p>

          <h4 className="text-lg font-semibold">Format Umum di Section 1:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pertanyaan langsung dimulai dengan Who, What, Where, When, Why, How many, How much.</li>
            <li>Jawaban biasanya berupa detail faktual singkat.</li>
            <li>Instruksi batas kata sangat penting dan harus dipatuhi!</li>
          </ul>

          <div className="bg-slate-100 p-4 rounded-lg mt-6">
            <h4 className="font-semibold">Kesimpulan:</h4>
            <p>Section 1 adalah tentang kecepatan, akurasi detail, dan pemahaman konteks percakapan sehari-hari. Dengan menguasai strategi spesifik untuk Form Filling (prediksi, perhatian detail, cek batas kata), Multiple Choice (identifikasi distraktor, kenali parafrase), dan Short Answer Questions (jawab langsung, patuhi batas kata), Anda dapat memaksimalkan potensi skor di bagian ini. Kunci sukses terletak pada pemanfaatan waktu persiapan secara efektif, mendengarkan secara aktif dan terarah, serta melakukan pengecekan jawaban yang teliti selama waktu transfer.</p>
          </div>
        </div>
      )
    },
    "1.7": {
      title: "Strategi Jitu Section 2 (Monolog Situasional)",
      content: (
        <div className="space-y-4">
          <p>Selamat datang di Chapter 1.7, di mana kita akan beralih dari dialog di Section 1 ke monolog di Section 2. Section 2 biasanya menyajikan satu orang yang berbicara selama beberapa menit dalam konteks sosial atau informasional yang umum. Ini bisa berupa pengumuman, deskripsi tempat, panduan tur, atau presentasi singkat. Meskipun masih dalam konteks sehari-hari (bukan akademik murni seperti Section 3 & 4), Section 2 menuntut tingkat pemahaman yang lebih tinggi karena Anda harus mengikuti alur pembicaraan satu orang, menangkap struktur informasi, dan seringkali memvisualisasikan tempat atau proses.</p>

          <h3 className="text-xl font-bold mt-6">1. Pengumuman Publik dan Instruksi (Public Announcements & Instructions)</h3>
          <p>Skenario ini seringkali menguji kemampuan Anda memahami informasi penting yang disampaikan kepada khalayak atau instruksi yang harus diikuti.</p>
          
          <h4 className="text-lg font-semibold">Konteks Umum:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pengumuman: Di bandara, stasiun kereta, pusat perbelanjaan, perpustakaan, museum.</li>
            <li>Pesan Otomatis/Rekaman: Informasi layanan pelanggan, instruksi keselamatan.</li>
            <li>Instruksi Praktis: Cara menggunakan mesin baru, prosedur pendaftaran, aturan kegiatan.</li>
            <li>Pidato Sambutan/Pengarahan: Sambutan di awal acara, pengarahan singkat.</li>
          </ul>

          <h4 className="text-lg font-semibold">Fokus Informasi yang Diuji:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Tujuan Utama: Apa inti dari pengumuman/instruksi ini?</li>
            <li>Detail Kunci: Waktu, tanggal, lokasi, nomor (gate, platform, ruangan), nama.</li>
            <li>Aturan & Regulasi: Apa yang boleh dan tidak boleh dilakukan.</li>
            <li>Langkah-langkah Prosedur: Urutan tindakan yang harus diikuti.</li>
            <li>Saran & Rekomendasi: Apa yang disarankan untuk dilakukan.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">2. Deskripsi Tempat dan Fasilitas (Descriptions of Places & Facilities)</h3>
          <p>Ini adalah skenario klasik Section 2 lainnya, seringkali melibatkan penjelasan tentang tata letak suatu tempat atau fasilitas yang tersedia. Visualisasi adalah kunci di sini.</p>
          
          <h4 className="text-lg font-semibold">Konteks Umum:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Bangunan/Area: Tata letak perpustakaan, pusat olahraga, museum, kampus.</li>
            <li>Denah/Peta: Peta kota kecil, denah lantai bangunan, tata letak pameran.</li>
            <li>Fasilitas Spesifik: Ruangan dan fungsinya, layanan yang tersedia.</li>
          </ul>

          <h4 className="text-lg font-semibold">Fokus Informasi yang Diuji:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Lokasi Relatif: Di mana letak A relatif terhadap B?</li>
            <li>Tata Letak/Layout: Urutan ruangan, posisi pintu masuk/keluar, koridor.</li>
            <li>Nama/Label Tempat: Mengidentifikasi nama ruangan atau area pada peta.</li>
            <li>Fungsi/Tujuan: Apa kegunaan ruangan/area tersebut?</li>
            <li>Fitur Spesifik: Apa yang ada di dalam area tersebut.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">3. Tour Guide dan Presentasi Informatif (Guided Tours & Informative Presentations)</h3>
          <p>Skenario ini mirip dengan deskripsi tempat, tetapi seringkali lebih naratif, bisa mencakup sejarah, cerita, atau penjelasan tentang suatu topik/acara.</p>
          
          <h4 className="text-lg font-semibold">Konteks Umum:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Tur Terpandu: Pemandu wisata menjelaskan tempat bersejarah, atraksi alam, tur kota.</li>
            <li>Presentasi Singkat: Informasi tentang acara lokal, layanan baru, proyek penelitian.</li>
          </ul>

          <div className="bg-slate-100 p-4 rounded-lg mt-6">
            <h4 className="font-semibold">Kesimpulan:</h4>
            <p>Section 2 mengharuskan Anda mengikuti dan memahami monolog informasional dalam konteks sehari-hari. Baik itu pengumuman, deskripsi tempat, atau tur/presentasi, kuncinya adalah mengidentifikasi tujuan dan struktur pembicaraan, mendengarkan signposting language, fokus pada detail kunci yang relevan dengan pertanyaan (terutama lokasi untuk soal peta), dan menggunakan note-taking selektif. Kemampuan visualisasi sangat penting untuk deskripsi tempat dan soal peta/denah.</p>
          </div>
        </div>
      )
    },
    "1.8": {
      title: "Mengasah Kemampuan Prediksi Konteks dan Jawaban",
      content: (
        <div className="space-y-4">
          <p>Selamat datang di Chapter 1.8, sebuah chapter yang akan membekali Anda dengan salah satu mindset dan skill terpenting untuk sukses di seluruh bagian IELTS Listening: kemampuan prediksi. Prediksi dalam konteks ini bukanlah tebakan asal-asalan, melainkan proses proaktif menggunakan waktu persiapan singkat sebelum audio diputar untuk menganalisis pertanyaan, mengantisipasi jenis jawaban yang mungkin muncul, dan bahkan memikirkan kemungkinan sinonim atau parafrase. Menguasai prediksi akan mengubah Anda dari pendengar pasif menjadi test-taker yang strategis, lebih siap menangkap informasi, dan lebih efisien dalam menjawab. Skill ini relevan dari Section 1 hingga Section 4.</p>

          <h3 className="text-xl font-bold mt-6">1. Menganalisis Pertanyaan Secara Mendalam Sebelum Mendengar</h3>
          <p>Waktu beberapa puluh detik yang diberikan sebelum setiap bagian audio dimulai adalah emas murni. Memanfaatkannya secara maksimal untuk menganalisis pertanyaan adalah fondasi dari prediksi yang efektif.</p>
          
          <h4 className="text-lg font-semibold">Mengapa Analisis Awal Sangat Penting?</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mengurangi Beban Kognitif: Saat audio mulai, otak Anda sudah 'disetel' untuk mencari informasi spesifik, bukan mencoba memahami pertanyaan dan audio secara bersamaan.</li>
            <li>Mengarahkan Fokus Pendengaran: Anda tahu apa yang harus didengarkan, membantu menyaring kebisingan informasi yang tidak relevan.</li>
            <li>Mengaktifkan Pengetahuan Latar (Background Knowledge): Membaca pertanyaan dan konteks dapat mengaktifkan kosakata dan pemahaman Anda tentang topik tersebut.</li>
            <li>Memungkinkan Prediksi: Analisis adalah langkah pertama sebelum Anda bisa memprediksi jenis jawaban atau sinonim.</li>
            <li>Mencegah Kesalahan Konyol: Memastikan Anda tahu batas kata dan apa yang sebenarnya ditanyakan.</li>
          </ul>

          <h4 className="text-lg font-semibold">Langkah-langkah Analisis Pertanyaan dalam Waktu Persiapan:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li className="font-medium">Baca Instruksi UTAMA: Selalu mulai dari sini! Berapa batas kata/angka? ("NO MORE THAN TWO WORDS AND/OR A NUMBER"). Apa jenis tugasnya secara umum (Choose, Complete, Label?). Lingkari atau garis bawahi instruksi ini. Ini tidak bisa ditawar!</li>
            <li>Identifikasi Tipe Pertanyaan Spesifik: Apakah ini Form Completion? Multiple Choice? Map Labelling? Matching? Short Answer?</li>
            <li>Baca Pertanyaan/Pernyataan/Label SATU PER SATU:
              <ul className="list-disc pl-6 mt-1">
                <li>Untuk Completion Tasks: Baca kata-kata di sekitar setiap gap. Pahami konteks kalimat atau field tersebut.</li>
                <li>Untuk Multiple Choice: Baca stem (pertanyaan) DAN semua options (A, B, C, ...). Pahami pertanyaan utama dan perbedaan antar opsi.</li>
                <li>Untuk Map/Plan Labelling: Lihat judul peta, orientasikan diri (pintu masuk, label yang ada).</li>
                <li>Untuk Matching: Baca kedua daftar (misal, daftar pembicara dan daftar opini).</li>
                <li>Untuk Short Answer Questions: Baca pertanyaan dengan teliti, identifikasi kata tanya (What, Where, etc.).</li>
              </ul>
            </li>
            <li className="font-medium">Garis Bawahi KATA KUNCI (Keywords): Di setiap pertanyaan/pernyataan/opsi/label, garis bawahi kata-kata yang membawa makna utama:
              <ul className="list-disc pl-6 mt-1">
                <li>Kata Benda (Nouns): Terutama yang spesifik.</li>
                <li>Kata Kerja (Verbs): Terutama yang menunjukkan aksi atau hubungan penting.</li>
                <li>Kata Sifat (Adjectives) & Keterangan (Adverbs): Yang memberi detail penting.</li>
                <li>Nama Orang, Tempat, Organisasi.</li>
                <li>Angka, Tanggal, Waktu (jika ada dalam pertanyaan/opsi).</li>
                <li>Kata Tanya (Who, What, Where, When, Why, How).</li>
                <li>Kata Negatif atau Pembatas (not, except, only, main, primarily).</li>
              </ul>
            </li>
            <li>Pahami Konteks Umum (Jika Memungkinkan): Lihat judul section, judul form/map, atau kalimat pengantar jika ada.</li>
            <li>Perhatikan Urutan Pertanyaan: Sebagian besar tipe soal mengikuti urutan informasi dalam audio.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6">2. Memprediksi Kata-kata dan Frasa Kunci Jawaban</h3>
          <p>Setelah menganalisis pertanyaan, langkah berikutnya adalah mencoba memprediksi jenis kata atau bahkan kata/frasa spesifik yang mungkin menjadi jawaban, terutama untuk completion tasks.</p>

          <h4 className="text-lg font-semibold">Level Prediksi:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Prediksi Tipe Kata (Word Type Prediction): Paling dasar dan sangat berguna. Apakah gap ini membutuhkan Noun, Verb, Adjective, Adverb, Number, Name, Date?</li>
            <li>Prediksi Konten (Content Prediction): Berdasarkan konteks, bisakah kita memperkirakan topik atau kategori jawabannya?</li>
            <li>Prediksi Kata Spesifik (Specific Word Prediction): Kadang mungkin, tapi jangan terlalu terpaku pada ini.</li>
          </ul>

          <h4 className="text-lg font-semibold">Cara Melakukan Prediksi:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Berdasarkan Tata Bahasa (Grammar):
              <ul className="list-disc pl-6 mt-1">
                <li>Lihat kata sebelum dan sesudah gap. Struktur kalimat seringkali menentukan tipe kata yang dibutuhkan.</li>
                <li>Contoh (Sentence Completion): "Students need to submit their ____ by Friday." (Kata setelah 'their' hampir pasti Noun).</li>
              </ul>
            </li>
            <li>Berdasarkan Konteks Field (Form/Table):
              <ul className="list-disc pl-6 mt-1">
                <li>Field "Occupation:" → Prediksi: Jenis pekerjaan (Noun, e.g., teacher, engineer, student).</li>
                <li>Field "Duration of stay:" → Prediksi: Angka + satuan waktu (e.g., 3 nights, 2 weeks).</li>
              </ul>
            </li>
            <li>Berdasarkan Konteks Topik:
              <ul className="list-disc pl-6 mt-1">
                <li>Jika topik diskusi adalah "masalah lingkungan", prediksi jawaban mungkin melibatkan kata-kata seperti pollution, deforestation, recycling.</li>
                <li>Jika konteksnya adalah "pendaftaran universitas", prediksi kata seperti application, deadline, fees, courses.</li>
              </ul>
            </li>
            <li>Berdasarkan Pertanyaan Short Answer:
              <ul className="list-disc pl-6 mt-1">
                <li>"Why did the company relocate?" → Prediksi: Alasan (frasa dimulai dengan because, atau noun phrase seperti lower costs).</li>
                <li>"What equipment is needed?" → Prediksi: Daftar kata benda (e.g., ropes, helmets, boots).</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6">3. Mengantisipasi Sinonim dan Parafrase</h3>
          <p>Ini adalah puncak dari skill prediksi dan kunci mutlak untuk sukses di IELTS Listening. IELTS sengaja menggunakan kata-kata berbeda dalam audio dibandingkan dalam pertanyaan untuk menguji pemahaman makna, bukan sekadar pencocokan kata.</p>

          <h4 className="text-lg font-semibold">Mengapa IELTS Melakukan Ini?</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Menguji pemahaman kosa kata yang luas.</li>
            <li>Menguji kemampuan memahami ide bukan hanya kata individual.</li>
            <li>Merefleksikan komunikasi nyata di mana orang sering mengungkapkan ide yang sama dengan cara berbeda.</li>
          </ul>

          <h4 className="text-lg font-semibold">Bagaimana Cara Mengantisipasi Sinonim/Parafrase?</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Saat Menganalisis Pertanyaan (Waktu Persiapan):
              <ul className="list-disc pl-6 mt-1">
                <li>Setelah menggarisbawahi kata kunci di pertanyaan/opsi, luangkan beberapa detik untuk berpikir: "Bagaimana lagi cara mengatakan ini?"</li>
                <li>Fokus pada kata kunci utama (nouns, verbs, adjectives, adverbs).</li>
                <li>Contoh:
                  <ul className="list-disc pl-6 mt-1">
                    <li>Keyword di soal: difficulty → Pikirkan: problem, challenge, hard part, issue.</li>
                    <li>Keyword di soal: benefits → Pikirkan: advantages, positive aspects, upsides, good points.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>Saat Mendengarkan:
              <ul className="list-disc pl-6 mt-1">
                <li>Jangan hanya 'menunggu' kata kunci persis dari pertanyaan. Dengarkan makna dan konsepnya.</li>
                <li>Bersiaplah mendengar ide yang sama diungkapkan dengan struktur kalimat yang berbeda atau kosakata yang berbeda.</li>
              </ul>
            </li>
          </ul>

          <h4 className="text-lg font-semibold">Membangun Kemampuan Mengenali Sinonim/Parafrase:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Belajar Kosakata Secara Aktif: Jangan hanya menghafal kata baru, tapi pelajari juga sinonim, antonim, dan contoh penggunaannya.</li>
            <li>Perhatikan Saat Latihan: Setiap kali Anda menemukan jawaban yang merupakan parafrase, catat!</li>
            <li>Baca Secara Luas: Membaca artikel, berita, atau buku dalam bahasa Inggris akan memaparkan Anda pada berbagai cara untuk mengungkapkan ide yang sama.</li>
            <li>Gunakan Thesaurus (dengan Hati-Hati): Thesaurus bisa membantu mencari sinonim, tapi pastikan sinonim tersebut cocok dengan konteks kalimat.</li>
            <li>Fokus pada Kata Kerja & Kata Sifat: Ini seringkali menjadi kunci parafrase ide.</li>
          </ul>

          <div className="bg-slate-100 p-4 rounded-lg mt-6">
            <h4 className="font-semibold">Kesimpulan:</h4>
            <p>Prediksi adalah skill proaktif yang memberdayakan Anda dalam tes IELTS Listening. Dengan secara sistematis menganalisis pertanyaan selama waktu persiapan, memprediksi jenis dan konten jawaban yang mungkin, dan secara aktif mengantisipasi sinonim dan parafrase dari kata kunci, Anda secara signifikan meningkatkan peluang untuk fokus pada informasi yang tepat, mengenali jawaban meskipun diungkapkan secara berbeda, dan menjawab dengan lebih akurat dan efisien. Keterampilan ini membutuhkan latihan yang sadar dan konsisten.</p>
          </div>
        </div>
      )
    }
  };

  useEffect(() => {
    document.title = "Day 2: Listening - Beginner Level | IELTS";
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/curriculum" className="flex items-center text-ielts-blue hover:text-ielts-lightblue">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Curriculum</span>
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Day 2: Listening Beginner Level</h1>
          <p className="text-gray-600 mt-2">Master essential listening skills for IELTS success</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeChapter === "1.5" ? "default" : "outline"}
              onClick={() => setActiveChapter("1.5")}
            >
              Chapter 1.5
            </Button>
            <Button 
              variant={activeChapter === "1.6" ? "default" : "outline"}
              onClick={() => setActiveChapter("1.6")}
            >
              Chapter 1.6
            </Button>
            <Button 
              variant={activeChapter === "1.7" ? "default" : "outline"}
              onClick={() => setActiveChapter("1.7")}
            >
              Chapter 1.7
            </Button>
            <Button 
              variant={activeChapter === "1.8" ? "default" : "outline"}
              onClick={() => setActiveChapter("1.8")}
            >
              Chapter 1.8
            </Button>
          </div>
        </div>

        {chapterContent[activeChapter] && (
          <div className="space-y-6">
            <MaterialContent 
              title={chapterContent[activeChapter].title}
              content={chapterContent[activeChapter].content}
              chapter={activeChapter}
            />
            
            <div className="flex justify-end">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleMarkComplete(activeChapter)}
              >
                Mark as Completed
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CurriculumDay2;
