import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './AddUser';

function Table() {

    const [users, setUsers]=useState([]);
    const [addUserVisible, setAddUserVisible]=useState(false);
    
    const getAllUsers= async()=>{
        const response = await fetch("https://ezone-api.herokuapp.com/table/getallusers",{
            method:"GET"
        });
        const json = await response.json();
        if(!json.success){
            toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
        }
        else if(json.success){
            setUsers(json.allUsers);
            console.log(json);
        }
        
    }
    useEffect(()=>{
        getAllUsers();
    },[addUserVisible])
    
    return (
        <section className="text-gray-600 body-font">
            <div style={{display:`${addUserVisible?"block":"none"}`}}>
                <AddUser setAddUserVisible={setAddUserVisible}/>
            </div>
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-900">User Table</h1>
                </div>
                <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Identification Number</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Room ID</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Number of Days</th>
                                <th onClick={()=>{setAddUserVisible(true)}} className="w-10 title-font cursor-pointer tracking-wider text-xl text-gray-900 bg-gray-100 rounded-tr rounded-br">+</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            users.map((user)=>{
                                
                            return <tr key={user.ID}>
                                <td className="px-4 py-3">{user.name}</td>    
                                <td className="px-4 py-3">{user.userID}</td>
                                <td className="px-4 py-3">{user.roomID}</td>
                                <td className="px-4 py-3">{user.noOfDays}</td>
                                {/* <td className="w-10 text-center">
                                    <input name="plan" type="radio"></input>
                                </td> */}
                            </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
                {/* <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                </div> */}
            </div>
        </section>
    )

}

export default Table;

