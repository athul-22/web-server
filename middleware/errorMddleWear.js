//error middle WEAR NEXT FUNCTION

const errorMiddleWare = (err, req, res, next) => {
    const defaultError = {
        statusCode: 404,
        success: "Failed",
        message: err,
    };
    if (err?.name === "ValidationError") {
        defaultError.statusCode = 404;

        defaultError.message = Object.values(err, errors)
            .map((el) => el.message)

            .join(",");
    }

    //DUPLICATE ERROR

    if(err.code && err.code === 11000){
        defaultError.statusCode = 404;
        defaultError.message = `${Object.values(
            err.keyValue
        )}field has to be unique!`;
    }

    res.status(defaultError.statusCode).JSON({
        success:defaultError.success,
        message:defaultError.message,
    });
};

export default errorMiddleWare
