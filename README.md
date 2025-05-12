**🎬 Movie Explorer App**
A sleek and responsive Movie Explorer built with React and The Movie Database (TMDb) API. 
Search for movies, explore trending titles, and manage your personal list of favorites with dark/light mode support.

**🔥 Features**
🔍 Movie Search: Search movies using keywords via the TMDb API
📈 Trending Section: Explore daily or weekly trending movies
🎞️ Movie Details: View movie overviews, ratings, posters, and more
❤️ Favorites: Add/remove movies from your favorites list
🌙 Dark/Light Mode Toggle: Switch UI themes with a single click
🔐 Login Page: Entry point to the app (expandable for future auth)
🔁 Routing: Seamless page transitions with React Router
🧭 Tab Navigation: MUI tabs for quick access to Home and Favorites

**⚙️ Tech Stack**
React (CRA) – Frontend framework
React Router DOM – Routing and navigation
MUI (Material-UI) – UI components and theming
Axios – API requests
TMDb API – Movie data provider
Vercel – Deployment

**🚀 Live Demo**
🔗 https://movie-explorer-inky-zeta.vercel.app/

**🛠️ Project Setup**
1.1. Clone the repo:
   git clone https://github.com/pasindulsan/Movie-Explorer.git
   cd movie-explorer
2.2. Install dependencies:
   npm install
3.3. Set up environment variables:
   Create a `.env` file in the root directory with:
   REACT_APP_TMDB_API_KEY=d8e19c7ad8a46c6431353c2fef50dc0
4.4. Run the app locally:
   npm start
   The app will open at http://localhost:3000
   
**📁 Folder Structure**

src/
│
├── pages/
│   ├── Home.js
│   ├── MoviePage.js
│   ├── Login.js
│   └── Favorites.js
│
├── components/   # (Optional: for reusable UI)
│
├── App.js
├── index.js
└── ...other files

**📜 License**
MIT License
© 2025 Pasindu Dulsan

**🙋‍♂️ Author**
Made with ❤️ by Pasindu Dulsan (https://github.com/pasindulsan)

