
import './App.css';
import * as React from 'react';
import { useState,createContext,useEffect } from 'react';
import toast,{ Toaster } from 'react-hot-toast';
import Paper from '@mui/material/Paper';
import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import Fab from "@mui/material/Fab";
import Dialog from '@mui/material/Dialog';
import { HeaderLarge } from './components/headerLarge/HeaderLarge';
import { HeaderSmall } from './components/headerSmall/HeaderSmall';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomePage } from "./Pages/HomePage/HomePage";
import { Footer } from './components/Footer';
import { MenuBarForSmallScreens } from './components/MenuBarForSmallScreens';
// import { Categories } from './components/Categories/Categories';
// import { PageShifter } from "./Pages/PageShifter";
import { API } from './API';
import { SearchedBooksPage } from './Pages/SearchedBooksPage/SearchedBooksPage';
import { FilteredBooksPage } from './Pages/FilteredBooksPage/FilteredBooksPage';
import { BookPage } from "./Pages/BookPage/BookPage";
import { CartDetails } from './components/CartDetails';
import { CheckoutAndUserAccount } from './components/CheckOutAndUserAccount';
import { CancelledPage } from './Pages/CancelledPage';
import { SuccessPage } from './Pages/SuccessPage';

const context = createContext("");

function App() {

    //for theme change 
  const [theme,setTheme] = useState(true);

    //for side menu in small screens
  const [showMenu,setShowMenu] = useState(false);

  //for anonymous cart setup , add item to cart , updating cart , removing item from cart 
  const [cartItems,setCartItems] = useState({});

  // // for getting existing user data
  // const user = {accountUser:sessionStorage.getItem("accountUser")};

  async function createAnonymousUser(){
    // console.log(API);
      const response = await fetch(`${API}anonymousUserCreation`,{method:"GET"});
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      if(response.status === 200){
          // console.log(data);
          sessionStorage.setItem("anonymousUser",data.id);
          return setCartItems({...data.cart});
      }else if(response.status <= 400 && response.status < 500){
          return createAnonymousUser();
      }else{
          return toast.error("Server Error")
      }
  }

  async function settingCartItems(user){    
    // console.log(anonymousUser);
    const response = await fetch(`${API}settingCart`,{method:"GET",headers:{...user}});
    const data = await response.json();
    if(response.status === 200){
      //  console.log(data);
        setCartItems({...data.cart});
    }else{
        sessionStorage.clear();
    }
  }

  async function updatingCartItems(user,updatedCart,successMessage="",errorMessage=""){

    const response = await fetch(`${API}cartUpdate`,
                                  {method:"POST",
                                   headers:{"Content-Type":"application/json",...user},
                                   body:JSON.stringify(updatedCart)});

    const data = await response.json();
    if(response.status === 200){
      // setLoading(false);
      setCartItems(data.cart);
      if(successMessage !== "" ){
        return toast.success(successMessage);
      }
      return;
    }else{
      // setLoading(false);
      if(errorMessage !== ""){
        return toast.error(errorMessage);
      }
      return;
    }
   }
  
   const addCart=(id)=>{
   
     async function addingCart(id){
       let user= {};
       const anonymousUser  = sessionStorage.getItem("anonymousUser");
       const accountUser = sessionStorage.getItem("accountUser");
       if(anonymousUser !== null && anonymousUser !== undefined && anonymousUser !== ""){
          user = {anonymousUser};
       }
       else if(accountUser !== null && accountUser !== undefined && accountUser !== ""){
          user = {accountUser}
       }
       if(user.accountUser !== undefined || user.anonymousUser !== undefined){
         const updatedCart = {...cartItems,[id]:{id,qty:1}};
         return await updatingCartItems({...user},updatedCart,"Added to the Cart","Error while adding to Cart"); 
       }else{
          await createAnonymousUser(); //create an anonymous user
          return await addingCart(id); //and add cart items to that user
       }
     }
     addingCart(id);
   }
  
   const removeCart=(id)=>{


       async function removingCartItem(id){
     
        let user= {};
        const anonymousUser  = sessionStorage.getItem("anonymousUser");
        const accountUser = sessionStorage.getItem("accountUser");
        if(anonymousUser !== null && anonymousUser !== undefined && anonymousUser !== ""){
           user = {anonymousUser};
        }
        else if(accountUser !== null && accountUser !== undefined && accountUser !== ""){
           user = {accountUser}
        }
        if(user.accountUser !== undefined || user.anonymousUser !== undefined){
           const updatedCart = {...cartItems};
           if(updatedCart[id]){
              delete updatedCart[id];
              return await updatingCartItems({...user},updatedCart,"Product removed from the Cart","Error while removing product from Cart"); 
           }
           return toast.error("Product does not exists in Cart");
         }else{
            await createAnonymousUser(); //create an anonymous user
            return toast.error("Product does not exists in Cart");
         }
       }
       removingCartItem(id);

   }

  //---------------------------------------------------------------------------------------------

   //for showing and hiding scroll top button
   const [showScrollTop,setShowScrollTop] = useState(false);

   // for page up button
   const handleScroll=()=>{
       if(window.scrollY > (window.innerHeight/2)){
         setShowScrollTop(true);
       }else{
         setShowScrollTop(false);
       }
   }

    //window scroll event listener and anonymouser user creation and setting account
   useEffect(()=>{
     window.addEventListener("scroll",handleScroll);

      const accountUser = sessionStorage.getItem("accountUser");

     if(accountUser === undefined || accountUser === "" || accountUser === null){

        const anonymousUser  = sessionStorage.getItem("anonymousUser");
        
        if(anonymousUser){
    
           settingCartItems({anonymousUser});
    
        }else{
    
           createAnonymousUser();
        }
     }else{
         settingCartItems({accountUser});
     }

     return()=>{window.removeEventListener("scroll",handleScroll);}
      // eslint-disable-next-line 
   },[]);

   //----------------------------------------------------------------------------------------------
   
   // for cart dialog popup
   const [isCartOpen,setIsCartOpen] = useState(false);

   const handleCartDialogOpen=()=>{
     setIsCartOpen(true);
   }

   const handleCartDialogClose=()=>{
     setIsCartOpen(false);
   }
   
   //------------------------------------------------------------------------------------------------

     // for checkOut Items of the user
  const [checkOutItems,setCheckOutItems] = useState(0);

  const updatingCheckOutItems =(item)=>{

      setCheckOutItems({...item});
      return;
  }

   //------------------------------------------------------------------------------------------------

   //for checkout , login , signup dialog popup
   const [isCheckOutOpen,setIsCheckOutOpen] = useState(false);

   // to check whether user goes to account or checkout;
   const [userAction,setUserAction] = useState("account");

   const handleCheckOutDialogOpen = (message="account")=>{
      setIsCheckOutOpen(true);
      if(message === "account" && userAction !== "account"){
          setUserAction(message);
      }else{
          setUserAction(message);
      }
   }

   const handleCheckOutDialogClose=()=>{
      setIsCheckOutOpen(false);
   }

  //--------------------------------------------------------------------------------------------------


  const darkTheme = createTheme({
    palette: {
      mode: (theme)?'dark' : "light",
    },
  });
 
  const color = (theme)?"black":"whiteSmoke";

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
  <ThemeProvider theme={darkTheme}>
    <context.Provider value={{theme,
                              setTheme,
                              color,
                          //--- menu ---------
                              setShowMenu,
                          //--- cart stuffs ---
                              createAnonymousUser,
                              cartItems,
                              addCart,
                              removeCart,
                              updatingCartItems,
                              checkOutItems,
                              updatingCheckOutItems,
                          //--- Cart dialog stuffs ---
                              isCartOpen,
                              handleCartDialogOpen,
                              handleCartDialogClose,
                          //--- check out , login , signup stuffs ---
                              isCheckOutOpen,
                              handleCheckOutDialogOpen,
                              handleCheckOutDialogClose,
                          //-----------------------------
                              // isPaymentMade,
                              // handlePaymentMade
                              }}>

      <Paper sx={{ borderRadius: "0", 
                   width: "100%",
                   minHeight:"100vh",
                   overflow:"none",
                   background:(theme)
                      ?"rgb(20,20,20)"
                      :"rgb(240, 240, 240)" }}>
          <Box className="App" sx={{}}>
         
            <Toaster 
                 position="top-center"
                 reverseOrder={true}
                 toastOptions={{style:{background:color,color:"#ff8800",border:"2px solid #ff8800"}}}>
            </Toaster>
            {(showMenu)
              ?<MenuBarForSmallScreens/>
              :""}
      
               <HeaderLarge/>
               <HeaderSmall/>

                  {/* cart dialog */}
               <Dialog 
                    open={isCartOpen} 
                    onClose={handleCartDialogClose} 
                    sx={{ '& .MuiDialog-paper': {background:(theme)?"rgb(20,20,20)":"rgb(240,240,240)" } }}
                    scroll="paper" 
                    fullWidth 
                    maxWidth='lg'>   
                    {/* component inside dialog unmounts on close */}
                 <CartDetails handleCartDialogClose={handleCartDialogClose} handleCheckOutDialogOpen={handleCheckOutDialogOpen}/>
               </Dialog>
     
                {/* checkout dialog */}
               <Dialog
                   open={isCheckOutOpen} 
                   onClose={handleCheckOutDialogClose} 
                   sx={{ '& .MuiDialog-paper': {background:(theme)?"rgb(20,20,20)":"rgb(240,240,240)" } }}
                   scroll="paper" 
                   fullWidth 
                   maxWidth='lg'>
     
                 <CheckoutAndUserAccount handleCheckOutDialogClose={handleCheckOutDialogClose} message={userAction}/>
                      
               </Dialog>
                
               <Box id="content" sx={{minHeight:"73.5vh"}}>
                 <Routes>
                    <Route path="/" element={ <HomePage/> }/>
                    <Route path="/payment-success" element={<SuccessPage/>}/>
                    <Route path="/payment-cancelled" element={<CancelledPage/>}/>
                    <Route path="/results" element={<SearchedBooksPage/>}/>
                    <Route path="/:filterCategory" element={<FilteredBooksPage/>}/>
                    <Route path="*" element={<BookPage/>}/>
                 </Routes>
               </Box>   
      
               {/* <hr style={{width:"95%"}}/> */}
      
               {/* Footer  */}
               <Box sx={{minHeight:"10vh"}}>
                 <Footer/>
               </Box>
          </Box>
         <Fab sx={{position:"fixed",top:"85vh",right:"2%",backgroundColor:"#ff8800",display:(showScrollTop)?"":"none",border:"1px solid white"}} onClick={scrollTop}>
                <KeyboardDoubleArrowUpRoundedIcon/>
         </Fab>
      </Paper>
    </context.Provider>
  </ThemeProvider>
  );
}

export default App;
export {context};