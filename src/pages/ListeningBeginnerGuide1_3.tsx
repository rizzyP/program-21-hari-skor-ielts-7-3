
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ListeningBeginnerGuide1_3 = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chapter 1.3: Aksen dan Pengucapan</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/listening-beginner-guide-1-2">
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
            Salah satu aspek yang sering membuat nervous para peserta tes IELTS adalah kenyataan bahwa rekaman audio menggunakan berbagai aksen penutur asli bahasa Inggris. Anda mungkin akan mendengar aksen British, American, Australian, New Zealander, atau bahkan Canadian. Tujuan IELTS bukanlah menguji apakah Anda bisa meniru aksen-aksen ini, melainkan apakah Anda bisa memahaminya dalam konteks percakapan atau monolog.
          </p>
          <p className="mb-4">
            Jangan biarkan keragaman aksen ini mengintimidasi Anda! Dengan pemahaman dasar tentang perbedaan utama dan latihan yang cukup, telinga Anda akan terlatih untuk menangkap pesan yang disampaikan, terlepas dari aksen pembicaranya.
          </p>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Mengenal Perbedaan Aksen Utama: British, American, Australian</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Meskipun ada banyak variasi regional di setiap negara, kita bisa mengidentifikasi beberapa ciri khas umum dari tiga aksen yang paling sering muncul dalam tes IELTS: British English (seringkali Received Pronunciation/RP atau variasinya), General American (GA), dan General Australian.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">A. Rhoticity (Pengucapan Huruf 'R')</h3>
          <p className="mb-2">Ini adalah salah satu pembeda paling jelas.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>American English (Rhotic):</strong> Huruf 'r' hampir selalu diucapkan, di mana pun posisinya dalam kata. Contoh: car /kɑːr/, park /pɑːrk/, hard /hɑːrd/, teacher /ˈtiːtʃər/. Bunyi /r/ terdengar jelas.</li>
            <li><strong>British English (Non-rhotic):</strong> Huruf 'r' hanya diucapkan jika diikuti oleh bunyi vokal (baik di kata yang sama atau kata berikutnya). Jika 'r' berada di akhir kata atau diikuti konsonan, bunyinya cenderung hilang atau menjadi vokal panjang. Contoh: car /kɑː/, park /pɑːk/, hard /hɑːd/. Namun, dalam frasa seperti "car is" (/kɑːr ɪz/), 'r' diucapkan karena diikuti vokal 'i'.</li>
            <li><strong>Australian English (Non-rhotic):</strong> Mirip dengan British, 'r' di akhir kata atau sebelum konsonan biasanya tidak diucapkan. Contoh: car /kɑː/, park /pɑːk/, hard /hɑːd/.</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Kata yang sama bisa terdengar sedikit berbeda. Anda perlu terbiasa mendengar kedua versi (dengan dan tanpa bunyi /r/ yang jelas).</p>

          <h3 className="text-xl font-medium mb-2 mt-6">B. Bunyi Vokal (Vowel Sounds)</h3>
          <p className="mb-2">Perbedaan vokal bisa lebih halus namun signifikan. Berikut beberapa contoh mencolok:</p>
          
          <h4 className="text-lg font-medium mb-2 mt-4">Bunyi /æ/ vs /ɑː/ (Short 'a' vs Long 'a'):</h4>
          <p className="mb-2">Pada kata-kata seperti bath, path, dance, ask, castle, sample.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>American:</strong> Cenderung menggunakan bunyi /æ/ (seperti pada cat). Terdengar lebih pendek dan 'terang'.</li>
            <li><strong>British (RP):</strong> Menggunakan bunyi /ɑː/ (seperti pada father). Terdengar lebih panjang dan 'dalam'.</li>
            <li><strong>Australian:</strong> Seringkali mirip dengan British (/ɑː/), kadang sedikit berbeda.</li>
            <li><strong>Contoh:</strong> dance (AmE /dæns/ vs BrE /dɑːns/).</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">Bunyi /ɒ/ vs /ɑː/ (Short 'o'):</h4>
          <p className="mb-2">Pada kata-kata seperti hot, stop, job, bottle, sorry, lock.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>British (RP):</strong> Menggunakan bunyi /ɒ/, vokal bulat yang cukup pendek (agak mirip 'o' dalam kata 'tolong' tapi lebih ke belakang).</li>
            <li><strong>American:</strong> Cenderung menggunakan bunyi /ɑː/ yang lebih terbuka dan tidak bulat (lebih mirip 'a' dalam father).</li>
            <li><strong>Australian:</strong> Bervariasi, kadang mendekati British, kadang American.</li>
            <li><strong>Contoh:</strong> hot (BrE /hɒt/ vs AmE /hɑːt/).</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">Diftong (Diphthongs - Vokal Rangkap):</h4>
          <p className="mb-2">Perbedaan bisa terjadi pada cara vokal meluncur dari satu bunyi ke bunyi lain.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>'O'</strong> dalam go, no, phone: Luncuran vokalnya bisa sedikit berbeda.</li>
            <li><strong>'I'</strong> dalam like, time, my: Titik awal atau akhir luncuran bisa bervariasi.</li>
            <li><strong>'A'</strong> dalam face, day, train: Aksen Australian kadang memiliki bunyi yang khas di sini, terdengar sedikit seperti /aɪ/ (mirip 'i' dalam like).</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Kata yang sama bisa memiliki 'warna' vokal yang berbeda. Fokus pada kata kunci dan konteks untuk memahami maknanya.</p>

          <h3 className="text-xl font-medium mb-2 mt-6">C. Pengucapan Konsonan 'T'</h3>
          <p className="mb-2">Bunyi 't' sangat fleksibel dalam bahasa Inggris dan menjadi pembeda aksen yang menarik.</p>
          
          <h4 className="text-lg font-medium mb-2 mt-4">American English:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Flap T/Tapped T:</strong> Ketika 't' (atau 'tt') berada di antara dua bunyi vokal (atau setelah 'r' dan sebelum vokal), seringkali diucapkan seperti bunyi /d/ yang sangat cepat. Contoh: water terdengar seperti "wadder", city -{">"} "ciddy", better -{">"} "bedder", party -{">"} "pardy".</li>
            <li><strong>Glottal Stop:</strong> Kadang 't' sebelum bunyi 'n' di akhir kata atau suku kata tidak tertekan menjadi glottal stop (udara berhenti di tenggorokan). Contoh: button terdengar seperti "buh-uhn", mountain -{">"} "moun-uhn", important -{">"} "impor-unt".</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">British English (RP/Standard):</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Cenderung mengucapkan 't' dengan jelas /t/ di sebagian besar posisi.</li>
            <li><strong>Glottal Stop:</strong> Bisa muncul di akhir kata (e.g., what? -{">"} /wɒʔ/) atau kadang di tengah kata dalam beberapa aksen regional (misal Cockney: butter -{">"} "buh-uh"). Dalam IELTS, Anda lebih mungkin mendengar RP atau aksen regional yang lebih 'standar' di mana 't' lebih jelas.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">Australian English:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>Sering menggunakan Flap T mirip American English (e.g., water -{">"} "wadder", better -{">"} "bedder").</li>
            <li>Glottal stop juga bisa muncul, terutama di akhir kata.</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Kata seperti later bisa terdengar "lay-ter" (BrE) atau "lay-der" (AmE/AusE). Biasakan telinga Anda dengan variasi ini.</p>

          <h3 className="text-xl font-medium mb-2 mt-6">D. Intonasi dan Ritme (Intonation and Rhythm)</h3>
          <h4 className="text-lg font-medium mb-2 mt-4">Intonasi:</h4>
          <p className="mb-2">Pola naik turunnya nada suara dalam kalimat.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>British (RP):</strong> Sering dianggap memiliki rentang nada yang lebih lebar, terdengar lebih 'bermelodi'.</li>
            <li><strong>American:</strong> Kadang dianggap lebih datar, meskipun ini generalisasi berlebihan.</li>
            <li><strong>Australian:</strong> Terkenal dengan High Rising Terminal (HRT), yaitu nada yang cenderung naik di akhir kalimat deklaratif (pernyataan), membuatnya terdengar seperti pertanyaan bagi pendengar yang tidak terbiasa.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2 mt-4">Ritme:</h4>
          <p className="mb-4">Bahasa Inggris adalah stress-timed language, artinya ritme ditentukan oleh penekanan pada suku kata tertentu, bukan jumlah suku kata (berbeda dengan Bahasa Indonesia yang syllable-timed). Perbedaan ritme antar aksen lebih halus, tapi intonasi lebih mudah dikenali.</p>
          
          <p className="mb-4"><strong>Implikasi:</strong> Perbedaan intonasi dapat mempengaruhi bagaimana Anda menangkap sikap pembicara (misalnya, apakah mereka bertanya atau menyatakan?). HRT Australia awalnya bisa membingungkan.</p>

          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="font-medium text-blue-800">Penting Diingat:</p>
            <ul className="list-disc pl-6 text-blue-700">
              <li>Ini adalah generalisasi. Ada banyak variasi dalam setiap negara (London vs Liverpool, New York vs Texas, Sydney vs Melbourne).</li>
              <li>IELTS biasanya menggunakan aksen yang relatif jelas dan standar, bukan aksen regional yang sangat kental dan sulit dipahami.</li>
              <li>Tujuannya adalah pemahaman, bukan analisis linguistik mendalam.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Kata-kata yang Sering Terdengar Berbeda dari Ejaannya</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Bahasa Inggris terkenal karena ejaannya yang tidak selalu konsisten dengan pengucapannya. Ini adalah tantangan bagi pembelajar dari bahasa dengan sistem ejaan yang lebih fonetis seperti Bahasa Indonesia. Memahami beberapa pola umum dapat sangat membantu.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">A. Huruf Senyap (Silent Letters)</h3>
          <p className="mb-2">Banyak kata dalam bahasa Inggris memiliki huruf yang ditulis tapi tidak diucapkan.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Silent 'k' before 'n':</strong> know, knee, knife, knock, knowledge. (Bunyi /k/ hilang).</li>
            <li><strong>Silent 'w' before 'r':</strong> write, wrong, wrap, wrist. (Bunyi /w/ hilang).</li>
            <li><strong>Silent 'b' after 'm' / before 't':</strong> climb, comb, thumb, bomb, doubt, debt, subtle. (Bunyi /b/ hilang).</li>
            <li><strong>Silent 'h':</strong> what, when, where, why (bunyi /h/ sering hilang atau lemah setelah 'w' di banyak aksen), hour, honour, honest, heir (bunyi /h/ di awal hilang), vehicle, shepherd.</li>
            <li><strong>Silent 'l':</strong> calm, half, talk, walk, could, should, would, salmon, folk. (Bunyi /l/ sering hilang sebelum konsonan tertentu atau di akhir kata).</li>
            <li><strong>Silent 'p' before 's', 't', 'n':</strong> psychology, pneumonia, pseudo, receipt. (Bunyi /p/ hilang di awal).</li>
            <li><strong>Silent 's':</strong> island, aisle, debris.</li>
            <li><strong>Silent 't':</strong> castle, listen, often (pengucapan 'often' bervariasi, ada yang mengucapkan /t/, ada yang tidak – keduanya diterima), whistle, mortgage.</li>
            <li><strong>Silent 'gh':</strong> Seringkali senyap atau menjadi bunyi /f/. though, through, daughter, high, light, right (silent), tough, rough, laugh (bunyi /f/).</li>
            <li><strong>Silent 'n' after 'm':</strong> autumn, column, hymn.</li>
            <li><strong>Silent 'c' after 's':</strong> muscle, scissors.</li>
            <li><strong>Wednesday:</strong> Kata klasik! Diucapkan "Wens-day" /ˈwɛnzdeɪ/. 'd' dan 'e' kedua senyap.</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Jangan mengandalkan ejaan untuk menebak pengucapan. Dengarkan baik-baik.</p>

          <h3 className="text-xl font-medium mb-2 mt-6">B. Kombinasi Vokal yang Rumit</h3>
          <p className="mb-2">Ejaan vokal tidak selalu menunjukkan bunyinya secara konsisten.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>'ea':</strong> Bisa /iː/ (read - present, sea, meat), /ɛ/ (read - past, bread, head), /eɪ/ (great, break).</li>
            <li><strong>'ou'/'ough':</strong> Sangat bervariasi! though /ðəʊ/, through /θruː/, tough /tʌf/, thought /θɔːt/, cough /kɒf/, plough /plaʊ/, thorough /ˈθʌrə/.</li>
            <li><strong>'oo':</strong> Bisa panjang /uː/ (food, pool, moon) atau pendek /ʊ/ (book, look, good).</li>
            <li><strong>'ei'/'ie':</strong> receive /iː/, friend /ɛ/, height /aɪ/, weird /ɪəd/.</li>
            <li><strong>'ui':</strong> fruit /uː/, build /ɪ/, guide /aɪ/.</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Perhatikan kata secara keseluruhan dan konteksnya. Latih kata-kata umum dengan kombinasi vokal yang tidak biasa.</p>

          <h3 className="text-xl font-medium mb-2 mt-6">C. Bunyi Schwa /ə/: Vokal 'Malas' yang Ada Di Mana-Mana</h3>
          <p className="mb-2">Schwa adalah bunyi vokal yang paling umum dalam bahasa Inggris. Ini adalah bunyi vokal pendek, lemah, netral, seperti "e" dalam "keras" atau "a" di akhir kata "meja". Bunyinya /ə/.</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Schwa muncul di suku kata yang tidak mendapat penekanan (unstressed syllables). Hampir semua huruf vokal (a, e, i, o, u) bisa dibaca sebagai schwa jika tidak ditekan.</li>
            <li><strong>Contoh:</strong> about /əˈbaʊt/, sofa /ˈsəʊfə/, problem /ˈprɒbləm/, support /səˈpɔːt/, banana /bəˈnɑːnə/, information /ˌɪnfəˈmeɪʃən/ (perhatikan 'a' pertama dan 'o' menjadi /ə/).</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Ini membuat banyak kata terdengar 'gepeng' atau berbeda dari bayangan kita berdasarkan ejaan. Mengenali schwa membantu memahami ucapan alami.</p>

          <h3 className="text-xl font-medium mb-2 mt-6">D. Pola Penekanan Kata (Word Stress)</h3>
          <p className="mb-2">Penekanan pada suku kata yang salah dapat mengubah arti kata atau membuatnya sulit dipahami.</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Contoh (Noun vs Verb):</strong> PREsent (hadiah) vs preSENT (menyajikan), REcord (rekaman) vs reCORD (merekam), OBject (benda) vs obJECT (menolak).</li>
            <li>Penekanan juga mempengaruhi kejelasan vokal. Suku kata yang ditekan biasanya memiliki bunyi vokal penuh, sedangkan yang tidak ditekan seringkali menjadi schwa /ə/.</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Dengarkan ritme dan penekanan saat berlatih. Penekanan adalah kunci pengucapan dan pemahaman.</p>

          <h3 className="text-xl font-medium mb-2 mt-6">E. Fenomena Ujaran Bersambung (Connected Speech)</h3>
          <p className="mb-2">Dalam percakapan alami, kata-kata tidak diucapkan satu per satu dengan jeda. Mereka mengalir bersama, dan bunyinya sering berubah:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Linking:</strong> Bunyi konsonan di akhir kata sering terhubung dengan bunyi vokal di awal kata berikutnya. Contoh: an apple -{">"} /ən_ˈæpəl/ (n terhubung ke a), look out -{">"} /lʊk_aʊt/.</li>
            <li><strong>Assimilation:</strong> Bunyi konsonan berubah karena pengaruh bunyi di sebelahnya. Contoh: handbag sering terdengar seperti "hambag" (/n/ menjadi /m/ sebelum /b/), good boy -{">"} "goob boy" (/d/ menjadi /b/ sebelum /b/).</li>
            <li><strong>Elision:</strong> Penghilangan bunyi (seringkali konsonan /t/ atau /d/) di antara konsonan lain atau dalam suku kata tak bertekanan. Contoh: next door -{">"} "neks door" (/t/ hilang), mostly -{">"} "mosly" (/t/ hilang), camera -{">"} "camra" (/ə/ hilang).</li>
            <li><strong>Intrusion:</strong> Munculnya bunyi ekstra (/r/, /w/, /j/) untuk memperlancar transisi antar vokal. Contoh: law and order -{">"} "law-r-and order", go away -{">"} "go-w-away", I agree -{">"} "I-y-agree".</li>
            <li><strong>Bentuk Lemah (Weak Forms):</strong> Kata-kata fungsional (preposisi, artikel, konjungsi, kata kerja bantu) sering diucapkan dengan sangat cepat dan vokalnya menjadi schwa /ə/. Contoh: 'for' bisa /fɔːr/ (kuat) atau /fər/ (lemah), 'can' bisa /kæn/ (kuat) atau /kən/ (lemah), 'a' hampir selalu /ə/, 'the' bisa /ðə/ atau /ðiː/.</li>
          </ul>
          <p className="mb-4"><strong>Implikasi:</strong> Ini membuat bahasa Inggris lisan terdengar sangat berbeda dari tulisan. Anda harus terbiasa dengan connected speech untuk memahami kecepatan alami. Jangan berharap mendengar setiap kata diucapkan dengan sempurna dan terpisah.</p>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Latihan Mendengarkan Berbagai Aksen</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Bagaimana cara melatih telinga Anda agar terbiasa dan mahir memahami berbagai aksen dan fenomena pengucapan ini? Kuncinya adalah paparan (exposure) dan latihan aktif.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-6">Sumber Latihan:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Materi IELTS Resmi:</strong> Ini adalah prioritas utama! Buku Cambridge IELTS Practice Tests (seri 1 hingga terbaru) dan materi resmi dari British Council atau IDP menggunakan rekaman dengan campuran aksen yang akan Anda temui di tes sebenarnya. Kerjakan tes-tes ini secara rutin.</li>
            
            <li><strong>Berita Internasional:</strong>
              <ul className="list-circle pl-6 mt-1">
                <li>BBC News (UK - berbagai aksen Inggris)</li>
                <li>NPR, CNN, VOA (US - berbagai aksen Amerika)</li>
                <li>ABC News (Australia - berbagai aksen Australia)</li>
                <li>CBC News (Kanada)</li>
              </ul>
              <p className="mt-1 mb-2">Dengarkan siaran radio atau tonton klip video berita pendek. Fokus pada penyiar dan reporter yang berbeda.</p>
            </li>
            
            <li><strong>Podcast:</strong> Pilihlah podcast berdasarkan topik yang Anda minati dan pembawa acara dengan aksen yang ingin Anda latih. Ada podcast untuk belajar bahasa Inggris, berita, cerita, hobi, dll. Keuntungannya, Anda bisa mendengarkan sambil melakukan aktivitas lain.</li>
            
            <li><strong>Film dan Serial TV:</strong> Tonton konten dari UK, USA, dan Australia.
              <p className="mt-1 mb-2">Strategi: Coba tonton tanpa subtitle (Indonesia atau Inggris) terlebih dahulu untuk melatih pemahaman murni. Jika kesulitan, nyalakan subtitle bahasa Inggris untuk mencocokkan apa yang Anda dengar dengan teks. Hindari subtitle Indonesia karena akan membuat Anda fokus membaca, bukan mendengarkan.</p>
            </li>
            
            <li><strong>YouTube:</strong> Sangat banyak sumber!
              <ul className="list-circle pl-6 mt-1">
                <li>Kanal berita resmi (lihat poin berita).</li>
                <li>TED Talks dan TEDx Talks: Pembicara dari seluruh dunia dengan beragam aksen, topiknya pun menarik dan seringkali akademis (mirip Section 4).</li>
                <li>Kanal edukasi bahasa Inggris yang membahas aksen (cari: "accent comparison", "British vs American English pronunciation").</li>
                <li>Vlogger dari negara-negara target.</li>
              </ul>
            </li>
            
            <li><strong>Website Khusus Latihan Listening:</strong> Beberapa website (gratis atau berbayar) menyediakan latihan listening dengan berbagai aksen dan tingkat kesulitan.</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-6">Teknik Latihan Aktif:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Jangan Pasif:</strong> Mendengarkan sambil lalu tidak cukup efektif. Sediakan waktu khusus untuk fokus.</li>
            <li><strong>Identifikasi Aksen:</strong> Saat mendengarkan, coba tebak aksen pembicara. Perhatikan fitur-fitur yang telah kita bahas (bunyi /r/, vokal, bunyi /t/).</li>
            <li><strong>Fokus pada Fitur Spesifik:</strong> Dalam satu sesi latihan, fokuslah pada satu hal. Misal: "Hari ini saya akan fokus mendengarkan bunyi Flap T dalam aksen Amerika" atau "Saya akan perhatikan bagaimana orang Australia mengucapkan vokal dalam kata seperti 'day' atau 'face'".</li>
            <li><strong>Transkripsi Singkat (Short Transcription):</strong> Putar segmen audio pendek (15-30 detik), tulis persis apa yang Anda dengar. Putar ulang beberapa kali jika perlu. Bandingkan tulisan Anda dengan transkrip asli (jika ada) atau putar ulang dengan kecepatan lebih lambat untuk memeriksa. Ini melatih telinga menangkap detail.</li>
            <li><strong>Shadowing:</strong> Putar audio kalimat per kalimat atau frasa per frasa. Jeda, lalu segera ulangi apa yang baru Anda dengar, usahakan meniru pengucapan, ritme, dan intonasi semirip mungkin. Ini sangat bagus untuk melatih otot bicara dan mempertajam pendengaran.</li>
            <li><strong>Prediksi Pengucapan:</strong> Sebelum mendengarkan, baca transkrip (jika ada). Tandai kata-kata yang menurut Anda akan sulit atau punya pengucapan tak terduga. Lalu dengarkan dan cek apakah prediksi Anda benar.</li>
            <li><strong>Gunakan Kamus Online:</strong> Jika menemukan kata sulit, cek pengucapannya di kamus online (Oxford, Cambridge, Merriam-Webster) yang menyediakan rekaman audio (seringkali dalam aksen British dan American) dan transkripsi fonetik (IPA).</li>
            <li><strong>Konsisten:</strong> Lebih baik berlatih 15-30 menit setiap hari daripada 3 jam sekali seminggu. Konsistensi membangun kebiasaan dan membuat telinga lebih cepat beradaptasi.</li>
          </ul>
          
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <p className="font-medium text-green-800">Kesimpulan:</p>
            <p className="text-green-700">
              Memahami aksen dan pengucapan bahasa Inggris membutuhkan latihan yang konsisten. Dengan memahami perbedaan utama antara aksen British, American, dan Australian, serta mengenali fenomena pengucapan yang umum, Anda akan semakin percaya diri menghadapi bagian Listening dalam tes IELTS. Ingat, tujuan utamanya adalah komunikasi dan pemahaman, bukan sempurna mirip penutur asli.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link to="/listening-beginner-guide-1-2">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous: Mendengarkan Detail Faktual
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

export default ListeningBeginnerGuide1_3;
