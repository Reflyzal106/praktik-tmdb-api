require("dotenv").config();
const express = require("express");
const axios = require("axios");

const validateQuery = require("./middleware/validateQuery");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/movie/search", validateQuery, async (req, res, next) => {
    try {
        const { q } = req.query;

        const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    query: q,
                    api_key: process.env.TMDB_API_KEY
                }
            }
        );

        // FILM TIDAK DITEMUKAN
        if (response.data.results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Film tidak ditemukan"
            });
        }

        const filteredMovies = response.data.results.map(movie => ({
            judul: movie.title,
            rilis: movie.release_date,
            rating: movie.vote_average
        }));

        res.status(200).json({
            success: true,
            total: filteredMovies.length,
            data: filteredMovies
        });

    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
