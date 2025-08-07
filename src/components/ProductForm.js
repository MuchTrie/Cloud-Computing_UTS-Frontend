import React, { useState } from 'react';
import '../styles/productForm.css';

function ProductForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, image: 'File harus berupa gambar (JPG, PNG, GIF)' }));
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Ukuran gambar tidak boleh lebih dari 5MB' }));
      return;
    }
    
    // Clear any previous error
    setErrors(prev => ({ ...prev, image: '' }));
    
    // Set the file for upload
    setImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama produk wajib diisi';
    }
    
    if (!formData.price) {
      newErrors.price = 'Harga wajib diisi';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Harga harus berupa angka positif';
    }
    
    if (!imageFile && !imagePreview) {
      newErrors.image = 'Gambar produk wajib diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a FormData object to handle file upload
      const productFormData = new FormData();
      productFormData.append('name', formData.name);
      productFormData.append('description', formData.description || '');
      productFormData.append('price', Number(formData.price));
      productFormData.append('image', imageFile);
      
      await onSubmit(productFormData);
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrors({ form: 'Terjadi kesalahan saat menambahkan produk' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Tambah Produk Baru</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          {errors.form && <div className="error-message form-error">{errors.form}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nama Produk *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi produk"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Harga (Rp) *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Contoh: 150000"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Gambar Produk *</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={errors.image ? 'error' : ''}
            />
            {errors.image && <div className="error-message">{errors.image}</div>}
            <div className="form-hint">
              Format: JPG, PNG, GIF (Max: 5MB)
            </div>
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>
              Batal
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
