import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import IconButton from '@mui/material/IconButton';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@mui/icons-material/ArrowLeftTwoTone';


export function ProductSkeletonSlider({value}){

    return(
        <Box sx={{
            margin: "1%",
            marginTop: "1.5rem"
          }}>

     <Box sx={{
                 display: "flex",
                 height: "2rem",
                 margin: "1%",
                 paddingBottom: "1%"}}>
 
         <Skeleton variant="text" sx={{width:"4rem",height:"1.5rem",m:2,backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
 
         <Skeleton variant="text" sx={{width:"4rem",height:"1.5rem",m:2,backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
 
         <Skeleton  variant="text" sx={{width:"4rem",height:"1.5rem",m:2,marginLeft:"auto",backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
 
       </Box>
 
       <Box sx={{
         display: "grid",
         gridTemplateColumns: "auto 10fr auto",
         gridColumnGap:"1vh",
         alignItems: "center"
       }}>
         <IconButton color="warning">
           <ArrowLeftTwoToneIcon sx={{ color: "#ff8800", fontSize: "2.25rem" }} />
         </IconButton>
 
         <Box sx={{ overflow: "hidden", zIndex: "2" }}>
           <Box className="scrollableBookView"
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${value},minmax(10rem,1fr))`,
                  columnGap: "0.3vmax",
                  overflow:"hidden"
                }}>
               {[1,2,3,4].map((value)=>
                   <Skeleton key={value} 
                             variant="rectangular"
                             sx={{minHeight: "25vh",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"0.5rem"}}/>)}
           </Box>
         </Box>
 
         <IconButton color="warning">
           <ArrowRightTwoToneIcon sx={{ color: "#ff8800", fontSize: "2.25rem" }} />
         </IconButton>
       </Box>

  </Box>
    )
}