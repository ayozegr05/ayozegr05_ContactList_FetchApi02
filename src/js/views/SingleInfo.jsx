
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SingleInfo = () => {
  const params = useParams();
  const [userView, setUserView] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const usersLocalData = localStorage.getItem('usersLocal');
      if (usersLocalData) {
        const parsedUsers = JSON.parse(usersLocalData);
        const user = parsedUsers.find((user) => user.id === parseInt(params.userId));
        if (user) {
          setUserView(user);
        } else {
          console.log(`User with id ${params.userId} not found.`);
        }
      } else {
        console.log('Users data not found in localStorage.');
      }
    };

    fetchUser();
  }, [params.userId]);

  if (!userView) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: 550 }}>
      <div className="card my-1 mx-4 text-center d-flex align-items-center justify-content-center">
        <h5>User: {userView.id}</h5>
        <div>
          <img src="https://tse3.mm.bing.net/th?id=OIP.zUdfLxrDwJVBcv9h-_mSEQAAAA&pid=Api" className='mb-4 me-4' style={{ width: 50, height: 50 }} alt="..." />
          <h1 className="card-text ms-3 d-inline">{userView.name}</h1>
        </div>
        <p className="card-text">Company: {userView.company.name}</p>
        <p className="card-text">Email: {userView.email}</p>
        <p className="card-text">Website: {userView.website}</p>
        <p className="card-text">Phone: {userView.phone}</p>
        <p className="card-text">{userView.username}</p>
        <p className="card-text">
          {userView.address.city}, zipcode: {userView.address.zipcode}
        </p>
      </div>
    </div>
  );
};