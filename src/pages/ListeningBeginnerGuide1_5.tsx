
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_5 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.5: Mendalami Percakapan Sehari-hari</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide-1-4">
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
        <div className="prose max-w-none">
          <p className="mb-4">
            Chapter ini adalah jembatan antara pemahaman teori dan praktik nyata di Section 1 IELTS Listening. 
            Section 1 selalu menyajikan percakapan antara dua orang dalam konteks sosial sehari-hari. Ini bisa berupa 
            transaksi, permintaan informasi, atau interaksi umum lainnya. Meskipun dianggap bagian termudah, Section 1 
            membangun fondasi skor Anda dan memberikan kesempatan untuk meraih poin penuh jika Anda tahu apa yang 
            diharapkan dan bagaimana cara mendengarkannya. Menguasai konteks percakapan sehari-hari ini adalah langkah 
            pertama menuju kesuksesan di bagian ini. Kita akan bedah tiga skenario paling umum.
          </p>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Reservasi dan Pemesanan (Reservations and Bookings)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Ini adalah salah satu skenario paling klasik dan sering muncul di Section 1. Kemampuan untuk memahami dan mencatat 
            detail saat seseorang memesan sesuatu sangatlah krusial dalam kehidupan nyata, dan IELTS mengujinya secara langsung.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Konteks Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Akomodasi: Memesan kamar hotel, hostel, B&B, atau apartemen sewaan.</li>
            <li>Transportasi: Memesan tiket pesawat, kereta api, bus, atau feri. Menyewa mobil.</li>
            <li>Restoran/Acara: Reservasi meja di restoran, memesan tiket konser, teater, bioskop, atau acara olahraga.</li>
            <li>Layanan: Membuat janji temu dengan dokter, dokter gigi, salon, atau layanan perbaikan. Mendaftar kursus singkat.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Informasi Kunci yang Sering Dipertukarkan (dan Diuji):</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Nama:</strong> Ejaan nama depan dan belakang pemesan. Seringkali dieja!</li>
            <li><strong>Tanggal dan Waktu:</strong> Tanggal kedatangan/keberangkatan, tanggal acara, tanggal janji temu, waktu spesifik.</li>
            <li><strong>Jumlah:</strong> Jumlah orang (dewasa, anak-anak), jumlah malam menginap, jumlah tiket, jumlah barang.</li>
            <li><strong>Detail Spesifikasi:</strong> Tipe kamar, preferensi, kebutuhan diet, jenis layanan, tujuan perjalanan.</li>
            <li><strong>Kontak Detail:</strong> Nomor telepon, alamat email, alamat rumah/kantor.</li>
            <li><strong>Detail Pembayaran:</strong> Jenis kartu, nama pemegang kartu, tanggal kadaluarsa, atau kode keamanan.</li>
            <li><strong>Nomor Referensi:</strong> Kombinasi huruf dan angka sebagai bukti pemesanan.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Bahasa yang Umum Digunakan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Membuat Permintaan:</strong> "I'd like to book...", "I want to make a reservation for...", "Could I reserve a table/room/ticket?"</li>
            <li><strong>Memberi Detail:</strong> "It's for two adults and one child.", "We'll be staying for three nights.", "My contact number is..."</li>
            <li><strong>Mengkonfirmasi:</strong> "Okay, so that's one double room for two nights, arriving on the 10th of June?"</li>
            <li><strong>Menanyakan Detail:</strong> "What date were you looking for?", "How many people is the booking for?", "Could I take your name, please?"</li>
            <li><strong>Kesopanan:</strong> Penggunaan "please", "thank you", "could you", "would you mind" sangat umum.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Mendengarkan untuk Reservasi/Pemesanan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Antisipasi:</strong> Siapkan mental untuk mencatat jenis informasi penting.</li>
            <li><strong>Gunakan Struktur Form:</strong> Jika soalnya form filling, gunakan field sebagai panduan informasi.</li>
            <li><strong>Note-taking Cepat & Fokus:</strong> Gunakan singkatan dan tulis angka/ejaan segera.</li>
            <li><strong>Dengarkan Konfirmasi:</strong> Bagian akhir percakapan sering berisi rangkuman untuk pengecekan.</li>
            <li><strong>Waspada Koreksi:</strong> Dengarkan kata-kata seperti "sorry", "actually", "oh wait", "I meant..."</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Permintaan Informasi (Information Requests)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Skenario umum lainnya adalah ketika seseorang menghubungi suatu tempat atau orang lain untuk menanyakan 
            informasi spesifik.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Konteks Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Bisnis/Layanan:</strong> Jam buka toko, biaya keanggotaan, detail produk, layanan di bank, prosedur pengiriman.</li>
            <li><strong>Pendidikan/Pelatihan:</strong> Detail kursus, fasilitas perpustakaan, cara mendaftar klub.</li>
            <li><strong>Turisme/Perjalanan:</strong> Informasi atraksi lokal, transportasi umum, peta, acara, arah jalan.</li>
            <li><strong>Umum:</strong> Acara komunitas, peraturan di tempat umum.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Informasi Kunci yang Sering Dipertukarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Detail Operasional:</strong> Jam buka/tutup, hari operasional.</li>
            <li><strong>Biaya/Harga:</strong> Biaya masuk, biaya keanggotaan, harga tiket, biaya kursus, diskon.</li>
            <li><strong>Lokasi/Alamat:</strong> Alamat fisik, petunjuk arah, lokasi dalam kompleks.</li>
            <li><strong>Fitur/Fasilitas:</strong> Apa yang termasuk dalam keanggotaan, fitur produk, fasilitas tersedia.</li>
            <li><strong>Prosedur/Cara:</strong> Langkah-langkah pendaftaran, cara penggunaan, persiapan.</li>
            <li><strong>Jadwal/Waktu:</strong> Jadwal kursus, jadwal acara, waktu keberangkatan.</li>
            <li><strong>Kontak Lanjutan:</strong> Nama orang, nomor telepon ekstensi, alamat website.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Bahasa yang Umum Digunakan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Meminta Informasi:</strong> "Could you tell me about...?", "I'd like some information on...", "What are the opening hours?"</li>
            <li><strong>Memberi Informasi:</strong> "We're open from 9 AM to 5 PM.", "The membership fee is...", "To register, you need to..."</li>
            <li><strong>Memberi Arah:</strong> "Go straight on, then turn left at the traffic lights.", "It's opposite the bank."</li>
            <li><strong>Mengkonfirmasi Pemahaman:</strong> "So, I just need to bring my ID?", "Okay, turn left at the lights, got it."</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Identifikasi Tujuan:</strong> Apa informasi utama yang dicari?</li>
            <li><strong>Fokus pada Kata Kunci:</strong> Dengarkan kata kunci dari pertanyaan IELTS.</li>
            <li><strong>Ikuti Struktur Jawaban:</strong> Jika informasi diberikan dalam bentuk langkah, ikuti urutannya.</li>
            <li><strong>Catat Detail Spesifik:</strong> Tulis jam, harga, nama jalan, nama fasilitas, langkah kunci.</li>
            <li><strong>Visualisasi:</strong> Untuk arah/lokasi, bayangkan rutenya dalam pikiran Anda.</li>
            <li><strong>Waspada Pembandingan:</strong> Jika opsi dibandingkan, buat catatan terpisah untuk setiap opsi.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Interaksi di Tempat Umum (Interactions in Public Places)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Ini mencakup berbagai transaksi dan interaksi singkat yang terjadi di lokasi-lokasi publik.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Konteks Umum:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Toko/Ritel:</strong> Membeli barang, menanyakan ketersediaan, melakukan pembayaran, mengembalikan barang, mengajukan keluhan.</li>
            <li><strong>Transportasi Hub:</strong> Membeli tiket, menanyakan platform/gate, check-in bagasi, melaporkan kehilangan barang.</li>
            <li><strong>Bank/Kantor Pos:</strong> Melakukan transaksi dasar, mengirim surat/paket, menanyakan layanan.</li>
            <li><strong>Layanan Publik:</strong> Interaksi dengan petugas di perpustakaan, museum, kantor pemerintah.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Informasi Kunci:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Detail Produk/Layanan:</strong> Nama barang, merek, ukuran, warna, harga, fitur. Sifat masalah/kerusakan.</li>
            <li><strong>Detail Transaksi:</strong> Jumlah yang dibayar, metode pembayaran, nomor referensi, nomor pelacakan.</li>
            <li><strong>Detail Pribadi:</strong> Nama, alamat, nomor telepon, nomor penerbangan/kereta.</li>
            <li><strong>Detail Insiden:</strong> Apa yang hilang, di mana, kapan. Deskripsi barang yang hilang.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Bahasa yang Umum Digunakan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Transaksi:</strong> "I'd like to buy this, please.", "How much is this?", "Can I pay by credit card?"</li>
            <li><strong>Return/Komplain:</strong> "I'd like to return this item.", "It's faulty / it doesn't work.", "Can I get a refund?"</li>
            <li><strong>Melaporkan Masalah:</strong> "I think I've lost my wallet.", "I left my bag on the train.", "It's a [deskripsi]."</li>
            <li><strong>Memberi/Meminta Detail:</strong> "Could I have your name?", "What's the tracking number?", "Can you describe it?"</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Mendengarkan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Identifikasi Konteks & Tujuan:</strong> Apakah ini pembelian? Komplain? Laporan?</li>
            <li><strong>Fokus pada Objek/Masalah:</strong> Apa barang yang dibeli/dikembalikan? Apa yang hilang?</li>
            <li><strong>Catat Detail Kunci:</strong> Harga, ukuran, warna, nama, referensi, deskripsi masalah, lokasi.</li>
            <li><strong>Perhatikan Solusi/Hasil:</strong> Apa hasil akhir interaksi? (barang ditukar, refund, laporan dibuat)</li>
            <li><strong>Dengarkan Kata Kerja Aksi:</strong> Buy, pay, return, complain, report, lost, found, send, collect.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Memahami skenario percakapan sehari-hari seperti reservasi, permintaan informasi, dan interaksi di tempat 
            umum adalah inti dari Section 1. Anda perlu terbiasa dengan jenis informasi yang biasanya dipertukarkan 
            (nama, tanggal, waktu, nomor, harga, detail spesifikasi, prosedur) dan bahasa yang digunakan.
          </p>
          
          <p className="mb-4">
            Tantangan utamanya adalah menangkap detail ini secara akurat dan cepat, seringkali sambil menghadapi ejaan, 
            angka, dan berbagai aksen. Strategi kunci melibatkan antisipasi berdasarkan konteks, note-taking yang fokus 
            pada detail faktual, mendengarkan konfirmasi atau koreksi, dan memahami tujuan utama percakapan.
          </p>
          
          <p className="mb-4">
            Dengan membiasakan diri melalui latihan pada skenario-skenario ini, Anda akan membangun dasar yang kokoh 
            untuk menaklukkan Section 1.
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Note-taking Dasar
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

export default ListeningBeginnerGuide1_5;
