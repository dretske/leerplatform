function startGsapAnimation() {
    var car = document.getElementById("car");
    var quantity = 100;
    var path = [
            {x:0, y:0}, 
            {x:530, y:0}, 
            {x:0, y:0}, 
            {x:500, y:0}, 
            {x:550, y:0}, 
            {x:580, y:0}, 
            {x:580, y:-200}
        ];
    var position = {x: path[0].x, y: path[0].y, rotation: 0};

    TweenMax.to(car, 5, {bezier:{type: "cubic", autoRotate:true , values:path}, force3D:true});

    tween = TweenMax.to(position, quantity, {bezier:{type: "cubic", autoRotate:true , values:path}, force3D:true});
    for (var i = 0; i < quantity; i++) {
        tween.time(i);
        document.write("position: x=" + position.x + ", y=" + position.y + ", rotation=" + position.rotation);
        document.write("</br>");
    }
}
