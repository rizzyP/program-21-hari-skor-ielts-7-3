
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info, Headphones, Clock, BookOpen, List, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const ListeningBeginnerGuide = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Format Dasar IELTS Listening</h1>
            <p className="text-sm text-muted-foreground">
              Materi Pemula - Chapter 1.1
            </p>
          </div>
          <Link to="/curriculum">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" /> Kembali ke Kurikulum
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="format" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="format">Struktur Dasar</TabsTrigger>
            <TabsTrigger value="transfer">Transfer Jawaban</TabsTrigger>
            <TabsTrigger value="questions">Jenis Pertanyaan</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Penting</AlertTitle>
              <AlertDescription>
                Audio pada tes IELTS Listening hanya diputar SEKALI. Tidak ada pengulangan!
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="mr-2 h-5 w-5" />
                  Struktur Dasar Tes IELTS Listening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Tes IELTS Listening terdiri dari 40 pertanyaan yang dibagi ke dalam 4 bagian (Sections). 
                  Anda akan mendengarkan rekaman audio (sekitar 30 menit) yang berisi percakapan dan monolog, 
                  lalu Anda memiliki 10 menit ekstra di akhir untuk mentransfer jawaban Anda dari lembar soal 
                  ke lembar jawaban.
                </p>

                <div className="flex items-center gap-2 my-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Durasi Total: Sekitar 40 Menit</span>
                </div>

                <ScrollArea className="h-[450px] pr-4">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Section 1: Konteks Sosial Sehari-hari (Percakapan)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Percakapan antara dua orang (misalnya, percakapan telepon untuk memesan sesuatu, menanyakan informasi tentang layanan, mendaftar kursus, dll.).</p>
                        <p><strong>Konteks:</strong> Situasi sosial yang umum terjadi dalam kehidupan sehari-hari. Fokusnya seringkali pada pertukaran informasi faktual.</p>
                        <p><strong>Tingkat Kesulitan:</strong> Dianggap paling mudah. Ini adalah "pemanasan" Anda.</p>
                        <p><strong>Tipe Pertanyaan Umum:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Form Completion (mengisi formulir)</li>
                          <li>Note Completion (melengkapi catatan)</li>
                          <li>Table Completion (melengkapi tabel)</li>
                          <li>Short Answer Questions (jawaban singkat)</li>
                          <li>Sentence Completion (melengkapi kalimat)</li>
                        </ul>
                        <p><strong>Fokus Pendengar:</strong> Menangkap detail spesifik seperti nama (yang sering dieja), nomor telepon, alamat, tanggal, harga, waktu, dll. Perhatikan baik-baik ejaan dan angka!</p>
                        <p><strong>Contoh Skenario:</strong> Seseorang menelepon agen travel untuk menanyakan paket liburan, seorang mahasiswa baru mendaftar ke klub olahraga kampus, seseorang memesan meja di restoran.</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Section 2: Konteks Sosial Sehari-hari (Monolog)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Monolog (satu orang berbicara) tentang topik sosial sehari-hari. Bisa berupa pidato sambutan, penjelasan tentang fasilitas umum, panduan tur, siaran radio, atau presentasi informatif.</p>
                        <p><strong>Konteks:</strong> Masih dalam lingkup sosial umum, tetapi biasanya lebih terstruktur daripada Section 1.</p>
                        <p><strong>Tingkat Kesulitan:</strong> Sedikit lebih sulit dari Section 1. Anda perlu mengikuti alur pembicaraan satu orang.</p>
                        <p><strong>Tipe Pertanyaan Umum:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Multiple Choice (pilihan ganda)</li>
                          <li>Matching (mencocokkan daftar)</li>
                          <li>Plan/Map/Diagram Labelling (memberi label pada peta/denah/diagram)</li>
                          <li>Note Completion</li>
                          <li>Sentence Completion</li>
                        </ul>
                        <p><strong>Fokus Pendengar:</strong> Memahami informasi deskriptif, mengikuti arahan (untuk soal peta/denah), mengidentifikasi tujuan atau fungsi suatu tempat/acara.</p>
                        <p><strong>Contoh Skenario:</strong> Pemandu wisata menjelaskan rute tur museum, kepala perpustakaan menjelaskan fasilitas dan aturan, siaran radio tentang acara lokal, penjelasan tentang tata letak taman baru.</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Section 3: Konteks Akademik/Pendidikan (Percakapan)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Percakapan antara beberapa orang (bisa 2, 3, atau bahkan 4 orang) dalam konteks pendidikan atau pelatihan. Seringkali melibatkan mahasiswa dan dosen, atau antar mahasiswa yang sedang berdiskusi.</p>
                        <p><strong>Konteks:</strong> Topik akademis, diskusi tugas kuliah, perencanaan proyek penelitian, seminar, tutorial.</p>
                        <p><strong>Tingkat Kesulitan:</strong> Jauh lebih menantang daripada Section 1 dan 2. Anda perlu mengikuti interaksi beberapa pembicara, mengidentifikasi pendapat yang berbeda, dan memahami argumen atau sudut pandang.</p>
                        <p><strong>Tipe Pertanyaan Umum:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Multiple Choice (seringkali menanyakan opini, sikap, atau kesepakatan/ketidaksepakatan)</li>
                          <li>Matching (mencocokkan pendapat dengan pembicara, atau ide dengan kategori)</li>
                          <li>Flow-chart Completion (melengkapi diagram alir proses)</li>
                          <li>Sentence Completion</li>
                          <li>Short Answer Questions</li>
                        </ul>
                        <p><strong>Fokus Pendengar:</strong> Mengidentifikasi pembicara, memahami opini, sikap, tujuan, kesepakatan/ketidaksepakatan antar pembicara, mengikuti alur diskusi akademis.</p>
                        <p><strong>Contoh Skenario:</strong> Dua mahasiswa berdiskusi dengan dosen tentang outline esai mereka, tiga mahasiswa merencanakan presentasi kelompok, diskusi dalam sebuah seminar tentang hasil penelitian.</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Section 4: Konteks Akademik (Monolog)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Monolog (satu orang berbicara) dalam bentuk kuliah atau presentasi akademis. Mirip seperti mendengarkan dosen memberikan kuliah singkat.</p>
                        <p><strong>Konteks:</strong> Topik akademis yang spesifik (bisa dari bidang sains, humaniora, sosial, dll.).</p>
                        <p><strong>Tingkat Kesulitan:</strong> Dianggap paling sulit. Biasanya tidak ada jeda di tengah-tengah seperti di Section 1-3. Anda perlu mempertahankan konsentrasi tinggi untuk waktu yang lebih lama dan memahami struktur argumen atau penjelasan yang kompleks.</p>
                        <p><strong>Tipe Pertanyaan Umum:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Note Completion (seringkali dalam format catatan kuliah)</li>
                          <li>Summary Completion (melengkapi ringkasan kuliah)</li>
                          <li>Table Completion</li>
                          <li>Flow-chart Completion</li>
                          <li>Sentence Completion</li>
                        </ul>
                        <p><strong>Fokus Pendengar:</strong> Mengidentifikasi ide utama, gagasan pendukung, struktur kuliah (misalnya, sebab-akibat, klasifikasi, proses), definisi istilah, contoh-contoh yang diberikan.</p>
                        <p><strong>Contoh Skenario:</strong> Kuliah tentang dampak perubahan iklim di suatu wilayah, presentasi tentang sejarah perkembangan teknologi tertentu, penjelasan tentang teori psikologi.</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Karakteristik Penting Lainnya</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Peningkatan Kesulitan:</strong> Seperti yang dijelaskan, tingkat kesulitan umumnya meningkat dari Section 1 ke Section 4.</p>
                        <p><strong>Hanya Didengarkan Sekali:</strong> Ini adalah aturan emas. Latih konsentrasi Anda!</p>
                        <p><strong>Beragam Aksen:</strong> Anda akan mendengar berbagai aksen penutur asli bahasa Inggris (British, Australian, New Zealander, American, Canadian). Biasakan telinga Anda dengan berbagai aksen ini melalui latihan.</p>
                        <p><strong>Waktu Membaca Pertanyaan:</strong> Sebelum setiap bagian dimulai (dan kadang di tengah bagian untuk set pertanyaan berikutnya), Anda akan diberi waktu singkat (misalnya 30 detik) untuk membaca pertanyaan. Manfaatkan waktu ini sebaik mungkin!</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Link to="/test/listening">
                <Button>
                  Coba Latihan Listening <CheckSquare className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Strategi Mentransfer Jawaban (10 Menit Krusial!)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Setelah 30 menit mendengarkan audio dan menulis jawaban sementara di lembar soal, 
                  Anda akan diberikan waktu 10 menit khusus untuk memindahkan jawaban Anda ke lembar jawaban resmi.
                  Jangan anggap remeh waktu ini! Ini adalah kesempatan terakhir Anda untuk memastikan jawaban Anda terbaca jelas dan akurat.
                </p>

                <ScrollArea className="h-[450px] pr-4">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Mengapa Menulis di Lembar Soal Dulu?</h3>
                      <div className="ml-5">
                        <p>Saat audio diputar, fokus utama Anda adalah mendengarkan dan memahami. Mencoba menulis langsung di answer sheet yang rapi bisa memecah konsentrasi. Anda mungkin jadi khawatir tentang tulisan, ejaan, atau mencari nomor yang benar di answer sheet, sehingga melewatkan informasi penting dari audio. Oleh karena itu, sangat disarankan:</p>
                        <ul className="list-disc list-inside ml-5 mt-2 space-y-2">
                          <li><strong>Dengarkan dan Tulis Cepat di Lembar Soal:</strong> Tulis jawaban Anda secepat mungkin di samping nomor pertanyaan pada lembar soal (question paper). Gunakan singkatan atau simbol jika perlu (tapi pastikan Anda ingat artinya!), fokus pada menangkap kata kunci.</li>
                          <li><strong>Gunakan 10 Menit Transfer dengan Efektif:</strong> Setelah audio selesai, barulah gunakan 10 menit ini untuk menyalin jawaban dengan hati-hati ke answer sheet.</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Strategi Efektif Selama 10 Menit Transfer:</h3>
                      <div className="ml-5 space-y-4">
                        <div>
                          <p className="font-medium">Fokus Penuh</p>
                          <p className="ml-5">Jauhkan pikiran dari audio yang baru saja selesai. Konsentrasikan diri pada tugas menyalin dan memeriksa.</p>
                        </div>

                        <div>
                          <p className="font-medium">Periksa Ejaan (Spelling)</p>
                          <p className="ml-5">Ini sangat penting! Kesalahan ejaan, sekecil apa pun, akan membuat jawaban Anda salah. Perhatikan kata-kata yang sering salah eja (misalnya, accommodation, necessary, environment, Wednesday, February). Jika ragu, tuliskan ejaan yang paling mungkin benar. Jangan biarkan keraguan membuat Anda tidak menulis sama sekali.</p>
                        </div>

                        <div>
                          <p className="font-medium">Periksa Tata Bahasa (Grammar)</p>
                          <div className="ml-5">
                            <p><strong>Singular/Plural:</strong> Pastikan jawaban Anda sesuai dengan konteks kalimat. Jika Anda mendengar "students" tapi hanya menulis "student", itu bisa salah. Perhatikan akhiran "-s".</p>
                            <p><strong>Bentuk Kata:</strong> Meskipun jarang, pastikan bentuk kata (noun, verb, adjective) sesuai dengan yang diminta kalimat (terutama pada soal sentence completion).</p>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Patuhi Batas Kata (Word Limit)</p>
                          <div className="ml-5">
                            <p>Instruksi seperti "NO MORE THAN TWO WORDS AND/OR A NUMBER" harus dipatuhi dengan ketat. Jika batasnya dua kata, jangan menulis tiga. Jika Anda menulis lebih dari batas yang ditentukan, jawaban Anda akan otomatis salah, meskipun informasinya benar.</p>
                            <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                              <li>Angka bisa ditulis sebagai digit (e.g., 25) atau kata (e.g., twenty-five). Keduanya dihitung sebagai satu "angka".</li>
                              <li>Kata dengan tanda hubung (hyphenated words) seperti "state-of-the-art" biasanya dihitung sebagai satu kata.</li>
                              <li>Artikel (a, an, the) dihitung sebagai kata.</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">Tulisan Jelas dan Terbaca (Legibility)</p>
                          <p className="ml-5">Pastikan tulisan tangan Anda mudah dibaca oleh pemeriksa. Gunakan huruf kapital jika Anda merasa tulisan sambung/kecil Anda kurang jelas, terutama untuk jawaban seperti nama, tempat, atau istilah penting. Menulis dengan huruf kapital sepenuhnya diperbolehkan dan seringkali lebih aman.</p>
                        </div>

                        <div>
                          <p className="font-medium">Nomor Jawaban yang Benar</p>
                          <p className="ml-5">Pastikan jawaban untuk nomor 5 Anda tulis di baris nomor 5 pada answer sheet, bukan di baris nomor 6! Kesalahan kecil ini bisa berakibat fatal pada skor Anda. Periksa kembali urutan nomor saat menyalin.</p>
                        </div>

                        <div>
                          <p className="font-medium">Jangan Biarkan Kosong</p>
                          <p className="ml-5">Jika ada jawaban yang Anda tidak yakin atau terlewat saat mendengarkan, tetap usahakan untuk menebak selama 10 menit transfer ini. Tidak ada pengurangan nilai untuk jawaban salah. Menebak memberi Anda peluang untuk mendapatkan poin tambahan. Coba tebak berdasarkan konteks atau kata kunci yang Anda ingat.</p>
                        </div>

                        <div>
                          <p className="font-medium">Manajemen Waktu Transfer</p>
                          <p className="ml-5">Alokasikan waktu dengan bijak. Jangan habiskan 5 menit hanya untuk memeriksa ejaan satu kata. Usahakan menyalin semua dulu, lalu sisakan beberapa menit di akhir untuk pemeriksaan menyeluruh (ejaan, batas kata, nomor).</p>
                        </div>

                        <div>
                          <p className="font-medium">Latihan</p>
                          <p className="ml-5">Saat berlatih di rumah, biasakan juga untuk melakukan simulasi transfer 10 menit ini agar Anda terbiasa dengan tekanannya.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <List className="mr-2 h-5 w-5" />
                  Jenis Pertanyaan Umum dan Memahami Instruksi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-amber-500">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Aturan Emas</AlertTitle>
                  <AlertDescription>
                    BACA INSTRUKSI DENGAN SAKSAMA! Perhatikan jenis tugas, batas kata/angka, dan format jawaban.
                  </AlertDescription>
                </Alert>

                <ScrollArea className="h-[450px] pr-4">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Multiple Choice (Pilihan Ganda)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Pertanyaan diikuti beberapa pilihan jawaban (biasanya 3 atau 4). Anda harus memilih satu jawaban yang benar (Single Answer) ATAU beberapa jawaban yang benar sesuai instruksi (Multiple Answers - misal "Choose TWO letters").</p>
                        <p><strong>Strategi:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Baca pertanyaan dan pilihan jawaban sebelum audio dimulai. Garis bawahi kata kunci.</li>
                          <li>Waspadai distractors (pengecoh). Audio mungkin menyebutkan beberapa kata dari pilihan jawaban, tetapi hanya satu yang benar-benar menjawab pertanyaan.</li>
                          <li>Dengarkan sinonim dan parafrase. Jawaban yang benar seringkali tidak menggunakan kata-kata yang persis sama dengan pilihan jawaban.</li>
                          <li>Untuk Multiple Answers, catat semua pilihan yang relevan saat mendengarkan, lalu pilih jumlah yang diminta di akhir.</li>
                          <li>Eliminasi pilihan yang jelas salah.</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Matching (Mencocokkan)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Anda diberikan dua set informasi (misalnya, daftar nama pembicara dan daftar opini, atau daftar fitur hotel dan daftar tipe kamar). Anda harus mencocokkan item dari satu daftar dengan item yang sesuai dari daftar lainnya.</p>
                        <p><strong>Strategi:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Baca kedua daftar dengan cermat sebelum audio mulai. Pahami apa yang perlu dicocokkan.</li>
                          <li>Fokus pada salah satu daftar (biasanya daftar yang lebih pendek atau daftar pertanyaan) dan dengarkan informasi yang berkaitan dengan setiap item di daftar tersebut.</li>
                          <li>Dengarkan kata kunci, sinonim, dan ide yang diparafrasekan untuk menemukan kecocokan.</li>
                          <li>Jawaban tidak selalu muncul berurutan sesuai daftar pertanyaan.</li>
                          <li>Hati-hati, beberapa pilihan di salah satu daftar mungkin tidak digunakan, atau satu pilihan bisa digunakan lebih dari sekali (jika instruksi memperbolehkan).</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Plan/Map/Diagram Labelling (Memberi Label Peta/Denah/Diagram)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Anda diberikan sebuah peta (misal denah bangunan, area taman), denah (misal tata letak ruangan), atau diagram (misal proses kerja alat). Beberapa bagian sudah diberi label, dan Anda harus melengkapi label yang kosong berdasarkan deskripsi audio.</p>
                        <p><strong>Strategi:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Orientasikan diri Anda sebelum audio mulai. Perhatikan label yang sudah ada, kompas (utara, selatan, timur, barat), pintu masuk/keluar, jalan, atau fitur utama lainnya.</li>
                          <li>Ikuti arahan dalam audio dengan cermat. Perhatikan kata-kata penunjuk arah (turn left, go past, opposite, next to, behind, on the corner).</li>
                          <li>Visualisasikan pergerakan atau lokasi yang dideskripsikan.</li>
                          <li>Tulis jawaban (biasanya nama tempat/bagian) di tempat yang sesuai pada peta/diagram di lembar soal terlebih dahulu.</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Form/Note/Table/Flow-chart/Summary Completion</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Anda diberikan teks atau struktur visual dengan beberapa bagian kosong (gaps). Anda harus mengisi bagian kosong tersebut dengan informasi dari audio, sesuai dengan batas kata yang ditentukan.</p>
                        <p><strong>Strategi:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li><strong>Prediksi:</strong> Sebelum audio mulai, baca teks di sekitar bagian kosong. Coba prediksi jenis informasi apa yang dibutuhkan (nama, angka, tanggal, kata benda, kata kerja, dll.).</li>
                          <li><strong>Ikuti Alur:</strong> Jawaban biasanya muncul berurutan sesuai dengan urutan bagian kosong dalam teks/struktur.</li>
                          <li><strong>Kata Kunci:</strong> Perhatikan kata kunci di sekitar bagian kosong untuk membantu Anda menemukan jawaban dalam audio.</li>
                          <li><strong>Tata Bahasa & Makna:</strong> Pastikan kata yang Anda tulis cocok secara gramatikal dan masuk akal dalam konteks kalimat atau struktur.</li>
                          <li><strong>Batas Kata:</strong> Patuhi batas kata dengan ketat!</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Sentence Completion (Melengkapi Kalimat)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Mirip dengan Completion lainnya, tapi spesifik berupa kalimat-kalimat dengan bagian kosong di akhir atau tengah.</p>
                        <p><strong>Strategi:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Baca kalimat sebelum audio mulai. Prediksi jenis kata/informasi yang dibutuhkan untuk melengkapi kalimat secara gramatikal dan logis.</li>
                          <li>Dengarkan kata kunci dari bagian awal kalimat untuk menandai kapan informasi yang relevan akan disebutkan.</li>
                          <li>Jawaban harus diambil persis dari audio (meskipun mungkin perlu sedikit penyesuaian tata bahasa agar pas, tapi biasanya kata-katanya sama).</li>
                          <li>Pastikan kalimat yang sudah dilengkapi menjadi benar secara tata bahasa dan makna.</li>
                          <li>Patuhi batas kata.</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Short Answer Questions (Pertanyaan Jawaban Singkat)</h3>
                      <div className="ml-5 space-y-2">
                        <p><strong>Format:</strong> Anda diberikan pertanyaan langsung (biasanya dimulai dengan What, Where, When, Who, Why, How many, How much). Anda harus menjawabnya secara singkat menggunakan informasi dari audio.</p>
                        <p><strong>Strategi:</strong></p>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                          <li>Baca pertanyaan sebelum audio mulai. Identifikasi kata kunci dan jenis informasi yang dicari (tempat, waktu, alasan, jumlah, dll.).</li>
                          <li>Dengarkan kata kunci dari pertanyaan dalam audio.</li>
                          <li>Jawab pertanyaan secara langsung dan ringkas.</li>
                          <li>Patuhi batas kata yang ditentukan dalam instruksi.</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Tips Tambahan untuk Sukses:</h3>
                      <ul className="list-disc list-inside ml-5 space-y-2">
                        <li><strong>Latihan Rutin:</strong> Tidak ada jalan pintas. Latih pendengaran Anda setiap hari dengan berbagai materi audio berbahasa Inggris, terutama materi latihan IELTS resmi.</li>
                        <li><strong>Biasakan dengan Aksen:</strong> Dengarkan berita, podcast, film, atau acara TV dari negara-negara berbahasa Inggris yang berbeda (UK, Australia, USA, dll.).</li>
                        <li><strong>Tingkatkan Kosakata:</strong> Semakin banyak kosakata yang Anda kuasai, semakin mudah memahami sinonim dan parafrase yang sering digunakan dalam tes.</li>
                        <li><strong>Latih Konsentrasi:</strong> Tes ini butuh fokus selama 30 menit tanpa henti. Latih diri Anda untuk tetap berkonsentrasi, mungkin dengan mendengarkan rekaman panjang tanpa jeda.</li>
                        <li><strong>Simulasi Kondisi Tes:</strong> Saat berlatih, coba kerjakan satu tes Listening penuh (4 section + 10 menit transfer) dalam kondisi senyap seperti saat tes sebenarnya.</li>
                        <li><strong>Kenali Jebakan:</strong> Waspadai distractors, informasi yang disebutkan tapi kemudian dikoreksi, atau jawaban yang tampak benar tapi tidak sesuai konteks.</li>
                        <li><strong>Jangan Panik Jika Terlewat:</strong> Jika Anda melewatkan satu jawaban, lupakan saja dan segera fokus pada pertanyaan berikutnya. Jangan biarkan satu kesalahan merusak seluruh bagian tes.</li>
                      </ul>
                    </div>

                    <Separator />

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold">Kesimpulan</h3>
                      <div className="ml-5 mt-2">
                        <p>Menguasai format IELTS Listening adalah langkah pertama dan paling fundamental menuju skor impian Anda. Dengan memahami struktur 4 bagian, strategi transfer jawaban yang efektif, serta mengenali berbagai jenis pertanyaan dan instruksinya, Anda sudah memiliki bekal yang sangat kuat.</p>
                        <p className="mt-2">Ingat, kunci berikutnya adalah latihan, latihan, dan latihan! Terapkan semua yang telah kita bahas ini dalam sesi latihan Anda. Analisis kesalahan Anda, pelajari mengapa Anda salah, dan terus perbaiki strategi Anda.</p>
                        <p className="mt-2">Saya yakin, dengan kerja keras, pemahaman format yang solid, dan strategi yang tepat, Anda, para pejuang IELTS Indonesia, pasti bisa menaklukkan tes Listening ini dan meraih skor yang membanggakan!</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center py-4">
          <Link to="/test/listening">
            <Button size="lg">
              <Headphones className="mr-2 h-5 w-5" />
              Coba Tes Listening Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ListeningBeginnerGuide;
