import Calculator from "./pages/Calculator.jsx";
import EmployeeManagement from "./pages/EmployeeManagement.jsx";

// To add a new page: create the component in src/pages/, then add one entry here.
// The route AND the home-page button are both generated from this list.
// Remember to add the same path to PageController.java (see notes).
export const pages = [
  { name: "Calculator", path: "/calculator", desc: "Add, subtract, multiply, divide", component: Calculator },
  { name: "Employee Management", path: "/employee-management", desc: "Add, search and delete employees", component: EmployeeManagement },
];
