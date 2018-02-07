var peer = new Peer('master', {key: '8pz3x4sf8fov42t9'});
if (!peer.open && !peer.id) {
    peer = new Peer({key: '8pz3x4sf8fov42t9'});
    document.querySelector('#conn').addEventListener('click', function(){
        var connect_id = document.querySelector('#connect_id').value || 'master';
        var conn = peer.connect(connect_id,{
            label: 'move'
        });	
        conn.on('open', function() {
            connect(conn);
            document.querySelector('#conn').setAttribute('disabled','disabled');
        });
    });
    document.querySelector('.js_conn-wrapper').classList.toggle("hide");
}

peer.on('open', function(id) {
    var player = new Player('p' + id);
    var lastRender = 0;

    document.querySelector('#player_id').innerHTML = id;
    window.addEventListener('keyup', function(event) { 
        Key.onKeyup(event); 
    }, false);
    window.addEventListener('keydown', function(event) { 
        Key.onKeydown(event); 
    }, false);

    function loop(timestamp) {
        var progress = timestamp - lastRender;
        player.update();
        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    
    window.requestAnimationFrame(loop);

});

function connect(c) {
    var other_player = new Player(c.id);
    c.on('data', function(data) {
        if(data.player) {
            var player = new Player(data.player);
            player.move(data.x,data.y);
        }
    });
}

function send(connect_id, data) {
    /*var conns = peer.connections[connect_id];
    conns.forEach(function(v,i){
        if(conns[i].label === 'move'){
            conns[i].send(data);
        }
    });*/
}



  
