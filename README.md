# Notes

Notes is a minimalist, plain-text, fullstack web application for creating and keeping digital notes. Sign up for a new account [here](http://asem-notes.herokuapp.com/signup) and check it out.

[![Notes screenshot](https://user-images.githubusercontent.com/25281974/128226626-4f72b058-1460-451f-9696-33237b837da0.png)](http://asem-notes.herokuapp.com)

## Description

This is my first full-stack web application. It had to be a note-taking app because I'm constantly taking notes, but also because I've always wanted a free and simple note-taking application that I could quickly access and use online wherever I was. There's a lot more that is yet to be done (see below), but some of the features include: dark mode support, minimalist and simple design that is fully responsive.

This is a MERN stack application. Here's a breakdown of the technologies used:

-   React
    -   React Router: for handling client-side routing
    -   Context API: for global state management
    -   React Transition Group: for animation
-   Node
    -   Express: for building a REST API and running a web server
    -   JSON Web Tokens: for authentication
    -   MongoDB: for data persistence
    -   Mongoose: for object document modeling

## Getting Started

### Dependencies

-   You must have Node and npm installed locally on your machine.

### Installing

-   Clone the repo
-   Download the project dependencies: `npm install && cd client && npm install`
-   Start the app: `npm run dev`

## Contributing

This is a work in progress. The ultimate goal is to turn this web application into a cross-platform desktop application that supports Linux in particular. Before that happens, however, there are a few features that need to be implemented first:

-   [ ] Add support for multiple notebooks
-   [ ] Add the ability to search through all notes
-   [ ] Add support for bolding, italicizing, and making lists
-   [ ] Save all notes in encrypted form

Feel free to contribute. Just follow these steps:

-   Fork the project
-   Clone it locally: `git clone https://github.com/yourUserName/yourRepoName.git`
-   Install server-side dependencies: `npm install`
-   Install client-side dependencies: `cd client && npm install`
-   Create a new branch: `git switch -c yourBranchName`
-   Add then commit your changes: `git commit -m "yourCommitMessage"`
-   Push your new code: `git push origin yourBranchName`
-   Open a pull request!

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE.md) file for details.

## Acknowledgments

-   [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
-   [useWindowSize Hook](https://usehooks.com/useWindowSize/)
