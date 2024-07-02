"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useAddConsumptionMutation } from "@/redux/api/userApi";
import { toast } from "sonner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddConsumptionModal = ({
  consumerId,
  handleClose,
}: {
  consumerId: string;
  handleClose: () => void;
}) => {
  const [units, setUnits] = useState<number>(0);
  const [addConsumption, { isLoading }] = useAddConsumptionMutation();

  const handleAddConsumption = async () => {
    try {
      await addConsumption({ consumerId, units }).unwrap();
      toast.success("Consumption added successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to add consumption.");
      console.error("Add consumption error:", error);
    }
  };

  return (
    <Modal
      open={!!consumerId}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Consumption
        </Typography>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Units"
            type="number"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            fullWidth
          />
          <Button
            onClick={handleAddConsumption}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddConsumptionModal;
