
const asyncHandler = (fun) => async (err, req, res, next) => {
    try {
        await fun(req, res, next)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export default asyncHandler