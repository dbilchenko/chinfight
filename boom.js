var Boom = function(x, y, cb, data) {
  this.life_time = !data ? 40 : data.life_time;
  let src = !data ? 'boom' : 'death';
  x = !data ? x-10 : x-20;
  y = !data ? y-20 : y-30;

  var b = document.createElement('img');
  this.dom = b;
  b.setAttribute('class', src);
  b.setAttribute('src', src + '.gif');
  b.style.top = y + 'px';
  b.style.left = x + 'px';
  
  //b.setAttribute('style', 'top: ' + y + 'px; left:' + x +'px');

  document.querySelector('.js_game-field').appendChild(b);

  this.update = function() {
    if (this.life_time == 0) {
        cb();
    }
    this.life_time--;
};
}