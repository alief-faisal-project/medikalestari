"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminSidebar";
import {
  fetchMadingContent,
  createMadingContent,
  updateMadingContent,
  deleteMadingContent,
  uploadContentImage,
} from "@/lib/api";
import { MadingContent } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import Image from "next/image";

const AdminMadingPage = () => {
  const [content, setContent] = useState<MadingContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [contentType, setContentType] = useState<"edukasi" | "event">(
    "edukasi",
  );
  const [formData, setFormData] = useState({
    type: "edukasi" as "edukasi" | "event",
    title: "",
    description: "",
    image_url: "",
    date: "",
    start_date: "",
    end_date: "",
    order: 0,
    link: "",
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
      fetchContent();
    };
    init();
    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, router]);

  const fetchContent = async () => {
    try {
      const data = await fetchMadingContent();
      setContent(data);
    } catch (error) {
      console.error("Error fetching mading content:", error);
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
      // Validate required fields
      if (!formData.title) {
        alert("Judul harus diisi");
        return;
      }

      if (!formData.image_url && !imageFile) {
        alert("Gambar harus dipilih");
        return;
      }

      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadContentImage(imageFile, "mading");
      }

      const contentData = {
        type: contentType,
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
        date:
          contentType === "edukasi" ? formData.date || undefined : undefined,
        start_date:
          contentType === "event"
            ? formData.start_date || undefined
            : undefined,
        end_date:
          contentType === "event" ? formData.end_date || undefined : undefined,
        order: formData.order,
        link: formData.link || undefined,
      };

      if (editingId) {
        await updateMadingContent(editingId, contentData);
      } else {
        await createMadingContent(contentData);
      }

      resetForm();
      fetchContent();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving content:", error);
      const message =
        (error && (error as Error).message) ||
        String(error) ||
        "Terjadi kesalahan saat menyimpan data";
      alert(message);
    }
  };

  const handleEdit = (item: MadingContent) => {
    setEditingId(item.id);
    setContentType(item.type);
    setFormData({
      type: item.type,
      title: item.title,
      description: item.description || "",
      image_url: item.image_url,
      date: item.date || "",
      start_date: item.start_date || "",
      end_date: item.end_date || "",
      order: item.order,
      link: item.link || "",
    });
    setImagePreview(item.image_url);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus konten ini?")) {
      try {
        await deleteMadingContent(id);
        fetchContent();
      } catch (error) {
        console.error("Error deleting content:", error);
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      type: "edukasi",
      title: "",
      description: "",
      image_url: "",
      date: "",
      start_date: "",
      end_date: "",
      order: 0,
      link: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
    setContentType("edukasi");
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

  const edukasiContent = content.filter((c) => c.type === "edukasi");
  const eventContent = content.filter((c) => c.type === "event");

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Kelola Mading</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            Tambah Konten
          </button>
        </div>

        {/* Edukasi Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Konten Instagram</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Foto
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Judul
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Order
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {edukasiContent.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {item.image_url && (
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.order}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {edukasiContent.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada konten edukasi
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Foto
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Judul
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Order
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventContent.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {item.image_url && (
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {item.start_date && (
                          <div>
                            {item.start_date}
                            {item.end_date && item.end_date !== item.start_date
                              ? ` s/d ${item.end_date}`
                              : ""}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.order}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {eventContent.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada konten event
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Konten" : "Tambah Konten Baru"}
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
              {/* Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jenis Konten
                </label>
                <select
                  id="type"
                  value={contentType}
                  onChange={(e) => {
                    setContentType(e.target.value as "edukasi" | "event");
                    setFormData({
                      ...formData,
                      type: e.target.value as "edukasi" | "event",
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="edukasi">Edukasi</option>
                  <option value="event">Event</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="content-image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gambar
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 mx-auto">
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
                        Klik untuk upload gambar
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="content-image"
                  />
                  <label htmlFor="content-image" className="cursor-pointer">
                    <div className="mt-2 text-center text-sm text-blue-600 hover:text-blue-700">
                      Pilih Gambar
                    </div>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Judul
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Judul konten"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Deskripsi konten"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Date (hanya untuk Edukasi) */}
              {contentType === "edukasi" && (
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tanggal
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={
                      formData.date ? formData.date.split(",")[0].trim() : ""
                    }
                    onChange={(e) => {
                      if (e.target.value) {
                        const [year, month, day] = e.target.value.split("-");
                        const monthNames = [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ];
                        const monthName =
                          monthNames[Number.parseInt(month) - 1];
                        const formattedDate = `${monthName} ${Number.parseInt(day)}, ${year}`;
                        setFormData({ ...formData, date: formattedDate });
                      } else {
                        setFormData({ ...formData, date: "" });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <small className="text-gray-500 block mt-1">
                    Format yang disimpan: {formData.date || "Belum ada tanggal"}
                  </small>
                </div>
              )}

              {/* Date Range untuk Event */}
              {contentType === "event" && (
                <>
                  <div>
                    <label
                      htmlFor="start-date"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tanggal Mulai Event
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="end-date"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tanggal Berakhir Event (Opsional)
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </>
              )}

              {/* Order */}
              <div>
                <label
                  htmlFor="order"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Urutan
                </label>
                <input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Link */}
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Link (Opsional)
                </label>
                <input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <small className="text-gray-500 block mt-1">
                  Masukkan URL lengkap (contoh: https://example.com)
                </small>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-6"
              >
                {editingId ? "Perbarui Konten" : "Tambah Konten"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMadingPage;
