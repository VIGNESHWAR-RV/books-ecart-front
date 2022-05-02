import * as React from 'react';
import "./FilteredBooksPage.css"
import { useState,useEffect,useRef } from 'react';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { API } from "../../API";
// import { context } from '../../App';
// import { giveDate,Discount } from '../../Utils';
import { FilteredBooksSkeletonLoading } from '../../components/FilteredBooksComponent/SkeletonLoading';
import { FilteredBook } from "../../components/FilteredBooksComponent/FilteredBook"
import { FiltersForFilteredBooks } from '../../components/FilteredBooksComponent/Filters';
import toast from 'react-hot-toast';


export function FilteredBooksPage() {

  const {filterCategory} = useParams();

  const pathRef = useRef("");



  // console.log(filterCategory);

  // const renderCheck = (pathRef.current === filterCategory) ? pathRef.current : filterCategory ;

  // console.log(renderCheck);

  // const {addCart,cartItems,removeCart} = useContext(context);

  // const [specificCategory,setSpecificCategory] = useState([]);

  const [category,setCategory] = useState("");

  let componentMounted = useRef(true);
  const filter = async(filterDetails)=>{
     
    if(componentMounted.current){
       setCategory("");
       const response = await fetch(`${API}${filterCategory}?${filterDetails}`,{method:"GET"});
       const data = await response.json();
        if(response.status === 200){
           if(componentMounted.current){
              setCategory([...data]);
              return;
           }else{
              return;
           }
        }else{
           toast.error("Server busy , please try again later");
           return;
        }
    }

  }


  useEffect(()=>{
       window.scrollTo({ top: 0, behavior: "smooth" });
       componentMounted.current = true;
       const getData = async(filterCategory)=>{
      
           if(componentMounted.current){
              if(filterCategory !== pathRef.current){
              
                  setCategory("");
       
                  const response = await fetch(`${API}${filterCategory}`,{method:"GET"})
                  const data = await response.json();
                  if(componentMounted.current){
                    if(response.status === 200){
                       setCategory([...data]);
                       pathRef.current = filterCategory;
                       return;
                    }
                    else{
                       toast.error("Server Busy , Please try again later");
                       return;
                    }
                  }else{
                    return;
                  }
               
              }
              else{
                  //  console.log("rendering for emptying books");
                  //  setCategory("");
                 return;
              }
           }else{
             return;
           }

       }

       getData(filterCategory); 
      //  console.log(componentMountedCheck.current);
      //  console.log("rendering on click");  
 
  return()=>{
       componentMounted.current =false;
      //  console.log(componentMountedCheck.current);
  }

},[filterCategory]);


  return (

    <>
     <Box sx={{display:"flex"}}>
 
      <Box id="categories"
        sx={{
          display: "flex",
          flexFlow: "column",
          width: "36%",
          maxWidth: "22rem",
        }}>
        <h2 style={{ textAlign: "center", textDecoration: "underline", fontSize: "1.3vmax" }}>Refine your Search</h2>
        <FiltersForFilteredBooks filter={filter} filterCategory={filterCategory}/>
      </Box>

      <hr id="divideLine" style={{ width: "0",border:"1px solid #ff8800",backgroundColor:"#ff8800" }} />

      <Box sx={{ width: "100%" }}>

          <Box sx={{ display: "flex",margin:"0 2%", justifyContent: "space-between" }}>

               <Box>
                 <h1>{filterCategory}</h1>
                 {(category.length !== 0)
                      ?<p style={{transform:"translateY(-15px)"}}><b>{category.length}</b> results found</p>
                      :<Skeleton sx={{transform:"translateY(-15px)",width:"9rem",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>}
               </Box>

               <Box id="smallScreenFilter">
                  
               </Box>
     
          </Box>
  
          {(category.length !== 0)
             ?category.map((book) => <FilteredBook key={book._id} 
                                                          book={book} 
                                                          filterName={filterCategory} />)
             :[1,2,3].map((num)=><FilteredBooksSkeletonLoading key={num} />)}
        
      </Box>

     </Box>
    </>
  );
}



