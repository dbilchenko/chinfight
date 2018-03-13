var Ball = function(id, t, deg, cb) {
    this.id = id + t;
    this.speed = 10;
    this.dist_traveled = 50;
    this.deg = deg;
    this.player;
    this.r = 2.5;
    this.b;
    this.S = Math.PI*this.r*this.r;
    this.damage = 50;

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
        let _y = parseFloat(b.style.top) + y;
        let _x = parseFloat(b.style.left) + x;
        b.style.top = _y + 'px';
        b.style.left = _x + 'px';
        this.x = _x;
        this.y = _y;
    }
    
    this.update = function() {
        if (this.dist_traveled == 0) {
            cb();
        }
        var x = this.speed * Math.cos(this.deg*Math.PI/180);
        var y = this.speed * Math.sin(this.deg*Math.PI/180);
        this.move(x, y);
        this.dist_traveled--;
        //this.checkCollision();
    };

    this.checkCollision = function() {
        for (let i in players) {
            let dx = Math.abs(this.x + this.r - (players[i].x + players[i].width/2));
            let dy = Math.abs(this.y + this.r - (players[i].y + players[i].height/2));
            let cx = this.width/2 + balls[i].r;
            let cy = this.height/2 + balls[i].r;

            if (dx < cx && dy < cy) {
                balls[i].b.remove();
                this.boom(this.x+(balls[i].x-this.x)-balls[i].r, this.y+(balls[i].y-this.y)-balls[i].r, balls[i]);
                delete balls[balls[i].id];
            }
        }
    }
}