var pictures = [{id: 0, path: '/img/0.jpg'}, {id: 1, path: '/img/1.jpg'}];

$.get('/js/templates/selector.html', function(result) {
  var ra = new Ractive({
    el: 'selector', 
    template: result, 
    data: {
      pictures: pictures,
    }
  });

  if (window.location.hash !== '') {
      ra.set('selectedPath', window.location.hash.slice(1));
  }

  ra.observe('selectedPath', function(newValue, oldValue) {
	  console.log(oldValue);
	  console.log(newValue);
	  if (oldValue !== undefined && newValue !== oldValue) {
	      window.location.hash = '#' + newValue;
	      window.location.reload();
	  }
	  setImage(newValue);
  });

  jQuery(function($) {
    $('#picture').Jcrop();
  });
});

var setImage = function(path) {
    $('#picture').attr('src', path);
}