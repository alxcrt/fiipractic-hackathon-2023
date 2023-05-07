import React, { useMemo } from "react";
import Link from "next/link";

//MRT Imports
import MaterialReactTable from "material-react-table";

//Material-UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";

//Date Picker Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
//Mock Data
import { data } from "../../makeData";
import { useTheme } from "next-themes";
import { createTheme } from "@mui/material/styles";
import { api } from "~/utils/api";

const LeaderBoard = () => {
  const { data: users, isLoading } = api.user.getAll.useQuery();

  console.log(users);

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

  console.log(theme);
  const columns = useMemo(
    () => [
      {
        id: "employee", //id used to define `group` column
        columns: [
          {
            accessorFn: (row: any) => `${row.name}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Name",
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Link href={`/profile/${row.original.id}`}>
                  <img
                    alt="avatar"
                    width={128}
                    height={128}
                    className="select-none"
                    src={row.original.image}
                    loading="lazy"
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
        ],
      },
      {
        id: "id",
        columns: [
          // {
          //   accessorKey: "salary",
          //   // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
          //   filterFn: "between",
          //   header: "HR POINTS",
          //   size: 200,
          //   //custom conditional format and styling
          //   Cell: ({ cell }) => (
          //     <Box
          //       component="span"
          //       sx={(theme) => ({
          //         // backgroundColor:
          //         //   cell.getValue() < 50_000
          //         //     ? theme.palette.error.dark
          //         //     : cell.getValue() >= 50_000 && cell.getValue() < 75_000
          //         //     ? theme.palette.warning.dark
          //         //     : theme.palette.success.dark,
          //         borderRadius: "0.25rem",
          //         color: "#fff",
          //         maxWidth: "9ch",
          //         p: "0.25rem",
          //       })}
          //     >
          //       {/* {cell.getValue()?.toLocaleString?.("en-US", {
          //         style: "currency",
          //         currency: "USD",
          //         minimumFractionDigits: 0,
          //         maximumFractionDigits: 0,
          //       })} */}
          //       123
          //     </Box>
          //   ),
          // },
          // {
          //   accessorKey: "jobTitle", //hey a simple column for once
          //   header: "Job Title",
          //   size: 350,
          // },
        ],
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <MaterialReactTable
        columns={columns}
        data={users || []}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enablePinning
        enableRowActions
        enableRowSelection
        initialState={{ showColumnFilters: true }}
        positionToolbarAlertBanner="bottom"
        renderRowActionMenuItems={({ closeMenu }) => [
          <MenuItem
            key={0}
            onClick={() => {
              // View profile logic...
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            View Profile
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              // Send email logic...
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            Send Email
          </MenuItem>,
        ]}
      />
    </ThemeProvider>
  );
};

export default LeaderBoard;
