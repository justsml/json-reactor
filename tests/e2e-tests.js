//const casper = require('casper').create()
const URL = 'http://0.0.0.0:1337/tests/index.html'
const VIEWPORT = {
  top: 0,
  left: 0,
  width: 1280,
  height: 900
};
const CAPTURE_FORMAT = {
  format: 'jpg',
  quality: 85
};

casper.options.verbose = true;
casper.options.viewportSize = { width: VIEWPORT.width, height: VIEWPORT.height };

casper.test.begin('has created JsonEditor', 3, function (test) {
  // casper.on('complete.error', function(err) {
  //   this.die("Complete callback has failed: " + err);
  // });

  casper.start('http://0.0.0.0:1337/tests/index.html', function () {
    this.echo('Loaded')
  }).waitForText('Editor', function () {
    test.assertTextExists('Editor', 'page body contains "Editor"')
    // this.echo('page body contains "Editor"')
  }).waitUntilVisible('.json-editor',
    function _then() { this.echo('Has json-editor loaded...') },
    function _failed() { this.echo('Has json-editor loaded...') }, 6000);

  casper.then(function () {
    test.assertExists('.json-editor tbody');
    test.assertExists('.json-editor thead');
  })
  casper.run(function () {
    test.done();
  });
  // this.capture('temp/scroll-test-2-1.jpg', VIEWPORT, CAPTURE_FORMAT);
});

