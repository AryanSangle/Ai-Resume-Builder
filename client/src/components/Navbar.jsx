import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-primary text-white p-2 rounded-lg">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">AI Resume Builder</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-slate-600 hover:text-primary font-medium transition">Home</Link>
                        <Link to="/build" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
                            Build Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
