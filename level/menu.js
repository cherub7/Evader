
function show_menu() {
    const box_w = 200;
    const box_h = 200;
    const box_count = 3;

    const box_padding = 25;

    const end_vpadding = (game.canvas.width - box_count*(box_w + 2*box_padding)) / 2;
    const end_hpadding = (game.canvas.height - box_h) / 2;

    let x = end_vpadding + box_padding;
    
    // asteroid shower level frame
    draw_asteroid_shower_frame(x, end_hpadding, box_w, box_h);
    let x1 = x;
    x += box_w + box_padding + box_padding;

    // twin captiva level frame
    draw_twin_captiva_frame(x, end_hpadding, box_w, box_h);
    let x2 = x;
    x += box_w + box_padding + box_padding;

    // show down frame
    draw_showdown_frame(x, end_hpadding, box_w, box_h);
    let x3 = x;

    // adding click listener
    game.canvas.onclick = function (event) {
        const x = event.clientX - game.canvas.getBoundingClientRect().x;
        const y = event.clientY - game.canvas.getBoundingClientRect().y;
        
        if (y > end_hpadding & y <= end_hpadding + box_h) {
            let gameState = undefined;
            
            if (x >= x1 && x <= x1 + box_w) gameState = 'ASTEROID_SHOWER';
            if (x >= x2 && x <= x2 + box_w) gameState = 'TWIN_CAPTIVA';
            if (x >= x3 && x <= x3 + box_w) gameState = 'SHOWDOWN';

            if (gameState) {
                game.updateGameState(gameState);
            }
        }
    }
}

function draw_asteroid_shower_frame(x, y, w, h) {
    game.context.save();
        
    game.context.translate(x, y);
    game.context.rotate((Math.PI/180) * 0);

    game.context.strokeStyle = 'lightgreen';
    game.context.lineWidth = 4;
        
    game.context.beginPath ();
    game.context.moveTo(w, 0);
    game.context.lineTo(w, h);
    game.context.lineTo(0, h);
    game.context.lineTo(0, 0);
    game.context.closePath();

    game.context.stroke();

    // drawing destination circle
    game.context.strokeStyle = 'lightblue';
    game.context.lineWidth = 10;

    game.context.beginPath ();
    game.context.arc(w/2, h/2, 50, 0, 2 * Math.PI);
    game.context.closePath();

    game.context.stroke();

    game.context.restore();
}

function draw_twin_captiva_frame(x, y, w, h) {
    game.context.save();
        
    game.context.translate(x, y);
    game.context.rotate((Math.PI/180) * 0);

    game.context.strokeStyle = 'blue';
    game.context.lineWidth = 4;
        
    game.context.beginPath ();
    game.context.moveTo(w, 0);
    game.context.lineTo(w, h);
    game.context.lineTo(0, h);
    game.context.lineTo(0, 0);
    game.context.closePath();

    game.context.stroke();

    // drawing captiva
    // the hull
    game.context.strokeStyle = 'red';
    game.context.lineWidth = 2;
    
    game.context.beginPath ();
    game.context.moveTo(100, 50);
    game.context.lineTo(150, 100);
    game.context.lineTo(100, 150);
    game.context.lineTo(50, 100);
    game.context.closePath();

    game.context.stroke();

    // the cage
    game.context.strokeStyle = 'blue';
    game.context.lineWidth = 3;

    game.context.beginPath ();
    game.context.arc(w/2, h/2, 55, 0, 2 * Math.PI);
    
    game.context.closePath();

    game.context.stroke();

    game.context.restore();
}

function draw_showdown_frame(x, y, w, h) {
    game.context.save();
        
    game.context.translate(x, y);
    game.context.rotate((Math.PI/180) * 0);

    game.context.strokeStyle = 'red';
    game.context.lineWidth = 4;
        
    game.context.beginPath ();
    game.context.moveTo(w, 0);
    game.context.lineTo(w, h);
    game.context.lineTo(0, h);
    game.context.lineTo(0, 0);
    game.context.closePath();

    game.context.stroke();

    // drawing captiva
    // the hull
    game.context.strokeStyle = 'red';
    game.context.lineWidth = 2;
    
    game.context.beginPath ();
    game.context.moveTo(100, 50);
    game.context.lineTo(150, 100);
    game.context.lineTo(100, 150);
    game.context.lineTo(50, 100);
    game.context.closePath();

    game.context.stroke();

    // the cage
    game.context.strokeStyle = 'blue';
    game.context.lineWidth = 3;

    game.context.beginPath ();
    game.context.arc(w/2, h/2, 55, 0, 2 * Math.PI);
    
    game.context.closePath();

    game.context.stroke();

    // drawing destination circle
    game.context.strokeStyle = 'lightblue';
    game.context.lineWidth = 10;

    game.context.beginPath ();
    game.context.arc(w/2, h/2, 80, 0, 2 * Math.PI);
    game.context.closePath();

    game.context.stroke();

    game.context.restore();
}
