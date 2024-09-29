import { useState } from 'react';
import '../../css/ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleUpdateClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className='profile-page-container'>
      <form className='profile-form'>
        <p className='profile-form-title'>Update Your Profile</p>
        <img
          src='/assets/user-placeholder.png'
          alt='User Avatar'
          className='user-avatar'
        />
        <input
          type='text'
          placeholder='Name'
          value={name}
          className='user-name'
          onChange={handleChangeName}
        />
        <input
          type='text'
          placeholder='Address'
          value={address}
          className='user-address'
          onChange={handleChangeAddress}
        />
        <input
          type='text'
          placeholder='Phone Number'
          value={phoneNumber}
          className='user-phone-number'
          onChange={handleChangePhoneNumber}
        />
        <button className='update-profile-btn' onClick={handleUpdateClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
