var player, players = [], balls = {};
var peer = new Peer({key: '96h5wn55fu9grpb9'});
peer.on('error', function(mes) {
    console.log(mes);
});
//document.querySelector('.js_conn-wrapper').classList.toggle("hide");

peer.on('connection', function(dataConnection) {
    if (dataConnection.label == 'move') {
        connect(dataConnection);
        document.querySelector('.js_conn-wrapper').classList.toggle("hide");
        player.connected = true;
    }
    else if (dataConnection.label == 'rotate') {
        connect_rotate(dataConnection);
    }
    else if (dataConnection.label == 'shoot') {
        connect_shoot(dataConnection);
    }
});

peer.on('open', function(id) {
    player = new Player(id);
    var lastRender = 0;
    document.querySelector('#player_id').innerHTML = id;

    document.querySelector('#conn').addEventListener('click', function(){
        var connect_id = document.querySelector('#connect_id').value;
        var conn = peer.connect(connect_id, {
            label: 'move'
        });
        conn.on('open', function() {
            connect(conn);
            document.querySelector('.js_conn-wrapper').classList.toggle("hide");
            player.connected = true;
            //document.querySelector('#conn').setAttribute('disabled','disabled');
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
        for(var i in balls) {
            balls[i].update();
        }
        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

});

function connect(c) {
    players[c.peer] = new Player(c.peer);
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