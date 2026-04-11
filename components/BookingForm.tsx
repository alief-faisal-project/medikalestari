"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { sendWhatsAppBooking } from "@/lib/whatsapp";

interface BookingFormProps {
  readonly doctorName: string;
  readonly specialty: string;
  readonly onClose: () => void;
}

export default function BookingForm({
  doctorName,
  specialty,
  onClose,
}: Readonly<BookingFormProps>) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    preferredDate: "",
    keluhan: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!formData.patientName.trim()) {
      setError("Nama pasien harus diisi");
      return;
    }
    if (!formData.patientPhone.trim()) {
      setError("Nomor telepon harus diisi");
      return;
    }
    if (!formData.keluhan.trim()) {
      setError("Keluhan/alasan kunjungan harus diisi");
      return;
    }

    setLoading(true);

    try {
      // Kirim ke WhatsApp
      sendWhatsAppBooking({
        patientName: formData.patientName,
        doctorName,
        specialty,
        patientPhone: formData.patientPhone,
        preferredDate: formData.preferredDate,
        keluhan: formData.keluhan,
      });

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({
          patientName: "",
          patientPhone: "",
          preferredDate: "",
          keluhan: "",
        });
      }, 3000);
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#0084BF] to-[#0073a5] text-white p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Buat Janji Temu</h2>
              <p className="text-blue-100 text-sm mt-1">
                Dengan {doctorName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4"
                  >
                    <CheckCircle className="text-green-500" size={64} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Permintaan Terkirim!
                  </h3>
                  <p className="text-gray-600">
                    Kami akan menghubungi Anda melalui WhatsApp segera.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Patient Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Pasien
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084BF] transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="flex text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                      <Phone size={16} />
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleChange}
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084BF] transition-all"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      * Gunakan nomor dengan WhatsApp
                    </p>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tanggal Preferensi (Opsional)
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084BF] transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Keluhan */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Keluhan/Alasan Kunjungan
                    </label>
                    <textarea
                      name="keluhan"
                      value={formData.keluhan}
                      onChange={handleChange}
                      placeholder="Jelaskan keluhan atau alasan Anda berkunjung..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084BF] transition-all resize-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <MessageCircle className="text-[#0084BF] shrink-0 mt-0.5" />
                      Pesan akan dikirim ke WhatsApp CS kami:
                      <span className="font-bold">+62 831-2099-6468</span>
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={loading}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-linear-to-r from-[#0084BF] to-[#0073a5] text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <MessageCircle size={18} />
                          Kirim via WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
