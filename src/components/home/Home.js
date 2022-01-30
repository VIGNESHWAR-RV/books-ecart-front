import * as React from 'react';
import "./Home.css";
import { useState, useContext,useEffect } from 'react';
import Box from '@mui/material/Box';
import { HomeCategory } from './HomeCategory';
import { HomeContent } from './HomeContent';
import { context } from '../../App';


export function Home() {

const [homeData,setHomeData] = useState("");



    useEffect(()=>{
        fetch("https://book-ecart-rv.herokuapp.com/",{method:"GET"})
        .then((response)=>response.json())
        .then((data)=>setHomeData(data))
    },[]);

    const { color } = useContext(context);


    return (
        <>
        {(homeData)
           ?<Box sx={{ display: "flex", height: "auto" }}>

            <Box id="categories"
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    width: "50%",
                    maxWidth: "22rem",
                }}>
                <h2 style={{ textAlign: "center", textDecoration: "underline", fontSize: "1.8vmax" }}>Browse By Category</h2>
                {homeData.homeCategories.map(({ _id, count }, index) => <HomeCategory key={index} name={_id} count={count} />)}

            </Box>
            <hr id="divideLine" style={{ width: "0" }} />
            <Box sx={{
                width: "100%"}}>
                <HomeContent bestSellers={homeData.bestSellers} newArrivals={homeData.newArrivals}
                    awardWinners={homeData.awardWinners} staffPicks={homeData.staffPicks} />
            </Box>
        </Box>
        :""}
        </>
    );
}

