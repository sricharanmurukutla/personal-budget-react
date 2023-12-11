import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ConfigurePage({ updateHomePageData }) {
  const [categoryAllocation, setCategoryAllocation] = useState('');
  const [allocated, setAllocated] = useState('');
  const [selectedMonthAllocation, setSelectedMonthAllocation] = useState('January');
  const [selectedYearAllocation, setSelectedYearAllocation] = useState(new Date().getFullYear());
  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [categoryDeallocation, setCategoryDeallocation] = useState('');
  const [categoryDeallocationList, setCategoryDeallocationList] = useState([]);
  const [selectedMonthDeallocation, setSelectedMonthDeallocation] = useState('January');
  const [selectedYearDeallocation, setSelectedYearDeallocation] = useState(new Date().getFullYear());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Fetch all categories for the datalist
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-all-categories');
        setAllCategories(response.data);
        const storedUserId = localStorage.getItem("userId");

        fetchDelocatedCategories(selectedYearDeallocation,selectedMonthDeallocation,storedUserId)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchAllCategories();
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchDelocatedCategories = (year, month, userId) => {
    axios
      .get(`http://localhost:3000/api/get-budgets/${year}/${month}/${userId}`)
      .then((response) => {
        setCategoryDeallocationList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  const handleAllocationSubmit = async (e) => {
    e.preventDefault();
    

    const userId = localStorage.getItem('userId');

    // Ensure allocated is a valid number
    const allocatedValue = parseFloat(allocated);

    // Check if allocated is a valid number
    if (isNaN(allocatedValue)) {
      console.error('Invalid value for allocated:', allocated);
      // Handle the error or inform the user
      toast.error('Invalid value for allocated. Please enter a valid number.');
      return;
    }

   

    const budgetData = {
      category: categoryAllocation,
      allocated: allocatedValue,
      month: selectedMonthAllocation,
      year: selectedYearAllocation,
      userId,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/configure-budget', budgetData);
      console.log(response.data);
      toast.success('Budget Allocated Successfully!');
      if (typeof updateHomePageData === 'function') {
        updateHomePageData();
      }
    } catch (error) {
      console.error('Error configuring budget:', error);
      toast.error('Error configuring budget. Please try again or contact the admin.');
    }

    setCategoryAllocation('');
    setAllocated('');
  };

  const handleDeallocationSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const deallocateData = {
      category: categoryDeallocation,
      month: selectedMonthDeallocation,
      year: selectedYearDeallocation,
      userId,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/deallocation-budget', deallocateData);
      console.log(response.data);
      toast.success('Budget Deallocated Successfully!');
      if (typeof updateHomePageData === 'function') {
        updateHomePageData();
      }
    } catch (error) {
      console.error('Error deallocating budget:', error);
      toast.error('Error deallocating budget. Please try again or contact the admin.');
    }

    setCategoryDeallocation('');
  };

  // Array of all months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


    




      return (
        <div style={{ margin: '0 auto', display:'flex', height:'100%' }}>
          <ToastContainer />
          {isSidebarOpen && (
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
          )}
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Configure Budget</h2>
      <div>
      <button onClick={toggleSidebar} style={{ marginLeft: '10px', marginBottom: '10px' }}>
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
       
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Allocation Form */}

        <form style={{ width: '48%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }} onSubmit={handleAllocationSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Category:
            <input type="text" list='categoriesAllocatedList' value={categoryAllocation} onChange={(e) => setCategoryAllocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <datalist id="categoriesAllocatedList">
              {allCategories.length > 0 && allCategories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Allocated Budget:
            <input type="number" value={allocated} onChange={(e) => setAllocated(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Month:
            <select value={selectedMonthAllocation} onChange={(e) => setSelectedMonthAllocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Year:
            <input type="number" value={selectedYearAllocation} onChange={(e) => setSelectedYearAllocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </label>
          <button type="submit" style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Allocate</button>
        </form>

        {/* Deallocation Form */}
        <form style={{ width: '48%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }} onSubmit={handleDeallocationSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Category to Deallocate:
            <input
              type="text"
              list="categoriesList"
              value={categoryDeallocation}
              onChange={(e) => setCategoryDeallocation(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <datalist id="categoriesList">
              {categoryDeallocationList.length > 0 && categoryDeallocationList.map((category) => (
                <option key={category.id} value={category.category} />
              ))}
            </datalist>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Month:
            <select value={selectedMonthDeallocation} onChange={(e) => setSelectedMonthDeallocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Year:
            <input type="number" value={selectedYearDeallocation} onChange={(e) => setSelectedYearDeallocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </label>
          <button type="submit" style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Deallocate</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default ConfigurePage;
