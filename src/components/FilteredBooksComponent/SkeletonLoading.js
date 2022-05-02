import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function FilteredBooksSkeletonLoading(){

    return(
      <Box sx={{
           display: "grid",
           gridTemplateColumns:"auto auto",
           justifyContent: "space-between",
           margin: "1% 0",
           padding: "0% 2%",}}>
         
         <Box sx={{display:"flex",
                  columnGap:"1vmax",
                  alignItems:"center",}}>
  
            <Skeleton className="imageSkeleton" variant="rectangular" sx={{height: "18vh",maxWidth:"40vw",width:"10rem",backgroundColor:"rgba(255, 136, 0, 0.6)",borderRadius:"1rem"}}/>
            <Box>
              <Box>
                <Skeleton variant="text" className="titleSkeleton" sx={{maxWidth:"50vw",width:"15rem",height:"3vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
                <Skeleton variant="text" className="authorSkeleton" sx={{height:"2vh",width:"60%",backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
              </Box>
              <Box>
                <Skeleton variant="text" className="titleSkeleton" sx={{width:"100%",height:"14vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
              </Box>
            </Box>
         </Box>
         <Box className="actionSkeleton" sx={{ paddingTop: "0%", marginLeft: "auto" }}>
             <Skeleton variant="text" sx={{width:"18rem",height:"25vh",backgroundColor:"rgba(255, 136, 0, 0.6)"}} />
         </Box>
  
      </Box>
    )
  
  }