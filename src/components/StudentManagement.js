import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import axios from 'axios';

const StudentManagement = () => {
    const [students, setStudents] = useState([]); // State to manage the list of students
    const [selectedCount, setSelectedCount] = useState(0); // State to keep track of selected students
    const [newStudent, setNewStudent] = useState({ name: '', studentCode: '', isActive: false }); // State for storing new student details
    const [loading, setLoading] = useState(false);  // State to manage loading status
    const [error, setError] = useState('');  // State to manage error messages

    const API_URL = 'https://student-api-nestjs.onrender.com/students'; // API endpoint for student operations

    // Fetch students when the component mounts
    useEffect(() => {
        fetchStudents();
    }, []);

    // Function to fetch students from the API
    const fetchStudents = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(API_URL);
            console.log("API response:", response.data); 
            if (response.data.success) {
                setStudents(response.data.data); // Update students state with the data from API
            } else {
                setError("Failed to fetch students: " + response.data.message); // Handle unsuccessful response
            }
        } catch (error) {
            setError("Error fetching students: " + error.message); // Handle errors during API call
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // Function to add a new student to the list
    const handleAddStudent = async () => {
        // Validate input before sending
        if (!newStudent.name || !newStudent.code) {
            setError('Name and code are required.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post(API_URL, {
                name: newStudent.name,
                studentCode: newStudent.studentCode,
                isActive: newStudent.isActive
              }, {
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            if (response.status === 200 || response.status === 201) {
                setStudents([response.data, ...students]); // Add new student to the list
                setNewStudent({ name: '', studentCode: '', isActive: false }); // Reset the form fields
            } else {
                setError("Failed to add student, please check your data."); // Handle unsuccessful response
            }
        } catch (error) {
            if (error.response) {
                // Server responded with an error
                setError("Error adding student: " + (error.response.data.message || error.message));
            } else {
                // No response from server (e.g., network issues)
                setError("Error adding student: " + error.message);
            }
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // Function to delete a student by ID
    const handleDelete = async (id) => {
        setLoading(true);
        setError('');
        try {
            await axios.delete(`${API_URL}/${id}`); // Delete student using API
            fetchStudents(); // Refresh the student list after deletion
        } catch (error) {
            if (error.response) {
                setError("Error deleting student: " + (error.response.data.message || error.message));
            } else {
                setError("Error deleting student: " + error.message);
            }
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // Function to handle selecting/deselecting students
    const handleSelect = (e) => {
        const updatedCount = e.target.checked ? selectedCount + 1 : selectedCount - 1;
        setSelectedCount(updatedCount); // Update the count of selected students
    };

    // Function to clear all students from the list
    const handleClear = () => {
        setStudents([]); // Clear the list of students
        setSelectedCount(0); // Reset selected count to zero
    };

    return (
        <div className="container mt-4">
            {loading && <p>Loading...</p>} {/* Display loading indicator */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
            <h4>Total Selected Student: {selectedCount}</h4> {/* Display total count of selected students */}
            <StudentForm newStudent={newStudent} setNewStudent={setNewStudent} onAdd={handleAddStudent} onClear={handleClear} /> {/* Form to add new student */}
            <StudentList students={students} onDelete={handleDelete} onSelect={handleSelect} /> {/* List of students */}
        </div>
    );
};

export default StudentManagement;


