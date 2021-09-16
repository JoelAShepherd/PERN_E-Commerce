import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from '../login/loginSlice';

export default function Dashboard() {
  const userName = useSelector(selectUserName)
  return(
    <div>
      <h2>Dashboard</h2>
      <p>Hello {userName}</p>
    </div>
  );
}

