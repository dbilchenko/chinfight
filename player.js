var Player = function(id) {
    this.connected = false;
    this.id = id;
    var player_obj = document.querySelector('#p' + id); 
    
    if(!player_obj) {
        var p = document.createElement('div');
        p.setAttribute('class', 'player');
        p.setAttribute('id', 'p' + id);
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
        p.style.top = parseFloat(p.style.top) + y + 'px';
        p.style.left = parseFloat(p.style.left) + x + 'px';
        if(this.connected) {
            send({id: this.id, x: x, y: y}, 'move');
        }
    }
    
    this.update = function() {
        if (Key.isDown(Key.UP) || Key.isDown(Key.W)) this.move(0,-2);
        if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.move(-2,0);
        if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.move(0,2);
        if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.move(2,0);
        this.rotateGun();
        if (Mouse.cl_state) {
            this.shoot();
        }
    };

    this.rotateGun = function(deg) {
        if (!deg) { 
            var a, b, tang;
            var x = p.getBoundingClientRect().x + 10;
            var y = p.getBoundingClientRect().y + 8;
            a = Math.abs(Mouse._x - x);
            b = Math.abs(Mouse._y - y);

            if (Mouse._x > x && Mouse._y > y) {
                tang = 0;
            }
            else if (Mouse._x < x && Mouse._y > y) {
                tang = 180;
            }
            else if (Mouse._x < x && Mouse._y < y) {
                tang = -180;
            }
            else {
                tang = 360;
            }
            
            deg = Math.abs(tang - Math.atan(b/a)*180/Math.PI);
        }
        gun.style.transform = "rotate("+deg+"deg)";
        if(this.connected) {
            send({id: this.id, deg: deg}, 'rotate');
        }
    }

    this.shoot = function(id, time) {
        if (!id && !time) {
            id = this.id;
            time = new Date().getTime();
            Mouse.cl_state = false;
        }
        var ball = new Ball(id, time);
        
    }
}