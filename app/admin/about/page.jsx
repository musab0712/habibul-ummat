// app/admin/about/page.js
"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import {
  FiSave,
  FiImage,
  FiGlobe,
  FiType,
  FiUpload,
  FiEye,
  FiEdit,
} from "react-icons/fi";
import LexicalEditor from "@/components/admin/LexicalEditor";

export default function AboutPageEditor() {
  const [activeLanguageTab, setActiveLanguageTab] = useState("english");
  const [previewLanguage, setPreviewLanguage] = useState("english");
  const [metaTags, setMetaTags] = useState({
    title: "",
    description: "",
    keywords: "",
  });
  const [heroImage, setHeroImage] = useState("");
  const [englishContent, setEnglishContent] = useState("");
  const [urduContent, setUrduContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getDefaultLexicalState = () =>
    JSON.stringify({
      root: {
        children: [
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    });

  const isValidLexicalJson = (str) => {
    try {
      const obj = JSON.parse(str);
      return obj && obj.root && Array.isArray(obj.root.children);
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setMetaTags(
              data.data.metaTags || { title: "", description: "", keywords: "" }
            );
            setHeroImage(data.data.heroImage || "");
            setEnglishContent(
              isValidLexicalJson(data.data.content?.english)
                ? data.data.content.english
                : getDefaultLexicalState()
            );
            setUrduContent(
              isValidLexicalJson(data.data.content?.urdu)
                ? data.data.content.urdu
                : getDefaultLexicalState()
            );
          }
        }
      } catch (error) {
        console.error("Error loading about data:", error);
        setMessage("Error loading page data");
      } finally {
        setIsLoading(false);
      }
    };

    loadAboutData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metaTags,
          heroImage,
          content: {
            english: englishContent,
            urdu: urduContent,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("About page saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error saving about page: " + result.message);
      }
    } catch (error) {
      setMessage("Error saving about page");
      console.error("Error saving about data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a valid image file (JPG, PNG, or WebP)");
      return;
    }

    try {
      setMessage("Uploading image...");

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "admin-page");
      formData.append("resource_type", "image");

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setHeroImage(data.secure_url);
      setMessage("Image uploaded successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      setMessage("Error uploading image. Please try again.");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleEnglishContentChange = (content) => {
    setEnglishContent(JSON.stringify(content.toJSON()));
  };

  const handleUrduContentChange = (content) => {
    setUrduContent(JSON.stringify(content.toJSON()));
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              About Page Management
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSave className="mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`p-3 mb-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Meta tags and image */}
            <div className="lg:col-span-1 space-y-6">
              {/* Meta Tags Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FiGlobe className="mr-2" /> Meta Tags
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={metaTags.title}
                      onChange={(e) =>
                        setMetaTags({ ...metaTags, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="About Us - Page Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={metaTags.description}
                      onChange={(e) =>
                        setMetaTags({
                          ...metaTags,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Meta description for SEO"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      value={metaTags.keywords}
                      onChange={(e) =>
                        setMetaTags({ ...metaTags, keywords: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FiImage className="mr-2" /> Hero Image
                </h2>
                <div className="space-y-4">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-md h-48 overflow-hidden hover:border-gray-400 transition-colors">
                    {heroImage ? (
                      <>
                        <img
                          src={heroImage}
                          alt="Hero preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="flex space-x-2">
                            <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center text-sm">
                              <FiUpload className="mr-2 w-4 h-4" />
                              Change Image
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                                key={heroImage} // Force re-render to reset input
                              />
                            </label>
                            <button
                              onClick={() => setHeroImage("")}
                              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex items-center justify-center">
                        <div className="text-center p-4">
                          <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <span className="text-lg text-gray-600 font-medium block mb-2">
                            Upload Hero Image
                          </span>
                          <span className="text-sm text-gray-500 block mb-2">
                            Click here or drag and drop
                          </span>
                          <span className="text-xs text-gray-400">
                            JPG, PNG or WebP (Max 5MB)
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Recommended size: 1920×1080px for best quality
                    </p>
                    {heroImage && (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Image uploaded successfully
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Content editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FiType className="mr-2" /> Content Editor
                </h2>

                {/* Language tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveLanguageTab("english")}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeLanguageTab === "english"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      English Content
                    </button>
                    <button
                      onClick={() => setActiveLanguageTab("urdu")}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeLanguageTab === "urdu"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      اردو کنٹینٹ
                    </button>
                  </nav>
                </div>

                {/* Editor area */}
                <div className="min-h-96">
                  {activeLanguageTab === "english" && (
                    <LexicalEditor
                      language="english"
                      initialContent={englishContent}
                      onContentChange={handleEnglishContentChange}
                      placeholder="Write your about us content in English..."
                    />
                  )}

                  {activeLanguageTab === "urdu" && (
                    <LexicalEditor
                      language="urdu"
                      initialContent={urduContent}
                      onContentChange={handleUrduContentChange}
                      placeholder="اردو میں اپنا مواد لکھیں..."
                    />
                  )}
                </div>

                {/* Content preview info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>Tip:</strong> Use the toolbar above to format your
                    content. Switch to Preview tab to see how it will look on
                    your website.
                  </p>
                  {activeLanguageTab === "urdu" && (
                    <p className="text-sm text-gray-600 mt-2" dir="rtl">
                      <strong>نوٹ:</strong> اردو کنٹینٹ خودکار طور پر دائیں سے
                      بائیں (RTL) فارمیٹ میں محفوظ ہوگا۔
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Debug information for development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">
                Debug Information (Development Only)
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  English Content Length: {englishContent.length} characters
                </p>
                <p>Urdu Content Length: {urduContent.length} characters</p>
                <p>Hero Image: {heroImage ? "Set" : "Not set"}</p>
                <p>Active Language Tab: {activeLanguageTab}</p>
                <p>Preview Language: {previewLanguage}</p>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
