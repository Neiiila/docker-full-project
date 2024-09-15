// functions that execute before controllers
const protect = (req, res, next) => {
    const { user } = req.session
    if (user) {
        next() // go to the next middleware or controller
    } else {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized'
        })
    }
}

module.exports =  protect