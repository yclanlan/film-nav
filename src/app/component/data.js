// ask claudie to generate a list of movies with their details

// search images on google (most in IMDB, but also get some directly from google images)

// add the festival time to each movie by myself

export const movies = [{
    id: 1,
    title: 'Star Wars: The Rise of Skywalker',
    year: 2019,
    director: 'J.J. Abrams',
    poster: 'https://freight.cargo.site/t/original/i/a3a1c35c4ab9ba067378544fbdfa23ccb432b9aacee778875364bd148211c7ad/MV5BODg5ZTNmMTUtYThlNy00NjljLWE0MGUtYmQ1NDg4NWU5MjQ1XkEyXkFqcGc._V1_QL75_UX190_CR0-0-190-281_.jpg',
    horizontalPoster: "https://images-r2-1.thebrag.com/tb/uploads/2019/08/69513438_2615523778499510_9183039777094500352_n-768x420.jpg",
    description: 'The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak.',
    rating: 6.5,
    runtime: 142,
    genres: ['Action', 'Adventure', 'Fantasy'],
    boxOffice: "$368,000,000",
    actors: "Daisy Ridley, John Boyega, Oscar Isaac",
    awards: "Won 3 Oscars. 42 wins & 143 nominations total",
    festivalTime: "04/26/2025 2:15 PM"
},
{
    id: 2,
    title: 'Fast & Furious 9',
    year: 2021,
    director: 'Justin Lin',
    poster: 'https://m.media-amazon.com/images/M/MV5BODJkMTQ5ZmQtNzQxYy00ZWNlLWI0ZGYtYjU1NzdiMjcyNDRmXkEyXkFqcGc@._V1_QL75_UX190_CR0,10,190,281_.jpg',
    horizontalPoster: "https://images.mid-day.com/images/images/2022/jul/fast-and-furious_d.jpg",
    description: 'Dom Toretto is leading a quiet life with Letty and his son, but they know that danger always lurks just over the peaceful horizon.',
    rating: 5.2,
    runtime: 143,
    genres: ['Action', 'Crime', 'Thriller'],
    boxOffice: "$173,000,000",
    actors: "Vin Diesel, Michelle Rodriguez, Jordana Brewster",
    awards: "5 wins & 12 nominations",
    festivalTime: "04/26/2025 5:15 PM"
},
{
    id: 3,
    title: 'Black Widow',
    year: 2021,
    director: 'Cate Shortland',
    poster: 'https://m.media-amazon.com/images/M/MV5BZTMyZTA0ZTItYjY3Yi00ODNjLWExYTgtYzgxZTk0NTg0Y2FlXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg',
    horizontalPoster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqXnbAfspK8QuMPz04N323hGBrdF76GBRQQ&s",
    description: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.',
    rating: 6.7,
    runtime: 134,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    boxOffice: "$183,651,000",
    actors: "Scarlett Johansson, Florence Pugh, David Harbour",
    awards: "8 wins & 30 nominations",
    festivalTime: "04/27/2025 2:15 PM"
},
{
    id: 4,
    title: 'Dune',
    year: 2021,
    director: 'Denis Villeneuve',
    poster: 'https://m.media-amazon.com/images/M/MV5BOTc2YTFiOTItZmRiNi00OWE5LThhOTEtMmZhMTkzYmRiNjIxXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg',

    horizontalPoster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXlHQvmUyL823P4Ln3Cr21gyb7s_4R-XJcvSNv_1sJ78TB5ddbM2zeYf8Thsqrn8QUWQ&usqp=CAU",
    description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.',
    rating: 8.0,
    runtime: 155,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    boxOffice: "$402,027,000",
    actors: "Timothée Chalamet, Rebecca Ferguson, Zendaya",
    awards: "Won 6 Oscars. 158 wins & 274 nominations total",
    festivalTime: "04/27/2025 5:15 PM"
},
{
    id: 5,
    title: 'Free Guy',
    year: 2021,
    director: 'Shawn Levy',

    poster: 'https://m.media-amazon.com/images/M/MV5BN2I0MGMxYjUtZTZiMS00MzMxLTkzNWYtMDUyZmUwY2ViYTljXkEyXkFqcGc@._V1_QL75_UY281_CR3,0,190,281_.jpg',

    horizontalPoster: "https://media-cache.cinematerial.com/p/500x/emdpqa9y/free-guy-movie-cover.jpg?v=1632776323",

    description: 'A bank teller discovers that he\'s actually an NPC inside a brutal, open world video game.',
    rating: 7.1,
    runtime: 115,
    genres: ['Action', 'Adventure', 'Comedy'],
    boxOffice: "$121,626,000",
    actors: "Ryan Reynolds, Jodie Comer, Taika Waititi",
    awards: "5 wins & 22 nominations",
    festivalTime: "04/26/2025 7:15 PM"
}, {
    id: 6,
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
    horizontalPoster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9NEeOelMi9oNQexDGYbquSjs-y6DuuTK_Q&s',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    runtime: 142,
    genres: ['Drama'],
    boxOffice: "$28,341,469",
    actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    awards: "7 Oscar nominations & 21 wins from other ceremonies",
    festivalTime: "04/27/2025 7:15 PM"
},
{
    id: 7,
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
    horizontalPoster: 'https://i.ebayimg.com/images/g/lVMAAOSwhQheYrmk/s-l400.jpg',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    runtime: 148,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    boxOffice: "$836,848,102",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    awards: "4 Oscar wins & 4 Oscar nominations",
    festivalTime: "04/28/2025 7:15 PM"
},
{
    id: 8,
    title: 'Parasite',
    year: 2019,
    director: 'Bong Joon Ho',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFkZ65qxUJUpNDsfMhWci56bgSYPNdYvTHYg&s',
    horizontalPoster: 'https://i.ytimg.com/vi/SEUXfv87Wpk/mqdefault.jpg',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    rating: 8.6,
    runtime: 132,
    genres: ['Drama', 'Thriller'],
    boxOffice: "$258,773,828",
    actors: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    awards: "4 Oscar wins including Best Picture & 168 other wins",
    festivalTime: "04/29/2025 7:15 PM"

}]


