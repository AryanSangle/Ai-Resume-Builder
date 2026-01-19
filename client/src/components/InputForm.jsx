import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateResume } from '../services/api';
import { Loader2, Sparkles } from 'lucide-react';

const InputForm = ({ setGeneratedData }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        skills: '',
        projects: '',
        education: '',
        experience: '',
        target_role: '',
        tone: 'Professional',
        job_description: '',
    });

    const sampleData = {
        full_name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 012-3456',
        skills: 'JavaScript, React, Node.js, Python, FastAPI, AWS, Docker, PostgreSQL, Git',
        projects: 'E-commerce Platform: Built a full-stack e-commerce solution using React and Node.js with Stripe payment integration.\n\nTask Manager Pro: Developed a real-time collaboration tool using WebSocket and Python backend.',
        education: 'B.S. Computer Science, Tech University (2020-2024)\nGPA: 3.8/4.0 | Dean\'s List',
        experience: 'Senior Frontend Engineer at TechCorp (2022-Present)\n- Led a team of 5 developers building enterprise dashboards\n- Improved page load times by 40%\n\nJunior Developer at StartupInc (2020-2022)\n- Built landing pages and marketing sites\n- Implemented CI/CD pipelines',
        target_role: 'Full Stack Engineer',
        tone: 'Professional',
        job_description: 'We are looking for a Full Stack Engineer with 3+ years experience in React, Node.js, and cloud services. Must have strong problem-solving skills and experience with agile methodologies.',
    };

    const handleFillSample = () => {
        setFormData(sampleData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await generateResume(formData);
            setGeneratedData(data);
            navigate('/preview');
        } catch (error) {
            console.error("Error generating resume:", error);
            alert("Failed to generate resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Enter Your Details</h2>
                <button
                    type="button"
                    onClick={handleFillSample}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
                >
                    <Sparkles className="w-4 h-4" />
                    Fill Sample Data
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Job Role</label>
                    <input
                        type="text"
                        name="target_role"
                        value={formData.target_role}
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                        placeholder="e.g. Senior Frontend Developer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Skills (comma separated)</label>
                    <textarea
                        name="skills"
                        value={formData.skills}
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-24"
                        placeholder="React, Python, AWS, Team Leadership..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Education</label>
                        <textarea
                            name="education"
                            value={formData.education}
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-32"
                            placeholder="University, Degree, Year"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Experience</label>
                        <textarea
                            name="experience"
                            value={formData.experience}
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-32"
                            placeholder="Job Title, Company, Description..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Projects</label>
                    <textarea
                        name="projects"
                        value={formData.projects}
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-32"
                        placeholder="Project Name: Description..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Job Description (Optional - for ATS Optimization)
                    </label>
                    <textarea
                        name="job_description"
                        value={formData.job_description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-32"
                        placeholder="Paste the job description here to optimize your resume for ATS..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
                    <select
                        name="tone"
                        value={formData.tone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    >
                        <option value="Professional">Professional</option>
                        <option value="Formal">Formal</option>
                        <option value="Creative">Creative</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>Generating Magic...</span>
                        </>
                    ) : (
                        <span>Generate Resume & Portfolio</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default InputForm;
