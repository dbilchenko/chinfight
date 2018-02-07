var peer = new Peer({key: '8pz3x4sf8fov42t9'});
peer.on('open', function(id) {
    var player = new Player('p' + id);
    var lastRender = 0;
    
    document.querySelector('#player_id').innerHTML = id;
    document.querySelector('#conn').addEventListener('click', function(){
        var connect_id = document.querySelector('#connect_id').value;
        var conn = peer.connect(connect_id,{
            label: 'move'
        });	
        conn.on('open', function() {
            connect(conn);
            document.querySelector('#conn').setAttribute('disabled','disabled');
        });
    });
    window.addEventListener('keyup', function(event) { 
        Key.onKeyup(event); 
    }, false);
    window.addEventListener('keydown', function(event) { 
        Key.onKeydown(event); 
    }, false);

    function connect(c) {
        var other_player = new Player(c.id);
        c.on('data', function(data) {
            if(data.player) {
                var player = new Player(data.player);
                player.move(data.x,data.y);
            }
        });
    }

    function loop(timestamp) {
        var progress = timestamp - lastRender;
        player.update();
        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    
    window.requestAnimationFrame(loop);

});

function send(connect_id, data) {
    var conns = peer.connections[connect_id];
    conns.forEach(function(v,i){
        if(conns[i].label === 'move'){
            conns[i].send(data);
        }
    });
}



  
