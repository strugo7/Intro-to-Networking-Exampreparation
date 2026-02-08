import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import { Upload, X, Check, Loader2, Copy, FileText } from 'lucide-react';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            setDownloadURL(null);
            setCopied(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        if (!title.trim()) {
            setError("Please enter a title for the file");
            return;
        }

        setUploading(true);
        setError(null);

        // Create a storage reference
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

        try {
            // 1. Upload file to Storage
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            setDownloadURL(url);

            // 2. Save metadata to Firestore
            await addDoc(collection(db, "media"), {
                fileName: file.name,
                fileType: file.type,
                size: file.size,
                downloadURL: url,
                title: title.trim(),
                uploadedAt: Timestamp.now(),
            });

            setTitle('');
            setFile(null); // Clear file after successful upload
        } catch (err: any) {
            console.error("Error uploading file:", err);
            setError(err.message || "Failed to upload file");
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = () => {
        if (downloadURL) {
            navigator.clipboard.writeText(downloadURL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Upload className="text-blue-500" /> Firebase Uploader
                </h2>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-slate-400 text-sm font-bold mb-2 flex items-center gap-2">
                        <FileText size={16} /> Title / Description
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Layer 2 Diagram"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Drop Zone / Input */}
                <div className="relative border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-slate-700/50 transition-colors group">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors mb-2">
                            {file ? <Check size={24} className="text-green-500" /> : <Upload size={24} className="text-slate-400" />}
                        </div>
                        <p className="text-slate-300 font-medium">
                            {file ? file.name : "Click or Drag to upload"}
                        </p>
                        {!file && <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleUpload}
                    disabled={!file || !title.trim() || uploading}
                    className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                        ${!file || !title.trim() || uploading
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.02]'}
                    `}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="animate-spin" /> Uploading...
                        </>
                    ) : (
                        "Upload File"
                    )}
                </button>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-center gap-2">
                        <X size={16} /> {error}
                    </div>
                )}

                {/* Success / Result */}
                {downloadURL && (
                    <div className="mt-6 space-y-4 animate-fade-in-up">
                        <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300 text-sm flex items-center gap-2">
                            <Check size={16} /> Upload Successful!
                        </div>

                        <div className="relative group">
                            <img
                                src={downloadURL}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg border border-slate-600 bg-slate-900/50"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                <a
                                    href={downloadURL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white hover:underline text-sm font-medium"
                                >
                                    Open Original
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={downloadURL}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-400 font-mono focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                                title="Copy URL"
                            >
                                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
