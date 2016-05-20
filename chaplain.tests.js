module.exports = {
  app: require('./app')(),
  tests: [
    {name: 'zombie-html', url: '/html'},
    {name: '3-paragraphs-json', url: '/json/3'}
  ]
};
