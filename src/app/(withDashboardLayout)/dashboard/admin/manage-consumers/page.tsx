"use client";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Alert,
  Pagination,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllConsumersQuery } from "@/redux/api/userApi";
import AddIcon from "@mui/icons-material/Add";
import AddConsumptionModal from "./components/consumtionModal";

const ManageConsumers = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);
  const [selectedConsumer, setSelectedConsumer] = useState<string | null>(null);

  const query: Record<string, any> = {
    page,
    limit,
  };

  const { data, isLoading, error } = useGetAllConsumersQuery(query);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddConsumptionClick = (consumerId: string) => {
    setSelectedConsumer(consumerId);
  };

  const handleModalClose = () => {
    setSelectedConsumer(null);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "unitsConsumed", headerName: "Units Consumed", flex: 1 },
    { field: "billAmount", headerName: "Bill Amount (BDT)", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleAddConsumptionClick(params.row._id)}
        >
          <AddIcon />
        </IconButton>
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
          Manage Consumers
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
      {selectedConsumer && (
        <AddConsumptionModal
          consumerId={selectedConsumer}
          handleClose={handleModalClose}
        />
      )}
    </Box>
  );
};

export default ManageConsumers;
