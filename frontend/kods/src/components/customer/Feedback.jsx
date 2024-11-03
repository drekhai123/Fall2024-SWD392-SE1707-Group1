import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../css/Feedback.css';
import { useNavigate } from 'react-router-dom';

const Feedback = ({ setFeedbacks }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);  // Quay lại trang trước đó
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate phone number
        if (isNaN(phone)) {
            alert("Phone number must be numeric.");
            return;
        }

        const newFeedback = { rating, comment, name, phone, email };

        // Ensure setFeedbacks is a function before calling it
        if (typeof setFeedbacks === 'function') {
            setFeedbacks(prevFeedbacks => {
                const updatedFeedbacks = [...prevFeedbacks, newFeedback];
                // Save to local storage
                localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
                return updatedFeedbacks;
            });
        } else {
            console.error("setFeedbacks is not a function");
        }

        // Reset state after submission
        setRating(0);
        setComment('');
        setName('');
        setPhone('');
        setEmail('');
        setSubmitted(true);
    };

    return (
        //Thêm background cho đẹp hơn   
        <div className="feedback-background">
            <div className="feedback-container">
                <button onClick={handleGoBack} className="go-back-button-feedback">
                    ⭠ Previous Page
                </button>
                <div className="feedback-header">
                    <p>We are committed to providing you with the best dining experience possible, so we welcome your comments.</p>
                </div>
                <h2>Please fill out this questionnaire.</h2>
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-group">
                        <label>Customer Name*</label>
                        <input type="text" value={name} onChange={handleNameChange} placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <label>Email address*</label>
                        <input type="email" value={email} onChange={handleEmailChange} placeholder="E.g. abc@gmail.com" required />
                    </div>
                    <div className="form-group">
                        <label>Phone*</label>
                        <input type="text" value={phone} onChange={handlePhoneChange} placeholder="0123456789" required />
                    </div>
                    <div className="form-group">
                        <label>Your rating: </label>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} onClick={() => handleRatingChange(star)} className="star">
                                    {star <= rating ? '⭐' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Your Comment: </label>
                        <textarea value={comment} onChange={handleCommentChange} rows="4" cols="50" />
                    </div>
                    <button type="submit" className="submit-button">Submit Feedback</button>
                </form>
                {submitted && <p style={{ color: 'green' }}>Thank you for your feedback!</p>}
            </div>
        </div>

    );
};

Feedback.propTypes = {
    setFeedbacks: PropTypes.func,
};

export default Feedback;
