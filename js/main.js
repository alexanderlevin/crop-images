var pictures = [{id: 0, path: '/img/0.jpg'}, {id: 1, path: '/img/1.jpg'}];
var indexedPictures = _.indexBy(pictures, 'id');

$.get('/js/templates/selector.html', function(result) {
  var ra = new Ractive({
    el: 'selector', 
    template: result, 
    data: {
      pictures: pictures,
    }
  });

  if (window.location.hash !== '') {
    hashValue = window.location.hash.slice(1);
    if (indexedPictures[hashValue] !== undefined) {
      ra.set('selectedId', indexedPictures[hashValue].id);
    }
  }

  ra.observe('selectedId', function(newValue, oldValue) {
    if (oldValue !== undefined && newValue !== oldValue) {
      window.location.hash = '#' + newValue;
      window.location.reload();
    }
    setImage(indexedPictures[newValue].path);
  });

  jQuery(function($) {
    $('#picture').Jcrop();
  });
});

var setImage = function(path) {
    $('#picture').attr('src', path);
}