
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { context } from "../../App";
import { giveDate,Discount } from '../../Utils';

export function FilteredBook({ book,filterName}) {

    const navigate = useNavigate();
    
    const {cartItems,addCart,removeCart,handleCheckOutDialogOpen,updatingCheckOutItems} = useContext(context);

    const [showLoading,setShowLoading] = useState(false);

    const handleAddToCart=(id)=>{
        // console.log("re-rendering due to state update");
            if(cartItems[id] !== undefined){
                return;
            }
            setShowLoading(true);
            addCart(id);
            return;
    }

    const handleRemoveFromCart=(id)=>{
        // console.log("re-rendering due to state update");
        setShowLoading(true);
        removeCart(id);
        return;
    }

    const handleBuy=(id)=>{
        handleCheckOutDialogOpen("checkout");

        if(cartItems[id] === undefined){
            updatingCheckOutItems({[id]:{id,qty:1}});
            handleAddToCart(id);
        }else{
            updatingCheckOutItems({[id]:cartItems[id]});
        }

    }

    useEffect(()=>{
        if(showLoading){
           setShowLoading(false);
        //    console.log("re-rendering only the selected");
        }

        // eslint-disable-next-line
    },[cartItems]);

    
    // console.log("re-rendering");

  
    return (
      <Box className="bookContainer" 
      sx={{
        display: "grid",
        gridTemplateColumns:"auto auto",
        justifyContent: "space-between",
        margin: "1%",
        padding: "2%",
        // columnGap: "2vmax",
        // alignItems: "flex-start",
        borderRadius: "1.5rem",
        transition:"all 0.3s ease-in-out",
        ":hover":{backgroundColor:"rgba(255, 165, 0, 0.2)",boxShadow:"2px 2px 2px rgb(255, 165, 0),-2px -2px 2px rgb(255, 165, 0)"}
      }}>
        <Box sx={{display:"flex",
                  columnGap:"1vmax",
                  // justifyContent: "start",
                  alignItems:"center",
                  cursor:"pointer"}}
            onClick={()=>navigate(`/${filterName}/${(["title","authors","isbn","categories"].includes(filterName))?book[filterName]:book.title}`)}>
        <img className="bookImage"
          style={{ minHeight: "18vh",minWidth:"10rem", objectFit: "cover",borderRadius:"1rem" }}
          src={book.thumbnailUrl}
        //   loading="lazy"
          alt={book.title}>
        </img>
        <Box sx={{ fontSize: "1rem" }}>
  
          <p>
            <b style={{fontSize:"1.4rem",color:"#ff8800"}}>{book.title}</b><br />
            By: <b>{(typeof(book.authors)!=="string")?book.authors.join(", "):book.authors}</b><br />
          </p>
          <Box sx={{ display: "flex", columnGap: "1vmax" }}>
                 <Box>
                   <p>
                     <b>Price: </b><strike>₹{book.price}</strike>
                   </p>
                   <h4 style={{ color: "red", fontSize: "1.5rem", transform: "translateY(-2rem)" }}>₹{Discount(book.price,book.discount)}</h4>
                 </Box>
                <Box>
                  <p>
                    <b>Binding:</b> {book.bindings}<br />
                    <b>Release:</b> {giveDate(book.publishedDate)}
                  </p>
                </Box>
          </Box>
  
         </Box>
        </Box>
        <Box className="actions" sx={{ fontSize: "1rem", paddingTop: "6%", marginLeft: "auto" }}>
          <b>Available</b>
          <p>
            Ships within 4-6 Days  <br />
            ₹39 shipping in India per item and low cost Worldwide
          </p>
          <Box sx={{display:"flex"}}>
            <Button sx={{ 
                          fontSize:"1.1rem",
                          color: "#ff8800",
                          transition: "all 0.3s ease-in-out",
                         ":hover": { background: "#ff8800", color: "white" } }}
                          onClick={()=>handleBuy(book._id)}>   
                        Buy Now
            </Button>

            {(cartItems[book._id])
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
                       </Box>}
          </Box>
        </Box>
      </Box>
    )
  }