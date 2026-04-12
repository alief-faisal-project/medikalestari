"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminSidebar";
import {
  fetchHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  uploadContentImage,
} from "@/lib/api";
import { HeroBanner } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import Image from "next/image";

const AdminHeroBannersPage = () => {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    image_url: "",
    order: 0,
    is_active: true,
  });
  const router = useRouter();
  const { loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      if (!mounted) return;
      if (authLoading) return;
      if (!isAuthenticated) {
        router.push("/admin/login");
        return;
      }
      fetchBanners();
    };
    init();
    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, router]);

  const fetchBanners = async () => {
    try {
      const data = await fetchHeroBanners();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching hero banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadContentImage(imageFile, "hero-banners");
      }

      if (!imageUrl) {
        alert("Gambar harus dipilih");
        return;
      }

      const bannerData = {
        image_url: imageUrl,
        order: formData.order,
        is_active: formData.is_active,
      };

      if (editingId) {
        await updateHeroBanner(editingId, bannerData);
      } else {
        await createHeroBanner(bannerData);
      }

      resetForm();
      fetchBanners();
      setShowModal(false);
      alert("Banner berhasil disimpan!");
    } catch (error) {
      console.error("Error saving banner:", error);
      const message =
        (error && (error as Error).message) ||
        String(error) ||
        "Terjadi kesalahan saat menyimpan data";
      alert(`Error: ${message}`);
    }
  };

  const handleEdit = (banner: HeroBanner) => {
    setEditingId(banner.id);
    setFormData({
      image_url: banner.image_url,
      order: banner.order,
      is_active: banner.is_active,
    });
    setImagePreview(banner.image_url);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus banner ini?")) {
      try {
        await deleteHeroBanner(id);
        fetchBanners();
      } catch (error) {
        console.error("Error deleting banner:", error);
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: "",
      order: 0,
      is_active: true,
    });
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Kelola Hero Banner
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Tambah Banner
          </button>
        </div>

        {/* Banners List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Gambar
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Urutan
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {banner.image_url && (
                        <div className="w-20 h-12 relative rounded-lg overflow-hidden">
                          <Image
                            src={banner.image_url}
                            alt="Banner"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {banner.order}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          banner.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {banner.is_active ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Banner" : "Tambah Banner Baru"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label
                  htmlFor="banner-image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gambar Banner
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {imagePreview ? (
                    <div className="relative w-full h-40 mx-auto">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload
                        className="mx-auto text-gray-400 mb-2"
                        size={32}
                      />
                      <p className="text-gray-600 text-sm">
                        Klik untuk upload gambar banner
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="banner-image"
                  />
                  <label htmlFor="banner-image" className="cursor-pointer">
                    <div className="mt-2 text-center text-sm text-blue-600 hover:text-blue-700">
                      Pilih Gambar
                    </div>
                  </label>
                </div>
              </div>

              {/* Order */}
              <div>
                <label
                  htmlFor="order"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Urutan Tampilan
                </label>
                <input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  id="is_active"
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="is_active"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Aktif (akan ditampilkan di halaman utama)
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-6"
              >
                {editingId ? "Perbarui Banner" : "Tambah Banner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeroBannersPage;
