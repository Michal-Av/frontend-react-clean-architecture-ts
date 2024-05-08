import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../services/api-auth';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../components/Containers/Form/Form';
import { useTranslation } from 'react-i18next';
import '../styles/Login.css';
import LanguageSelector from '../components/UIElements/Select/LanguageSelector';
import Logo from '../assets/images/logo/3.png';


interface ResetPasswordParams {
  token: string;
}

interface ResetPasswordPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword: React.FC<ResetPasswordPageProps> = ({ setLoggedIn }) => {
 
  const { token } = useParams<ResetPasswordParams>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { t, i18n } = useTranslation();
  const history = useHistory();
  
  const passFields = [
    { label: t('Password :'), type: 'password', name: 'password', placeholder: t('') },
    { label: t('Confirm Password :'), type: 'password', name: 'confirm password',placeholder: t('')}
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await resetPassword(token, newPassword);
      setResetSuccess(true);
      setMessage('Password reset successfully');
      history.push('/login');
    } catch (error) {
      setMessage('An error occurred while resetting the password');
    }
  };

  if (resetSuccess) {
    return (
      <div>
        <h2>Password Reset Successful</h2>
        <p>Your password has been successfully reset.</p>
      </div>
    );
  }

  return (
    <div className="lang-con">

      <LanguageSelector onLanguageChange={i18n.changeLanguage} />
      <div className="center-box">
      <Form
      onSubmit={handleSubmit}
      message={message}
      fields={passFields}
      buttonText={ t('reset')}
      actionText={t('Reset Password')}
      onActionClick={()=>{}}
      onForgotClick ={()=>{}}
      />
</div>
    </div>
  );
};

export default ResetPassword;
