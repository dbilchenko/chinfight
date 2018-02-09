var Ball = function(id, t) {
    this.connected = false;
    this.id = id + t;
    this.speed = 50;
    this.dist_traveled = 0;

    this.x;
    this.y;

    var ball_obj = document.querySelector('#b' + id + t);
    
    if(!ball_obj) {
        var b = document.createElement('div');
        b.setAttribute('class', 'ball');
        b.setAttribute('id', 'b' + id + t);
        document.querySelector('#p' + id + ' .gun').appendChild(b);
        b.style.backgroundColor = getRandomColor();
        this.x = b.getBoundingClientRect().x;
        this.y = b.getBoundingClientRect().y;
    }

    this.move = function(x,y){
        if(p.style.top == "") {
            p.style.top = this.x + 'px';
        }
        if(p.style.left == "") {
            p.style.left = this.y + 'px';
        }
        p.style.top = parseFloat(p.style.top) + y + 'px';
        p.style.left = parseFloat(p.style.left) + x + 'px';
        if(this.connected) {
            //send({id: this.id, x: x, y: y}, 'ball_move');
        }
    }
    
    this.update = function() {
       
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
}