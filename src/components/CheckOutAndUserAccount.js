import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import  CircularProgress  from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab"
import Skeleton from "@mui/material/Skeleton";
import { InputComponent } from "./InputComponent";
import { API } from "../API";
import { context } from "../App";
import { FilteredBooksSkeletonLoading } from "./FilteredBooksComponent/SkeletonLoading";
import { Discount,giveDate } from "../Utils";

export function CheckoutAndUserAccount({message}){

    const { createAnonymousUser } = useContext(context);

    const [dialogContent,setDialogContent] = useState("");

    const componentMounted = useRef(true);

    const getDetails = async()=>{

        if(componentMounted.current){ //executing only when component is mounted
    
            const accountUser = sessionStorage.getItem("accountUser");
    
            if(accountUser !== undefined && accountUser !== null && accountUser !== ""){
                

                if(componentMounted.current){ //fetching only when componenet is mounted

                     const response = await fetch(`${API}userCheck`,
                                                  {method:"GET",
                                                   headers:{accountUser}});
    
                    // const data = await response.json();
                    
                    if(componentMounted.current){ //updating only when component is mounted
                           if(response.status === 200){
                               setDialogContent(message);                               
                               return;
                          }
                          else{
                              toast.error("couldn't validate user");
                              sessionStorage.clear();
                              createAnonymousUser();
                              setDialogContent("login&signup");
                              return;
                          }
                    }
                }
                 
    
            }else{
                toast('Please Login to continue', {
                    icon: '👤',
                  });
                setDialogContent("login&signup");
            }

        }

    }

    const handleUpdateDialog=()=>{
        if(dialogContent === "login&signup"){
            setDialogContent("");
        }
        getDetails();
    }

    useEffect(()=>{
        componentMounted.current = true;
        getDetails();
    
        return ()=>componentMounted.current = false;

     // eslint-disable-next-line
    },[]);

    return(
        <Box sx={{height:"85vh",overflow:"hidden"}}>
            {(dialogContent === "login&signup")
              ? <LoginAndSignUp handleUpdateDialog={handleUpdateDialog}/>
              :""}
            {(dialogContent === "checkout")
              ? <CheckOut/>
              :""}
            {(dialogContent === "account")
              ? <Account handleUpdateDialog={handleUpdateDialog}/>
              :""}
            {(dialogContent=== "")
              ?<>
                <FilteredBooksSkeletonLoading/>
                <FilteredBooksSkeletonLoading/>
                <FilteredBooksSkeletonLoading/>
               </>
              :""}
        </Box>
    )
}

function LoginAndSignUp({handleUpdateDialog}){

    const {handleCheckOutDialogClose} = useContext(context);

    // const [showLogin,setShowLogin] = useState(false);

    // const style = {marginRight:(showLogin)?"0":"50vw"}

    return(
        <>
        <Box className="signupAndloginOuterDiv" sx={{position:"relative",width:"100%",height:"85vh"}}>
            <Fab sx={{position:"absolute",top:"1%",left:"1%",backgroundColor:"#ff8800"}} onClick={()=>handleCheckOutDialogClose()}>
               <ArrowBackRoundedIcon/>
            </Fab>
           <Box className="signupAndlogin" 
                  sx={{width:"100%",
                       height:"85vh",
                       display:"flex"}}>

                 <Box className="signupDialog" sx={{minWidth:"50%",alignSelf:"start",height:"85vh",overflow:"hidden",overflowY:"auto"}}>
                   <h1 style={{width:"100%",textAlign:"center",color:"#ff8800"}}><i>SignUp</i></h1>
                   <SignUp />
                 </Box>
        
                 {/* <hr id="divideLine" style={{ width: "0",height:"100%",border:"1px solid #ff8800",backgroundColor:"#ff8800" }}/> */}
                 
                 <Box className="loginDialog" sx={{width:"50%",alignSelf:"center"}}>
                    <h1 style={{width:"100%",textAlign:"center",height:"8vh",color:"#ff8800"}}><i>Login</i></h1>
                    <Login handleUpdateDialog={handleUpdateDialog} />
                 </Box>
          
           </Box>
        </Box>
        </>
    )
}

function Login({handleUpdateDialog}){

    const {cartItems,updatingCartItems} = useContext(context);

    const [userLoggingIn,setUserLoggingIn] = useState({email:"",password:""});

    const [isDisabled,setIsDisabled] = useState(false);

    const [isLoading,setIsLoading] = useState(false);


    const handleChange = (e)=>{

        if(e.target.name === "email"){
            setUserLoggingIn({...userLoggingIn,email:e.target.value});
        }
        if(e.target.name === "password"){
            setUserLoggingIn({...userLoggingIn,password:e.target.value});
        }

    };

    const regex = {email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                  };

    // color , variant , sx = optional
    // pattern , required  = in case of need for validations
    const Inputs = [
                    {id:"loginEmail",
                     name:"email",
                     label:"Email",
                     type:"text",
                     pattern:regex.email,
                     required:true,
                     value:userLoggingIn.email,
                     placeholder:"Type Here",
                    //  helperText:"Must be unique with atleast 3 letters",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"email",
                     variant:"outlined",
                     color:"warning",
                     sx:{fontSize:"1rem"} },

                    {id:"loginPassword",
                     name:"password",
                     label:"Password",
                     type:"password",
                     pattern:regex.password,
                     required:true,
                     value:userLoggingIn.password,
                     placeholder:"Type Here",
                    //  helperText:"Enter your password here",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"current-password",
                     variant:"outlined",
                     color:"warning",
                     sx:{fontSize:"1rem"} }
                      ];

    async function loggingIn(userLoggingIn){
          setIsLoading(true);
          setIsDisabled(true);  
          const {email,password} = userLoggingIn;
  
          const response = await fetch(`${API}login`,
                                       {method:"POST",
                                        headers:{"Content-Type":"application/json"},
                                        body:JSON.stringify({email,password})    
                                       });

          const data = await response.json();
          setIsLoading(false);
          setIsDisabled(false);
          if(response.status === 200){
              toast.success(`Welcome Back,${data.userName}`);
              sessionStorage.clear();
              sessionStorage.setItem("accountUser",data.token);
              const items = {...cartItems,...data.cart}
              updatingCartItems({accountUser:data.token},items);
              handleUpdateDialog();
              return;
          }else if(response.status >= 400 && response.status < 500){
              return toast.error("Couldn't validate user");
          }else{
              return toast.error("Server error , please try again later");
          }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        // !["employee","manager","admin"].includes(userLoggingIn.role) ||
        // console.log(userLoggingIn);
         if(
            !new RegExp(regex.email).test(userLoggingIn.email) || 
            !new RegExp(regex.password).test(userLoggingIn.password)){
             return toast.error("please don't play with html elements ,in order to work properly");
         }
    
        
        loggingIn(userLoggingIn);

    }

    const handleDemoLogin = (e)=>{

        // setUserLoggingIn(()=>{return {email:"demoaccount@ecart.com",password:"DemoAccount@123"}});
        loggingIn({email:"demoaccount@ecart.com",password:"DemoAccount@123"});
        
    }

    return(
    <Box sx={{m:3,width:"90%"}}>
       {/* <Box>
           <h1 style={{color:"#ff8800",margin:"0"}}><i>Welcome Back User</i></h1>
           <p>Login to Continue....</p>
       </Box> */}
       <Box
            component="form"
            
            sx={{
              '& > :not(style)': {},
              display:"grid",
              justifyItems:"stretch",
              alignContent:"center",
            }}
            autoComplete="on"
            onSubmit={handleSubmit}>

          {Inputs.map((inputProps, index) =>
          <Grid item sx={{m:1,p:1}} key={index} > 
             <InputComponent  inputProps={inputProps}/>
          </Grid>
          )}

             
         <Button sx={{m:2}}
                 variant="contained" 
                 color="warning" 
                 disabled={isDisabled}
                 type="submit">
              Login
         </Button>
         {(isLoading)
           ? <LinearProgress color="warning" sx={{mx:2,marginTop:"-4%",backgroundColor:"white",width:"94%"}} />
           :""}
       
         <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
             <p>Login with Demo Account</p>
             <Button sx={{ml:"auto"}} 
                     variant="contained"
                     disabled={isDisabled}
                     onClick={handleDemoLogin}
                     color="warning">
                Demo Login
            </Button>
         </Box>
            
       </Box>
    </Box>
    )
}

function SignUp(){


    const [userSigningUp,setUserSigningUp] = useState({email:"",userName:"",password:"",confirm_password:""});

    const [isDisabled,setIsDisabled] = useState(false);

    const [isLoading,setIsLoading] = useState(false);


    const handleChange = (e)=>{

        const userInputs = {
                            userName:{userName:e.target.value},
                            email:{email:e.target.value},
                            password:{password:e.target.value},
                            confirm_password:{confirm_password:e.target.value}
                           };

        if(userInputs[e.target.name] !== undefined ){

             if(userInputs[e.target.name][e.target.name] !== undefined ){
                  setUserSigningUp({...userSigningUp,...userInputs[e.target.name]})
             }

        }

        // if(e.target.name === "email"){
        //     setUserSigningUp({...userSigningUp,email:e.target.value});
        // }
        // if(e.target.name === "password"){
        //     setUserSigningUp({...userSigningUp,password:e.target.password});
        // }

    };

    const regex = {email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
                   userName:"^[a-zA-Z0-9@#]{4,16}$"
                  };

    // color , variant , sx = optional
    // pattern , required  = in case of need for validations
    const Inputs = [
                    {id:"signupUserName",
                     name:"userName",
                     label:"User Name",
                     type:"text",
                     pattern:regex.userName,
                     required:true,
                     value:userSigningUp.userName,
                     placeholder:"Type Here",
                     helperText:"should be atleast 4 letters",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"email",
                     variant:"outlined",
                     color:"warning",
                     sx:{fontSize:"1rem"} },

                    {id:"signUpEmail",
                     name:"email",
                     label:"Email",
                     type:"text",
                     pattern:regex.email,
                     required:true,
                     value:userSigningUp.email,
                     placeholder:"Type Here",
                     helperText:"Enter a valid existing email",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"email",
                     variant:"outlined",
                     color:"warning",
                     sx:{fontSize:"1rem"} },

                    {id:"signUpPassword",
                     name:"password",
                     label:"Password",
                     type:"password",
                     pattern:regex.password,
                     required:true,
                     value:userSigningUp.password,
                     placeholder:"Type Here",
                     helperText:["ATLEAST","- 1*(uppercase letter)","- 1*(lowercase letter)","- 1*(number)","- 1*special character (!@#$%&^*)"],
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"current-password",
                     variant:"outlined",
                     color:"warning",
                     sx:{fontSize:"1rem"} },

                     {id:"signUpConfirmPassword",
                     name:"confirm_password",
                     label:"Confirm Password",
                     type:"password",
                     pattern:userSigningUp.password,
                     required:true,
                     value:userSigningUp.confirm_password,
                     placeholder:"Type Here",
                    //  helperText:"Confirm your password here",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"current-password",
                     variant:"outlined",
                     color:"warning",
                     sx:{fontSize:"1rem"} },
                      ];

    

    const handleSubmit = (e)=>{
        e.preventDefault();
        // !["employee","manager","admin"].includes(userLoggingIn.role) ||
         if(
            !new RegExp(regex.userName).test(userSigningUp.userName) ||
            !new RegExp(regex.email).test(userSigningUp.email) || 
            !new RegExp(regex.password).test(userSigningUp.password) ||
            (userSigningUp.password !== userSigningUp.confirm_password)
            ){
             return toast.error("please don't play with html elements ,in order to work properly");
         }
    
        async function SigningUp(){
          setIsLoading(true);
          setIsDisabled(true);  
          const {email,userName,password,confirm_password} = userSigningUp;
  
          const response = await fetch(`${API}signup`,
                                       {method:"POST",
                                        headers:{"Content-Type":"application/json"},
                                        body:JSON.stringify({email,userName,password,confirm_password})    
                                       });

          const data = await response.json();
          setIsLoading(false);
          setIsDisabled(false);
          if(response.status === 200){
              toast.success("Successfully signed up, Please login");
            //   sessionStorage.clear();
            //   sessionStorage.setItem("accountUser",data.token);
              return;
          }else if(response.status >= 400 && response.status < 500){
               toast.error(data.message);
          }
          else{
              return toast.error("Couldn't sign up new user");
          }
        }
        SigningUp();

    }


    return(
    <Box sx={{m:3,mb:0,width:"90%"}}>
       {/* <Box>
           <h1 style={{color:"#ff8800",margin:"0"}}><i>Hii New User</i></h1>
           <p>Let's Get Started</p>
       </Box> */}
       <Box
            component="form"
            
            sx={{
              '& > :not(style)': {},
              display:"grid",
              justifyItems:"stretch",
              alignContent:"center",
            }}
            autoComplete="on"
            onSubmit={handleSubmit}>

          {Inputs.map((inputProps, index) =>
          <Grid item sx={{m:1,p:1}} key={index} > 
             <InputComponent  inputProps={inputProps}/>
          </Grid>
          )}

             
         <Button sx={{m:2}}
                 variant="contained" 
                 color="warning" 
                 type="submit">
              SignUp
         </Button>
         {(isLoading)
           ? <LinearProgress color="warning" sx={{mx:2,marginTop:"-4%",backgroundColor:"white",width:"94%"}} />
           :""}
       
         {/* <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
             <p>New User?</p>
             <Button sx={{ml:"auto"}} 
                     variant="contained"
                     onClick={()=>setShowLogin(false)}
                     color="warning">
               SignUp
            </Button>
         </Box> */}
            
       </Box>
    </Box>
    )
}


function Account({handleUpdateDialog}){

    const { createAnonymousUser,handleCartDialogOpen,handleCheckOutDialogClose } = useContext(context);

    const componentMounted = useRef(true);

    const [userData,setUserData] = useState("");


    useEffect(()=>{

        componentMounted.current = true;

        async function getAccountData(){
            if(componentMounted.current){
                 const accountUser = sessionStorage.getItem("accountUser");
                 const response = await fetch(`${API}account`,
                                        {method:"GET",headers:{accountUser}});

                 const data = await response.json();

                 if(componentMounted.current){
                       if(response.status === 200){
                            setUserData(data);
                       }
                       else if(response.status >= 400 && response.status < 500){
                            toast.error("Couldn't validate user, please login again");
                            sessionStorage.clear();
                            handleUpdateDialog();
                            createAnonymousUser();
                       }
                       else{
                           toast.error("server error , please try again later");
                           handleCheckOutDialogClose();
                       }
                 }
            } 
        }
        getAccountData();

    // eslint-disable-next-line
    },[])

    return(
        <Box sx={{display:"grid",width:"100%",height:"100%"}}>
         {(userData !== "")
            ? <Box sx={{m:3}}>
                  <Fab sx={{backgroundColor:"#ff8800"}} onClick={()=>handleCheckOutDialogClose()}>
                   <ArrowBackRoundedIcon/>
                  </Fab>
                  <h1 style={{color:"#ff8800"}}><i>Account Details</i></h1>
                  <Box sx={{m:4}} id="accountDetails">
                       <h2 style={{margin:"4% 0%"}}><i>User Name - <span style={{color:"#ff8800"}}>{userData.userName}</span></i></h2>
                       <h2 style={{margin:"2% 0%"}}><i>Email - <span style={{color:"#ff8800"}}>{userData.email}</span></i></h2>
                       <Box id="accountCartItemBox" sx={{display:"flex",alignItems:"center"}}>
                          <h2><i>Cart Items - <span style={{fontSize:"larger",color:"#ff8800"}}>{Object.keys(userData.cart).length}</span></i></h2>
                          <Button sx={{mx:4}}
                                  variant="contained"
                                  color="warning"
                                  onClick={()=>{handleCartDialogOpen();handleCheckOutDialogClose()}}>
                              Go to Cart
                          </Button>
                       </Box>
                      
                  </Box>
              </Box>
            :<Box sx={{m:3}}>
                <Fab sx={{backgroundColor:"#ff8800"}} onClick={()=>handleCheckOutDialogClose()}>
                   <ArrowBackRoundedIcon/>
                </Fab>
                <h1 style={{color:"#ff8800"}}><i>Account Details</i></h1>
                <Box sx={{m:4}}>
                    <Box sx={{display:"flex",my:5}}>
                       <Skeleton sx={{width:"20%",mx:2,backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                       <Skeleton sx={{width:"20%",height:"5vh",mx:"5",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                    </Box>
                    <Box sx={{display:"flex",my:6}}>
                       <Skeleton sx={{width:"20%",mx:2,backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                       <Skeleton sx={{width:"20%",height:"5vh",mx:"5",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                    </Box>
                    <Box sx={{display:"flex",my:6}}>
                       <Skeleton sx={{width:"20%",mx:2,backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                       <Skeleton sx={{width:"20%",height:"5vh",mx:"5",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                    </Box>
                </Box>
             </Box>}
          <Box sx={{alignSelf:"flex-end",m:2}}>
              <Button variant="contained"
                      color="error"
                      onClick={()=>{sessionStorage.clear();handleCheckOutDialogClose();createAnonymousUser()}}>
                  Sign Out
              </Button>
          </Box>
        </Box>
    )
}


function CheckOut(){

    const navigate = useNavigate();

    const { checkOutItems, cartItems, handleCheckOutDialogClose } = useContext(context);

    const componentMounted = useRef(true);

    const [productsData , setProductsData] = useState("");

    const [totalPrice,setTotalPrice] = useState(0);
    const [checkOutPrice,setCheckOutPrice] = useState(0);
    const [discountedPrice,setDiscountedPrice] = useState(0);

    const [isLoading,setIsLoading] = useState(false);

    const getProductsData=async()=>{
     
         if(componentMounted.current){

            const response = await fetch(`${API}cartItems/`,
                                         {method:"POST",
                                          headers:{"Content-Type":"application/json"},
                                          body:JSON.stringify(cartItems)});

               const data = await response.json();
              
               if(componentMounted.current){
                    
                    if(response.status === 200){

                        setProductsData([...data.result]);
                        return;
                    }
                    else{
                        toast.error("Server Busy, Please try again Later");
                        setProductsData([]);
                        return; 
                    }
               }

         }
    }
    
    useEffect(()=>{
        
        componentMounted.current = true;

        getProductsData();


        return ()=>{
            componentMounted.current = false;
        }

     // eslint-disable-next-line 
    },[])

    const handlePaymentClick=async()=>{
        // handleCheckOutDialogClose();
        setIsLoading(true);
        const totalQuantity = Object.keys(checkOutItems).reduce((total,item)=> +total + +checkOutItems[item].qty,0);
        async function startPayment(){
          const accountUser = sessionStorage.getItem("accountUser");
          if(accountUser !== undefined && accountUser !== null && accountUser !== ""){
              const totalPrice = (checkOutPrice < 500) ? checkOutPrice+39 : checkOutPrice;
              const response = await fetch(`${API}create-checkout-session`,
                                          {method:"POST",
                                           headers:{"Content-Type":"application/json",accountUser},
                                           body:JSON.stringify({checkOutItems,totalQuantity,totalPrice})});
              const data = await response.json();
              if(response.status === 200){
                  sessionStorage.setItem("isPaymentMade",true);
                  window.location.href = data.url;
                  
              }
              else{
                  toast.error("something went wrong, please try again later");
              }
          }else{
              toast.error("couldn't verify user , please login again to complete your purchase");
          }
        }
        startPayment();
    }



    return(
        <>
         {(productsData !== "")
           ? (productsData.length !== 0)
                ? <Box sx={{m:3,position:"relative"}}>
                      <Fab sx={{backgroundColor:"#ff8800",position:"absolute"}} onClick={()=>handleCheckOutDialogClose()}>
                          <ArrowBackRoundedIcon/>
                      </Fab>
                    <h1 style={{color:"#ff8800",textAlign:"end",fontSize:"x-large"}}><i>Check Out Page</i></h1>

                    <Box sx={{overflowY:"auto",height:"66vh"}}>
                       {
                         productsData.filter((product)=>checkOutItems[product._id] !== undefined)
                                     .map((product)=><CheckOutItems key={product._id} book={product} isLoading={isLoading} priceActions={[totalPrice,setTotalPrice,checkOutPrice,setCheckOutPrice,discountedPrice,setDiscountedPrice]} />)
                       }
                       <hr style={{width:"95%",border:"1px solid #ff8800",backgroundColor:"#ff8800",borderRadius:"2rem"}}/>

                        <Box>
                          <h1 style={{color:"#ff8800",textAlign:"center"}}><i>Price Details</i></h1>

                                 {/* total price */}
                           <Box className="checkOutPriceBox" sx={{display:"flex",mx:10}}>
                               <h1 style={{margin:"0"}}><i>Total Price </i></h1>
                               <h1 style={{color:"#ff8800",margin:"0 0 0 auto"}}><i>₹ {totalPrice}</i></h1>
                           </Box>
                                 {/* Discounted price */}
                           <Box className="checkOutPriceBox" sx={{display:"flex",mx:10}}>
                               <h1 style={{margin:"1% 0"}}><i>Discount </i></h1>
                               <h1 style={{color:"#ff8800",margin:"1% 0 1% auto"}}><i>- ₹ {discountedPrice}</i></h1>
                           </Box>
                                  {/* Delivery Price */}
                           <Box className="checkOutPriceBox" sx={{display:"flex",mx:10}}>
                                <h1 style={{margin:"1% 0"}}><i>Delivery Charges</i></h1>
                                <h1 style={{color:"#ff8800",margin:"1% 0 1% auto"}}><i>
                                       {(checkOutPrice < 500) ? "₹ 39" : "Free"  }</i></h1>
                           </Box>

                           <hr style={{width:"80%",border:"1px solid #ff8800",backgroundColor:"#ff8800",borderRadius:"2rem"}}/>

                                   {/*  total Price */}
                              <Box className="checkOutPriceBox" sx={{display:"flex",mx:10}}>
                                  <h1 style={{margin:"1% 0 5% 0"}}><i>Total Amount </i></h1>
                                  <h1 style={{color:"#ff8800",margin:"1% 0 5% auto"}}><i>₹ {(checkOutPrice < 500) ? checkOutPrice + 39 : checkOutPrice }</i></h1>
                              </Box>
                           {/* <hr style={{width:"85%",border:"1px solid #ff8800",backgroundColor:"#ff8800",borderRadius:"2rem"}}/> */}
                        
                        </Box>

                       <hr style={{width:"95%",border:"1px solid #ff8800",backgroundColor:"#ff8800",borderRadius:"2rem"}}/>

                       {(Object.keys(cartItems).length > Object.keys(checkOutItems).length)
                            ? <>
                               {/* {console.log(checkOutItems)} */}
                                <h1 style={{textAlign:"center",color:"#ff8800"}}><i>Other Items in your Cart</i></h1>
                                {
                                   productsData.filter((product)=>checkOutItems[product._id] === undefined)
                                               .map((product)=><OtherCartItems key={product._id} book={product} isLoading={isLoading} priceActions={[setTotalPrice,setCheckOutPrice,setDiscountedPrice]} />)
                                 }
                              </>

                            :""}
                    </Box>

                    <Box className="checkOutPriceOrderButton" sx={{display:"flex",alignItems:"center"}}>
                        <h1 style={{margin:"2% 0 2% auto"}}><i>Total - <span style={{color:"#ff8800"}}>₹{(checkOutPrice < 500) ? checkOutPrice + 39 : checkOutPrice } </span></i></h1>
                       {(isLoading)
                         ?<Box sx={{minWidth:"8rem",display:"grid",placeItems:"center"}}>
                            <CircularProgress color="error" />
                          </Box> 
                         : <Button 
                              color="warning"
                              variant="contained"
                              size="small"
                              sx={{m:2,p:1}}
                              onClick={handlePaymentClick}>
                                Place Order
                           </Button>}
                    </Box>

                  </Box>
                : <Box sx={{position:"relative",display:"grid",height:"100%",alignContent:"center",justifyItems:"center"}}>
                     <h1 style={{color:"#ff8800"}}><i>Something went wrong</i></h1>
                     <Button
                         variant="contained"
                         color="warning"
                         onClick={()=>navigate("/")}>
                         Go to Home
                     </Button>
                  </Box>
           :
           <Box sx={{m:3,position:"relative"}}>
              <Fab sx={{backgroundColor:"#ff8800",position:"absolute"}} onClick={()=>handleCheckOutDialogClose()}>
                 <ArrowBackRoundedIcon/>
              </Fab>
           <h1 style={{color:"#ff8800",fontSize:"larger",textAlign:"end"}}><i>Check Out Page</i></h1>
                <Box sx={{my:4}}>
                    <FilteredBooksSkeletonLoading/>
                    <FilteredBooksSkeletonLoading/>
                    <Box sx={{display:"flex",my:3}}>
                       <Skeleton sx={{width:"50%",mx:2,backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                       <Skeleton sx={{width:"50%",height:"5vh",mx:"5",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                    </Box>
                    <Box sx={{display:"flex",my:3}}>
                       <Skeleton sx={{width:"50%",mx:2,backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                       <Skeleton sx={{width:"50%",height:"5vh",mx:"5",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                    </Box>
                    <Box sx={{display:"flex",my:3}}>
                       <Skeleton sx={{width:"50%",mx:2,backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                       <Skeleton sx={{width:"50%",height:"5vh",mx:"5",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}} variant="text"/>
                    </Box>
                </Box>
           </Box>
            }
        </>
    )
}

function CheckOutItems({book,isLoading,priceActions}){

    const navigate = useNavigate();

    const {theme} = useContext(context);
    const { createAnonymousUser } = useContext(context);
    const { cartItems,updatingCartItems } = useContext(context);
    const { checkOutItems,updatingCheckOutItems } = useContext(context);
    const { handleCheckOutDialogClose } = useContext(context);

    const [totalPrice,setTotalPrice,checkOutPrice,setCheckOutPrice,discountedPrice,setDiscountedPrice] = priceActions;

    const [itemQuantity , setItemQuantity] = useState(checkOutItems[book._id]?.qty??1);

    useEffect(()=>{

        if(totalPrice === 0 && checkOutPrice === 0 && discountedPrice === 0){
            let totalPrice = book.price * +checkOutItems[book._id].qty;
            let checkOutPrice = +Discount(book.price,book.discount)* +checkOutItems[book._id].qty;
            let discountedPrice = totalPrice - checkOutPrice;
            setTotalPrice(prevPrice=> prevPrice + totalPrice);
            setCheckOutPrice(prevPrice=> prevPrice + checkOutPrice);
            setDiscountedPrice(prevPrice=> prevPrice + discountedPrice); 
        }

    // eslint-disable-next-line
    },[]);


    const handleItemIncrease =(id)=>{

        // const value = cartItems[id].qty;
      
        if( +itemQuantity + 1 <= 10){
           const accountUser = sessionStorage.getItem("accountUser")
           if(accountUser !== undefined && accountUser !== null && accountUser !== ""){
                setItemQuantity(+itemQuantity+1);
                const items = {...checkOutItems};
                items[id].qty += 1;
                updatingCartItems({accountUser},{...cartItems,...items});
                updatingCheckOutItems({...checkOutItems,...items});
                //--------------------------------------------------------
                let addedBookPrice = book.price;
                let checkOutBookPrice = +Discount(book.price,book.discount)* 1;
                let discountedAddedPrice = addedBookPrice - checkOutBookPrice;
                setTotalPrice(prevPrice=> prevPrice + addedBookPrice);
                setCheckOutPrice(prevPrice=> prevPrice + checkOutBookPrice);
                setDiscountedPrice(prevPrice=> prevPrice + discountedAddedPrice);
                //--------------------------------------------------------------
              
                return;
           }
           else{
                toast.error("couldn't validate user");
                sessionStorage.clear();
                handleCheckOutDialogClose();
                createAnonymousUser();
                return;
           }
        }
        else{
            toast.error("only 10 quantities are allowed per book for one order");
            return;
        }

    }

    const handleItemDecrease =(id)=>{

        // const value = cartItems[id].qty;

        if( +itemQuantity - 1 >= 1){
            const accountUser = sessionStorage.getItem("accountUser");
            if(accountUser !== undefined && accountUser !== null && accountUser !== ""){
               setItemQuantity(+itemQuantity - 1);
               const items = {...checkOutItems};
               items[id].qty -= 1;
               updatingCartItems({accountUser},{...cartItems,...items});
               updatingCheckOutItems({...checkOutItems,...items});
               //------------------------------------------------------
               let addedBookPrice = book.price;
               let checkOutBookPrice = +Discount(book.price,book.discount)* 1;
               let discountedAddedPrice = addedBookPrice - checkOutBookPrice;
               setTotalPrice(prevPrice => prevPrice - addedBookPrice);
               setCheckOutPrice(prevPrice=> prevPrice - checkOutBookPrice);
               setDiscountedPrice(prevPrice=> prevPrice - discountedAddedPrice);
               return;
            }
            else{
                toast.error("couldn't validate user");
                sessionStorage.clear();
                handleCheckOutDialogClose();
                createAnonymousUser();
                return;
            }
         }
         else{
             return;
         }
    }

    const handleRemoveFromCart= async(id)=>{
        // console.log("re-rendering due to state update");
        // setShowLoading(true);
        if(Object.keys(checkOutItems).length > 1){
            const items = {...checkOutItems};
            let addedBookPrice = book.price * +items[id].qty;
            let checkOutBookPrice = +Discount(book.price,book.discount)* +items[id].qty;
            let discountedAddedPrice = addedBookPrice - checkOutBookPrice;
            setTotalPrice(prevPrice=> prevPrice - addedBookPrice);
            setCheckOutPrice(prevPrice=> prevPrice - checkOutBookPrice);
            setDiscountedPrice(prevPrice=> prevPrice - discountedAddedPrice);
            //-----------------------------------------------------
            delete items[id];
            updatingCheckOutItems({...items});
            return;
        }
        else{
            return;
        }
    }

    return(
        <>
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
               onClick={()=>{navigate(`/Books/${book.title}`);handleCheckOutDialogClose()}}>
             </img>
             <Box sx={{ fontSize: "1rem",display:"grid",alignContent:"center" }}>
  
                <b style={{margin:"1% 0",fontSize:"1.6rem",color:"#ff8800"}}><i>{book.title}</i></b>
                <p style={{margin:"1% 0"}}>By: <b><i>{(typeof(book.authors)!=="string")?book.authors.join(", "):book.authors}</i></b></p>
                <p style={{margin:"1% 0"}}>Release: <b><i>{giveDate(book.publishedDate)}</i></b></p>
                <p style={{margin:"0"}}>Price: 
                  <b><i>
                    <strike>₹{book.price}</strike>
                    <span style={{color:"#ff8800",fontSize:"2rem"}}> ₹{Discount(book.price,book.discount)}</span>
                  </i></b>
                </p>
                <Box sx={{display:"flex",flexFlow:"wrap",my:1,alignItems:"center"}}>
                  Qty :
                  <Button 
                   onClick={()=>handleItemDecrease(book._id)}
                   disabled={isLoading}
                   color="warning" 
                   sx={{color:(theme)?"white":"black"}}>
                     <RemoveRoundedIcon/>    
                  </Button>
                  <h1 style={{margin:"0",color:"#ff8800"}}><i>{itemQuantity}</i></h1>
                  <Button 
                   onClick={()=>handleItemIncrease(book._id)}
                   disabled={isLoading}
                   color="warning" 
                   sx={{color:(theme)?"white":"black"}}>
                     <AddRoundedIcon/>    
                  </Button>
                  {(Object.keys(checkOutItems).length > 1)
                    ? <Button color="error" 
                             variant="contained" 
                             sx={{m:1}} 
                             isDisabled={isLoading}
                             onClick={()=>handleRemoveFromCart(book._id)}>
                          Remove
                      </Button>
                    :""}
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
        </>
    )
}

function OtherCartItems({book,isLoading,priceActions}){

    const navigate = useNavigate();

    const {cartItems,checkOutItems,updatingCheckOutItems,handleCheckOutDialogClose} = useContext(context);

    const [setTotalPrice,setCheckOutPrice,setDiscountedPrice] = priceActions;

    const handleAddingToCheckOut=(id)=>{

          const item = cartItems[id];

          if(item !== undefined){

            updatingCheckOutItems({...checkOutItems,[id]:item});
            let addedBookPrice = book.price * +item.qty;
            let checkOutBookPrice = +Discount(book.price,book.discount)* +item.qty;
            let discountedAddedPrice = addedBookPrice - checkOutBookPrice;
            setTotalPrice(prevPrice=>prevPrice + addedBookPrice);
            setCheckOutPrice(prevPrice=> prevPrice + checkOutBookPrice);
            setDiscountedPrice(prevPrice=> prevPrice + discountedAddedPrice);
            return;
          }
          else{
              return;
          }
         
    }

    return(
        <>
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
               onClick={()=>{navigate(`/Books/${book.title}`);handleCheckOutDialogClose()}}>
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
                <Box sx={{display:"flex",flexFlow:"wrap",m:1,alignItems:"center"}}>
                  Qty : 
                  <h1 style={{margin:"0",color:"#ff8800"}}><i> {cartItems[book._id]?.qty??1}</i></h1>
                  <Button color="warning" 
                          variant="contained" 
                          sx={{mx:3,my:1}} 
                          disabled={isLoading}
                          onClick={()=>handleAddingToCheckOut(book._id)}>
                      Add to CheckOut
                  </Button>
                </Box>
             </Box>
          </Box>
        </>
    )
}