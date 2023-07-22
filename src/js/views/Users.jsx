
//VERSION3
//1.Importamos
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

//2 y 3
export const GetUsers = () =>{

    const[users, setUsers] = useState();
    

  const getUsers = async () => {
    // Verificamos si los datos están en el localStorage
    const usersLocalData = localStorage.getItem("usersLocal");
    if (usersLocalData) {
      const parsedUsers = JSON.parse(usersLocalData);
      // Verificamos si los datos tienen la propiedad "address"
      if (parsedUsers.every(user => user.address)) {
        setUsers(parsedUsers);
      } else {
        await fetchUsersFromAPI();
      }
    } else {
      await fetchUsersFromAPI();
    }
    
  };

  const fetchUsersFromAPI = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
  
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
      localStorage.setItem("usersLocal", JSON.stringify(data));
    } else {
      console.log("Error: ", response.status, response.statusText);
    }
  };
  

useEffect(()=>{
    getUsers();
},[])

    return (
        <div className="container">
            <h1 className="text-primary text-center">Users</h1>
            { !users ? 
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div> :  users.map ( (user) =>
                <div className="container" style={{maxWidth:750}}>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-2 text-center d-flex align-items-center justify-content-center">
                                <img src="https://tse3.mm.bing.net/th?id=OIP.zUdfLxrDwJVBcv9h-_mSEQAAAA&pid=Api"  style={{width: 100, height: 100}} alt="..."/>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-subtittle"><i className="fas fa-map-marker-alt me-4"></i>{user.address.suite}{user.address.street}. City: {user.address.city}</p>
                                    <p className="card-subtittle"><i className="fas fa-phone me-3"></i>{user.phone}</p> 
                                    <p className="card-subtittle"><i className="far fa-envelope me-3"></i>{user.email}</p>
                                </div>
                            </div>
                            <div className="col-md-3 text-end">
                                <div className="card-body me-3">
                                    <Link to={`/users/${user.id}`} className="btn btn-cutline-secondary me-2">
                                        <i className="far fa-address-card fa-3x me-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}