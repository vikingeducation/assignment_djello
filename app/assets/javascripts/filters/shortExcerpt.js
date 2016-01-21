app.filter('shortExcerpt', function() {
  return function(input) {
    return input.length > 20 ? input.slice(0, 20) + "..." : input;
  };
});