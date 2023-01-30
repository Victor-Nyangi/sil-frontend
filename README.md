# SIL Frontend Engineer Assessment

## A Frontend app built using React and Tailwind

- Steps

- Run __npm install__ to install dependencies

- Run __npm start__ to serve application

- Run __npm test__ to test the application

3rd party packages that I included are
moment, axios, react-router-dom, @react-oauth/google, tailwindcss and babel-jest

## Pages

/ - Landing Page, displays a brief explanation of what the application does, a login with google button for unauthenticated users and a link to the dashboard for authenticated users.

/dashboard - Home Page, displays a list of users, their information and their respective total albums

/user/:user_id = User page, displays a user's information and her/his respective albums (Limited to first 5)

/album/:album_id = Album page, displays an album's name and a list of some of it's photos (Limited to first 7)

/photo/:photo_id = Photo page, displays a photo, it's name and an edit title feature.

## Features

- Google Authenticator - allows users to login to the application with their google accounts, using the @react-oauth/google a user clicks the sign In with google button, a pop up window appears and upon successful login, a jwt token is generated
- Node API Backend - verifies the jwt token, decodes it and creates a new jwt token that is returned to the frontend application where the token is stored in the local storage.
- Authenticated routes/views - Unauthenticated users are only permitted to access the Landing page and login. Authenticated users can view all pages, can logout but can't login again.
- Logout button - allows users to log out, where token is removed from the local storage.
- Unit tests - tests built using jest that verify the validity of each page and if data is displayed as expected.
- A Github actions pipeline job that automatically runs the unit tests when a new Pull request is created.
- A Github actions pipeline job that deploys to vercel and creates a preview of the frontend application when a new Pull request is created.
- A Github actions pipeline job that deploys the main branch to vercel when a Pull request is merged.

## Submitted by Victor Gichui Nyangi
