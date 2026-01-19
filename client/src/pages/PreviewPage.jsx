import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviewCard from '../components/PreviewCard';
import { ArrowLeft, Linkedin, Download } from 'lucide-react';

const PreviewPage = ({ generatedData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!generatedData) {
            navigate('/build');
        }
    }, [generatedData, navigate]);

    if (!generatedData) return null;

    const handleDownload = () => {
        
        const byteCharacters = atob(generatedData.pdf_base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/build')}
                    className="flex items-center text-slate-600 hover:text-primary mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Editor
                </button>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Your Generated Portfolio</h1>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>

                <PreviewCard
                    title="Resume"
                    content={generatedData.resume_content}
                />

                <PreviewCard
                    title="Cover Letter"
                    content={generatedData.cover_letter}
                />

                <PreviewCard
                    title="Portfolio Bio"
                    content={generatedData.portfolio_bio}
                />

                {}
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Linkedin className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-800">LinkedIn Content</h2>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-600 mb-2">Headline</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={generatedData.linkedin_headline || ''}
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
                            />
                            <button
                                onClick={() => copyToClipboard(generatedData.linkedin_headline)}
                                className="px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 rounded-lg transition"
                            >
                                Copy
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">About Section</label>
                        <div className="relative">
                            <textarea
                                readOnly
                                value={generatedData.linkedin_about || ''}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 h-40 resize-none"
                            />
                            <button
                                onClick={() => copyToClipboard(generatedData.linkedin_about)}
                                className="absolute top-2 right-2 px-3 py-1 text-sm bg-slate-200 hover:bg-slate-300 rounded transition"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
