import React, { useState } from 'react';
import '../../css/Feedback.css';

const FeedbackList = () => {

    const [feedbacks] = useState([
        { rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },
        { rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },{ rating: 5, comment: 'Great service!', name: 'Alice', phone: '1234567890', email: 'alice@example.com' },
        { rating: 4, comment: 'Good food.', name: 'Bob', phone: '0987654321', email: 'bob@example.com' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 10;

    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    const renderStars = (rating) => {
        return (
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star">
                        {star <= rating ? '⭐' : '☆'}
                    </span>
                ))}
            </div>
        );
    };

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(feedbacks.length / feedbacksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="feedback-list-container">
            <h2>Feedback List</h2>
            {feedbacks.length === 0 ? (
                <p>No feedback available.</p>
            ) : (
                <div>
                    <table className="feedback-table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Rating</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeedbacks.map((feedback, index) => (
                                <tr key={index}>
                                    <td>{feedback.name}</td>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.phone}</td>
                                    <td>{renderStars(feedback.rating)}</td>
                                    <td>{feedback.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {pageNumbers.map(number => (
                            <span key={number} id={number} onClick={handleClick} className={`page-number ${currentPage === number ? 'active' : ''}`}>
                                {number}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackList;