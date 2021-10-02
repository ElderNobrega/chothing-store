# chothing-store

## https://e-clothing-store-project.herokuapp.com/

# e-commerce clothing project

## This is a React project design for e-commerce clothing website. 

## Bellow I will be detailing all the technologies I have been using

### SASS:
Node-SASS is a library that allows provides biding for node.js to libSass. 
It allows us to compile scss to css. It has a lot of qualities and life improvements 

### Firebase:
Using firebase cloud firestore as a database for the project. 

### Stripe:
Using Strip to handle payments, for now it is in test mode. Not handling any real payments and backends for it, YET :) 

### Redux: 
As the app is growing I find that redux will help me to have more control of the states that I will be needing.
Also, it will increase my knowledge with Redux

### Logger Midleware:
Using logger midleware for testing purposes

### Reselect:
As we have a state being rerendered in every state updates, even though it is the same state, this is not what we want. This is where reselect comes in. 

### Redux - thunk:
Installed to handle async functions codes in our redux action

### Redux Persist:
Installed Redux persist to keep state saved when refresh the page!!

### Redux Saga: (thunk replaced):
A library to handle asynchronous and inpure functions like fetching data and browser cache easier to manage, efficient to execute and better at handling failures. 

### React Hooks:
Replaced some class components into functional components so I could implement, test and practice React hooks

### Backend in Node.js, express, axios:
create a backend server to handle stripe payments. using axios to fetch token from stripe.


heroku login
heroku create e-clothing-store --buildpack https://github.com/mars/create-react-app-buildpack.git