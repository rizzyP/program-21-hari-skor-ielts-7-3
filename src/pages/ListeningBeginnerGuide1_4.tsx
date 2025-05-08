
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_4 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.4: Note-taking Dasar</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide-1-3">
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
        <h2 className="text-2xl font-semibold mb-4">Bagian 1: Simbol dan Singkatan: Senjata Rahasia Note-taking Cepat</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Di bagian sebelumnya, kita fokus pada input – memahami apa yang didengar. Sekarang kita fokus pada output sementara – bagaimana mencatat informasi penting dengan cepat dan efektif agar bisa digunakan untuk menjawab pertanyaan.
          </p>
          
          <p className="mb-4">
            Keterampilan note-taking sangat vital, terutama untuk Section 3 (diskusi akademik) dan Section 4 (kuliah) di mana informasinya padat dan kompleks. Ingat, audio hanya diputar sekali! Catatan Anda adalah jaring pengaman dan alat bantu memori utama.
          </p>
          
          <p className="mb-6">
            Note-taking untuk IELTS berbeda dengan mencatat materi kuliah untuk belajar. Tujuannya bukan untuk membuat catatan yang indah dan lengkap, melainkan untuk menangkap informasi kunci secepat mungkin dalam format yang bisa Anda pahami sendiri nanti saat menjawab pertanyaan.
          </p>

          <h3 className="text-xl font-medium mb-4">Mengapa Perlu Simbol & Singkatan?</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Kecepatan:</strong> Menghemat waktu menulis yang berharga.</li>
            <li><strong>Efisiensi:</strong> Meringkas ide kompleks dalam beberapa coretan.</li>
            <li><strong>Fokus:</strong> Membantu Anda tetap fokus pada arus informasi, bukan pada pembentukan kalimat sempurna.</li>
          </ul>

          <h3 className="text-xl font-medium mb-4">Membangun Sistem Anda:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>Tidak ada sistem yang "benar" atau "salah". Yang penting adalah sistem itu konsisten, cepat ditulis, dan mudah Anda pahami saat dibaca kembali.</li>
            <li>Mulai dengan simbol dan singkatan umum, lalu tambahkan yang spesifik sesuai kebutuhan atau preferensi Anda.</li>
          </ul>

          <h3 className="text-xl font-medium mb-4">Contoh Simbol Umum:</h3>

          <h4 className="text-lg font-medium mb-2">Arah & Hubungan:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>→ : mengarah ke, menyebabkan, hasilnya adalah, berikutnya, kemudian</li>
            <li>← : disebabkan oleh, berasal dari</li>
            <li>↑ : meningkat, naik, bertambah, positif, keuntungan</li>
            <li>↓ : menurun, turun, berkurang, negatif, kerugian</li>
            <li>↔ : hubungan antara, perbandingan, berkaitan dengan</li>
            <li>= : sama dengan, adalah, contohnya, yaitu</li>
            <li>≠ : tidak sama dengan, berbeda, bukan</li>
            <li>~ atau ≈ : kira-kira, sekitar (untuk angka/jumlah)</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">Logika & Matematika:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>+ : dan, juga, ditambah, keuntungan, positif</li>
            <li>- : dikurangi, tanpa, kerugian, negatif</li>
            <li>{'>'} : lebih besar dari, lebih dari, lebih baik dari</li>
            <li>{'<'} : lebih kecil dari, kurang dari</li>
            <li>/ : atau (e.g., M/F - male/female), per (e.g., km/hr)</li>
            <li>∴ : oleh karena itu, jadi, kesimpulannya</li>
            <li>∵ : karena, sebab</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">Penekanan & Pertanyaan:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>* : poin penting, fokus utama</li>
            <li>! : mengejutkan, penting, ingat ini!</li>
            <li>? : pertanyaan, tidak yakin, perlu dicek, keraguan pembicara</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">Orang & Tempat:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Inisial Nama: Professor Jones → PJ, Dr. Evans → DE</li>
            <li>Simbol Gender: ♂ (pria), ♀ (wanita) - jika relevan & cepat digambar</li>
            <li>Simbol Sederhana: 🏠 (rumah/akomodasi), 🏢 (gedung/kantor), 🌳 (alam/lingkungan), 🌍 (dunia/global)</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 2: Teknik Mencatat Kata Kunci (Keyword Technique)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Selain simbol dan singkatan, fondasi note-taking yang efektif adalah fokus pada kata kunci (keywords).
          </p>
          
          <h3 className="text-xl font-medium mb-4">Apa itu Kata Kunci?</h3>
          <p className="mb-4">
            Kata-kata yang membawa makna utama dalam sebuah kalimat atau gagasan.
          </p>
          
          <p className="mb-2">Biasanya berupa:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Kata Benda (Nouns):</strong> Orang, tempat, benda, konsep (e.g., students, library, project, pollution).</li>
            <li><strong>Kata Kerja (Verbs):</strong> Tindakan atau keadaan (e.g., research, increase, decided, requires).</li>
            <li><strong>Kata Sifat (Adjectives):</strong> Mendeskripsikan kata benda (e.g., difficult, important, new, environmental).</li>
            <li><strong>Kata Keterangan (Adverbs):</strong> Mendeskripsikan kata kerja, sifat, atau keterangan lain (e.g., quickly, mainly, however, significantly).</li>
            <li><strong>Informasi Spesifik:</strong> Nama, angka, tanggal, persentase.</li>
            <li><strong>Kata Penanda Struktur (Signposting words):</strong> Firstly, secondly, however, in contrast, therefore, in conclusion, the main reason is...</li>
          </ul>

          <h3 className="text-xl font-medium mb-4">Mengapa Fokus pada Kata Kunci?</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Mengandung inti informasi yang dibutuhkan untuk menjawab pertanyaan.</li>
            <li>Lebih cepat ditangkap dan ditulis daripada frasa atau kalimat lengkap.</li>
            <li>Membantu menyaring informasi penting dari detail yang kurang relevan.</li>
          </ul>

          <h3 className="text-xl font-medium mb-4">Bagaimana Mengidentifikasi Kata Kunci Saat Mendengarkan?</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Dengarkan Penekanan (Stress):</strong> Pembicara secara alami memberi penekanan lebih pada kata-kata penting dalam kalimat.</li>
            <li><strong>Pikirkan Pertanyaan W/H:</strong> Kata kunci seringkali menjawab pertanyaan Who? What? Where? When? Why? How? How much/many?</li>
            <li><strong>Gunakan Pertanyaan IELTS:</strong> Sebelum audio mulai, baca pertanyaan dan garis bawahi kata kunci dalam pertanyaan dan pilihan jawaban.</li>
            <li><strong>Dengarkan Kata Penanda (Signposting Language):</strong> Kata-kata ini secara eksplisit menunjukkan struktur argumen atau poin penting.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-6">Contoh Mencatat Kata Kunci:</h4>
          <div className="bg-slate-50 p-4 rounded-md mb-6">
            <p className="mb-2"><strong>Audio:</strong> "Right, so the main problem we identified in the research was the lack of public awareness regarding recycling facilities. Consequently, participation rates remain significantly low, especially in suburban areas."</p>
            <p><strong>Catatan Kata Kunci:</strong> *Prob = lack pub aware recycle facil → particip rate ↓↓ (esp. suburb)</p>
            <ul className="list-disc pl-6 mt-2">
              <li>* (poin penting)</li>
              <li>Prob (problem - singkatan)</li>
              <li>lack pub aware (lack public awareness - kata kunci)</li>
              <li>recycle facil (recycling facilities - kata kunci)</li>
              <li>→ (menyebabkan/akibatnya)</li>
              <li>particip rate (participation rates - kata kunci)</li>
              <li>↓↓ (menurun drastis - simbol)</li>
              <li>esp. suburb (especially suburban - singkatan & kata kunci)</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 3: Fokus pada Informasi Penting vs. Detail Tambahan</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Tantangan lain dalam note-taking adalah memilah mana informasi yang krusial untuk dicatat dan mana yang bisa diabaikan agar tidak kewalahan.
          </p>

          <h3 className="text-xl font-medium mb-4">Apa yang Dianggap "Informasi Penting"?</h3>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Jawaban Langsung untuk Pertanyaan:</strong> Prioritas utama! Gunakan pertanyaan IELTS sebagai filter utama Anda.</li>
            <li><strong>Ide Pokok (Main Ideas):</strong> Terutama dalam kuliah di Section 4. Apa topik utama setiap bagian?</li>
            <li><strong>Argumen & Opini:</strong> Dalam diskusi Section 3. Siapa berkata apa?</li>
            <li><strong>Hubungan Sebab-Akibat:</strong> Apa penyebab masalah? Apa dampaknya?</li>
            <li><strong>Masalah & Solusi:</strong> Apa masalah yang didiskusikan? Apa solusi yang diusulkan?</li>
            <li><strong>Langkah-langkah dalam Proses:</strong> Jika audio menjelaskan urutan atau proses.</li>
            <li><strong>Klasifikasi atau Kategori:</strong> Jika audio membagi informasi ke dalam kelompok-kelompok.</li>
            <li><strong>Definisi:</strong> Jika istilah kunci didefinisikan.</li>
            <li><strong>Data Spesifik:</strong> Nama, tempat, tanggal, angka, persentase yang secara eksplisit ditanyakan.</li>
          </ul>

          <h3 className="text-xl font-medium mb-4">Apa yang Mungkin Kurang Penting (untuk Dicatat Cepat)?</h3>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Contoh Minor atau Ilustrasi Panjang:</strong> Kecuali pertanyaan secara spesifik meminta contoh.</li>
            <li><strong>Pengulangan atau Parafrase:</strong> Pembicara mungkin mengulang poin dengan kata lain.</li>
            <li><strong>Basa-basi atau Small Talk:</strong> Percakapan pembuka atau penutup yang tidak terkait langsung dengan topik utama.</li>
            <li><strong>Detail Sangat Teknis/Jargon:</strong> Kecuali jika itu adalah fokus utama dan relevan dengan pertanyaan.</li>
            <li><strong>Komentar Pribadi Pembicara yang Tidak Relevan:</strong> Misal, "Oh, cuacanya bagus ya hari ini."</li>
          </ul>

          <h3 className="text-xl font-medium mb-4">Bagaimana Cara Memfilter Secara Efektif?</h3>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Biarkan Pertanyaan Memandu Anda:</strong> Selama waktu persiapan, pahami betul apa yang ditanyakan.</li>
            <li><strong>Dengarkan Struktur melalui Signposting Language:</strong> Kata/frasa seperti "The most important point is...", "There are three main reasons..." adalah penanda kuat informasi penting.</li>
            <li><strong>Identifikasi Fungsi Kalimat:</strong> Apakah kalimat ini memberi ide utama? Contoh? Kontras? Kesimpulan?</li>
            <li><strong>Bedakan Fakta dan Opini:</strong> Di Section 3, penting untuk tahu siapa yang berpendapat apa.</li>
            <li><strong>Latih Kecepatan Memproses:</strong> Kemampuan memfilter ini berkembang seiring latihan.</li>
            <li><strong>Jangan Takut Mencoret:</strong> Jika Anda mulai mencatat sesuatu dan sadar itu tidak penting, abaikan saja dan lanjut mendengarkan.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan: Mengintegrasikan Pemahaman Aksen dan Note-taking</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Wah, kita sudah menempuh perjalanan panjang dan mendalam membahas dua aspek krusial IELTS Listening: menavigasi keragaman aksen dan pengucapan, serta menguasai seni note-taking yang cepat dan efektif.
          </p>
          
          <p className="mb-4">Ingatlah poin-poin kunci dari kedua chapter ini:</p>
          
          <h3 className="text-xl font-medium mb-2">Aksen & Pengucapan (Chapter 1.3):</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Paparan terhadap aksen British, American, dan Australian (serta lainnya) sangat penting untuk pemahaman.</li>
            <li>Kenali ciri khas utama aksen (bunyi /r/, vokal, /t/) tapi jangan terlalu terpaku pada detail linguistik.</li>
            <li>Waspadai kata-kata yang pengucapannya berbeda dari ejaan (silent letters, schwa, connected speech).</li>
            <li>Latihan aktif dan konsisten dengan berbagai sumber audio adalah jalan terbaik untuk melatih telinga.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">Note-taking Dasar (Chapter 1.4):</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>Note-taking di IELTS bertujuan untuk kecepatan dan efisiensi, bukan kelengkapan atau keindahan.</li>
            <li>Gunakan simbol dan singkatan yang konsisten dan mudah Anda pahami.</li>
            <li>Fokus pada pencatatan kata kunci (nouns, verbs, adjectives, adverbs, signposting words).</li>
            <li>Gunakan pertanyaan IELTS sebagai panduan utama untuk memfilter informasi penting dari detail tambahan.</li>
            <li>Latih teknik note-taking ini secara terintegrasi saat mengerjakan latihan Listening.</li>
          </ul>
          
          <p className="mb-4">
            Kedua keterampilan ini saling mendukung. Semakin baik Anda memahami aksen dan pengucapan, semakin mudah Anda menangkap kata kunci. Semakin efisien Anda mencatat kata kunci, semakin baik Anda bisa fokus pada pemahaman arus informasi, bahkan ketika menghadapi aksen yang kurang familiar atau pembicara yang cepat.
          </p>
          
          <p className="mb-4">
            Tidak ada jalan pintas selain latihan yang tekun dan cerdas. Terapkan semua strategi dan tips ini dalam persiapan Anda. Analisis di mana Anda masih kesulitan – apakah dalam membedakan aksen tertentu? Apakah dalam mengidentifikasi kata kunci? Apakah dalam menggunakan singkatan secara efektif? Fokuskan latihan Anda pada area tersebut.
          </p>
          
          <p className="mb-4">
            Saya sangat yakin bahwa dengan dedikasi dan penerapan strategi yang tepat, Anda, para pejuang IELTS Indonesia, akan mampu mengatasi tantangan aksen dan note-taking ini. Teruslah berlatih, tetap positif, dan percayalah pada kemampuan Anda!
          </p>
          
          <p className="mb-4">
            Sampai jumpa di pembahasan materi IELTS selanjutnya! Selamat belajar!
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-3">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Aksen dan Pengucapan
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

export default ListeningBeginnerGuide1_4;
