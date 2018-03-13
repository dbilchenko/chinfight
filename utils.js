function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var Key = {
  _pressed: {},
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  
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

var Mouse = {
  x: 0,
  y: 0,
  cl_state: false,
  cl_x: 0,
  cl_y: 0,
  onMove: function(event) {
      this.x = event.pageX;
      this.y = event.pageY;
  },
  onClick: function(event, deg) {
    this.cl_x = event.pageX;
    this.cl_y = event.pageY;
    this.cl_state = true;
  },
  onClickDelete: function() {
    this.cl_state = false;
  }
}

var k = 1;

var Utils = {
  getDeg: function(o1, o2) {
    var a, b, tang;
    a = Math.abs(o1.x - o2.x);
    b = Math.abs(o1.y - o2.y);

    if (o1.x >= o2.x && o1.y > o2.y) {
        tang = 0;
    }
    else if (o1.x < o2.x && o1.y >= o2.y) {
        tang = 180;
    }
    else if (o1.x < o2.x && o1.y < o2.y) {
        tang = -180;
    }
    else {
        tang = 360;
    }
    
    return Math.abs(tang - Math.atan(b/a)*180/Math.PI);
  }
}
