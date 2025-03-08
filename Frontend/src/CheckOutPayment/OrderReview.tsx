import { Box, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button, colors, useMediaQuery } from '@mui/material';
import React from 'react';
import { RootState } from '../Store';
import { useSelector } from 'react-redux';
import { imageUrl } from '../ApiEndPoint';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const OrderReview = () => {
  const { products, deleveryCharge, discount } = useSelector((state: RootState) => state?.ProductId);
  const { address } = useSelector((state: RootState) => state?.AddAddressCustomer);

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
  const totalPayable = totalPrice + (deleveryCharge ?? 0) - (discount ?? 0);
  const mobile = useMediaQuery('(max-width: 600px)');

  if ((products.length ?? 0) === 0) {
    return <Box sx={{
      width: "100%",
      bgcolor: "white",
      mb: 2,
      p: 3,
      mt: 7,
      borderRadius: "10px",
      display: "flex",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      justifyContent: "center",
      height: "50vh",
      alignItems: "center"
    }}>
      <Stack alignItems={"center"}>
        <Typography sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "monospace",
        }}>
          No More Order Data
        </Typography>
        <Typography sx={{
          fontSize: "0.8rem",
          textAlign: "center",
          fontFamily: "monospace",
        }}>
          Add More Product to Cart
        </Typography>
        <Button variant="contained" sx={{
          mt: 5,
          backgroundColor: colors.grey[800],
          borderRadius: "15px",
        }}>
          <Link to="/shop_bats" style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontFamily: "monospace, cursive",
            letterSpacing: "1.4px",
          }}>
            Shop Now
          </Link>
        </Button>
      </Stack>
    </Box>
  }

  if (address.address === "") {
    return <Box sx={{
      width: "100%",
      bgcolor: "white",
      mb: 2,
      p: 3,
      mt: 4,
      borderRadius: "10px",
      display: "flex",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      justifyContent: "center",
      height: "50vh",
      alignItems: "center"
    }}>
      <Stack alignItems={"center"}>
        <Typography sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "monospace",
        }}>
          Pease select Your Shipping Address
        </Typography>
        <Home />

      </Stack>
    </Box>

  }

  return (
    <Box sx={{
      width: "100%",
      bgcolor: "white",
      p: { xs: 1, md: 3 },
      mt: 4,
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      minHeight: "auto",
      maxHeight: "80vh",
      mb: { xs: 9, md: 2 }

    }}>
      <Typography sx={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "underline",
        fontFamily: "monospace",
        color: colors.blue[500],
        letterSpacing: 2,
        mb: 2,

      }}>Order Summary</Typography>

      {/* Table for Products */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 3,
          overflowY: "auto",
          maxHeight: "30vh",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "2px",
          }
        }}>
        <Table stickyHeader sx={{
          minWidth: "auto"
        }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontSize: mobile ? "0.7rem" : "0.9rem" }}><strong>{mobile ? "Image" : "Image"}</strong></TableCell>
              <TableCell sx={{ fontSize: mobile ? "0.7rem" : "0.9rem" }}><strong>{mobile ? "Name" : "Product Name"}</strong></TableCell>
              <TableCell sx={{ fontSize: mobile ? "0.7rem" : "0.9rem" }} align="center"><strong>{mobile ? "Qty" : "Quantity"}</strong></TableCell>
              <TableCell sx={{ fontSize: mobile ? "0.7rem" : "0.9rem" }} align="right"><strong>{mobile ? "P (₹)" : "Price (₹)"}</strong></TableCell>
              <TableCell sx={{ fontSize: mobile ? "0.7rem" : "0.9rem" }} align="right"><strong>{mobile ? "T (₹)" : "Total (₹)"}</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar src={imageUrl + item?.product_id?.image} alt={item?.product_id?.product_name} sx={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{item?.product_id?.product_name}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
            fontWeight: "bold"
          }}>Total Quantity:</Typography>
          <Typography>{totalQuantity}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
            fontWeight: "bold"
          }}>Total Amount:</Typography>
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
          }}>₹{totalPrice}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
            fontWeight: "bold"
          }}>Delivery Charge:</Typography>
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
          }}>₹{deleveryCharge ?? 0}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
            fontWeight: "bold"
          }}>Discount:</Typography>
          <Typography sx={{
            fontSize: "0.8rem",
            fontFamily: "monospace",
          }}>- ₹{discount ?? 0}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, pt: 2, borderTop: "1px solid #ccc" }}>
          <Typography sx={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            fontFamily: "monospace"
          }}>Total Payable:</Typography>
          <Typography sx={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "green",
            fontFamily: "monospace"
          }}>₹{totalPayable}</Typography>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Stack>
          <Typography sx={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            fontFamily: "monospace"
          }}>
            Shipping Address
          </Typography>
          <Typography sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "0.6rem",
            fontFamily: "monospace"
          }}>
            <span>
              {address?.customer_name} {address?.last_name}
            </span>
            <span>
              {Number(address?.phone ?? 0)}
            </span>
            <span>
              {address?.address},
              {address?.fullAddress}
            </span>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderReview;