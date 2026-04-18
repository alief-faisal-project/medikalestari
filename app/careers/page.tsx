"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { CareersBannerConfig } from "@/lib/types";

const CareersPage = () => {
  const [config, setConfig] = useState<CareersBannerConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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

        // Parse criteria if it's a JSON string
        if (data.criteria && typeof data.criteria === "string") {
          try {
            data.criteria = JSON.parse(data.criteria);
          } catch (e) {
            console.error("Error parsing criteria:", e);
            data.criteria = [];
          }
        } else if (!Array.isArray(data.criteria)) {
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

      const whatsappNumber = config?.phone_number || "082246232527";
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
      {/* Banner */}
      {config?.banner_image_url && (
        <div className="relative w-full max-w-2xl mx-auto mt-20">
          <img
            src={config.banner_image_url}
            alt="Careers Banner"
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} className="text-red-500 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle size={20} className="text-green-500 shrink-0" />
              <p className="text-green-700 text-sm">
                Data berhasil dikirim! Anda akan dialihkan ke WhatsApp...
              </p>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. HP *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Posisi Lamaran *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                placeholder="Misal: Perawat, Dokter, dll"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pendidikan Terakhir *
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                placeholder="Misal: S1, D3, dll"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengalaman Kerja (Tahun) *
              </label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleInputChange}
                min="0"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                placeholder="0"
              />
            </div>
          </div>

          {/* Dynamic Criteria Fields */}
          {config?.criteria &&
            Array.isArray(config.criteria) &&
            config.criteria.length > 0 && (
              <div className="mb-6 pb-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Kriteria Tambahan
                </h3>
                <div className="space-y-4">
                  {config.criteria.map((criterion, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {criterion}
                      </label>
                      <input
                        type="text"
                        value={formData.criteria_fields[criterion] || ""}
                        onChange={(e) =>
                          handleCriteriaChange(criterion, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005075] focus:border-transparent outline-none"
                        placeholder={`Masukkan ${criterion.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Resume Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF) *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#005075] transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="hidden"
                id="resume-input"
              />
              <label htmlFor="resume-input" className="cursor-pointer">
                <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  {resumePreview || "Klik untuk upload resume (Max 5MB)"}
                </p>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !config?.is_form_active}
            className="w-full bg-[#005075] text-white py-3 rounded-lg font-semibold hover:bg-[#003d55] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Pendaftaran"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Dengan mengirim formulir ini, Anda akan dialihkan ke WhatsApp untuk
            melanjutkan proses seleksi.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CareersPage;
