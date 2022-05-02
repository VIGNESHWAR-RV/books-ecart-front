
import "./HomePage.css";
import toast from "react-hot-toast";
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from "@mui/material/Skeleton";
import { HomeCategory } from "../../components/homeComponents/HomeCategory";
import { HomeContent } from "../../Containers/HomePageContainers/HomeContent";
// import { context } from '../../App';
import { API } from "../../API";
import { ProductSkeletonSlider } from "../../components/homeComponents/SkeletonProductSlider";



export function HomePage(){

const [homeData,setHomeData] = useState("");


useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    let componentMounted = true; //setting to prevent to stateUpdate after unmount
    const getHomeData= async()=>{
             const response = await fetch(API,{method:"GET"})
             const data = await response.json();
             if(componentMounted){// condition to check component mounted
                 if(response.status === 200){  
                     setHomeData(data);
                     return;
                 }else{
                     toast.error("Couldnt fetch data , please try again after some time");
                     return;
                 }
            }else{
                return;
            }
        }
    getHomeData();

    return()=>{
        // console.log("clearing useEffect functions")
        componentMounted = false;
        // getHomeData();
    }


},[]);

    // const { color } = useContext(context);


    return (
        <>
        <Box sx={{ display: "flex", height: "auto" }}>
                  {/* home categories section */}
                <Box id="categories"
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    width: "50%",
                    maxWidth: "21rem",
                }}>
                <h2 style={{ textAlign: "center", textDecoration: "underline", fontSize: "1.8vmax" }}>Browse By Category</h2>

                {(homeData !== "")
                  ?homeData.homeCategories.map(({ _id, count }) => <HomeCategory key={_id} name={_id} count={count} />)
                  :[1,2,3,4,5,6,7,8,9,10,11,12].map((value)=><Skeleton key={value} variant="text" sx={{width:"18rem",height:"2rem",m:2,ml:3,backgroundColor:"rgba(255, 136, 0, 0.6)"}} />)
                }
              
                </Box>
                <hr id="divideLine" style={{ width: "0" }} />
                  {/* home content ( Products ) section */}
                <Box sx={{
                    width: "100%"}}>
                    {(homeData !== "")
                     ? <HomeContent bestSellers={homeData.bestSellers} newArrivals={homeData.newArrivals}
                        awardWinners={homeData.awardWinners} staffPicks={homeData.staffPicks} />
                     :<Box>
                         <Skeleton variant="rectangular" 
                         sx={{height: "15vmax",
                              border: "3px solid #ff8800",
                              borderRadius: "1rem",
                              backgroundColor:"rgba(255, 136, 0, 0.6)",
                              margin: "1% 20%",
                              marginTop: "2rem"}} />

                        {[1,2].map((value)=><ProductSkeletonSlider key={value} value={4}/>)}
                         
                      </Box>}
                </Box>
            </Box>
        </>
    );
}

