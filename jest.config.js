module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },

      "moduleNameMapper": {
          "axios": "axios/dist/node/axios.cjs"
      }
  
  };