suite('bacon', function() {
  var testApp = require('./app')();

  config({app: testApp});

  test('zombie-html', {url: '/html'});
  test('3-paragraphs-json', {url: '/json/3'});
});

