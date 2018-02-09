var Ball = function(id, t, deg, cb) {
    this.id = id + t;
    this.speed = 5;
    this.dist_traveled = 100;
    this.deg = deg;
    this.player;
    this.b;

    this.x;
    this.y;

    var ball_obj = document.querySelector('#b' + id + t);
    
    if(!ball_obj) {
        var b = document.createElement('div');
        this.b = b;
        b.setAttribute('class', 'ball');
        b.setAttribute('id', 'b' + id + t);
        document.querySelector('.js_game-field').appendChild(b);
        b.style.backgroundColor = getRandomColor();
    }

    this.move = function(x,y){
        if(b.style.top == "") {
            b.style.top = this.y + 'px';
        }
        if(b.style.left == "") {
            b.style.left = this.x + 'px';
        }
        b.style.top = parseFloat(b.style.top) + y + 'px';
        b.style.left = parseFloat(b.style.left) + x + 'px';
    }
    
    this.update = function() {
        if (this.dist_traveled == 0) {
            cb();
        }
        var x = this.speed * Math.cos(this.deg*Math.PI/180);
        var y = this.speed * Math.sin(this.deg*Math.PI/180);
        this.move(x, y);
        this.dist_traveled--;
    };
}