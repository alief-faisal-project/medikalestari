"use client";

import React, { useState, useEffect } from "react";
import { Upload, Loader2, AlertCircle, CheckCircle, X } from "lucide-react";
import { CareersBannerConfig } from "@/lib/types";

const CareersPage = () => {
  // Hardcoded values (untuk form & WhatsApp)
  const FORM_TITLE = "Bergabunglah dengan Tim Kami";
  const FORM_DESCRIPTION =
    "Kami mencari profesional berbakat untuk bergabung dengan tim RS Medika Lestari. Kirimkan CV dan data diri Anda sekarang juga!";
  const WHATSAPP_NUMBER = "082246232527";

  const [config, setConfig] = useState<CareersBannerConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    position: "",
    education: "",
    experience_years: 0,
    criteria_fields: {} as Record<string, string>,
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumePreview, setResumePreview] = useState<string>("");

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch("/api/careers/config");
        const data = await res.json();

        console.log("Loaded config:", data);
        console.log("Banner URL:", data.banner_image_url);

        // Parse criteria if it's a JSON string
        if (data.criteria && typeof data.criteria === "string") {
          try {
            data.criteria = JSON.parse(data.criteria);
          } catch (e) {
            console.error("Error parsing criteria:", e);
            data.criteria = [];
          }
        }

        // Ensure criteria is an array
        if (!Array.isArray(data.criteria)) {
          data.criteria = [];
        }

        setConfig(data);
      } catch (err) {
        console.error("Error loading config:", err);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience_years" ? parseInt(value) || 0 : value,
    }));
  };

  const handleCriteriaChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      criteria_fields: {
        ...prev.criteria_fields,
        [field]: value,
      },
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Resume harus berformat PDF");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Resume tidak boleh lebih dari 5MB");
        return;
      }
      setResumeFile(file);
      setResumePreview(file.name);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (!resumeFile) {
        setError("Resume harus diunggah");
        setSubmitting(false);
        return;
      }

      // Upload resume
      const formDataUpload = new FormData();
      formDataUpload.append("file", resumeFile);
      formDataUpload.append("path", `careers/${Date.now()}-${resumeFile.name}`);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      let resumeUrl = "";
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        resumeUrl = uploadData.url || "";
      }

      // Prepare message for WhatsApp
      const criteria_text = Object.entries(formData.criteria_fields)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      const message = `
Pendaftaran Careers RS Medika Lestari

Nama: ${formData.full_name}
Email: ${formData.email}
No. HP: ${formData.phone}
Posisi: ${formData.position}
Pendidikan: ${formData.education}
Pengalaman: ${formData.experience_years} tahun

${criteria_text ? "Kriteria Tambahan:\n" + criteria_text : ""}

Silakan hubungi melalui link di bawah untuk melanjutkan proses seleksi.
${resumeUrl ? `\nResume: ${resumeUrl}` : ""}
      `.trim();

      const whatsappNumber = WHATSAPP_NUMBER;
      const whatsappMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // Save to database
      const registrationData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        education: formData.education,
        experience_years: formData.experience_years,
        criteria_fields: formData.criteria_fields,
        resume_url: resumeUrl,
        whatsapp_link: whatsappLink,
      };

      const saveRes = await fetch("/api/careers/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      if (!saveRes.ok) {
        const errorData = await saveRes.json().catch(() => ({}));
        const errorMessage = errorData.error || "Gagal menyimpan data";
        const errorDetails = errorData.details ? ` (${errorData.details})` : "";
        throw new Error(errorMessage + errorDetails);
      }

      setSuccess(true);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        position: "",
        education: "",
        experience_years: 0,
        criteria_fields: {},
      });
      setResumeFile(null);
      setResumePreview("");

      // Redirect ke WhatsApp
      setTimeout(() => {
        window.open(whatsappLink, "_blank");
        setShowForm(false);
      }, 1500);
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setError("");
    setSuccess(false);
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      position: "",
      education: "",
      experience_years: 0,
      criteria_fields: {},
    });
    setResumeFile(null);
    setResumePreview("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-slate-200 border-t-[#005075]"></div>
      </div>
    );
  }

  if (!config?.is_form_active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Careers</h1>
          <p className="text-gray-600">
            Saat ini form pendaftaran tidak tersedia. Silakan hubungi HR kami
            untuk informasi lebih lanjut.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="w-full py-8 px-4 bg-white flex justify-center">
        <div className="flex justify-center max-w-md">
          {config?.banner_image_url ? (
            <img
              src={config.banner_image_url}
              alt="Careers Banner"
              className="w-auto h-auto object-contain rounded-lg shadow-md"
              onError={(e) => {
                console.error(
                  "Banner image failed to load:",
                  config.banner_image_url,
                );
                (e.target as HTMLImageElement).style.display = "none";
              }}
              onLoad={() => {
                console.log("Banner image loaded successfully");
              }}
            />
          ) : (
            <div className="w-80 h-96 bg-gradient-to-r from-[#005075] to-[#003d55] flex items-center justify-center rounded-lg shadow-md">
              <p className="text-white text-lg">Banner tidak ada</p>
            </div>
          )}
        </div>
      </div>

      {/* Register Button Section */}
      <div className="py-8 px-4">
        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0084BF] text-white px-16 py-4 rounded-full font-semibold hover:bg-[#0084BF]/90 transition-colors text-base shadow-lg hover:shadow-xl cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto py-8 top-16">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {FORM_TITLE}
                </h2>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {FORM_DESCRIPTION}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="text-gray-500 hover:text-gray-700 transition-colors ml-4 shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto"
            >
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-red-700 text-xs">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  <p className="text-green-700 text-xs">
                    Data berhasil dikirim! Anda akan dialihkan ke WhatsApp...
                  </p>
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                    placeholder="Nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    No. HP *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Posisi Lamaran *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                    placeholder="Misal: Perawat, Dokter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Pendidikan Terakhir *
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                    placeholder="Misal: S1, D3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Pengalaman Kerja (Tahun) *
                  </label>
                  <input
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Dynamic Criteria Fields */}
              {config?.criteria && config.criteria.length > 0 && (
                <div className="pb-3 border-b">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Kriteria Tambahan
                  </h3>
                  <div className="space-y-2">
                    {config.criteria.map((criterion, index) => (
                      <div key={index}>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {criterion}
                        </label>
                        <input
                          type="text"
                          value={formData.criteria_fields[criterion] || ""}
                          onChange={(e) =>
                            handleCriteriaChange(criterion, e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#005075] focus:border-transparent outline-none"
                          placeholder={`Masukkan ${criterion.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Upload Resume (PDF) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#005075] transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeChange}
                    className="hidden"
                    id="resume-input"
                  />
                  <label htmlFor="resume-input" className="cursor-pointer">
                    <Upload size={12} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-xs font-medium text-gray-600">
                      {resumePreview || "Klik upload resume (Max 5MB)"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || !config?.is_form_active}
                  className="flex-1 bg-[#005075] text-white py-2 rounded-lg font-semibold hover:bg-[#003d55] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim"
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Dengan mengirim formulir ini, Anda akan dialihkan ke WhatsApp
                untuk melanjutkan proses seleksi.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
