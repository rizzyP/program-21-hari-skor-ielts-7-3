
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_7 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.7: Strategi Jitu Section 2 (Monolog Situasional)</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide-1-6">
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
        <h2 className="text-2xl font-semibold mb-4">Pengantar Chapter</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Selamat datang di Chapter 1.7, di mana kita akan beralih dari dialog di Section 1 ke monolog di Section 2. 
            Section 2 biasanya menyajikan satu orang yang berbicara selama beberapa menit dalam konteks sosial atau informasional yang umum. 
            Ini bisa berupa pengumuman, deskripsi tempat, panduan tur, atau presentasi singkat.
          </p>
          
          <p className="mb-4">
            Meskipun masih dalam konteks sehari-hari (bukan akademik murni seperti Section 3 & 4), Section 2 menuntut tingkat pemahaman 
            yang lebih tinggi karena Anda harus mengikuti alur pembicaraan satu orang, menangkap struktur informasi, dan seringkali 
            memvisualisasikan tempat atau proses. Di chapter ini, kita akan mengupas tuntas strategi untuk menghadapi tiga skenario umum 
            Section 2 dan jenis pertanyaan yang sering menyertainya.
          </p>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Pengumuman Publik dan Instruksi (Public Announcements & Instructions)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Skenario ini seringkali menguji kemampuan Anda memahami informasi penting yang disampaikan kepada khalayak atau instruksi yang harus diikuti.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Konteks Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Pengumuman:</strong> Di bandara (perubahan gate, boarding), stasiun kereta (platform, keterlambatan), pusat perbelanjaan (acara promosi, mobil yang parkir salah), perpustakaan (jam tutup, acara khusus), museum (peraturan, pameran baru).</li>
            <li><strong>Pesan Otomatis/Rekaman:</strong> Informasi layanan pelanggan, instruksi keselamatan (misal, sebelum penerbangan atau di tempat kerja).</li>
            <li><strong>Instruksi Praktis:</strong> Cara menggunakan mesin baru (misal, mesin tiket, peralatan gym), prosedur pendaftaran, aturan mengikuti tur atau kegiatan, instruksi evakuasi darurat.</li>
            <li><strong>Pidato Sambutan/Pengarahan:</strong> Sambutan di awal acara, pengarahan singkat untuk relawan atau peserta program.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Fokus Informasi yang Diuji:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Tujuan Utama:</strong> Apa inti dari pengumuman/instruksi ini? (Memberi tahu, memperingatkan, menginstruksikan, menyambut?)</li>
            <li><strong>Detail Kunci:</strong> Waktu, tanggal, lokasi, nomor (gate, platform, ruangan), nama orang/tempat, perubahan dari rencana awal.</li>
            <li><strong>Aturan & Regulasi:</strong> Apa yang boleh dan tidak boleh dilakukan (dos and don'ts).</li>
            <li><strong>Langkah-langkah Prosedur:</strong> Urutan tindakan yang harus diikuti.</li>
            <li><strong>Saran & Rekomendasi:</strong> Apa yang disarankan untuk dilakukan.</li>
            <li><strong>Peringatan & Konsekuensi:</strong> Apa risikonya atau apa yang terjadi jika aturan dilanggar.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Tipe Pertanyaan Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Multiple Choice (MCQ):</strong> Menanyakan tujuan utama, detail spesifik, alasan perubahan, apa yang harus dilakukan/dihindari.</li>
            <li><strong>Sentence Completion / Note Completion:</strong> Melengkapi ringkasan pengumuman atau poin-poin instruksi.</li>
            <li><strong>Short Answer Questions:</strong> Menanyakan detail spesifik (kapan, di mana, apa yang dibutuhkan).</li>
            <li><strong>Matching:</strong> Mencocokkan jenis instruksi/aturan dengan area/situasi tertentu, atau mencocokkan masalah dengan solusi/tindakan.</li>
            <li><strong>Flow-chart Completion:</strong> Jika instruksi melibatkan langkah-langkah berurutan.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Mendengarkan untuk Pengumuman/Instruksi:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Identifikasi Cepat Tujuan & Audiens:</strong> Siapa yang bicara? Kepada siapa? Apa tujuan utamanya? (Ini membantu memahami konteks).</li>
            <li><strong>Dengarkan Struktur & Signposting:</strong> Pembicara biasanya menggunakan penanda:
              <ul className="list-disc pl-6 mt-2">
                <li>Urutan: Firstly, secondly, next, then, after that, finally.</li>
                <li>Penting: Please note, remember, it's important to, make sure you, be aware that.</li>
                <li>Aturan/Larangan: You must/must not, you should/shouldn't, you are required to, please refrain from, it is forbidden to.</li>
                <li>Saran: We recommend, it might be a good idea to, you could also.</li>
                <li>Perubahan: Unfortunately, due to..., the plan has changed..., please be advised that [gate/time] is now...</li>
              </ul>
              <p className="mt-2">Catat kata-kata penanda ini dan informasi yang mengikutinya.</p>
            </li>
            <li><strong>Fokus pada Kata Kerja Imperatif (Instruksi):</strong> Go, turn, fill out, press, wait, listen, report, bring.</li>
            <li><strong>Ikuti Urutan Logis:</strong> Terutama untuk instruksi prosedural. Catat langkah-langkahnya secara berurutan.</li>
            <li><strong>Tangkap Detail Spesifik:</strong> Waktu, tempat, nomor, nama yang disebutkan sangat mungkin menjadi jawaban.</li>
            <li><strong>Prediksi Berdasarkan Pertanyaan:</strong> Gunakan waktu persiapan untuk melihat jenis informasi apa (aturan, langkah, detail) yang dicari oleh pertanyaan.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Potensi Tantangan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Kecepatan & Kepadatan Informasi: Pengumuman bisa cepat dan penuh detail.</li>
            <li>Kebisingan Latar (Kadang-kadang): Pengumuman publik mungkin memiliki sedikit noise (meskipun di IELTS biasanya jelas).</li>
            <li>Membedakan Aturan Wajib vs Saran: Perhatikan penggunaan modal verbs (must vs should vs could).</li>
            <li>Mengikuti Beberapa Langkah Instruksi: Membutuhkan konsentrasi dan note-taking yang baik.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Deskripsi Tempat dan Fasilitas (Descriptions of Places & Facilities)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Ini adalah skenario klasik Section 2 lainnya, seringkali melibatkan penjelasan tentang tata letak suatu tempat atau fasilitas yang tersedia. Visualisasi adalah kunci di sini.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Konteks Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Bangunan/Area:</strong> Mendeskripsikan tata letak perpustakaan baru, pusat olahraga, pusat komunitas, museum, galeri seni, taman hiburan, kebun binatang, kampus universitas.</li>
            <li><strong>Denah/Peta:</strong> Menjelaskan peta kota kecil, denah lantai bangunan, tata letak pameran.</li>
            <li><strong>Fasilitas Spesifik:</strong> Menjelaskan berbagai ruangan dan fungsinya di sebuah hotel, fasilitas di pusat konferensi, layanan yang tersedia di perpustakaan (area belajar, ruang komputer, koleksi khusus).</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Fokus Informasi yang Diuji:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Lokasi Relatif:</strong> Di mana letak A relatif terhadap B? (Sebelah, di depan, di belakang, di seberang).</li>
            <li><strong>Tata Letak/Layout:</strong> Urutan ruangan, posisi pintu masuk/keluar, koridor, tangga, lift.</li>
            <li><strong>Nama/Label Tempat:</strong> Mengidentifikasi nama ruangan atau area tertentu pada peta/denah.</li>
            <li><strong>Fungsi/Tujuan:</strong> Apa kegunaan ruangan/area tersebut?</li>
            <li><strong>Fitur Spesifik:</strong> Apa yang ada di dalam area tersebut (misal, jenis peralatan di gym, koleksi buku di bagian tertentu perpustakaan).</li>
            <li><strong>Arah Pergerakan:</strong> Bagaimana cara mencapai suatu tempat dari titik lain.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Tipe Pertanyaan Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Map/Plan/Diagram Labelling:</strong> SANGAT UMUM di Section 2 untuk skenario ini. Anda diberi peta/denah dengan beberapa bagian kosong yang harus diberi label berdasarkan deskripsi audio.</li>
            <li><strong>Matching:</strong> Mencocokkan nama tempat/fasilitas dengan fungsinya, atau dengan lokasi pada daftar deskriptif.</li>
            <li><strong>Multiple Choice:</strong> Menanyakan lokasi spesifik, fungsi area, atau detail fitur.</li>
            <li><strong>Note Completion:</strong> Melengkapi catatan tentang fitur-fitur tempat tersebut.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Mendengarkan untuk Deskripsi Tempat/Fasilitas:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Visualisasi Aktif:</strong> Coba bayangkan tempat yang sedang dideskripsikan dalam pikiran Anda. Buat 'peta mental'.</li>
            <li><strong>Fokus pada Bahasa Spasial (Spatial Language):</strong> Ini krusial!
              <ul className="list-disc pl-6 mt-2">
                <li>Preposisi Tempat: next to, beside, opposite, in front of, behind, between, above, below, inside, outside, near, far from, at the end of, on the corner of.</li>
                <li>Arah: north, south, east, west, left, right, straight ahead, upstairs, downstairs.</li>
                <li>Verbs of Movement/Direction: go past, turn left/right, cross, enter through, follow the path, leads to.</li>
              </ul>
              <p className="mt-2">Catat atau garis bawahi kata-kata ini saat berlatih.</p>
            </li>
            <li><strong>Ikuti Urutan Deskripsi:</strong> Pembicara biasanya mendeskripsikan secara logis, misal bergerak dari pintu masuk, searah jarum jam, atau lantai per lantai. Ikuti alur ini.</li>
            <li><strong>Gunakan Peta/Denah (jika ada) sebagai Panduan:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>SEBELUM Mendengarkan (Waktu Persiapan): ORIENTASIKAN DIRI ANDA! Lihat judul peta. Temukan pintu masuk (Entrance), label yang sudah ada (e.g., Reception, Toilets, Main Hall), kompas (jika ada). Pahami tata letak kasarnya. Baca daftar label/tempat yang harus diidentifikasi.</li>
                <li>SAAT Mendengarkan: Tandai titik awal pembicara di peta Anda (biasanya pintu masuk atau resepsionis). Ikuti instruksi arah dengan jari atau pensil Anda di peta. Dengarkan nama tempat/area yang disebutkan yang cocok dengan deskripsi lokasi. Tulis jawaban (biasanya huruf pilihan atau nama tempat) langsung pada bagian kosong di peta di lembar soal.</li>
              </ul>
            </li>
            <li><strong>Waspada Distraktor Peta:</strong> Pembicara mungkin menyebut tempat lain yang ada di peta tapi bukan jawaban untuk nomor tersebut (misal, "Go past the library..."). Jangan langsung menulis 'library' sebagai jawaban jika itu bukan tujuan akhir deskripsi untuk nomor itu.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Tour Guide dan Presentasi Informatif (Guided Tours & Informative Presentations)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Skenario ini mirip dengan deskripsi tempat, tetapi seringkali lebih naratif, bisa mencakup sejarah, cerita, atau penjelasan tentang suatu topik/acara.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Konteks Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Tur Terpandu:</strong> Pemandu wisata menjelaskan tempat bersejarah (kastil, museum), atraksi alam (taman nasional, kebun raya), tur kota, tur pabrik atau fasilitas.</li>
            <li><strong>Presentasi Singkat:</strong> Pembicara memberikan informasi tentang acara lokal (festival, pameran), layanan baru (program daur ulang, pusat komunitas), proyek penelitian sederhana, topik minat umum (sejarah lokal, isu lingkungan).</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Fokus Informasi yang Diuji:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Urutan/Rute Tur:</strong> Lokasi-lokasi yang dikunjungi secara berurutan.</li>
            <li><strong>Fakta & Detail:</strong> Sejarah tempat, tanggal penting, nama orang terkait, fungsi bangunan/objek, fitur utama/highlight.</li>
            <li><strong>Detail Acara/Proyek:</strong> Apa acaranya/proyeknya? Kapan? Di mana? Siapa penyelenggaranya? Apa tujuannya? Bagaimana cara berpartisipasi/mendapatkan info lebih lanjut?</li>
            <li><strong>Deskripsi:</strong> Penjelasan tentang pemandangan, objek, atau proses.</li>
            <li><strong>Opini/Sikap Pembicara (kadang-kadang):</strong> Antusiasme, peringatan, rekomendasi.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Tipe Pertanyaan Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Multiple Choice:</strong> Menanyakan fakta spesifik, alasan, tujuan, detail acara.</li>
            <li><strong>Note/Sentence Completion:</strong> Melengkapi ringkasan tur, poin-poin presentasi, detail acara.</li>
            <li><strong>Matching:</strong> Mencocokkan lokasi/fitur dengan deskripsinya, atau nama orang dengan kontribusinya.</li>
            <li><strong>Map Labelling:</strong> Jika tur melibatkan penjelasan rute pada peta.</li>
            <li><strong>Short Answer Questions:</strong> Menanyakan fakta spesifik (kapan dibangun, siapa penemunya, di mana mendaftar).</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Mendengarkan untuk Tur/Presentasi:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Identifikasi Topik Utama & Struktur:</strong> Apa yang sedang dijelaskan/dipresentasikan? Bagaimana pembicara mengaturnya (kronologis, geografis, tematik)?</li>
            <li><strong>Ikuti Alur Narasi/Rute:</strong> Jika ini tur, ikuti pergerakan dari satu titik ke titik berikutnya. Jika presentasi, ikuti poin-poin utama.</li>
            <li><strong>Dengarkan Signposting Language:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Memulai/Mengakhiri: "Okay, let's begin...", "First stop is...", "To start with...", "Finally today...", "To wrap things up..."</li>
                <li>Berpindah Topik/Lokasi: "Now, moving on to...", "If you look over here...", "Next, we'll discuss...", "Another important aspect is..."</li>
                <li>Memberi Contoh/Detail: "For example...", "Specifically...", "One key feature is..."</li>
                <li>Menekankan Poin: "What's really fascinating is...", "A crucial date was...", "Don't miss the..."</li>
              </ul>
            </li>
            <li><strong>Fokus pada Kata Kunci Pertanyaan:</strong> Gunakan pertanyaan sebagai panduan untuk menyaring informasi penting (nama, tanggal, tempat, alasan, fitur).</li>
            <li><strong>Note-taking Selektif:</strong> Catat poin-poin utama, nama, tanggal, lokasi kunci, dan detail yang menonjol atau ditekankan oleh pembicara. Gunakan singkatan dan simbol.</li>
            <li><strong>Hubungkan Informasi:</strong> Coba lihat kaitan antar poin yang disampaikan.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Potensi Tantangan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Kepadatan Informasi: Banyaknya fakta, tanggal, nama yang disebutkan.</li>
            <li>Kosakata Spesifik: Terkait sejarah, geografi, seni, atau topik presentasi.</li>
            <li>Kecepatan Bicara & Aksen: Pemandu wisata atau presenter bisa berbicara dengan antusias dan cepat.</li>
            <li>Mempertahankan Konsentrasi: Monolog bisa berlangsung beberapa menit tanpa jeda.</li>
          </ul>
          
          <p className="mt-6">
            <strong>Contoh Analisis Struktur Presentasi:</strong><br />
            <em>Audio: "Good evening. Tonight, I want to talk about our new community recycling initiative. First, I'll explain why this program is necessary. Then, I'll detail exactly how it works – what you can and cannot recycle. After that, I'll cover the collection schedule. And finally, I'll tell you how you can get more involved."</em>
          </p>
          <p className="mt-2 mb-4">
            <strong>Analisis:</strong> Struktur sangat jelas ditandai oleh First, Then, After that, Finally. Ini memberi kerangka untuk note-taking. Anda tahu akan ada 4 bagian utama. Soal kemungkinan akan mengikuti struktur ini.
          </p>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Section 2 mengharuskan Anda mengikuti dan memahami monolog informasional dalam konteks sehari-hari. Baik itu pengumuman, deskripsi tempat, atau tur/presentasi, kuncinya adalah mengidentifikasi tujuan dan struktur pembicaraan, mendengarkan signposting language, fokus pada detail kunci yang relevan dengan pertanyaan (terutama lokasi untuk soal peta), dan menggunakan note-taking selektif.
          </p>
          
          <p className="mb-4">
            Kemampuan visualisasi sangat penting untuk deskripsi tempat dan soal peta/denah. Latihan yang konsisten dengan materi Section 2 akan membantu Anda terbiasa dengan format monolog, bahasa spasial, dan tipe pertanyaan yang umum, meningkatkan kemampuan Anda untuk meraih skor tinggi di bagian ini.
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Strategi Jitu Section 1
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

export default ListeningBeginnerGuide1_7;
