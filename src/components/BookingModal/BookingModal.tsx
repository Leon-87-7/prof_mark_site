import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    clinic: 'Haifa Clinic',
    service: 'Cosmetic Limb Lengthening',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      firstInputRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 9) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert(
        "✓ Thank you! Your inquiry has been submitted. Prof. Eidelman's team will contact you within 24 hours."
      );
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      clinic: 'Haifa Clinic',
      service: 'Cosmetic Limb Lengthening',
      message: '',
    });
    setErrors({});
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content"
        ref={modalRef}
      >
        <button
          className="close-icon"
          onClick={onClose}
          aria-label="Close dialog"
          type="button"
        >
          ✕
        </button>

        <h2
          id="modal-title"
          className="modal-header"
        >
          <span
            role="img"
            aria-label="Calendar"
          >
            📅
          </span>{' '}
          Book a Consultation
        </h2>

        <form
          className="modal-body"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              ref={firstInputRef}
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              aria-describedby={
                errors.name ? 'name-error' : undefined
              }
              required
            />
            {errors.name && (
              <span
                id="name-error"
                className="error-message"
                role="alert"
              >
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? 'email-error' : undefined
              }
              required
            />
            {errors.email && (
              <span
                id="email-error"
                className="error-message"
                role="alert"
              >
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+972 (0)4..."
              aria-invalid={!!errors.phone}
              aria-describedby={
                errors.phone ? 'phone-error' : undefined
              }
              required
            />
            {errors.phone && (
              <span
                id="phone-error"
                className="error-message"
                role="alert"
              >
                {errors.phone}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="clinic">Preferred Clinic</label>
            <select
              id="clinic"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
            >
              <option>Haifa Clinic</option>
              <option>Kiryat Motzkin Clinic</option>
              <option>Virtual Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Interest</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option>Cosmetic Limb Lengthening</option>
              <option>Limb Length Discrepancy</option>
              <option>Deformity Reconstruction</option>
              <option>Pediatric Orthopedic</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..."
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn btn-dis"
              // disabled={isSubmitting}
              disabled={true}
              data-tooltip="Form submission is currently disabled"
            >
              {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
