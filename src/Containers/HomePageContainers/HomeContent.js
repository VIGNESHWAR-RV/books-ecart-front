import * as React from 'react';
import Box from '@mui/material/Box';
// import { Button } from '@mui/material';
import {ProductSlider} from "../../components/homeComponents/ProductSlider";
import Banner from "../../assets/cart banner.jpg";

export function HomeContent({ bestSellers, newArrivals, awardWinners, staffPicks }) {



  return (

    <Box sx={{}}>
        {/* poster images */}
      <Box
        sx={{
          height: "15vmax",
          border: "3px solid #ff8800",
          borderRadius: "1rem",
          margin: "1% 20%",
          marginTop: "2rem",
          display: "grid",
          placeItems: "center",
          overflow:"hidden"
        }}>
        <img className="banner" src={Banner} alt="banner"></img>

      </Box>

      <br />

         {/* best sellers section and new arrivals */}
      <ProductSlider bestSellers={bestSellers} newArrivals={newArrivals} />

      <br />

         {/* award Winners section and staff Picks  */}
      <ProductSlider awardWinners={awardWinners} staffPicks={staffPicks} />

      <br />

      {/* <Authors/> */}

    </Box>
  );
}

// function Authors(){

//   return(
//     <Box>
//       <Box sx={{display:"flex"}}>
//       <Button>
//         Fetured Authors
//       </Button>
//       <Button sx={{marginLeft:"auto"}}>
//         View All
//       </Button>
//       </Box>
//     </Box>
//   )
// }


