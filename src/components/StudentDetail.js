
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`https://student-api-nestjs.onrender.com/students/${id}`);
                setStudent(response.data.data);
            } catch (err) {
                setError('Failed to fetch student data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="student-detail-container">
            <h2>Student Detail</h2>
            <div className="student-detail-card">
                <h3>Studen Name: {student.name}</h3>
                <p><strong>Student Code:</strong> {student.studentCode}</p>
                <p><strong>Status:</strong> {student.isActive ? 'Active' : 'Inactive'}</p>
            </div>
        </div>
    );
};

export default StudentDetail;


    