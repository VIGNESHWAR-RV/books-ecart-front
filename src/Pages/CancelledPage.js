import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { context } from "../App";

export function CancelledPage(){

   
    const { createAnonymousUser } = useContext(context);

    const componentMounted = useRef(true);

    const navigate = useNavigate();

    const isPaymentMade = sessionStorage.getItem("isPaymentMade");


    useEffect(()=>{
        let redirectTimer;
        if(componentMounted.current){
            if(isPaymentMade){
                 const accountUser = sessionStorage.getItem("accountUser");
                 if(accountUser !== undefined && accountUser !== null && accountUser !== ""){

                    const sendConfirmation=async(accountUser)=>{
                        const response = await fetch(`${API}payment-status`,
                                                     {method:"POST",
                                                      headers:{"Content-Type":"application/json",accountUser},
                                                      body:JSON.stringify({status:!isPaymentMade})});
                
                        if(response.status === 200){
                            sessionStorage.setItem("isPaymentMade",false);
                             redirectTimer =()=> setTimeout(()=>{
                                navigate("/")
                            },6666)
                            redirectTimer();
                            return;
                        }
                        else{
                            toast.error("error while updating payment status");
                            sessionStorage.setItem("isPaymentMade",false);
                            return;
                        }
                    }
                     sendConfirmation(accountUser);

                 }else{
                     toast.error("couldn't validate payment by user, please login again");
                     sessionStorage.clear();
                     createAnonymousUser();
                     navigate("/");
                     return;
                 }
            }else{
                navigate("/");
                toast.error("not allowed to access without payments");
                return;
            }
        }

          return()=>{
              componentMounted.current = false;
              clearTimeout(redirectTimer);
           }
    //eslint-disable-next-line
    },[])


    return(
        <>
         <Box sx={{width:"100%",height:"100%",display:"grid",placeItems:"center",placeContent:"center"}}>
            {(isPaymentMade)
               ?<>
                   <h1 style={{color:"#ff8800"}}><i>Payment Cancelled !!!</i></h1>
                   <p><i>Redirecting to home page</i></p>
                   <CircularProgress sx={{color:"#ff8800"}}/>
                </>

               :""}
         </Box>
        </>
    )
}