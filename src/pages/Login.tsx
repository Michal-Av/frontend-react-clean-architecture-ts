import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../components/Containers/Form/Form';
import { login, signup } from '../services/api-auth';
import { useTranslation } from 'react-i18next';
import '../styles/Login.css';
import LanguageSelector from '../components/UIElements/Select/LanguageSelector';
import Logo from '../assets/images/logo/3.png';

interface LoginCompProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginComp: React.FC<LoginCompProps> = ({ setLoggedIn }) => {
  const [signupMode, setSignupMode] = useState<boolean>(false);
  const [ForgotMode, setForgotMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  // Define translated login and signup fields
  const loginFields = [
    { label: t('User Name :'), type: 'text', name: 'username', placeholder: t('Enter your username') },
    { label: t('Password :'), type: 'password', name: 'password', placeholder: t('Enter your password') }
  ];

  const signupFields = [
    { label: t('Email :'), type: 'email', name: 'email', placeholder: t('Enter your email') },
    { label: t('User Name :'), type: 'text', name: 'username', placeholder: t('Enter your username') },
    { label: t('Password :'), type: 'password', name: 'password', placeholder: t('Enter your password') }
  ];

  const forgotPasswordFields = [
    { label: t('Email :'), type: 'email', name: 'email', placeholder: t('Enter your email') }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('loggedIn') === 'true') {
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true'); // Store authentication state in session storage as backup
    }
  }, [location.search, setLoggedIn]);

  const handleLogin = async (formData: { username: string; password: string }) => {
    try {
      await login(formData.username, formData.password);
      console.log('Logged in successfully');
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true'); // Store authentication state in session storage
      history.push('/home');
    } catch (error) {
      setMessage('User Name or password incorrect');
    }
  };

  const handleSignup = async (formData: { email: string; username: string; password: string }) => {
    try {
      await signup(formData.email, formData.username, formData.password);
      setMessage('User Created!');
      setSignupMode(!signupMode);
    } catch (error) {
      setMessage('User not created');
    }
  };

    // Handle forgot password submission
    const handleForgotPassword = async (formData: { email: string }) => {
      try {
        // Implement your forgot password logic here
        console.log('Forgot password form submitted');
        setForgotMode(false); // After submitting, revert to the login form
      } catch (error) {
        setMessage('Failed to process the request');
      }
    };
  

  // Determine the form alignment based on language direction
  const formAlignmentClass = i18n.language === 'he' ? 'login-form-right' : 'login-form-left';

  return (
    <div className="sidebar">
      <div className="logo-lang-container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <LanguageSelector onLanguageChange={i18n.changeLanguage} />
      </div>
      {!ForgotMode? <div className={`main-page ${formAlignmentClass}`}>
        {/* Apply the appropriate alignment class */}
        <Form
          onSubmit={signupMode ? handleSignup : handleLogin}
          message={message}
          fields={signupMode ? signupFields : loginFields}
          buttonText={signupMode ? t('signup') : t('login')}
          actionText={signupMode ? t('Create your account') : t('Log in to your account')}
          onActionClick={() => setSignupMode(!signupMode)}
          onForgotClick={() => setForgotMode(true)}
        />
      </div> : 
     (
      <div className={`main-page ${formAlignmentClass}`}>
        {/* Apply the appropriate alignment class */}
        <Form
          onSubmit={handleForgotPassword}
          message={message}
          fields={forgotPasswordFields}
          buttonText={t('Send Reset Email')}
          actionText={t('Forgot Password?')}
          onActionClick={() => setForgotMode(false)} // Toggle back to the login form
          onForgotClick={() => setForgotMode(false)}
        />
      </div>
    )}
    </div>
  );
};

export default LoginComp;
