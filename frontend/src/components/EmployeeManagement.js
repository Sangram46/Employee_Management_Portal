import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Pagination } from 'react-bootstrap';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', position: '', salary: '',created_date:'' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch employees data
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Add or Edit employee logic
  const handleSave = async () => {
    if (currentEmployee) {
      await axios.put(`http://localhost:5000/api/employees/${currentEmployee.id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/employees', formData);
    }
    setShowModal(false);
    fetchEmployees(); 
  };

  // Delete employee logic
  // const handleDelete = async (id) => {
  //   await axios.delete(`http://localhost:5000/api/employees/${id}`);
  //   fetchEmployees(); // Refresh the table
  // };
  const confirmDelete = async () => {
    await axios.delete(`http://localhost:5000/api/employees/${employeeToDelete.id}`);
    setShowDeleteModal(false);
    fetchEmployees(); 
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  // Handle form data change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for Add or Edit
  const handleShowModal = (employee = null) => {
    setCurrentEmployee(employee);
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        salary: employee.salary,
        created_date:employee.created_date
      });
    } else {
      setFormData({ name: '', email: '', position: '', salary: '',created_date:'' });
    }
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  
   // Filter employees based on search query
   const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.salary.toString().includes(query) ||
      employee.created_date.toLowerCase().includes(query)
    );
  });

  //  Pagination logic employees based on current page and rowsPerPage
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  // const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Pagination logic
  // const totalPages = Math.ceil(employees.length / rowsPerPage);
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="container mt-5">
      {/* <h2>Employee Dashboard</h2> */}
      <div className="d-flex mb-3" style={{marginTop:"-20px"}}>
        <Form.Control
          type="text"
          placeholder="Search by name, position, salary, or date created"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="me-2"
        />
      </div>

      <Button variant="primary" onClick={() => handleShowModal()}>
        Add Employee
      </Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentEmployees.length > 0 ? (
      currentEmployees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.position}</td>
          <td>{employee.salary}</td>
          <td>{employee.created_date}</td>
          <td>
            <Button variant="success" onClick={() => handleShowModal(employee)}>
              Edit
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={() => handleDeleteClick(employee)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center">
          No employees found matching your search.
        </td>
      </tr>
    )}
        </tbody>
      </Table>

      {/* Modal for Add or Edit Employee */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEmployee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formPosition" className="mt-2">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleFormChange}
                placeholder="Enter position"
              />
            </Form.Group>
            <Form.Group controlId="formSalary" className="mt-2">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleFormChange}
                placeholder="Enter salary"
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{' '}
          <strong>{employeeToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
       {/* Pagination */}
      {/* <Pagination className="mt-3">
        {paginationItems}
      </Pagination> */}
      {filteredEmployees.length > 0 && <Pagination className="mt-3">{paginationItems}</Pagination>}
    
    </div>
  );
};

export default EmployeeManagement;
