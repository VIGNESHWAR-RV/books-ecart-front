import * as React from 'react';
import "./SearchedBooksPage.css"
import { useState,useEffect,useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { API } from "../../API";
// import { context } from '../../App';
// import { giveDate,Discount } from '../../Utils';
import { FilteredBooksSkeletonLoading } from '../../components/FilteredBooksComponent/SkeletonLoading';
import { FilteredBook } from "../../components/FilteredBooksComponent/FilteredBook"
import { FiltersForFilteredBooks } from '../../components/FilteredBooksComponent/Filters';
import toast from 'react-hot-toast';


export function SearchedBooksPage() {


  const [searchParams] = useSearchParams();

  const searchBy = searchParams.get("searchBy");
  const keyword = searchParams.get("keyword");


  const [result,setResult] = useState("");

  const searchByRef = useRef("");
  const keywordRef = useRef("");

  let componentMounted = useRef(true);
  const filter = async(filterDetails)=>{
     
    if(componentMounted.current){
       setResult("");
       const response = await fetch(`${API}getResult?${searchBy}=${keyword}&${filterDetails}`,{method:"GET"});
       const data = await response.json();
        if(response.status === 200){
           if(componentMounted.current){
              setResult([...data.result]);
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
        componentMounted.current = true; //setting to prevent to stateUpdate after unmount
        const getData = async(searchBy,keyword)=>{
           
           if(componentMounted.current){ //to prevent if its triggered during unmounting
               
                  if(searchBy !== searchByRef.current || keyword !== keywordRef.current){
                    setResult("");
                    const response = await fetch(`${API}getResult?${searchBy}=${keyword}`,{method:"GET"})
                    const data = await response.json();
                    if(componentMounted.current){  // to prevent stateupdate after the unmount
                  if(response.status === 200){
                     setResult([...data.result]);
                     keywordRef.current = keyword;
                     searchByRef.current = searchBy;
                     return;
                  }
                  else{
                      toast.error("Server Busy,Please try again later");
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
           }
           
        }
      
         getData(searchBy,keyword); 
        //  console.log("rendering on click");  
 
    return()=>{
        componentMounted.current = false;
        //  getData(searchBy,keyword);
    }

},[searchBy,keyword]);


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
        <FiltersForFilteredBooks filter={filter} filterCategory={keyword}/>
      </Box>

      <hr id="divideLine" style={{ width: "0",border:"1px solid #ff8800",backgroundColor:"#ff8800" }} />

      <Box sx={{ width: "100%" }}>

          <Box sx={{ display: "flex",margin:"0 2%", justifyContent: "space-between" }}>

               <Box>
                 <h1>{`Books with ${searchBy.toUpperCase()} as "${keyword}"`}</h1>
                 {(result !== "")
                      ?<p style={{transform:"translateY(-15px)"}}><b>{result.length}</b> results found</p>
                      :<Skeleton sx={{transform:"translateY(-15px)",width:"9rem",backgroundColor:"rgba(255, 136, 0, 0.6)"}}/>}
               </Box>

               <Box id="smallScreenFilter">
                  
               </Box>
     
          </Box>
  
          {(result !== "")
             ?(result.length !== 0)
                    ?result.map((book) => <FilteredBook key={book._id} 
                                                        book={book} 
                                                        filterName={searchBy} />)
                    :<h1>Unfortunately There is no such books</h1>
             :[1,2,3].map((num)=><FilteredBooksSkeletonLoading key={num} />)}
        
      </Box>

     </Box>
    </>
  );
}



