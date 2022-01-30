import * as React from 'react';
import Box from '@mui/material/Box';
import { AwardWinnerStaffPicks } from "./AwardWinnerStaffPicks";
import { BestSellersNewArrivals } from "./BestSellersNewArrivals";
import { Button } from '@mui/material';

export function HomeContent({ bestSellers, newArrivals, awardWinners, staffPicks }) {



  return (

    <Box sx={{}}>
      <Box
        sx={{
          height: "15vmax",
          border: "3px solid #ff8800",
          borderRadius: "1rem",
          margin: "1% 20%",
          marginTop: "2rem",
          display: "grid",
          placeItems: "center"
        }}>
        image grid

      </Box>
      <br />

      <BestSellersNewArrivals bestSellers={bestSellers} newArrivals={newArrivals} />
      <br />

      <AwardWinnerStaffPicks awardWinners={awardWinners} staffPicks={staffPicks} />
      <br />
      <Authors/>

  </Box>
  );
}

function Authors(){

  return(
    <Box>
      <Box sx={{display:"flex"}}>
      <Button>
        Fetured Authors
      </Button>
      <Button sx={{marginLeft:"auto"}}>
        View All
      </Button>
      </Box>
    </Box>
  )
}


