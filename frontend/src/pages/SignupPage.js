import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';
import '../styles/SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate.push('/event');
  };

  return (
    <div className="signup-page">
      <Register onSuccess={handleRegisterSuccess} />
    </div>
  );
}

export default SignupPage;
