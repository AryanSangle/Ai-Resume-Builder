import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Craft Your Perfect <span className="text-primary">Career Story</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Generates professional resumes, cover letters, and portfolio bios in seconds using advanced AI. Stand out from the crowd.
                </p>
                <Link
                    to="/build"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary hover:bg-secondary shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                    Create Resume Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </section>

            {}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: 'AI Powered Writing', desc: 'Instantly generate content tailored to your target role.' },
                            { title: 'ATS Friendly', desc: 'Clean formatting that passes automated screenings.' },
                            { title: 'Instant PDF Export', desc: 'Download your polished resume with one click.' }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition">
                                <CheckCircle className="w-10 h-10 text-accent mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
