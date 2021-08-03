# What is this?

I'm glad you asked. This is a minimalist, plain-text, fullstack, note-taking web app. [Check it out!](http://asem-notes.herokuapp.com)

# Notes

Notes is a minimalist, plain-text (for the time being), fullstack note-taking web application. Sign up for a new account [here](http://asem-notes.herokuapp.com/signup) and check it out.

![Notes screenshot](https://user-images.githubusercontent.com/25281974/127748676-0ce53ac4-e2ea-46ba-a74c-a050aaa9a4aa.png)
-- edit picture
-- resume database cluster

## Description

I made this for fun. Wanna play tic-tac-toe against a friend? Start a new game and share the generated game ID with them. Once you start a new game and another player joins, you can play any number of subsequent games as long as both players are still online. This was made possible thanks to the awesome Socket.IO library which makes event-based realtime bi-directional communication a breeze. I decided to use vanilla JavaScript to manipulate the DOM directly instead of a client-side framework for this project.

Technologies and libraries used:

-   JavaScript
-   Socket.IO
-   Express

## Getting Started

### Dependencies

-   You must have Node and npm installed locally on your machine.

### Installing

-   Clone the repo
-   Download the project dependencies: `npm install`
-   Start the server: `npm server.js`

## Authors

-   [asemarian](https://github.com/asemarian)

## Contributing

Contributions are definitely welcome! Just follow these steps:

-   Fork the project
-   Clone it locally: `git clone https://github.com/yourUserName/yourRepoName.git`
-   Install dependencies: `npm install`
-   Create a new branch: `git switch -c yourBranchName`
-   Add then commit your changes: `git commit -m "yourCommitMessage"`
-   Push your new code: `git push origin yourBranchName`
-   Open a pull request!

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.md) file for details

## Acknowledgments

-   [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
-   [useWindowSize Hook](https://usehooks.com/useWindowSize/)
-   [Socket.IO](https://socket.io/docs/v4)
