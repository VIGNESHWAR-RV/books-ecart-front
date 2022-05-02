
import { useState,useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API } from "../API";
import { context } from "../App";
import { FilteredBooksSkeletonLoading } from "./FilteredBooksComponent/SkeletonLoading";
import { Discount,giveDate } from "../Utils";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
// import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import { IconButton } from "@mui/material";


export function CartDetails(){

    const {cartItems,updatingCheckOutItems,handleCartDialogClose,handleCheckOutDialogOpen} = useContext(context);

    const navigate = useNavigate();

    const [cartItemsDetails , setCartItemsDetails] = useState("");

    const componentMounted = useRef(true);


    const getCartData=async(isComponentMounted,cartItems)=>{
        // let cartItemsIds = Object.keys(cartItems);
        // console.log(cartItemsIds);
        // let Id = {}
        // const anonymousUser  = sessionStorage.getItem("anonymousUser");
        // const accountUser = sessionStorage.getItem("accountUser");
        // if(anonymousUser !== null || anonymousUser !== undefined || anonymousUser !== ""){
        //    Id = {anonymousUser};
        // }
        // if(accountUser !== null || accountUser !== undefined || accountUser !== ""){
        //    Id = {accountUser};
        // }
        if(isComponentMounted){

            if(cartItemsDetails !== "" && cartItemsDetails.length === 0 ){
                setCartItemsDetails("");
            }


            const response = await fetch(`${API}cartItems/`,
                                          {method:"POST",
                                           headers:{"Content-Type":"application/json"},
                                           body:JSON.stringify(cartItems)});

               const data = await response.json();
              
               if(isComponentMounted){
                    
                    if(response.status === 200){

                        setCartItemsDetails([...data.result]);
                        return;
                    }
                    else{
                        toast.error("Server Busy, Please try again Later");
                        setCartItemsDetails([]);
                        return; 
                    }
               }
        }
    }

    const handleCartUpdate=(cartItems)=>{
        getCartData(componentMounted.current,cartItems);
    }
    
    useEffect(()=>{

        
        getCartData(componentMounted.current,cartItems);

        return()=>{ 
            //  setCartItemsDetails("");
             componentMounted.current = false;}

    // eslint-disable-next-line
    },[]);

    const [cartPrice,setCartPrice] = useState(0);

    //  console.log(cartItemsDetails,cartItems);

    return(
      <Box sx={{height:"85vh",overflow:"hidden"}}>

             {/* heading */}
        <Box sx={{display:"flex",my:1,mx:2,alignItems:"center",height:"8vh",color:"#ff8800"}}>
           <Fab sx={{mr:2,backgroundColor:"#ff8800"}} onClick={()=>handleCartDialogClose()}>
                   <ArrowBackRoundedIcon/>
           </Fab>
           <h1><i>Shopping cart</i></h1>
           <h1 id="priceHeadingDialog" style={{marginLeft:"auto",width:"12vw"}}><i>Price</i></h1>
        </Box>

             {/* body */}
        <Box sx={{overflowY:"auto",width:"100%",height:"65.5vh"}}>
          {
           (cartItemsDetails !== "")
             ?<>
                {(cartItemsDetails.length !== 0)
                  ? cartItemsDetails.map((book)=><CartItem 
                                                       key={book._id} 
                                                       book={book} 
                                                       handleCartDialogClose={handleCartDialogClose} 
                                                       handleCartUpdate={handleCartUpdate} 
                                                       cartPrice={cartPrice}
                                                       setCartPrice={setCartPrice} />)

                  :<Box sx={{width:"100%",height:"75%",display:"grid",alignContent:"center",justifyContent:"center"}}>
                     <h1>No Items in the Cart</h1>
                     <Button color="warning"
                      onClick={()=>{navigate("/New Arrivals");handleCartDialogClose()}}>
                         Explore New Arrivals
                     </Button>
                   </Box>}
              </>
             :<Box sx={{m:1,my:6}}>
                 <FilteredBooksSkeletonLoading/>
                 <FilteredBooksSkeletonLoading/>
              </Box> 
          }
        </Box>
 
            {/* footer */}
        <Box sx={{display:"flex",mx:2,height:"11vh",alignItems:"center",borderTop:"2px solid #ff8800"}}>
            {/* <Button 
            color="error"
            onClick={()=>handleCartDialogClose()}>
                Close
            </Button> */}
           {(cartItemsDetails.length !== 0)
             ?<>
                 <Box sx={{minWidth:"4rem",ml:"auto",width:"auto",textAlign:"center"}}>
                   <h1 id="cartTotal" style={{margin:"0"}}><i>Total - <span style={{color:"#ff8800"}}>₹ {cartPrice}</span></i></h1>
                </Box>
                <Button sx={{m:3,p:1,px:1,maxWidth:"40vw",fontSize:"normal"}} 
                   color="warning"
                   variant="contained"
                   onClick={()=>{handleCheckOutDialogOpen("checkout");handleCartDialogClose();updatingCheckOutItems(cartItems)}}>
                     Proceed to buy
                 </Button>
              </>
             :""}
        </Box>

      </Box>
    )
}


function CartItem({book,handleCartDialogClose,handleCartUpdate,cartPrice,setCartPrice}){


    const navigate = useNavigate();

    const {cartItems,theme,removeCart,updatingCartItems} = useContext(context);

    const [itemQuantity,setItemQuantity] = useState(cartItems[book._id]?.qty??"");

    useEffect(()=>{
          if(cartPrice === 0){
             setCartPrice(prevPrice=>prevPrice + (+Discount(book.price,book.discount)* +cartItems[book._id].qty));
          }
         // eslint-disable-next-line
      },[]);

    let user= {};
    const anonymousUser  = sessionStorage.getItem("anonymousUser");
    const accountUser = sessionStorage.getItem("accountUser");
    if(anonymousUser !== null && anonymousUser !== undefined && anonymousUser !== ""){
       user = {anonymousUser};
    }
    else if(accountUser !== null && accountUser !== undefined && accountUser !== ""){
       user = {accountUser}
    }

    const handleItemIncrease =(id)=>{

        // const value = cartItems[id].qty;
      
        if( +itemQuantity + 1 <= 10){
           setItemQuantity(+itemQuantity+1);
           const items = {...cartItems};
           items[id].qty += 1;
           setCartPrice(prevPrice=>prevPrice + (+Discount(book.price,book.discount)* 1));
           if(user.anonymousUser !== undefined || user.accountUser !== undefined){
            updatingCartItems({...user},items);
           }
           return;
        }
        else{
            toast.error("only 10 quantities are allowed per book for one order");
            return;
        }

    }

    const handleItemDecrease =(id)=>{

        // const value = cartItems[id].qty;

        if( +itemQuantity - 1 >= 1){
            setItemQuantity(+itemQuantity - 1);
            const items = {...cartItems};
            items[id].qty -= 1;
            setCartPrice(prevPrice=>prevPrice - (+Discount(book.price,book.discount)* 1));
            if(user.anonymousUser !== undefined || user.accountUser !== undefined){
             updatingCartItems({...user},items);
            }
            return;
         }
         else{
             return;
         }
    }

    const handleRemoveFromCart= async(id)=>{
        // console.log("re-rendering due to state update");
        // setShowLoading(true);
        const items = {...cartItems};
        setCartPrice(prevPrice=>prevPrice - (+Discount(book.price,book.discount)* +items[id].qty));
        delete items[id];
        handleCartUpdate(items);
        removeCart(id);
        return;
    }


    return(
      <>
        {(cartItems[book._id] !== undefined)
          ?<>
           <Box id="cartDialog" sx={{m:2,display:"grid",gridTemplateColumns:"8fr 2fr"}}>

          <Box id="imageBoxDialog" sx={{display:"flex",
                  columnGap:"1vmax",
                  my:2,
                  // justifyContent: "start",
                  alignItems:"center"}}>
             <img id="bookImage"
               style={{ minHeight: "18vh",minWidth:"10rem", objectFit: "cover", cursor:"pointer",borderRadius:"1.5rem" }}
               src={book.thumbnailUrl}
                //   loading="lazy"
               alt={book.title}
               onClick={()=>{navigate(`/Books/${book.title}`);handleCartDialogClose()}}>
             </img>
             <Box sx={{ fontSize: "1rem",display:"grid",alignContent:"center" }}>
  
                <b style={{fontSize:"1.6rem",color:"#ff8800"}}><i>{book.title}</i></b>
                <p style={{margin:"0"}}>By: <b><i>{(typeof(book.authors)!=="string")?book.authors.join(", "):book.authors}</i></b></p>
                <p style={{margin:"0"}}>Release: <b><i>{giveDate(book.publishedDate)}</i></b></p>
                <p style={{margin:"0"}}>Price: 
                  <b><i>
                    <strike>₹{book.price}</strike>
                    <span style={{color:"#ff8800",fontSize:"2rem"}}> ₹{Discount(book.price,book.discount)}</span>
                  </i></b>
                </p>
                <Box sx={{display:"flex",my:1,alignItems:"center"}}>
                  Qty : 
                  <Button 
                   onClick={()=>handleItemDecrease(book._id)}
                   color="warning" 
                   sx={{color:(theme)?"white":"black"}}>
                     <RemoveRoundedIcon/>    
                  </Button>
                  <h1 style={{margin:"0",color:"#ff8800"}}><i>{itemQuantity}</i></h1>
                  <Button 
                   onClick={()=>handleItemIncrease(book._id)}
                   color="warning" 
                   sx={{color:(theme)?"white":"black"}}>
                     <AddRoundedIcon/>    
                  </Button>
                  <Button color="error" sx={{mx:1}} onClick={()=>handleRemoveFromCart(book._id)}>
                      Remove
                  </Button>
                </Box>
             </Box>
          </Box>

          <Box id="priceSectionDialog" sx={{ fontSize: "1rem", paddingTop: "6%", ml: "auto", mr:"6vw", mt:"4vh",display:"flex" }}>
             <h2 id="showPriceHeading"><i>Price =</i></h2>
             <Box sx={{marginLeft:"auto"}}>
                <Box sx={{display:"flex",alignItems:"center",justifyItems:"center"}}>
                   <h2 style={{margin:"0 1vw"}}><i>{itemQuantity}</i></h2>
                   <ClearRoundedIcon/>
                   <h2 style={{margin:"0 1vw"}}><i>{Discount(book.price,book.discount)}</i></h2>
                </Box>
                <hr style={{backgroundColor:"white"}}/>
                <Box>
                 <h1 style={{color:"#ff8800",textAlign:"end"}}><i>₹ {Discount(book.price,book.discount)*itemQuantity}</i></h1>
                </Box>
             </Box>
          
          </Box>

           </Box>
           <hr style={{width:"80%",border:"1px solid #ff8800",backgroundColor:"#ff8800",borderRadius:"2rem"}}/>
           </>
          :""}
      </>
    )
}

// eslint-disable-next-line 
  {/* {(cartItems[book._id])
                    ?(showLoading === false)
                      ?<Button sx={{ 
                            fontSize:"1.05rem",
                            transition: "all 0.3s ease-in-out",
                            ":hover": { background: "red", color: "white" }}} color="error" onClick={()=>handleRemoveFromCart(book._id)}>
                         Remove from cart
                       </Button>
                      :<Box sx={{minWidth:"8rem",display:"grid",placeItems:"center"}}>
                         <CircularProgress color="error" />
                       </Box> 
                    :(showLoading === false)
                      ?<Button sx={{ 
                            fontSize:"1.05rem",
                            color: "#ff8800",
                            transition: "all 0.3s ease-in-out",
                            ":hover": { background: "#ff8800", color: "white" }}} color="warning" onClick={()=>handleAddToCart(book._id)}>
                         Add to cart
                       </Button>
                      :<Box sx={{minWidth:"8rem",display:"grid",placeItems:"center"}}>
                         <CircularProgress color="warning" />
                       </Box>} */}