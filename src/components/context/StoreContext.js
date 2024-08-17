import { createContext,useState,useEffect } from "react"
import { menu_list } from "../../assets/assets"
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000"

    const [cartItems,setCartItems] = useState({})
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])
    

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
         }
         else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
         }
         if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
         }

    }



const removeFromCart = async (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }

        }
const getTotalCartAmount = () =>{
    let totalAmount =0;
    for(const item in cartItems)
        {
            if (cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id === item);
            totalAmount += itemInfo.price* cartItems[item];
        }
    }
    return totalAmount;
}
const fetchFoodList = async () =>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
}


useEffect(()=>{
        
    async function loadData() {
        await fetchFoodList();
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            
    
        }
    }
    loadData();
},[])



  useEffect(()=>{
    console.log(cartItems);
  },[cartItems])  


    const contextvalue = {
        food_list,
        menu_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
        

    }
    return(
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}
    

export default StoreContextProvider

