import React, { useState } from "react";
import { DataTable, type TableColumnDef } from "../../../components/common/table/DataTable.js";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { countries } from "../../../countries.js";

const Countries = () => {

  interface TableColumns {
    flag: string;
    country: string;
    date: string | Date;
    iso_code: string;
    phone_code: string;
    continent: string;
  }
  
  const columns: TableColumnDef<TableColumns>[] = [
    {
      accessorKey: "flag",
      header: "Flag",
      cell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Avatar
            variant="square"
            src={params.getValue()}
            alt="flag"
            sx={{ width: 30, height: 22 }}
          />
        </Box>
      ),
    },
    { accessorKey: "country", header: "Country", },
    { accessorKey: "date", header: "Date", },
    { accessorKey: "iso_code", header: "ISO Code" },
    { accessorKey: "phone_code", header: "Phone Code", flex: 1 },
    { accessorKey: "continent", header: "Continent" },
  ];
  const data = countries;

  const addDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true)
    const handleOpen = (): void => setIsDialogOpen(true)
    const handleClose = (): void => setIsDialogOpen(false)

    return (
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
      >
        <DialogTitle>Add New Country</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div>
      <div className="flex justify-between mb-3">
        <Typography variant="h5" fontWeight={600} >Countries</Typography>
        <Button variant="contained" id="myButton">New</Button>
      </div>
      <DataTable columns={columns} data={data} selectable />
    </div>
  );
};

export default Countries;
