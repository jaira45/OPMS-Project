import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Upload, X, PlusCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function AddProperty() {
    const navigate = useNavigate();
    const { authFetch } = useAuth();
    
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        bedrooms: 1,
        bathrooms: 1,
        area: '',
        category: 'buy',
        description: '',
    });

    const [images, setImages] = useState([]); // Actual file objects
    const [previews, setPreviews] = useState([]); // Local URLs for preview
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            setError("Maximum 5 images allowed.");
            return;
        }

        setImages(prev => [...prev, ...files]);
        
        // Generate previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
        setError('');
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const uploadToCloudinary = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_upload';
        
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (result.secure_url) {
                return result.secure_url;
            } else {
                throw new Error(result.error?.message || 'Cloudinary upload failed');
            }
        } catch (err) {
            console.error('Cloudinary Error:', err);
            throw err;
        }
    };

    const submitProperty = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.location || !formData.area) {
            setError("All required fields must be filled.");
            return;
        }

        if (images.length === 0) {
            setError("At least one property image is required.");
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // 1. Upload all images to Cloudinary in parallel
            const uploadPromises = images.map(file => uploadToCloudinary(file));
            const imageUrls = await Promise.all(uploadPromises);

            // 2. Submit data to our backend
            const res = await authFetch(`${API_URL}/api/properties`, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    images: imageUrls
                })
            });

            if (res.ok) {
                navigate('/admin');
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to save property to database.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during upload. Please check your Cloudinary config.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#071B3A] text-white min-h-screen pb-32">
            <Navbar />

            <main className="pt-24 sm:pt-36 container-responsive px-4">
                <div className="max-w-3xl mx-auto space-y-12 animate-fade-in-up">
                    <div className="space-y-6 text-center">
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            Elite Listing Portfolio
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-headline font-bold text-white tracking-widest uppercase italic leading-tight">Add <span className="text-gold-gradient">Property</span></h1>
                        <p className="text-white/40 font-medium text-base sm:text-lg max-w-xl mx-auto italic">
                            Present your premium property to our global network of investors and homeowners.
                        </p>
                    </div>

                    <form onSubmit={submitProperty} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0A254D] p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="col-span-1 md:col-span-2 space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Property Identity</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm italic"
                                placeholder="e.g. Modern Villa at Shyamala Hills"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Market Price (₹)</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm"
                                placeholder="Value in ₹"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Location</label>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm"
                                placeholder="e.g. Arera Colony, Bhopal"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Bedrooms</label>
                            <input
                                name="bedrooms"
                                type="number"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Bathrooms</label>
                            <input
                                name="bathrooms"
                                type="number"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Space (SQFT)</label>
                            <input
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm"
                                placeholder="e.g. 2400"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Classification</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none font-bold text-white focus:border-accent transition-all text-sm appearance-none cursor-pointer"
                            >
                                <option value="buy" className="bg-[#0A254D]">For Direct Sale</option>
                                <option value="rent" className="bg-[#0A254D]">For Exclusive Rent</option>
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 px-4">Property Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-6 py-6 bg-white/5 border border-white/10 rounded-[2rem] outline-none font-bold text-white focus:border-accent transition-all resize-none h-40 text-sm leading-relaxed"
                                placeholder="Narrate the luxury and unique features of this property..."
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-6">
                            <div className="flex justify-between items-center px-4">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60">Portfolio Images (Max 5)</label>
                                <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{images.length}/5 High-Res</span>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {previews.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group shadow-xl">
                                        <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg active:scale-90"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 hover:border-accent/40 transition-all text-white/20 hover:text-accent">
                                        <PlusCircle className="w-8 h-8" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">Upload</span>
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="col-span-1 md:col-span-2 bg-red-600/10 border border-red-600/20 p-5 rounded-2xl flex items-center gap-3 text-red-500">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
                            </div>
                        )}

                        <div className="col-span-1 md:col-span-2 pt-6">
                            <button
                                disabled={isSubmitting}
                                className="w-full py-5 bg-gold-gradient text-primary rounded-2xl sm:rounded-3xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3"
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <span>Archiving Listing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        <span>Publish Exposure</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
