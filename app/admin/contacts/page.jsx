"use client";
import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaComment,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaReply,
  FaArchive,
  FaCalendar,
} from "react-icons/fa";

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [searchTerm, statusFilter, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contacts");
      const result = await response.json();

      console.log("Fetched contacts:", result.data); // Debug log

      if (result.success) {
        setContacts(result.data);
        setFilteredContacts(result.data);
      } else {
        setError("Failed to fetch contacts");
      }
    } catch (err) {
      setError("Error fetching contacts: " + err.message);
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  };

  const updateContactStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        setContacts(
          contacts.map((contact) =>
            contact._id === id ? { ...contact, status: newStatus } : contact
          )
        );
      } else {
        setError("Failed to update contact");
      }
    } catch (err) {
      setError("Error updating contact");
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setContacts(contacts.filter((contact) => contact._id !== id));
      } else {
        setError("Failed to delete contact");
      }
    } catch (err) {
      setError("Error deleting contact");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "read":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "replied":
        return "bg-green-100 text-green-800 border border-green-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "read":
        return "Read";
      case "replied":
        return "Replied";
      case "archived":
        return "Archived";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="h-12 w-12 text-emerald-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-emerald-900">
                    Contact Messages
                  </h1>
                  <p className="text-emerald-600 mt-1">
                    Manage and respond to contact form submissions
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <button
                    onClick={fetchContacts}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center"
                  >
                    <FaEye className="h-4 w-4 mr-2" />
                    Refresh
                  </button>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg font-semibold">
                    {filteredContacts.length} Messages
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, subject, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={fetchContacts}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Debug Info */}
              {contacts.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-blue-600 text-sm">
                    Showing {filteredContacts.length} of {contacts.length} total
                    messages
                  </p>
                </div>
              )}

              {filteredContacts.length === 0 ? (
                <div className="text-center py-12">
                  <FaEnvelope className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                    No Messages Found
                  </h3>
                  <p className="text-emerald-600 mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "No contacts match your search criteria"
                      : "No contact messages have been submitted yet"}
                  </p>
                  {(searchTerm || statusFilter !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className={`border-2 rounded-2xl p-6 transition-all duration-300 ${
                        contact.status === "pending"
                          ? "border-amber-200 bg-amber-50"
                          : contact.status === "read"
                          ? "border-blue-200 bg-blue-50"
                          : contact.status === "replied"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      {/* Header Row */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
                          {/* Name */}
                          <div className="flex items-center gap-2">
                            <FaUser className="h-5 w-5 text-emerald-600" />
                            <div>
                              <span className="font-semibold text-emerald-900 text-lg">
                                {contact.name}
                              </span>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="h-4 w-4 text-emerald-600" />
                            <span className="text-emerald-700">
                              {contact.email}
                            </span>
                          </div>

                          {/* Phone */}
                          {contact.phone && (
                            <div className="flex items-center gap-2">
                              <FaPhone className="h-4 w-4 text-emerald-600" />
                              <span className="text-emerald-700">
                                {contact.phone}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Status and Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              contact.status
                            )}`}
                          >
                            {getStatusText(contact.status)}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <FaCalendar className="h-4 w-4" />
                            <span>{formatDate(contact.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaComment className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-900 text-lg">
                            Subject:
                          </span>
                        </div>
                        <p className="text-emerald-800 text-lg ml-6 bg-white/50 p-3 rounded-lg border border-emerald-100">
                          {contact.subject}
                        </p>
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-emerald-900 text-lg">
                            Message:
                          </span>
                        </div>
                        <div className="ml-6 bg-white/50 p-4 rounded-lg border border-emerald-100">
                          <p className="text-emerald-800 whitespace-pre-wrap leading-relaxed">
                            {contact.message}
                          </p>
                        </div>
                      </div>

                      {/* Footer - Metadata and Actions */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4 border-t border-emerald-200">
                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-500">
                          <span>ID: {contact._id}</span>
                          {contact.ipAddress &&
                            contact.ipAddress !== "unknown" && (
                              <span>IP: {contact.ipAddress}</span>
                            )}
                          {contact.userAgent &&
                            contact.userAgent !== "unknown" && (
                              <span className="hidden md:inline">
                                Device: {contact.userAgent.substring(0, 50)}...
                              </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {contact.status === "pending" && (
                            <button
                              onClick={() =>
                                updateContactStatus(contact._id, "read")
                              }
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center gap-2"
                              title="Mark as Read"
                            >
                              <FaEye className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                Mark Read
                              </span>
                            </button>
                          )}

                          {contact.status !== "replied" && (
                            <button
                              onClick={() =>
                                updateContactStatus(contact._id, "replied")
                              }
                              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-300 flex items-center gap-2"
                              title="Mark as Replied"
                            >
                              <FaReply className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                Mark Replied
                              </span>
                            </button>
                          )}

                          {contact.status !== "archived" && (
                            <button
                              onClick={() =>
                                updateContactStatus(contact._id, "archived")
                              }
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                              title="Archive"
                            >
                              <FaArchive className="h-4 w-4" />
                              <span className="hidden sm:inline">Archive</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteContact(contact._id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-300 flex items-center gap-2"
                            title="Delete"
                          >
                            <FaTrash className="h-4 w-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminContactPage;
