
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-ielts-blue">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800">Halaman Tidak Ditemukan</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Halaman yang Anda cari mungkin telah dihapus, namanya berubah, 
              atau untuk sementara tidak tersedia.
            </p>
          </div>
          <div className="space-y-3">
            <Button asChild className="bg-ielts-blue hover:bg-ielts-lightblue">
              <Link to="/">Kembali ke Beranda</Link>
            </Button>
            <div className="pt-2">
              <Link to="/test" className="text-ielts-blue hover:underline">
                Pergi ke Pemilihan Tes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
