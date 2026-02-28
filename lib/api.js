const API_URL = 'https://movie-tracker-api.vercel.app';

export async function fetchMovies() {
    const res = await fetch(`${API_URL}/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
}

export async function addMovie(movie) {
    const res = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie)
    });
    if (!res.ok) throw new Error('Failed to add movie');
    return res.json();
}

export async function updateMovie(id, updates) {
    const res = await fetch(`${API_URL}/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update movie');
    return res.json();
}

export async function deleteMovie(id) {
    const res = await fetch(`${API_URL}/movies/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete movie');
    return true;
}
