import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, getEmployee, createEmployee, deleteEmployee } from "../api/employeeApi.js";
import { errorMessage } from "../api/client.js";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", salary: "" });
  const [searchId, setSearchId] = useState("");
  const [status, setStatus] = useState({ msg: "", error: false });

  const say = (msg, error = false) => setStatus({ msg, error });
  const setField = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  async function loadAll() {
    try {
      setEmployees(await getEmployees());
      say("");
    } catch (err) {
      say(errorMessage(err), true);
    }
  }

  useEffect(() => { loadAll(); }, []);

  async function handleAdd() {
    const { name, salary } = form;
    if (!name.trim() || salary === "") return say("Enter a name and salary.", true);
    try {
      await createEmployee({ name: name.trim(), salary: Number(salary) });
      setForm({ name: "", salary: "" });
      await loadAll();
      say("Employee added.");
    } catch (err) {
      say(errorMessage(err), true);
    }
  }

  async function handleSearch() {
    if (searchId === "") return say("Enter an ID to search.", true);
    try {
      setEmployees([await getEmployee(searchId)]);
      say("");
    } catch (err) {
      if (err.status === 404) {
        setEmployees([]);
        say(`Employee with ID ${searchId} not found.`, true);
      } else {
        say(errorMessage(err), true);
      }
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEmployee(id);
      await loadAll();
      say(`Deleted employee ${id}.`);
    } catch (err) {
      say(errorMessage(err), true);
    }
  }

  function showAll() {
    setSearchId("");
    loadAll();
  }

  return (
    <main className="card emp">
      <Link to="/" className="back">← Home</Link>
      <h1>Employee Management System</h1>
      <p className="sub">Add an employee with a name and salary. The ID is assigned by the database.</p>

      <div className={"status" + (status.error ? " error" : "")}>{status.msg}</div>

      <div className="fields two">
        <label>Employee Name
          <input type="text" placeholder="e.g. Priya Sharma" value={form.name} onChange={setField("name")} />
        </label>
        <label>Employee Salary
          <input type="number" step="any" placeholder="e.g. 45000" value={form.salary} onChange={setField("salary")} />
        </label>
      </div>
      <div className="actions">
        <button onClick={handleAdd}>Add Employee</button>
        <button className="secondary" onClick={showAll}>Show All</button>
      </div>

      <div className="search-row">
        <label>Search by ID
          <input type="number" placeholder="e.g. 1" value={searchId} onChange={e => setSearchId(e.target.value)} />
        </label>
        <button className="secondary" onClick={handleSearch}>Search</button>
        <button className="secondary" onClick={showAll}>Clear</button>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Salary</th><th></th></tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="4" className="empty">No employees to show.</td></tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.salary}</td>
                <td><button className="del-btn" onClick={() => handleDelete(emp.id)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
