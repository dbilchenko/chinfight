var Player = function(id) {
    
    var player_obj = document.querySelector('#p' + id); 
    
    if(!player_obj) {
        var p = document.createElement('div');
        p.setAttribute('class','player');
        p.setAttribute('id', 'p' + id);
        document.querySelector('body').appendChild(p);
        p.style.backgroundColor = getRandomColor();
    }

    this.move = function(x,y,self){
        if(p.style.top == "") {
            p.style.top = p.getBoundingClientRect().top + 'px';
        }
        if(p.style.left == "") {
            p.style.left = p.getBoundingClientRect().left + 'px';
        }
        p.style.top = parseFloat(p.style.top) + y + 'px';
        p.style.left = parseFloat(p.style.left) + x + 'px';
        if(self) {
            send(id,x,y);
        }
    }
    
    this.update = function() {
        if (Key.isDown(Key.UP)) this.move(0,-2,true);
        if (Key.isDown(Key.LEFT)) this.move(-2,0,true);
        if (Key.isDown(Key.DOWN)) this.move(0,2,true);
        if (Key.isDown(Key.RIGHT)) this.move(2,0,true);
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

var Key = {
    _pressed: {},
  
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },
    
    onKeydown: function(event) {
      this._pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
      delete this._pressed[event.keyCode];
    }
  };
  
  