import React from "react";
import "./UserManual.scss";
function UserManual() {
  return (
    <div className="user-manual">
      <div className="sidebar">
        <ul>
          <li>
            <a href="/usermanual" tabIndex="3">
              User Manual
            </a>
          </li>
          <li>
            <a href="/homepage" tabIndex="4">
              HomePage
            </a>
          </li>
          <li>
            <a href="/configure" tabIndex="5">
              Configure
            </a>
          </li>
          <li>
            <a href="/enterusedbudget" tabIndex="6">
              Allocate Used Budget
            </a>
          </li>
        </ul>
      </div>

      <h1>Personal Budget Management System</h1>

      <h2>1. Introduction</h2>
      <p>
        <strong>1.1 Overview</strong>
        <br />
        The Personal Budget Management System allows you to efficiently manage
        your budget by allocating funds to different categories and tracking
        your expenses.
      </p>

      <p>
        <strong>1.2 System Access</strong>
        <br />
        Access the system through the login page using your registered
        credentials.
      </p>

      <h2>2. Getting Started</h2>
      <p>
        <strong>2.1 Registration</strong>
        <br />
        If you are a new user, click on the "Register" button on the login page.
        Fill in the required details to create your account.
      </p>

      <p>
        <strong>2.2 Login</strong>
        <br />
        Use your registered username and password to log in.
      </p>

      <h2>3. Dashboard</h2>
      <p>
        <strong>3.1 Overview</strong>
        <br />
        The dashboard provides a visual representation of your budget data
        through pie charts, bar graphs, and line graphs.
      </p>

      <p>
        <strong>3.2 Budget Allocation</strong>
        <br />
        Navigate to the "Configure" page to allocate budgets for different
        categories. You can also add new categories if needed.
      </p>

      <p>
        <strong>3.3 View Budget Data</strong>
        <br />
        The dashboard displays pie charts representing the percentage allocation
        of each category from the total budget. The bar graph shows the
        difference between the allocated budget and the used budget.
      </p>

      <p>
        <strong>3.4 Line Graph</strong>
        <br />
        The line graph illustrates the usage of the budget over months for a
        specific category.
      </p>

      <h2>4. Allocating Used Budget</h2>
      <p>
        <strong>4.1 Enter Used Budget</strong>
        <br />
        On the homepage, enter the used budget for a specific month, year, and
        category. Click "Submit" to update the system.
      </p>
    </div>
  );
}

export default UserManual;
