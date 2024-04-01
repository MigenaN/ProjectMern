// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import LogOut from "./LogOut";
// import BookList from '../components/BookList';

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container" style={{ background: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
//       <header style={{ marginBottom: '20px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h2>Welcome</h2>
//           <LogOut />
//         </div>
      
//       </header>
//       <BookList />
//       <footer style={{ marginTop: '20px' }}>
//         <Link to='/create'>
//           <Button variant="primary">Add a new Book</Button>
//         </Link>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LogOut from "./LogOut";
import BookList from '../components/BookList';
import './Dashboard.css'; // Import your CSS file for additional styling

const Dashboard = () => {
  return (
    <div className="container-fluid dashboard-container">
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Welcome to Book Club</h2>
          <LogOut />
        </div>
      </header>
      <BookList />
      <footer className="mt-4 d-flex justify-content-between">
        <Link to='/create'>
          <Button variant="dark">Add a new Book</Button>
        </Link>
      </footer>
    </div>
  );
};

export default Dashboard;