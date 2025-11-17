"use client";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
  FaPaperPlane,
  FaSpinner,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const ContactPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch contact information from API
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setInfoLoading(true);
        const response = await fetch("/api/contact");
        const result = await response.json();

        if (result.success) {
          setContactInfo(result.data);
        } else {
          setError("Failed to load contact information");
        }
      } catch (err) {
        setError("Error loading contact information");
        console.error("Error fetching contact info:", err);
      } finally {
        setInfoLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <FaComment className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "رابطہ" : "Contact"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "ہم سے رابطہ کریں۔ آپ کے سوالات، تجاویز اور مسائل کے حل کے لیے ہم یہاں موجود ہیں۔"
              : "Get in touch with us. We are here to answer your questions, receive your suggestions, and solve your problems."}
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-6">
              {language === "ur" ? "پیغام بھیجیں" : "Send Message"}
            </h2>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                  {language === "ur" ? "پیغام بھیج دیا گیا" : "Message Sent"}
                </h3>
                <p className="text-emerald-600">
                  {language === "ur"
                    ? "آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔ ہم جلد ہی آپ سے رابطہ کریں گے۔"
                    : "Your message has been sent successfully. We will contact you soon."}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  {language === "ur" ? "نیا پیغام" : "New Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-emerald-700 mb-2"
                    >
                      {language === "ur" ? "نام" : "Name"} *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder={
                          language === "ur"
                            ? "اپنا نام درج کریں"
                            : "Enter your name"
                        }
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-emerald-700 mb-2"
                    >
                      {language === "ur" ? "ای میل" : "Email"} *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder={
                          language === "ur"
                            ? "اپنا ای میل درج کریں"
                            : "Enter your email"
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-emerald-700 mb-2"
                  >
                    {language === "ur" ? "فون نمبر" : "Phone Number"}
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder={
                        language === "ur"
                          ? "اپنا فون نمبر درج کریں"
                          : "Enter your phone number"
                      }
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-emerald-700 mb-2"
                  >
                    {language === "ur" ? "موضوع" : "Subject"} *
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder={
                        language === "ur" ? "پیغام کا موضوع" : "Message subject"
                      }
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-emerald-700 mb-2"
                  >
                    {language === "ur" ? "پیغام" : "Message"} *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder={
                        language === "ur"
                          ? "اپنا پیغام یہاں درج کریں"
                          : "Enter your message here"
                      }
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="h-5 w-5 animate-spin mr-2" />
                      {language === "ur" ? "بھیج رہے ہیں..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-5 w-5 mr-2" />
                      {language === "ur" ? "پیغام بھیجیں" : "Send Message"}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">
                {language === "ur" ? "رابطہ کی معلومات" : "Contact Information"}
              </h2>

              {infoLoading ? (
                <div className="flex justify-center items-center py-8">
                  <FaSpinner className="h-8 w-8 text-amber-300 animate-spin" />
                </div>
              ) : contactInfo ? (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <FaMapMarkerAlt className="h-6 w-6 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {language === "ur" ? "ایڈریس" : "Address"}
                      </h3>
                      <p className="text-emerald-100">
                        {language === "ur"
                          ? contactInfo.address?.urdu ||
                            "جامعہ محجب، لاہور، پاکستان"
                          : contactInfo.address?.english ||
                            "Jamia Mohajjab, Lahore, Pakistan"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaPhone className="h-6 w-6 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {language === "ur" ? "فون" : "Phone"}
                      </h3>
                      <p className="text-emerald-100">
                        {contactInfo.phoneNumbers?.primary ||
                          "+92 300 123 4567"}
                        {contactInfo.phoneNumbers?.secondary && (
                          <>
                            <br />
                            {contactInfo.phoneNumbers.secondary}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaEnvelope className="h-6 w-6 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {language === "ur" ? "ای میل" : "Email"}
                      </h3>
                      <p className="text-emerald-100">
                        {contactInfo.email || "info@muftihabibullah.com"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaClock className="h-6 w-6 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {language === "ur" ? "اوقات کار" : "Working Hours"}
                      </h3>
                      <p className="text-emerald-100">
                        {language === "ur"
                          ? "پیر تا جمعہ: صبح 9 بجے سے شام 5 بجے تک"
                          : "Monday to Friday: 9:00 AM to 5:00 PM"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-emerald-100">
                    {language === "ur"
                      ? "رابطہ کی معلومات لوڈ ہو رہی ہے..."
                      : "Contact information loading..."}
                  </p>
                </div>
              )}
            </div>

            {/* Response Time Info */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-3">
                {language === "ur" ? "جواب کا وقت" : "Response Time"}
              </h3>
              <p className="text-amber-100">
                {language === "ur"
                  ? "ہم عام طور پر 24-48 گھنٹوں کے اندر تمام پیغامات کا جواب دیتے ہیں۔"
                  : "We typically respond to all messages within 24-48 hours."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
