const path = require("path");

module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue" // Ajoutez "vue" à la liste des extensions
  ],
  transform: {
    "^.+\\.js$": "babel-jest", // Modifiez le pattern de transformation pour les fichiers JavaScript
    ".*\\.(vue)$": "vue-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": path.join(__dirname, "./src/$1")
  }
};
