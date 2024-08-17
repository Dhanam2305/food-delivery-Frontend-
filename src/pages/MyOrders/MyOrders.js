import React,{useState,useEffect,useContext}from 'react'
import './MyOrders.css'
import { StoreContext } from '../../components/context/StoreContext';
import { assets } from '../../assets/assets';
import axios from "axios"
const MyOrders = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () =>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if (token){
            fetchOrders();
        }
    },[token])

  
    return (
        <div className='my-orders'>
    <     h2>MyOrders</h2>
    
          <div className='container'>
               {data.map((order,index)=>{
                  return(
                    <div key={index} className='my-orders-order'>
                          <img src={assets.parcel_icon} alt=''/>
                          <p>{order.items.map((item,index)=>{
                                 if (index===order.items.length-1){
                                    return item.name+" x "+item.quantity
                                 }
                                 else{
                                    return item.name+" x "+item.quantity+", "
                                 }
                          })}</p>
                          <p>${order.amount}.00</p>
                          <p>Items: {order.items.length}</p>
                          <p><span>&#25cf</span> <b>{order.status}</b></p>
                          <button onClick={fetchOrders}>Track order</button>
                    </div>
                  )
               })}
          </div>
    
    
    
        </div>
      )
    }
    
    export default MyOrders
    
    