import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download } from 'lucide-react';

const PreviewCard = ({ title, content, onDownload }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden mb-8">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">{title}</h3>
                {onDownload && (
                    <button
                        onClick={onDownload}
                        className="flex items-center space-x-2 text-sm text-primary hover:text-secondary font-medium transition"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                    </button>
                )}
            </div>
            <div className="p-6 prose prose-slate max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default PreviewCard;
