
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_2 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.2: Mendengarkan Detail Faktual</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide">
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
        <h2 className="text-2xl font-semibold mb-4">Bagian 1: Menguasai Angka dan Numerik</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Angka ada di mana-mana dalam percakapan sehari-hari, dan Section 1 IELTS Listening hampir selalu menguji kemampuan Anda menangkap berbagai jenis angka secara akurat. Kesalahan kecil dalam mencatat satu digit saja bisa berarti kehilangan poin.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Jenis Angka yang Sering Muncul dan Strateginya:</h3>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Nomor Telepon (Phone Numbers):</h4>
          <p className="mb-2"><strong>Format Umum:</strong> Seringkali dibacakan dengan jeda antar kelompok angka (misal, 021 887 6543) atau per digit. Di UK atau Australia, nomor telepon lokal bisa lebih pendek, sementara nomor ponsel biasanya lebih panjang.</p>
          
          <p className="mb-2"><strong>Tantangan Umum:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Angka Nol ('0'): Bisa dibaca sebagai "zero" (lebih formal) atau "oh" (sangat umum dalam nomor telepon). Biasakan mendengar keduanya.</li>
            <li>Angka Kembar/Triple: Mereka akan mengatakan "double seven" (77) atau "triple two" (222), bukan "seven seven" atau "two two two".</li>
            <li>Kecepatan dan Jeda: Pembicara mungkin membacanya dengan cepat atau dengan jeda yang tidak terduga.</li>
          </ul>
          
          <p className="mb-2"><strong>Strategi:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Tulis Langsung: Segera tulis angka yang Anda dengar di lembar soal. Jangan mencoba mengingat seluruh rangkaian baru menuliskannya.</li>
            <li>Gunakan Spasi: Ikuti jeda yang diberikan pembicara dengan memberi spasi pada tulisan Anda (misal, tulis 021 887 6543 bukan 0218876543). Ini memudahkan pengecekan.</li>
            <li>Antisipasi: Jika Anda tahu ini bagian mengisi nomor telepon, siapkan mental untuk mendengar deretan angka.</li>
            <li>Konfirmasi (jika ada): Kadang pembicara mengulang nomornya atau penerima telepon mengkonfirmasi. Gunakan kesempatan ini untuk memeriksa.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">Harga (Prices):</h4>
          <p className="mb-2"><strong>Format Umum:</strong> Bisa dalam berbagai mata uang (Pounds £, Dollars $, Euros €). Simbol mata uang biasanya tidak disebutkan berulang kali, cukup di awal atau tersirat dari konteks.</p>
          
          <p className="mb-2"><strong>Tantangan Umum:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Membedakan angka belasan (-teen) dan puluhan (-ty) yang bunyinya mirip (e.g., 15 fifteen vs 50 fifty, 19 nineteen vs 90 ninety).</li>
            <li>Memahami cara penyebutan harga seperti "nineteen ninety-nine".</li>
            <li>Menangkap sen/pence jika disebutkan.</li>
          </ul>
          
          <p className="mb-2"><strong>Strategi:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Dengarkan Mata Uang: Perhatikan mata uang yang digunakan (jika disebutkan).</li>
            <li>Fokus pada Angka: Konsentrasi pada angka utama dan desimal/sen.</li>
            <li>Tulis Format Umum: Tulis dengan simbol mata uang (jika tahu) dan format standar.</li>
            <li>Latihan Belasan vs Puluhan: Latih telinga Anda membedakan bunyi "-teen" dan "-ty".</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="text-xl font-medium mb-2">Strategi Umum untuk Mendengarkan Angka:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Antisipasi/Prediksi: Sebelum audio mulai, lihat pertanyaan. Jika ada kolom "Phone:", "Price:", "Postcode:", Anda tahu harus fokus mendengarkan angka.</li>
            <li>Dengarkan Aktif: Fokus penuh saat Anda menduga angka akan disebutkan.</li>
            <li>Tulis SEGERA dan APA ADANYA: Tulis angka di lembar soal persis seperti yang Anda dengar.</li>
            <li>Periksa Kewajaran: Saat mentransfer jawaban, pikirkan sejenak. Apakah nomor telepon ini terlihat wajar jumlah digitnya?</li>
            <li>Latihan Drill Angka: Cari sumber audio yang khusus melatih pendengaran angka.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 2: Menaklukkan Ejaan (Conquering Spelling)</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Selain angka, informasi spesifik yang sering membutuhkan perhatian ekstra adalah ejaan (spelling), terutama untuk:
            nama orang, nama tempat, dan alamat email atau website.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Bagaimana Ejaan Disajikan dalam Tes:</h3>
          <p className="mb-4">
            Biasanya, satu pembicara akan meminta pembicara lain untuk mengeja sesuatu ("Could you spell your surname for me, please?") 
            atau pembicara secara proaktif mengejanya untuk kejelasan.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Tantangan Umum Ejaan:</h3>
          <p className="mb-2"><strong>Pengucapan Alfabet Inggris:</strong> Pastikan Anda 100% familiar dengan pengucapan setiap huruf dalam alfabet Inggris.</p>
          <ul className="list-disc pl-6 mb-4">
            <li>E /iː/ vs I /aɪ/: Sangat sering tertukar.</li>
            <li>A /eɪ/ vs E /iː/ vs I /aɪ/: Kombinasi vokal lain yang rawan.</li>
            <li>G /dʒiː/ vs J /dʒeɪ/: Keduanya punya bunyi "j" di awal.</li>
            <li>B /biː/ vs V /viː/ vs P /piː/: Perbedaan pada letupan dan desisan.</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Strategi Efektif untuk Menangkap Ejaan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>KUASAI Alfabet Bahasa Inggris:</strong> Latih mengucapkannya berulang kali sampai otomatis.</li>
            <li><strong>Antisipasi:</strong> Siapkan diri jika Anda melihat isian untuk "Name:", "Street:", "Email:".</li>
            <li><strong>Tulis Huruf demi Huruf, SEGERA:</strong> Langsung tulis setiap huruf di lembar soal Anda.</li>
            <li><strong>Gunakan Huruf Kapital:</strong> Sangat disarankan untuk menulis huruf hasil ejaan dalam KAPITAL.</li>
            <li><strong>Dengarkan Konfirmasi:</strong> Kadang penanya akan mengulang ejaan untuk konfirmasi.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bagian 3: Memahami Tanggal, Hari, dan Waktu</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Informasi terkait waktu adalah detail faktual penting lainnya yang sering muncul, terutama untuk jadwal, janji temu, durasi, atau konteks historis.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Jenis Informasi Waktu dan Strateginya:</h3>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Tanggal (Dates):</h4>
          <p className="mb-2"><strong>Format Penyebutan:</strong> Bisa bervariasi tergantung aksen dan kebiasaan.</p>
          <ul className="list-disc pl-6 mb-4">
            <li>UK/Australia Style: "the fifth of May", "May the fifth", "5th May".</li>
            <li>US Style: "May fifth", "May five".</li>
            <li>Tahun biasanya disebut per dua digit atau penuh untuk tahun setelah 2000.</li>
          </ul>
          
          <p className="mb-2"><strong>Strategi:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Kuasai Ordinal Numbers: Latih pendengaran Anda mengenali bunyi 1st, 2nd, 3rd, 4th, dst.</li>
            <li>Kuasai Nama Bulan: Hafalkan nama 12 bulan dan pengucapannya.</li>
            <li>Perhatikan Urutan: Dengarkan baik-baik apakah yang disebut duluan tanggalnya atau bulannya.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">Waktu (Times):</h4>
          <p className="mb-2"><strong>Format Penyebutan:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Jam 12-an (AM/PM): "eight AM", "six thirty PM", "ten fifteen in the morning".</li>
            <li>Ekspresi Waktu: "half past eight" (8:30), "a quarter past ten" (10:15), "a quarter to three" (2:45).</li>
          </ul>
          
          <p className="mb-2"><strong>Strategi:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Dengarkan AM/PM atau Konteks: Ini krusial untuk format 12 jam.</li>
            <li>Praktik Ekspresi Waktu: Biasakan diri dengan "half past", "quarter past/to".</li>
            <li>Perhatikan Preposisi: "at 8 PM", "by 5 o'clock", "from 9 to 5".</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan: Membangun Fondasi Skor Tinggi Anda</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Para pejuang IELTS, kemampuan menangkap detail faktual – angka, ejaan, tanggal, hari, dan waktu – adalah fondasi penting dalam tes Listening, terutama di bagian awal. Meskipun terlihat sepele, detail inilah yang seringkali membedakan skor baik dan skor luar biasa.
          </p>
          
          <p className="mb-2"><strong>Ingat strategi kunci kita:</strong></p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Antisipasi:</strong> Prediksi jenis informasi apa yang akan muncul.</li>
            <li><strong>Dengar Aktif & Fokus:</strong> Konsentrasi penuh saat detail disebutkan.</li>
            <li><strong>Tulis Cepat & Apa Adanya:</strong> Catat di lembar soal segera.</li>
            <li><strong>Pahami Format & Aturan:</strong> Kenali cara penyebutan angka, ejaan, tanggal, waktu.</li>
            <li><strong>Waspada Jebakan:</strong> Hati-hati dengan bunyi mirip, kecepatan, aksen, dan koreksi.</li>
            <li><strong>Transfer dengan Teliti:</strong> Gunakan 10 menit ekstra untuk memeriksa.</li>
            <li><strong>Latihan Terarah:</strong> Fokuskan latihan pada area kelemahan Anda.</li>
          </ul>
          
          <p className="mb-4">
            Jangan remehkan kekuatan detail! Dengan terus berlatih menerapkan strategi ini, telinga Anda akan semakin tajam, dan kepercayaan diri Anda akan meningkat. Teruslah berlatih dengan tekun dan cerdas. Saya percaya Anda semua bisa menguasai skill ini dan semakin dekat dengan target skor IELTS Anda!
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Format Dasar IELTS Listening
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

export default ListeningBeginnerGuide1_2;
