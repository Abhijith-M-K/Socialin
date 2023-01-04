import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './UserList.css'

import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'

const Userlist = () => {
  const [user, setUser] = useState([])

  const blockUser = async (userID) => {
    try {
      
      const response = await axios.post(
        "http://localhost:5000/admin/block-user",
        { userID }
      );

      if (response.data.success) {
        console.log("Blocked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unBlockUser = async (userID) => {
    try {
     
      const response = await axios.post(
        "http://localhost:5000/admin/unblock-user",
        { userID }
      );

      if (response.data.success) {
        console.log("unBlocked");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect( () => {
    async function usersList() {
      try {
        const userData = await axios.get(
          "http://localhost:5000/admin/get-users"
        );

        if (userData.data.success) {
          console.log(userData.data.formattedFriends, "first line admin");
          setUser(userData.data.formattedFriends);
        }
      } catch (error) {
        console.log(error);
      }
    }
    usersList();
  }, []);
  return (
    <React.Fragment>
    <div className='userTable-main'>
        <div className="usersList">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                        <th>Email</th>
                        <th></th>
                        
                        {/* <th>Status</th>
                        <th></th>
                        <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                 

                    {user?.map((obj, index, id) => {
                      return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{obj.firstname}</td>
                                <td></td>
                                <td>{obj.username}</td>
                               
                                {/* <td>{obj.mobile}</td>
                                <td>{obj.Active ? 'Active' : 'Blocked'}</td> */}
                                <td>
                                  {/* <Button className="commentButton" >Block</Button>
                                  <Button className='unblockbutton'  >Unblock</Button> */}
                                  <button onClick={(()=>{
                                    if (window.confirm("Do you want to block this user?"))
                                    blockUser(obj._id)
                                  })} className={obj.Active? "commentButton" : "null" }>Block</button>
                                  <button onClick={(()=>{
                                    if (window.confirm("Do you want to unblock this user?"))
                                    unBlockUser(obj._id)
                                  })} className={obj.Active? "null" : "unblockbutton" }>Unblock</button>
                                </td>

                            </tr>
                      )
                    })}

                </tbody>
            </Table>
        </div>
    </div>

</React.Fragment>
  )
}

export default Userlist