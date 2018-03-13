var Player = function(id, _x, _y, p_cb) {
    this.connected = false;
    this.id = id;
    this.balls = {};
    this.deg;
    var player_obj = document.querySelector('#p' + id);
    var gun_length = 26;
    this.width = 20;
    this.height = 20;
    this.x = 10;
    this.y = 10;
    this.S = this.width*this.height;
    this.health = 250;
    
    if(!player_obj) {
        var p = document.createElement('div');
        this.p = p;
        p.setAttribute('class', 'player');
        p.setAttribute('id', 'p' + id);
        if (_x & _y) {
            p.style.top = _y + 'px';
            p.style.left = _x + 'px';
        }
        var gun = document.createElement('div');
        gun.setAttribute('class','gun js_gun');
        p.appendChild(gun);
        document.querySelector('.js_game-field').appendChild(p);
        p.style.backgroundColor = getRandomColor();
    }

    this.move = function(x,y){
        if(p.style.top == "") {
            p.style.top = p.offsetTop + 'px';
        }
        if(p.style.left == "") {
            p.style.left = p.offsetLeft + 'px';
        }
        this.y = parseFloat(p.style.top) + y;
        this.x = parseFloat(p.style.left) + x;
        p.style.top = this.y + 'px';
        p.style.left = this.x + 'px';
        if(this.connected) {
            send({id: this.id, x: x, y: y}, 'move');
        }
    }
    
    this.update = function() {
        if (this.health <= 0) {
            this.death();
            return;
        }
        if (Key.isDown(Key.UP) || Key.isDown(Key.W)) this.move(0,-2);
        if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.move(-2,0);
        if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.move(0,2);
        if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.move(2,0);
        this.rotateGun();
        if (Mouse.cl_state) {
            this.shoot();
        }
        this.checkCollision();
    };

    this.rotateGun = function(deg) {
        if (!deg) { 
            deg = Utils.getDeg(Mouse, {x: p.getBoundingClientRect().x + 10, y: p.getBoundingClientRect().y + 8});
        }
        this.deg = deg;
        gun.style.transform = "rotate("+deg+"deg)";
        if(this.connected) {
            send({id: this.id, deg: deg}, 'rotate');
        }
    }

    this.shoot = function(id, time, deg) {
        if (!id && !time && !deg) {
            id = this.id;
            time = new Date().getTime();
            deg = this.deg;
            Mouse.cl_state = false;
        }
        var _this = this;
        var ball = new Ball(id, time, deg, function() {
            ball.b.remove();
            delete balls[id+time];
        });
        ball.y = p.offsetTop + 8 + gun_length * Math.sin(this.deg*Math.PI/180);
        ball.x = p.offsetLeft + 10 + gun_length * Math.cos(this.deg*Math.PI/180);;
        ball.player = this;
        balls[id+time] = ball;
        if(this.connected) {
            send({id: this.id, time: time, deg: deg}, 'shoot');
        }
    }

    this.checkCollision = function() {
       /* for (let i in players) {
            let dx = Math.abs(this.x - players[i].x);
            let dy = Math.abs(this.y - players[i].y);
            let cx = this.width/2 + players[i].width/2;
            let cy = this.height/2 + players[i].height/2;
            if (dx < cx && dy < cy) {
                //this.boom();
            }
            //let d2 = dx*dx + dy*dy;
            //let Ep = k*this.S*players[i].S/d2;
            //let deg = Utils.getDeg(players[i], this);
            //console.log(Ep);
        }*/
        for (let i in balls) {
            if (balls[i].player.id === this.id) {
                continue;
            }
            let dx = Math.abs(this.x + this.width/2 - (balls[i].x + balls[i].r));
            let dy = Math.abs(this.y + this.height/2 - (balls[i].y + balls[i].r));
            let cx = this.width/2 + balls[i].r;
            let cy = this.height/2 + balls[i].r;

            if (dx < cx && dy < cy) {
                this.health -= balls[i].damage;
                balls[i].b.remove();
                this.boom(this.x+(balls[i].x-this.x)-balls[i].r, this.y+(balls[i].y-this.y)-balls[i].r, balls[i]);
                delete balls[balls[i].id];
            }
        }
    }

    this.boom = function(x, y, ball, time) {
        var _this = this;
        if (!time) {
            time = new Date().getTime();
        }
        let boom = new Boom(x,y, function() {
            boom.dom.remove();
            delete booms[_this.id + time];
        });
        booms[this.id + time] = boom;
        if(this.connected) {
            send({id: this.id, x: x, y: y, time: time, ball: {id: ball.id}}, 'boom');
        }
    }

    this.death = function(time) {
        time = time | new Date().getTime();
        var _this = this;
        let data = {
            life_time: 40,
        }
        let d = new Boom(this.x + this.width/2, this.y + this.height/2, function() {
            d.dom.remove();
            delete booms[_this.id + time];
        },data);
        booms[this.id + time] = d;
        if(this.connected) {
            send({id: this.id, time: time}, 'death');
        }
        p_cb();
    }

}