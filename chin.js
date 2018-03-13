var player, players = [], balls = {}, booms = {};
var peer = new Peer({key: '96h5wn55fu9grpb9'});
peer.on('error', function(mes) {
    console.log(mes);
});
//document.querySelector('.js_conn-wrapper').classList.toggle("hide");

peer.on('connection', function(dataConnection) {
    let name_f = 'connect_' + dataConnection.label;
    if (dataConnection.label == 'init') {
        connect_init(dataConnection, true);
        document.querySelector('.js_conn-wrapper').classList.toggle("hide");
        player.connected = true;
    }
    else if (window[name_f]) {
        window[name_f](dataConnection);
    }
});

peer.on('open', function(id) {
    player = new Player(id, 10, 10, function() {
        player.p.remove();
        player = {update: function(){}};
    });
    var lastRender = 0;
    document.querySelector('#player_id').innerHTML = id;

    document.querySelector('#conn').addEventListener('click', function(){
        var connect_id = document.querySelector('#connect_id').value;
        var conn_init = peer.connect(connect_id, {
            label: 'init',
            metadata: {x: player.x, y: player.y}
        });
        conn_init.on('open', function() {
            connect_init(conn_init);
            document.querySelector('.js_conn-wrapper').classList.toggle("hide");
            player.connected = true;
            send({id: player.id, x: player.x, y: player.y}, 'init');
        });
        var conn_move = peer.connect(connect_id, {
            label: 'move',
        });
        conn_move.on('open', function() {
            connect_move(conn_move);
        });
        var conn_rot = peer.connect(connect_id, {
            label: 'rotate'
        });
        conn_rot.on('open', function() {
            connect_rotate(conn_rot);
        });
        var conn_shoot = peer.connect(connect_id, {
            label: 'shoot'
        });
        conn_shoot.on('open', function() {
            connect_shoot(conn_shoot);
        });
        var conn_boom = peer.connect(connect_id, {
            label: 'boom'
        });
        conn_boom.on('open', function() {
            connect_boom(conn_boom);
        });
        var conn_death = peer.connect(connect_id, {
            label: 'death'
        });
        conn_death.on('open', function() {
            connect_death(conn_death);
        });
    });

    window.addEventListener('keyup', function(event) { 
        Key.onKeyup(event); 
    }, false);
    window.addEventListener('keydown', function(event) { 
        Key.onKeydown(event); 
    }, false);
    window.addEventListener('mousemove', function(event) { 
        Mouse.onMove(event);
    }, false);
    window.addEventListener('mousedown', function(event) { 
        Mouse.onClick(event);
    }, false);

    function loop(timestamp) {
        var progress = timestamp - lastRender;
        player.update();
        for(let i in balls) {
            balls[i].update();
        }
        for(let i in booms) {
            booms[i].update();
        }
        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

});

function connect_init(c, need) {
    c.on('data', function(data) {
        players[data.id] = new Player(data.id, data.x, data.y, function() {
            players[data.id].p.remove();
            delete players[data.id];
        });
        if (need) {
            send({id: player.id, x: player.x, y: player.y}, 'init');
        }
    });
}

function connect_move(c) {
    c.on('data', function(data) {
        if(data.id) {
            players[c.peer].move(data.x, data.y);
        }
    });
}

function connect_rotate(c) {
    c.on('data', function(data) {
        if(data.id) {
            players[data.id].rotateGun(data.deg);
        }
    });
}

function connect_shoot(c) {
    c.on('data', function(data) {
        if(data.id) {
            players[data.id].shoot(data.id, data.time, data.deg);
        }
    });
}

function connect_boom(c) {
    c.on('data', function(data) {
        if(data.id) {
            players[data.id].boom(data.x, data.y, data.ball, data.time);
            balls[data.ball.id].b.remove();
            delete balls[data.ball.id];
        }
    });
}

function connect_death(c) {
    c.on('data', function(data) {
        if(data.id) {
            players[data.id].death(data.time);
        }
    });
}


function send(data, label) {
    var conns = peer.connections;
    for(var i in conns ) {
        if (Array.isArray(conns[i])) {
            conns[i].forEach(function(v, j) {
                if(v.label === label) {
                    v.send(data);
                }
            });
        }
    };
}