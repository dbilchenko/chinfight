var Player = function(id) {
    
    var player_obj = document.querySelector('#p' + id); 
    
    if(!player_obj) {
        var p = document.createElement('div');
        p.setAttribute('class','player');
        p.setAttribute('id', 'p' + id);
        document.querySelector('body').appendChild(p);
        player_obj = document.querySelector('#p' + id);
        player_obj.style.backgroundColor = getRandomColor();
    }

    this.move = function(x,y,self){
        if(player_obj.style.top == "") {
            player_obj.style.top = p.getBoundingClientRect().top + 'px';
        }
        if(player_obj.style.left == "") {
            player_obj.style.left = p.getBoundingClientRect().left + 'px';
        }
        player_obj.style.top = parseFloat(player_obj.style.top) + y + 'px';
        player_obj.style.left = parseFloat(player_obj.style.left) + x + 'px';
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
  
  