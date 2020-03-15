### React Application using GraphQL API

##Application used to fetch data from GitHub API store by:
- Repository name
- Repository owner
- Set number of pull requests to display
- Set number of issues to display
- Set state of the issues: OPEN or CLOSED
- View comments of listed issues

##Used libraries:
-"apollo-boost": "^0.4.7",
-"apollo-cache-inmemory": "^1.6.5",
-"apollo-link-context": "^1.0.19",
-"apollo-link-http": "^1.5.16",
-"graphql": "^14.6.0",
-"react": "^16.13.0",
-"react-apollo": "^3.1.3",
-"react-dom": "^16.13.0",
-"react-scripts": "3.4.0"

#How to use:
- Close the repository
- Install dependencies with `npm install`
- Run with command `npm start`
- End point of the application is localhost:3000
- AuthO token is required to be entered to get search results

#AuthO token of GitHub
- Go to your GitHub account
- Settings -> Developer settings -> Personal Access Tokens
- Generate New Token
- Choose necessary settings

#Limitations
- No tests
- Comments search tool
- Responsiveness 

**Please leave comments to make this application better and more Reactive**
