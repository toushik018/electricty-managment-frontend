"use client";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Alert,
  Pagination,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllConsumersQuery } from "@/redux/api/userApi";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDebounced } from "@/redux/hooks";

const ManageBills = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const query: Record<string, any> = {
    page,
    limit,
  };

  if (debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, error } = useGetAllConsumersQuery(query);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "unitsConsumed", headerName: "Units Consumed", flex: 1 },
    { field: "billAmount", headerName: "Bill Amount", flex: 1 },
    {
      field: "isBillPaid",
      headerName: "Bill Status",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: params.row.isBillPaid ? "green" : "red",
          }}
        >
          {params.row.isBillPaid ? <CheckIcon /> : <CloseIcon />}
          <Typography sx={{ ml: 1 }}>
            {params.row.isBillPaid ? "Paid" : "Not Paid"}
          </Typography>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading consumers</Alert>;
  }

  const consumers = data?.consumers || [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" component="h1">
          Manage Bills
        </Typography>
      </Stack>
      <Box sx={{ height: 600, mt: 2 }}>
        <DataGrid
          rows={consumers}
          columns={columns}
          hideFooterPagination
          getRowId={(row) => row._id}
        />
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ManageBills;
