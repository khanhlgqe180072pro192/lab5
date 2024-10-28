import React from 'react';
import { Table, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Component to display the list of students
const StudentList = ({ students, onDelete, onSelect }) => {
    // Check if the students array is empty or not valid
    if (!Array.isArray(students) || students.length === 0) {
        return <p>No students available.</p>; // Display message if no students are present
    }

    return (
        <Table striped bordered hover className="student-list-table"> {/* Bootstrap Table for displaying students */}
            <thead>
                <tr>
                    <th>Select</th> {/* Column for selecting students */}
                    <th>Student Name</th> {/* Column for student names */}
                    <th>Student Code</th> {/* Column for student codes */}
                    <th>Status</th> {/* Column for active/inactive status */}
                    <th>Action</th> {/* Column for action buttons */}
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student._id}> {/* Each student row */}
                        <td>
                            {/* Checkbox to select a student */}
                            <Form.Check type="checkbox" onChange={(e) => onSelect(e, student)} />
                        </td>
                        <td>
                            {/* Link to view student details */}
                            <Link to={`/student/${student._id}`}>{student.name}</Link>
                        </td>
                        <td>{student.studentCode}</td> {/* Display student code */}
                        <td>
                            {/* Display active/inactive status with color badges */}
                            <Badge bg={student.isActive ? 'success' : 'danger'}>
                                {student.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </td>
                        <td>
                            {/* Button to delete the student */}
                            <Button variant="danger" onClick={() => onDelete(student._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default StudentList;