import "./BookPage.css";
import { useNavigate } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { context } from "../../App";
import { API } from "../../API";
import { Discount, giveDate } from "../../Utils";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

export function BookPage(){

  const navigate = useNavigate();

  const [specificBook,setSpecificBookData] = useState("");
  
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    const path = window.location.pathname.split("/");
    const bookPath = path[1]+"_"+path[2];
    let componentMounted = true;
    const getSpecificBook = async(bookPath)=>{
        if(componentMounted){
             setSpecificBookData("");
             const response = await fetch(`${API}${bookPath}`,{method:"GET"})
             const data = await response.json();
             if(componentMounted){
                 if(response.status === 200){
                    setSpecificBookData(data);
                    return;
                 }
                 else if(response.status === 400){
                    setSpecificBookData(null);
                    toast.error("No such Book");
                    return;
                 }
                 else{
                    return;
                 }
             }
             else{
               return;
             }
        }else{
          return;
        }
    }
    getSpecificBook(bookPath);

    return()=>{
      // getSpecificBook();
      componentMounted = false;
    }
  },[navigate]);

  // console.log(specificCategory);

    return(
      <>
      <Fab sx={{m:1,mb:0,backgroundColor:"#ff8800"}} onClick={()=>navigate(-1)}>
        <ArrowBackRoundedIcon/>
      </Fab>
        {(specificBook !== null)
            ?(specificBook)
              ?<SpecificBook book={specificBook}/>
              :<BookSkeletonLoading/>
            :<h1>There is No Such Book</h1>}
      </>
    )
}

function SpecificBook({book}){

  const {cartItems,addCart,removeCart,handleCheckOutDialogOpen,updatingCheckOutItems} = useContext(context);

  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{

    setIsLoading(false);

  },[cartItems]);

  const handleAddToCart=(id)=>{
    // console.log("re-rendering due to state update");
        if(cartItems[id] !== undefined){
            return;
        }
        addCart(id);
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

  return(
    <>
    <Box id="specificBook" sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
        <Box id="specificImageBox" sx={{m:3}}>
            <img id="specificBookImage"
                src={book.thumbnailUrl} 
                alt={book.title}
                // loading="lazy"
                style={{height:"50vh",
                        minWidth:"20vw",
                        borderRadius:"2rem",
                        boxShadow:"2px 2px 5px rgb(150,150,150),-2px -2px 5px rgb(150,150,150)"}}>
            
            </img>

        </Box>
        <Box id="specificBookInfo" sx={{maxWidth:"50vw"}}>
              <h2 style={{color:"#ff8800",fontSize:"2.5rem",marginBottom:"0"}}>{book.title}</h2>
              <h3 style={{fontSize:"1.5rem",margin:"0 0 0 5%",textAlign:"center"}}><i>- "{typeof(book.authors !== "string")?book.authors.join('", "'):book.authors}"</i></h3>   
              <h3 style={{margin:"0 0 0 5%"}}><strike>₹{book.price}</strike><i style={{fontSize:"2.5rem",color:"#ff8800"}}> ₹{Discount(book.price,book.discount)}</i></h3>
              <h3 style={{fontWeight:"100",margin:"0 0 0 5%"}}><span style={{color:"#ff8800"}}>Category - </span><i><b style={{}}>{typeof(book.categories) !== "string" ? book.categories.join(" , ") : book.categories}</b></i></h3>
              <h3 style={{fontWeight:"100",margin:"0 0 0 5%"}}><span style={{color:"#ff8800"}}>Language - </span><i><b>{book.language}</b></i></h3>
              <h3 style={{fontWeight:"100",margin:"0 0 0 5%"}}><span style={{color:"#ff8800"}}>Published Year - </span><i><b>{book.publishedYear}</b></i></h3>
              <h3 style={{fontWeight:"100",margin:"0 0 0 5%"}}><span style={{color:"#ff8800"}}>Source - </span><i><b>{book.source}</b></i></h3>
              <p style={{margin:"2% 0 2% 5%"}}><span style={{color:"#ff8800",fontWeight:"100",fontSize:"1.1rem"}}>About :</span><br/><i><b>{book.shortDescription}</b></i></p>
              <Box sx={{margin:"2% 0 2% 5%",display:"flex",alignItems:"center"}}>
                <Button sx={{m:1}} 
                        variant="contained" 
                        color="warning" 
                        onClick={()=>handleBuy(book._id)}>
                    Buy Now
                </Button>

                {(cartItems[book._id])
                    ?(isLoading === false)
                      ?<Button sx={{m:1}} variant="contained" color="error" onClick={()=>{setIsLoading(true);removeCart(book._id)}}>
                         Remove from cart
                       </Button>
                      :<Box sx={{minWidth:"8rem",display:"grid",placeItems:"center"}}>
                         <CircularProgress color="error"/>
                       </Box> 
                    :(isLoading === false)
                      ?<Button sx={{m:1}} variant="contained" color="warning" onClick={()=>{setIsLoading(true);addCart(book._id)}}>
                         Add to cart
                       </Button>
                      :<Box sx={{minWidth:"8rem",display:"grid",placeItems:"center"}}>
                         <CircularProgress color="warning"/>
                       </Box>}
                <h3 style={{fontWeight:"100",margin:"0 2%"}}> <span style={{color:"#ff8800"}}>{book.soldUnits}</span><i><b> units Sold!!!</b></i></h3>
              </Box>
        </Box>
    </Box>
    <Box id="additionalInfo" sx={{m:5}}>
       <h2 style={{fontWeight:"100"}}><span style={{color:"#ff8800"}}>Additional Details</span></h2>
       <h3 style={{fontWeight:"100",margin:"0 0 0 3%"}}><span style={{color:"#ff8800"}}>ISBN - </span><i><b>{book.isbn}</b></i></h3>
       <h3 style={{fontWeight:"100",margin:"0 0 0 3%"}}><span style={{color:"#ff8800"}}>Published Date - </span><i><b>{giveDate(book.publishedDate)}</b></i></h3>
       <h3 style={{fontWeight:"100",margin:"0 0 0 3%"}}><span style={{color:"#ff8800"}}>No. of Pages - </span><i><b>{book.pageCount}</b></i></h3>
       <p style={{fontWeight:"100",margin:"0 0 0 3%"}}><span style={{color:"#ff8800",fontWeight:"100",fontSize:"1.1rem"}}>Detailed Description : </span><br/><i><b>{book.longDescription}</b></i></p>
    </Box>
    </>
  )
}

function BookSkeletonLoading(){

  return(
    <>
       <Box id="specificBook" sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <Box sx={{m:3}}>
            <Skeleton variant="rectangular" 
                   sx={{height:"50vh",
                        minWidth:"20vw",
                        borderRadius:"2rem",
                        backgroundColor:"rgba(255, 136, 0, 0.6)",
                        // boxShadow:"2px 2px 5px rgb(150,150,150),-2px -2px 5px rgb(150,150,150)"
                        }}/>

        </Box>
        <Box id="specificBookInfo" sx={{maxWidth:"50vw"}}>
    
              <Skeleton variant="text" sx={{width:"50vw",height:"10vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              <Skeleton variant="text" sx={{width:"50vw",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              <Skeleton variant="text" sx={{width:"50vw",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              <Skeleton variant="text" sx={{width:"50vw",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              <Skeleton variant="text" sx={{width:"50vw",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              <Skeleton variant="rectangular" sx={{width:"50vw",height:"10vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              <Box sx={{margin:"2% 0 2% 5%",display:"flex",alignItems:"center"}}>
                <Skeleton variant="text" sx={{m:1,width:"8rem",height:"3rem",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
                <Skeleton variant="text" sx={{m:1,width:"8rem",height:"3rem",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
                <Skeleton variant="text" sx={{mx:2,width:"10rem",height:"3rem",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
              </Box>
        </Box>
    </Box>
    <Box id="additionalInfo" sx={{m:5}}>
       <Skeleton variant="text" sx={{width:"30%",height:"10vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
       <Skeleton variant="text" sx={{marginLeft:"5%",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
       <Skeleton variant="text" sx={{marginLeft:"5%",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
       <Skeleton variant="text" sx={{marginLeft:"5%",height:"4vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
       <Skeleton variant="rectangular" sx={{marginLeft:"5%",height:"10vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>
     </Box>
    </>
  )
}