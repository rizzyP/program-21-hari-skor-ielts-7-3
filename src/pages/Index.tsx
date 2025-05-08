
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { BookOpen, Headphones, FileText, Mic, BarChart } from 'lucide-react';
const Index = () => {
  return <Layout>
      <div className="space-y-10 py-6">
        {/* Hero section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            <span className="text-ielts-blue">Program 21 Hari</span> Skor IELTS 7.0
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Asesmen IELTS lengkap dengan umpan balik berbasis AI dan analisis untuk membantu Anda mencapai skor band target.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/test">
              <Button size="lg" className="bg-ielts-blue hover:bg-ielts-lightblue">Mulai Tes Asesmen</Button>
            </Link>
            <Link to="/curriculum">
              <Button variant="outline" size="lg">Mulai Program</Button>
            </Link>
          </div>
        </section>

        {/* Test modules section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Komponen Tes IELTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            title: "Listening",
            description: "Tes berbasis audio dengan berbagai jenis pertanyaan",
            icon: <Headphones className="h-8 w-8 text-ielts-blue" />,
            color: "bg-blue-50",
            time: "15 menit",
            questions: "2 bagian"
          }, {
            title: "Reading",
            description: "Tes pemahaman dengan teks akademis",
            icon: <BookOpen className="h-8 w-8 text-ielts-green" />,
            color: "bg-green-50",
            time: "15 menit",
            questions: "10 pertanyaan"
          }, {
            title: "Writing",
            description: "Penulisan esai dan interpretasi data",
            icon: <FileText className="h-8 w-8 text-ielts-lightblue" />,
            color: "bg-cyan-50",
            time: "20 menit",
            questions: "1 tugas"
          }, {
            title: "Speaking",
            description: "Respons terekam untuk pertanyaan wawancara",
            icon: <Mic className="h-8 w-8 text-ielts-red" />,
            color: "bg-red-50",
            time: "11-14 menit",
            questions: "3 bagian"
          }].map((module, idx) => <Card key={idx} className={`${module.color} border-none shadow-sm hover:shadow transition-shadow`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                  {module.icon}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-700 mb-4">{module.description}</CardDescription>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">⏱️ {module.time}</span>
                    <span className="text-slate-600">📝 {module.questions}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/test/${module.title.toLowerCase()}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Latihan {module.title}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>)}
          </div>
        </section>

        {/* Features section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
            title: "Penilaian AI",
            description: "Dapatkan umpan balik dan skor terperinci yang dianalisis oleh AI berdasarkan kriteria resmi IELTS",
            icon: <BarChart className="h-6 w-6 text-ielts-blue" />
          }, {
            title: "Simulasi Tes Lengkap",
            description: "Rasakan semua empat komponen tes IELTS dengan pertanyaan dan waktu autentik",
            icon: <BookOpen className="h-6 w-6 text-ielts-blue" />
          }, {
            title: "Analisis Terperinci",
            description: "Tinjau kekuatan, kelemahan, dan dapatkan rekomendasi personal untuk peningkatan",
            icon: <BarChart className="h-6 w-6 text-ielts-blue" />
          }].map((feature, idx) => <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>)}
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-gradient-to-r from-ielts-blue to-ielts-lightblue text-white rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Siap untuk menilai kemampuan IELTS Anda?</h2>
          <p className="mb-6">Ikuti tes IELTS lengkap dan dapatkan umpan balik AI terperinci untuk meningkatkan skor band Anda.</p>
          <Link to="/test">
            <Button size="lg" variant="secondary">
              Mulai Tes Lengkap Sekarang
            </Button>
          </Link>
        </section>
      </div>
    </Layout>;
};
export default Index;
