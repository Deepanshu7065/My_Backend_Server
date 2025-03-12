import { Box, colors, Divider, FormControl, Input, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { GetProductById } from "../AllGetApi"
import { imageUrl } from "../ApiEndPoint";
import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { LazyImage } from "../App";

const BatsDetails = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get("id");
    const [quantity, setQuantity] = useState(1);

    const { data, isLoading } = GetProductById({ id: productId || "" });

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace, cursive",
            width: "100vw",
            alignItems: "center",
        }}>
            {/* Product Name */}

            <ArrowBack sx={{
                cursor: "pointer",
                fontSize: "1.5rem",
                position: "absolute",
                right: 10,
                top: 70
            }}
                onClick={() => window.history.back()}
            />

            <Box sx={{
                width: { xs: "100%", md: "80%" },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                mt: 12,
                gap: 1,
                height: "100%"
            }}>

                <Box sx={{
                    width: { xs: "100%", md: "40%" },
                    textAlign: "left"
                }}>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width="100%" height={500} />
                    ) : (
                        <>
                            <Box sx={{
                                width: "100%",
                                height: { xs: 300, md: 500 },
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
                            }}>
                                <LazyImage
                                    src={`${imageUrl}${data?.image}`}
                                    alt="Product"
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%"
                                    }}
                                />
                            </Box>
                        </>
                    )}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        mt: 2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {[1, 2, 3].map((_, index) => (
                            <Box key={index} sx={{
                                height: "70px",
                                width: "70px",
                                cursor: "pointer",
                                borderRadius: "5px",
                                overflow: "hidden",
                                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
                            }}>
                                {isLoading ? (
                                    <Skeleton variant="rectangular" width="100%" height="100%" />
                                ) : (
                                    <LazyImage
                                        src={`${imageUrl}${data?.image}`}
                                        alt="Thumbnail"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box sx={{
                    width: { xs: "100%", md: "60%" },
                    mt: { xs: 3, md: 0 },
                    textAlign: "left",
                    p: 2,
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography sx={{
                        fontSize: { xs: "1.2rem", md: "2rem" },
                        fontWeight: "bold",
                        textAlign: "left",
                        fontFamily: "cursive",
                        color: colors.grey[600]
                    }}>
                        {data?.product_name}

                    </Typography>

                    <Typography sx={{
                        fontSize: { xs: "1rem", md: "1.2rem" },
                        textAlign: "left",
                        color: colors.grey[600]
                    }}>
                        Kashmir Willow Cricket Bat |
                        Second Grade |
                        57mm Thick Edges |
                        Powerful & Lightweight |
                        Strong Cane Handle |
                        Ideal for Leather Ball Cricket
                    </Typography>
                    <Divider sx={{ my: 2, backgroundColor: colors.grey[600] }} />

                    <Typography sx={{
                        fontSize: { xs: "1.2rem", md: "2rem" },
                        fontWeight: "bold",
                        textAlign: "left",
                        color: colors.green[600]
                    }}>
                        ₹{data?.price}
                    </Typography>

                    <Divider sx={{ my: 2, backgroundColor: colors.grey[600] }} />

                    <Typography
                        sx={{
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            textAlign: "left",
                            color: "grey",
                            mt: 5
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            gap: { xs: "1rem", md: "2rem" }
                        }}>
                            {[
                                { img: "/src/assets/5637246.png", text: "Home Delivery" },
                                { img: "/src/assets/replace-pictures.png", text: "7 Days Replacement" },
                                { img: "/src/assets/Business-icons-06-512.webp", text: "Cash On Delivery" },
                                { img: "/src/assets/imagesSecure.png", text: "Secure Payment" }
                            ].map((item, index) => (
                                <Box key={index} sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: { xs: "40px", sm: "70px", md: "80px" }
                                }}>
                                    <LazyImage
                                        src={item.img}
                                        alt={item.text}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            maxWidth: "80px"
                                        }}
                                    />
                                    <Typography sx={{
                                        fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.8rem" },
                                        textAlign: "center",
                                        mt: 1
                                    }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Typography>
                    <Divider sx={{ my: 2, backgroundColor: colors.grey[600], mt: 5 }} />
                    <div className="table_size">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: "bold" }}> size </td>
                                    <td> M </td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "bold" }}> Brand </td>
                                    <td> Kashmir Willow </td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "bold" }}> Sports </td>
                                    <td> Cricket </td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "bold" }}> Weight </td>
                                    <td> 500g </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Divider sx={{ my: 2, backgroundColor: colors.grey[600], mt: 5 }} />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        mt: 3
                    }}>
                        <Typography sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            textAlign: "left",
                            color: colors.grey[600],
                            alignItems: { xs: "flex-start", sm: "center" },
                            width: "100%",
                            gap: 2
                        }}>
                            Quantity:
                            <FormControl sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                width: { xs: "100%", sm: "auto" },
                                gap: 1,
                            }}>
                                <Input
                                    size="small"
                                    type="number"
                                    value={quantity}
                                    onChange={(e: any) => setQuantity(parseInt(e.target.value))}
                                    sx={{ width: { xs: "100%", sm: "80px" } }}
                                />
                            </FormControl>
                        </Typography>


                        <Stack spacing={1} mt={4} width="100%" sx={{
                            display: "flex",
                            alignItems: { xs: "center", sm: "flex-start" },
                        }}>
                            <button style={{
                                backgroundColor: colors.green[600],
                                color: "white",
                                padding: "6px",
                                fontSize: "1rem",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "monospace, cursive",
                                width: "100%",
                                maxWidth: "200px"

                            }}>
                                Add to Cart
                            </button>

                            <button style={{
                                backgroundColor: colors.blue[600],
                                color: "white",
                                padding: "6px",
                                fontSize: "1rem",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "monospace, cursive",
                                width: "100%",
                                maxWidth: "200px"
                            }}>
                                Buy Now
                            </button>
                        </Stack>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}

export default BatsDetails;

