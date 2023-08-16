import './App.css';
import EmployeeDetails from './components/EmployeeDetails';
import { Provider } from 'react-redux'
import empStore from './stores/employeeStore';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Provider store={empStore}>
        <Routes>
          <Route path='/' element={<EmployeeDetails />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
