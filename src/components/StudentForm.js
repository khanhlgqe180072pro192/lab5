import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const StudentForm = ({ newStudent, setNewStudent, onAdd, onClear }) => {
    return (
        <Form className="student-form mb-3 p-4 border rounded">
            {/* Enter student name */}
            <Form.Group controlId="studentName" className="mb-3">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter student name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
            </Form.Group>

            {/* Enter student code */}
            <Form.Group controlId="studentCode" className="mb-3">
                <Form.Label>Student Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter student code"
                    value={newStudent.code}
                    onChange={(e) => setNewStudent({ ...newStudent, code: e.target.value })}
                />
            </Form.Group>

            {/* Check student active status */}
            <Form.Group controlId="studentActive" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Still Active"
                    checked={newStudent.isActive}
                    onChange={(e) => setNewStudent({ ...newStudent, isActive: e.target.checked })}
                />
            </Form.Group>

            {/* Action buttons */}
            <Row>
                <Col>
                    <Button variant="primary" onClick={onAdd} className="w-100">Add Student</Button>
                </Col>
                <Col>
                    <Button variant="secondary" onClick={onClear} className="w-100">Clear Data</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default StudentForm;
