
import { GetRepairAllApi } from '../AllGetApi'
import { Box } from '@mui/material'
import { imageUrl } from '../ApiEndPoint'

const RepairAllOrders = () => {
    const { data } = GetRepairAllApi()
    console.log(data)
    return (
        <div style={{
            marginTop: "40px"
        }}>
            <Box>
                {data?.map((item: any) => {
                    return (
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid black",
                            padding: "10px",
                            margin: "10px"
                        }}>
                            {
                                item?.product_name
                            }
                            {item?.images?.map((image: any) => {
                                return (
                                    <div>
                                        <img src={imageUrl + image} style={{
                                            width: "100px",
                                            height: "100px"
                                        }} />
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </Box>
            <pre>
                {data && JSON.stringify(data, null, 2)}
            </pre>
            RepairAllOrders
        </div>
    )
}

export default RepairAllOrders