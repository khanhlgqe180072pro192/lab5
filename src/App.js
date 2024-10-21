import React, { useState } from 'react';
import { Form, Button, Table, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentManagement() {
  const [students, setStudents] = useState([
    { name: 'Nguyen Van A', code: 'CODE12345', active: true },
    { name: 'Tran Van B', code: 'CODE67890', active: false }
  ]);
  
  const [selectedCount, setSelectedCount] = useState(0);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', active: false });
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Thêm học sinh mới
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.code) {
      setStudents([newStudent, ...students]);
      setNewStudent({ name: '', code: '', active: false });
    }
  };

  // Xóa học sinh
  const handleDeleteStudent = (studentCode) => {
    setStudents(students.filter((student) => student.code !== studentCode));
  };

  // Select
  const handleSelectStudent = (studentCode) => {
    const newSelectedStudents = selectedStudents.includes(studentCode)
      ? selectedStudents.filter((code) => code !== studentCode)
      : [...selectedStudents, studentCode];
      
    setSelectedStudents(newSelectedStudents);
    setSelectedCount(newSelectedStudents.length);
  };

  // Xóa tất cả
  const handleClearStudents = () => {
    setStudents([]);
    setSelectedStudents([]);
    setSelectedCount(0);
  };

  return (
    <div className="container">
      <h4>Total Selected Student: {selectedCount}</h4>
      <Button variant="primary" onClick={handleClearStudents} className="mb-3">Clear</Button>
      
      <Form>
        <Form.Group controlId="formStudentName">
          <Form.Control
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formStudentCode" className="mt-2">
          <Form.Control
            type="text"
            placeholder="Student Code"
            value={newStudent.code}
            onChange={(e) => setNewStudent({ ...newStudent, code: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formStudentActive" className="mt-2">
          <Form.Check
            type="checkbox"
            label="Still Active"
            checked={newStudent.active}
            onChange={(e) => setNewStudent({ ...newStudent, active: e.target.checked })}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddStudent} className="mt-3">Add</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(student.code)}
                  onChange={() => handleSelectStudent(student.code)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                {student.active ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="danger">In-active</Badge>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteStudent(student.code)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentManagement;