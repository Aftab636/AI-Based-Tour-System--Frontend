import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");

  const [receiptFile, setReceiptFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
    setUploadStatus(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!receiptFile || !bookingId) {
      setUploadStatus("Please select a file and ensure booking ID is valid.");
      return;
    }

    const formData = new FormData();
    formData.append("booking_id", bookingId); // must be a valid UUID
    formData.append("receipt_image", receiptFile);

    try {
      setUploading(true);
      const res = await fetch("http://127.0.0.1:8000/api/payments/upload-receipt/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Upload failed:", data);
        setUploadStatus(data?.error || "Upload failed");
      } else {
        setUploadStatus("Receipt uploaded successfully!");
      }
    } catch (err) {
      console.error("Receipt upload error:", err);
      setUploadStatus("Upload error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-12 bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Payment Information
          </h2>

          <div className="mb-6 text-center text-gray-700">
            <p>Please transfer the tour amount to the following account:</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>JazzCash:</strong> 0301-1234567</li>
              <li><strong>EasyPaisa:</strong> 0345-7654321</li>
              <li><strong>Account Holder:</strong> Anas Tour Co.</li>
            </ul>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Payment Receipt <span className="text-gray-400">(JPG/PNG only)</span>
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="block w-full text-sm border border-gray-300 rounded-lg p-2"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {uploading ? "Uploading..." : "Submit Receipt"}
            </button>
          </form>

          {uploadStatus && (
            <div className={`mt-4 text-sm text-center ${uploadStatus.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {uploadStatus}
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default PaymentPage;
