import { Box, Button, colors, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const OrderPlaced = () => {
  return (
    <Box sx={{
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
        <img src='public/order-management-featured-image.jpg' alt='order' style={{
          width: "100%",
          height: "100%",
          marginBottom: "12px"
        }} />
        <Typography sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "monospace",
          color: colors.green[600],
        }}>
          Order Placed Sucssesfully
        </Typography>
        <Typography sx={{
          fontSize: "0.8rem",
          textAlign: "center",
          fontFamily: "monospace",
        }}>
          Your Order Placed This orderId is {Math.floor(Math.random() * 10000)}
        </Typography>
        <Button variant="contained" sx={{
          mt: 5,
          backgroundColor: colors.green[800],
          borderRadius: "15px",
        }}>
          <Link to="/shop_bats" style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontFamily: "monospace, cursive",
            letterSpacing: "1.4px",
          }}>
            Go To Home
          </Link>
        </Button>
      </Stack>
    </Box>
  )
}

export default OrderPlaced