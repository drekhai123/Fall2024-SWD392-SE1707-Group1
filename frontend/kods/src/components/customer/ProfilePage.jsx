import { useState } from 'react';
import '../../css/ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    // Logic to save changes
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // Logic to reset the form or navigate away
    setName('');
    setAge('');
    setGender('');
    setPhoneNumber('');
    setAddress('');
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
          type='number'
          placeholder='Age'
          value={age}
          className='user-age'
          onChange={handleChangeAge}
        />
        <select
          value={gender}
          className='user-gender'
          onChange={handleChangeGender}
        >
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
        <input
          type='text'
          placeholder='Phone Number'
          value={phoneNumber}
          className='user-phone-number'
          onChange={handleChangePhoneNumber}
        />
        <input
          type='text'
          placeholder='Address'
          value={address}
          className='user-address'
          onChange={handleChangeAddress}
        />
        <div className='profile-buttons'>
          <button className='update-profile-btn' onClick={handleUpdateClick}>
            Save Changes
          </button>
          <button className='cancel-profile-btn' onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
