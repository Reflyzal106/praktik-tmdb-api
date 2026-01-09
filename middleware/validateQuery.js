function validateQuery(req, res, next) {
    const { q } = req.query;

    // Tanpa query
    if (!q || q.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Query pencarian (q) wajib diisi"
        });
    }

    // Query < 3 huruf
    if (q.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Query pencarian minimal 3 karakter"
        });
    }

    next();
}

module.exports = validateQuery;
