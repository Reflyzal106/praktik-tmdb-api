function errorHandler(err, req, res, next) {

    // Error dari TMDb (API Key salah, unauthorized)
    if (err.response && err.response.status === 401) {
        return res.status(401).json({
            success: false,
            message: "API Key tidak valid atau tidak terotorisasi"
        });
    }

    // Error lain dari TMDb
    if (err.response) {
        return res.status(err.response.status).json({
            success: false,
            message: err.response.data.status_message || "Terjadi kesalahan dari API TMDb"
        });
    }

    // Internet mati / server error
    return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server"
    });
}

module.exports = errorHandler;
