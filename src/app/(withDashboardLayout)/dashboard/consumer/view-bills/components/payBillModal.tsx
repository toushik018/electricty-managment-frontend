// src/app/consumers/monthly-bill/components/PayBillModal.tsx
import React from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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

const PayBillModal = ({ open, handleClose, billAmount, onPay }: any) => {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data: any) => {
    onPay(data.amount);
    handleClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Pay Bill
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <Controller
              name="amount"
              control={control}
              defaultValue={billAmount}
              rules={{
                required: "Amount is required",
                min: {
                  value: billAmount,
                  message: `Amount cannot be less than ${billAmount}`,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary">
              Pay
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default PayBillModal;
