"use client";

import React, { useState, useEffect } from "react";
import { AdminPageSkeleton } from "@/components/AdminSkeleton";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Download,
  Eye,
  Trash2,
} from "lucide-react";
import { CareersBannerConfig, CareerRegistration } from "@/lib/types";

const AdminCareersPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"config" | "registrations">(
    "config",
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // Config state
  const [config, setConfig] = useState<CareersBannerConfig | null>(null);
  const [configForm, setConfigForm] = useState({
    criteria: [] as string[],
    is_form_active: true,
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [newCriteria, setNewCriteria] = useState("");

  // Registrations state
  const [registrations, setRegistrations] = useState<CareerRegistration[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<CareerRegistration | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const loadData = async () => {
    try {
      const [configRes, regsRes] = await Promise.all([
        fetch("/api/careers/config"),
        fetch("/api/careers/registrations"),
      ]);

      if (configRes.ok) {
        const configData = await configRes.json();
        setConfig(configData);
        setConfigForm({
          criteria:
            typeof configData.criteria === "string"
              ? JSON.parse(configData.criteria)
              : configData.criteria || [],
          is_form_active: configData.is_form_active ?? true,
        });
        if (configData.banner_image_url) {
          setBannerPreview(configData.banner_image_url);
        }
      }

      if (regsRes.ok) {
        const regsData = await regsRes.json();
        setRegistrations(regsData);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setMessage({
        type: "error",
        text: "Gagal memuat data",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    loadData();
  }, [authLoading, isAuthenticated, router]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage({ type: "error", text: "File harus berupa gambar" });
        return;
      }
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleAddCriteria = () => {
    if (newCriteria.trim()) {
      setConfigForm((prev) => ({
        ...prev,
        criteria: [...prev.criteria, newCriteria.trim()],
      }));
      setNewCriteria("");
    }
  };

  const handleRemoveCriteria = (index: number) => {
    setConfigForm((prev) => ({
      ...prev,
      criteria: prev.criteria.filter((_, i) => i !== index),
    }));
  };

  const handleSaveConfig = async () => {
    setSubmitting(true);
    setMessage(null);

    try {
      let bannerUrl = config?.banner_image_url || "";

      // Upload banner if new file selected
      if (bannerFile) {
        const formData = new FormData();
        formData.append("file", bannerFile);
        formData.append("path", `careers/${Date.now()}-${bannerFile.name}`);

        try {
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            const errorData = await uploadRes.json();
            throw new Error(errorData.error || "Gagal upload gambar");
          }

          const uploadData = await uploadRes.json();
          if (!uploadData.url) {
            throw new Error("URL gambar tidak diterima dari server");
          }
          bannerUrl = uploadData.url;
        } catch (uploadErr) {
          const uploadErrorMsg =
            uploadErr instanceof Error
              ? uploadErr.message
              : "Gagal upload gambar";
          throw new Error(`Upload gambar gagal: ${uploadErrorMsg}`);
        }
      }

      const updateData = {
        id: config?.id || "default-config",
        banner_image_url: bannerUrl,
        criteria: JSON.stringify(configForm.criteria),
        is_form_active: configForm.is_form_active,
      };

      console.log("Sending config update:", updateData);

      const res = await fetch("/api/careers/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const responseData = await res.json();

      if (res.ok) {
        setConfig(responseData);
        setBannerFile(null);
        setBannerPreview(responseData.banner_image_url || "");
        // Reset file input
        const bannerInput = document.getElementById(
          "banner-input",
        ) as HTMLInputElement;
        if (bannerInput) {
          bannerInput.value = "";
        }
        setMessage({
          type: "success",
          text: "Konfigurasi berhasil disimpan",
        });
      } else {
        const errorText =
          responseData.details || responseData.error || "Gagal menyimpan";
        throw new Error(errorText);
      }
    } catch (err) {
      console.error("Error saving config:", err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Terjadi kesalahan",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const downloadResume = (registration: CareerRegistration) => {
    if (registration.resume_url) {
      window.open(registration.resume_url, "_blank");
    }
  };

  const deleteRegistration = async (registrationId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pendaftar ini?")) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/registrations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: registrationId }),
      });

      const responseData = await res.json();

      if (res.ok) {
        // Remove from local state immediately
        setRegistrations(
          registrations.filter((reg) => reg.id !== registrationId),
        );
        setMessage({
          type: "success",
          text: "Pendaftar berhasil dihapus",
        });
        // Reload data dari server untuk memastikan sync dengan database
        setTimeout(() => {
          loadData();
        }, 500);
      } else {
        throw new Error(responseData.error || "Gagal menghapus pendaftar");
      }
    } catch (err) {
      console.error("Error deleting registration:", err);
      // Reload data jika ada error
      await loadData();
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus pendaftar",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openDetailModal = (registration: CareerRegistration) => {
    setSelectedRegistration(registration);
    setShowDetail(true);
  };

  if (loading) {
    return <AdminPageSkeleton title="Kelola Careers" />;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="max-w-[1220px] mx-auto px-6 md:px-12 py-12">
        <h1 className="text-[40px] font-medium mb-8">Kelola Careers</h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "error"
                ? "bg-red-50 border border-red-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            {message.type === "error" ? (
              <AlertCircle size={20} className="text-red-500 shrink-0" />
            ) : (
              <CheckCircle size={20} className="text-green-500 shrink-0" />
            )}
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-700" : "text-green-700"
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("config")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "config"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            Konfigurasi
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "registrations"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            Daftar Pendaftar ({registrations.length})
          </button>
        </div>

        {/* Configuration Tab */}
        {activeTab === "config" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              {/* Form Active Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status Form Pendaftaran
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setConfigForm((prev) => ({
                        ...prev,
                        is_form_active: !prev.is_form_active,
                      }))
                    }
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                      configForm.is_form_active ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        configForm.is_form_active
                          ? "translate-x-8"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-gray-600">
                    {configForm.is_form_active
                      ? "Form pendaftaran aktif"
                      : "Form pendaftaran nonaktif"}
                  </span>
                </div>
              </div>

              {/* Banner Upload - Selalu tampil */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Banner Gambar
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                    id="banner-input"
                  />
                  {bannerPreview ? (
                    <div className="space-y-3">
                      <img
                        src={bannerPreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBannerFile(null);
                          setBannerPreview("");
                          const bannerInput = document.getElementById(
                            "banner-input",
                          ) as HTMLInputElement;
                          if (bannerInput) {
                            bannerInput.value = "";
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Hapus gambar
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="banner-input" className="cursor-pointer">
                      <p className="text-sm font-medium text-gray-600">
                        Klik untuk upload banner
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* Criteria */}
              {configForm.is_form_active && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Kriteria Tambahan
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newCriteria}
                      onChange={(e) => setNewCriteria(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddCriteria();
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Masukkan kriteria baru"
                    />
                    <button
                      type="button"
                      onClick={handleAddCriteria}
                      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Plus size={18} />
                      Tambahkan
                    </button>
                  </div>

                  {configForm.criteria.length > 0 && (
                    <div className="space-y-2">
                      {configForm.criteria.map((criterion) => (
                        <div
                          key={criterion}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">
                            {criterion}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveCriteria(
                                configForm.criteria.indexOf(criterion),
                              )
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSaveConfig}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Konfigurasi"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <div>
            {registrations.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <p className="text-gray-500">
                  Belum ada pendaftar untuk Careers
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Nama
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Posisi
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Pengalaman
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Tanggal Daftar
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr
                          key={reg.id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {reg.full_name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {reg.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {reg.position}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {reg.experience_years} tahun
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(reg.created_at).toLocaleDateString(
                              "id-ID",
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2 flex">
                            <button
                              onClick={() => openDetailModal(reg)}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                              title="Lihat Detail"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => downloadResume(reg)}
                              className="text-green-600 hover:text-green-700 flex items-center gap-1"
                              title="Download Resume"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              onClick={() => deleteRegistration(reg.id)}
                              disabled={submitting}
                              className="text-red-600 hover:text-red-700 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Hapus Pendaftar"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Detail Pendaftar
              </h2>
              <button
                onClick={() => {
                  setShowDetail(false);
                  setSelectedRegistration(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="font-medium text-gray-800">
                    {selectedRegistration.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">
                    {selectedRegistration.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">No. HP</p>
                  <p className="font-medium text-gray-800">
                    {selectedRegistration.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posisi</p>
                  <p className="font-medium text-gray-800">
                    {selectedRegistration.position}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pendidikan</p>
                  <p className="font-medium text-gray-800">
                    {selectedRegistration.education}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pengalaman</p>
                  <p className="font-medium text-gray-800">
                    {selectedRegistration.experience_years} tahun
                  </p>
                </div>
              </div>

              {selectedRegistration.criteria_fields &&
                Object.keys(selectedRegistration.criteria_fields).length >
                  0 && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Kriteria Tambahan
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(selectedRegistration.criteria_fields).map(
                        ([key, value]) => (
                          <div key={key} className="text-sm">
                            <p className="text-gray-500">{key}</p>
                            <p className="font-medium text-gray-800">
                              {value as string}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {selectedRegistration.resume_url && (
                <div className="border-t pt-4">
                  <button
                    onClick={() => downloadResume(selectedRegistration)}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Resume
                  </button>
                </div>
              )}

              {selectedRegistration.whatsapp_link && (
                <div className="border-t pt-4">
                  <a
                    href={selectedRegistration.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
                  >
                    Hubungi via WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareersPage;
