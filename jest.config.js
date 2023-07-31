module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest' 
  },
  
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],

  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ]
}
