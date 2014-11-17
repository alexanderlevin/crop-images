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

  jQuery(function($){

    var jcrop_api;

    $('#picture').Jcrop({
      onChange:   showCoords,
      onSelect:   showCoords,
      onRelease:  clearCoords
    },function(){
      jcrop_api = this;
    });
  });
});


var setImage = function(path) {
    $('#picture').attr('src', path);
}


// Simple event handler, called from onChange and onSelect
// event handlers, as per the Jcrop invocation above
function showCoords(c)
{
  $('#x1').val(c.x);
  $('#y1').val(c.y);
  $('#x2').val(c.x2);
  $('#y2').val(c.y2);
  $('#w').val(c.w);
  $('#h').val(c.h);
};

function clearCoords()
{
  $('#coords input').val('');
};

