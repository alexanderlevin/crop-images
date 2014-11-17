var pictures = [{id: 0, path: '/img/0.jpg'}, {id: 1, path: '/img/1.jpg'}];

$.get('/js/templates/selector.html', function(result) {
  var ra = new Ractive({
    el: 'selector', 
    template: result, 
    data: {
      pictures: pictures,
    }
  });
});
