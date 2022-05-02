// import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';
// import {context} from "../../App";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@mui/icons-material/ArrowLeftTwoTone';


export function ProductSlider({ awardWinners="", staffPicks="",bestSellers="", newArrivals="" }) {



  // const {mode} = useContext(context);

  const navigate = useNavigate();

  const [show, setShow] = useState(true);

    
  const groups = (awardWinners !== "" && staffPicks !== "")
                  ?(show) 
                     ? awardWinners : staffPicks
                  :(show)
                     ? bestSellers : newArrivals;

  const category = (awardWinners !== "" && staffPicks !== "")
                      ?(show) 
                         ? "Award Winners" : "Staff Picks"
                      :(show)
                         ? "Best Sellers" :  "New Arrivals";

    // to set scroll distance required as per screen
  const [scrollDistance,setScrollDistance] = useState(window.innerWidth/3);

    //function to handle resize event
  const handleResize = ()=>{
    setScrollDistance(window.innerWidth/3);
  }

    // element to be scrolled
  const scrollRef = useRef();

  
    //to add window re-size event listener
  useEffect(()=>{
    window.addEventListener("resize",handleResize);

     // DOUBT ABOUT PASSING ARGUMENT TO SET-INTERVAL THAT IS CHANGED BY STATE
     //funtion to trigger auto scroll
     const autoScroll=()=>{
        let scrollElement = scrollRef.current;
        let totalWidth = scrollElement.scrollWidth;
        let scrollPosition = scrollElement.offsetWidth;
        setInterval((scrollDistance)=>{  
            // DONT USE useRef (here scrollRef.current) INSIDE SET-INTERVAL,
            //  IT CAUSES ERROR DUE TO useRef DURING UNMOUNT
    
           if(scrollPosition > totalWidth){
    
              scrollElement.scrollBy({left:-(totalWidth),behavior:"smooth"});
              scrollPosition = scrollElement.offsetWidth;
           }else{
              scrollElement.scrollBy({left:scrollDistance,behavior:"smooth"});
              scrollPosition += scrollDistance;
           }
          //  console.log(scrollDistance);
        },5000,scrollDistance);
     }

     autoScroll();

     return()=>{
       clearInterval(autoScroll);
       window.removeEventListener("resize",handleResize);
      };
 },[scrollDistance]);

  
  //for scrolling right side
  const handleScrollRight =()=>{
      scrollRef.current.scrollBy({left:scrollDistance,behavior:"smooth"});
  }

  //for scrolling left side
  const handleScrollLeft =()=>{
      scrollRef.current.scrollBy({left:-(scrollDistance),behavior:"smooth"});
  }

  

  return (
    <Box sx={{
      margin: "1%",
      marginTop: "1.5rem"
    }}>

      <Box sx={{
                display: "flex",
                height: "2rem",
                margin: "1%",
                paddingBottom: "1%"}}>

        <Button sx={{
        //   backgroundColor: (show === true)?backgroundColor : "transparent",
          borderRight: "1px solid #ff8800",
          borderRadius: "0",
          color: "#ff8800",
          transition: "all 0.3s ease-in-out",
          ":hover": { background: "#ff8800", color: "white" }
        }}
          disabled={show === true}
          onClick={() => setShow(true)}
        >
           {(awardWinners !== "" && staffPicks !== "")
                  ? "Award Winners"
                  : "Best Sellers"
            }
        </Button>

        <Button sx={{ 
        //   backgroundColor: (show === false)?backgroundColor : "transparent",
          borderLeft: "1px solid #ff8800",
          borderRadius: "0",
          color: "#ff8800",
          transition: "all 0.3s ease-in-out",
          ":hover": { background: "#ff8800", color: "white" }
        }}
          disabled={show === false}
          onClick={() => setShow(false)}
        >
          {(awardWinners !== "" && staffPicks !== "")
                  ? "Staff Picks"
                  : "New Arrivals"
            }
        </Button>

        <Button sx={{
          marginLeft: "auto",
          color: "#ff8800",
          transition: "all 0.3s ease-in-out",
          ":hover": { background: "#ff8800", color: "white" }}}
          onClick={()=>
            navigate(category)}>
              View All
        </Button>

      </Box>

      <Box sx={{
        display: "grid",
        gridTemplateColumns: "auto 10fr auto",
        gridColumnGap:"1vh",
        alignItems: "center"
      }}>
        <IconButton color="warning" onClick={handleScrollLeft}>
          <ArrowLeftTwoToneIcon sx={{ color: "#ff8800", fontSize: "2.25rem" }} />
        </IconButton>

        <Box sx={{ overflow: "hidden", zIndex: "2" }}>
          <Box id="scrollableBookView" 
               ref={scrollRef}
               sx={{
                 display: "grid",
                 gridTemplateColumns: `repeat(${groups.length},1fr)`,
                 columnGap: "0.3vmax",
                 "::-webkit-scrollbar": { display: "none" },
                 scrollbarWidth: "none",
                 "msOverflowStyle": "none",
                 overflowX: "auto",
               }}>
            {groups.map((group, index) => <Books key={index} group={group} category={category} />)}
          </Box>
        </Box>

        <IconButton color="warning" onClick={handleScrollRight}>
          <ArrowRightTwoToneIcon sx={{ color: "#ff8800", fontSize: "2.25rem" }} />
        </IconButton>
      </Box>

    </Box>
  );
}

// function to render books inside list box

function Books({ group,category }) {

  const navigate = useNavigate();

  const style = {
    margin:"0 0",
    minWidth: "15.5vmax",
    height: "auto",
    display: "grid",
    placeItems: "center",
    padding: "5px 2px",
    // border: "1.5px solid #ff8800",
    borderRadius: "2rem",
    transition: "all 0.3s ease-in-out",
    cursor:"pointer",
    ":hover": { background: "#ff8800" }
  };

  return (
    <Box sx={style} className="booksInSlider" onClick={()=>navigate(`${category}/${group.title}`)}>
      <img style={{ height: "7.5vmax", width: "6vmax",borderRadius:"0.5rem" }} 
          //  loading="lazy"
           src={group.thumbnailUrl}
           alt={group.title}>
      </img>
      <h4 style={{ textAlign: "center" }}>
        ₹{group.price}<br />
        {group.title}</h4>
    </Box>
  );
}