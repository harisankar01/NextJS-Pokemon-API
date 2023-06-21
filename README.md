# [Pokemon Selection App](https://next-js-pokemon-api-mu.vercel.app/)

> An app to demonstrate the new features of nextJS

This is a web application that displays a list of Pokemon fetched from the Pokemon API. Users can select their favorite Pokemon from the list and store their selection in Firebase.

Visit the website in [poke-app](https://next-js-pokemon-api-mu.vercel.app/)

## Features

- Fetches data from the Pokemon API to display a list of Pokemon.
- Allows users to select their favorite Pokemon from the list.
- Stores the user's Pokemon selection in Firebase.
- Implements authentication using Firebase email and password.
- Uses JSON Web Tokens (JWT) for token-based authentication.
- Secures the `/info` route by verifying the JWT token.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Next.js: A React framework for server-side rendering and static site generation.
- Firebase: A cloud-based platform for building web and mobile applications.
- Material-UI: A popular UI component library for React.
- JSON Web Tokens (JWT): A standard for token-based authentication.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pokemon-selection-app.git
   ```

2. Install the dependencies:

   ```bash
   cd pokemon-selection-app
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the Firebase Console.
   - Enable the Authentication and Firestore services.
   - Set up your Firebase configuration in `firebaseConfig` in the `services/db.ts` file.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

1. Sign up with your email and password to create an account.
2. Log in with your credentials to access the Pokemon selection page.
3. On the Pokemon selection page, you will see a list of Pokemon.
4. Click on the "Save" button next to a Pokemon to select it as your favorite.
5. Your selected Pokemon will be stored in Firebase.

## Folder Structure

```
.
├── components           # React components
├── app                  # Next.js pages
├── services             # Firebase service
├── utils                # Typescript interfaces
└── ...
```

## Acknowledgements

- [Pokemon API](https://pokeapi.co/): The RESTful API used to fetch Pokemon data.
- [Next.js Documentation](https://nextjs.org/docs): Official documentation for Next.js.
- [Firebase Documentation](https://firebase.google.com/docs): Official documentation for Firebase.
- [Material-UI Documentation](https://mui.com/): Official documentation for Material-UI.
