import * as React from 'react';
import "./Categories.css"
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function Categories() {

  const { id } = useParams();

  const [specificCategory,setSpecificCategoryData] = useState("");
  
  useEffect(()=>{
    fetch(`https://book-ecart-rv.herokuapp.com/${id}`,{method:"GET"})
    .then((response)=>response.json())
    .then((data)=>setSpecificCategoryData(data))
},[]);


  return (

    <>
{(specificCategory)
    ?<Box sx={{display:"flex"}}>
 
      <Box id="categories"
        sx={{
          display: "flex",
          flexFlow: "column",
          width: "36%",
          maxWidth: "22rem",
        }}>
        <h2 style={{ textAlign: "center", textDecoration: "underline", fontSize: "1.3vmax" }}>Refine your Search</h2>
        <SearchFilters />
      </Box>

      <hr id="divideLine" style={{ width: "0" }} />

      <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex",margin:"0 1%", justifyContent: "space-between" }}>
               <Box id="smallScreenFilter">
                  
               </Box>
  
               <Box>
                 <h1>{id}</h1>
                 <p style={{transform:"translateY(-15px)"}}>{specificCategory.length} results found</p>
               </Box>
               
               <Box>
              
               </Box>
          </Box>
          
          <Box sx={{ display: "grid", justifyItems: "stretch",justifyContent:"start", margin: "0 2%" }}>
            {specificCategory.map((book, index) => <Books key={index} book={book} />)}
          </Box>
      </Box>
    </Box>
    :""}
    </>
  );
}

function SearchFilters() {


  return (
    <Box>

    </Box>
  )
}

function Books({ book }) {


  function giveDate(date) {
    let ActualDate = new Date(date).toDateString().split(" ");
    ActualDate.shift();
    return ActualDate.join("-");
  }

  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns:"auto auto",
      justifyContent: "space-between",
      margin: "2% 0",
      columnGap: "2vmax",
      alignItems: "flex-start"
    }}>
      <Box sx={{display:"flex",columnGap:"1vmax"}}>
      <img
        style={{ height: "17vh", objectFit: "cover" }}
        src={book.thumbnailUrl}
        alt={book.title}>
      </img>
      <Box sx={{ fontSize: "1vmax" }}>

        <p>
          <b style={{fontSize:"1.4vmax",color:"#ff8800"}}>{book.title}</b><br />
          <b>By: </b>{book.authors.join(", ")}<br />
        </p>
        <Box sx={{ display: "flex", columnGap: "1vmax" }}>
               <Box>
                 <p><b>Price: </b><strike>₹{book.price}</strike>
                 </p>
                 <h4 style={{ color: "red", fontSize: "1.5vmax", transform: "translateY(-2vmax)" }}>₹{book.price}</h4>
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
      <Box sx={{ fontSize: "1vmax", paddingTop: "6%", marginLeft: "auto" }}>
        <b>Available</b>
        <p>
          Ships within 4-6 Days <Button sx={{color:"#ff8800"}}>Explain..</Button> <br />
          ₹39 shipping in India per item and low cost Worldwide
        </p>
        <Box>
          <Button sx={{ 
                        fontSize:"1.1vmax",
                        color: "#ff8800",
                        transition: "all 0.3s ease-in-out",
                       ":hover": { background: "#ff8800", color: "white" } }}>Buy Now</Button>
          <Button sx={{ 
                        fontSize:"1.05vmax",
                        color: "#ff8800",
                        transition: "all 0.3s ease-in-out",
                        ":hover": { background: "#ff8800", color: "white" }}}>Add to Wishlist</Button>
        </Box>
      </Box>
    </Box>
  )
}