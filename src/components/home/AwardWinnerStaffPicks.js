import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@mui/icons-material/ArrowLeftTwoTone';


export function AwardWinnerStaffPicks({ awardWinners, staffPicks }) {

  const [show, setShow] = useState(true);
  const groups = (show) ? awardWinners : staffPicks;

  return (
    <Box sx={{
      margin: "1%",
      marginTop: "1.5rem"
    }}>
      <Box sx={{
        display: "flex",
        height: "2rem",
        margin: "1%",
        paddingBottom: "1%"
      }}>
        <Button sx={{
          borderRight: "1px solid #ff8800",
          borderRadius: "0",
          color: "#ff8800",
          transition: "all 0.3s ease-in-out",
          ":hover": { background: "#ff8800", color: "white" }
        }}
          onClick={() => setShow(true)}
        >
          Award Winners
        </Button>

        <Button sx={{
          borderLeft: "1px solid #ff8800",
          borderRadius: "0",
          color: "#ff8800",
          transition: "all 0.3s ease-in-out",
          ":hover": { background: "#ff8800", color: "white" }
        }}
          onClick={() => setShow(false)}
        >
          Staff Picks
        </Button>

        <Button sx={{
          marginLeft: "auto",
          color: "#ff8800",
          transition: "all 0.3s ease-in-out",
          ":hover": { background: "#ff8800", color: "white" }
        }}>View All</Button>
      </Box>

      <Box sx={{
        display: "grid",
        gridTemplateColumns: "0.1fr 1fr 0.1fr",
        alignContent: "center"
      }}>
        <Button color="warning">
          <ArrowLeftTwoToneIcon sx={{ color: "#ff8800", fontSize: "2.8vmax" }} />
        </Button>
        <Box sx={{ overflow: "hidden", zIndex: "2" }}>

          <Box id="scrollableBookView" sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${groups.length},1fr)`,
            columnGap: "0.3vmax",
            "::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            "msOverflowStyle": "none",
            overflowX: "auto",
          }}>
            {groups.map((group, index) => <Books key={index} group={group} index={index} />)}
          </Box>
        </Box>
        <Button color="warning">
          <ArrowRightTwoToneIcon sx={{ color: "#ff8800", fontSize: "2.8vmax" }} />
        </Button>
      </Box>
    </Box>
  );
}

function Books({ group }) {

  const style = {
    width: "15vmax",
    height: "auto",
    display: "grid",
    placeItems: "center",
    padding: "5px 2px",
    // border: "1.5px solid #ff8800",
    borderRadius: "2rem",
    transition: "all 0.3s ease-in-out",
    ":hover": { background: "#ff8800" }
  };

  return (
    <Box sx={style}>
      <img style={{ height: "7.5vmax", width: "6vmax" }} src={group.thumbnailUrl} alt={group.title}></img>
      <h4 style={{ textAlign: "center" }}>
        ₹{group.price}<br />
        {group.title}</h4>
    </Box>
  );
}