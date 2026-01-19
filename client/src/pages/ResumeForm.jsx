import React from 'react';
import InputForm from '../components/InputForm';

const ResumeForm = ({ setGeneratedData }) => {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">Build Your Resume</h1>
                    <p className="mt-2 text-slate-600">Provide your details below and let AI craft your professional story.</p>
                </div>
                <InputForm setGeneratedData={setGeneratedData} />
            </div>
        </div>
    );
};

export default ResumeForm;
