
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentManagement from './components/StudentManagement.js';
import StudentDetail from './components/StudentDetail.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentManagement />} />
                <Route path="/student/:id" element={<StudentDetail />} />
            </Routes>
        </Router>
    );
}

export default App;