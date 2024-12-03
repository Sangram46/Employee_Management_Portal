const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Add a new employee
router.post('/employees', async (req, res) => {
    const { name, email, position, salary } = req.body;
    try {
        const newEmployee = await Employee.create({ name, email, position, salary });
        res.json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Update employee details
router.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, position, salary } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) return res.status(404).send('Employee not found');
        
        employee.name = name;
        employee.email = email;
        employee.position = position;
        employee.salary = salary;

        await employee.save();
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) return res.status(404).send('Employee not found');
        
        await employee.destroy();
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
