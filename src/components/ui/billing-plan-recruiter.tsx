import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiFillCheckCircle } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";

import { useTheme } from "next-themes";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ChooseRecruiterBillingPlan = () => {
  const { theme, setTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="py-14border-2 h-auto w-auto rounded-lg border-blue-500 p-4 px-10 hover:outline-2 hover:outline-green-500">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Plan
            </Typography>
            <Typography variant="h5" component="div">
              <span>Recruiter</span>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              10$
            </Typography>
            <div className="flex space-x-2">
              <FcCheckmark />
              <Typography variant="body2">
                You have acces to the leaderboard
                <br />
              </Typography>
            </div>
            <div className="flex space-x-2">
              <FcCheckmark />
              <Typography variant="body2">
                You can see all people, all badges, full acces to any feature
                <br />
              </Typography>
            </div>
          </CardContent>
          <div className="">
            <div className="flex justify-end ">
              <Button variant="outlined" size="small" className="mb-4 mr-4">
                Change Plan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default ChooseRecruiterBillingPlan;
