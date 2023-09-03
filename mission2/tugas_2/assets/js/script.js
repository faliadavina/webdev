var isMoving = true;
// ============ fungsi untuk membuat background bergerak dan animasi ============
function setBgMoving(){
    if(isMoving == true){
        setTimeout(function(){

            //Membuat background bergerak
            var bg = document.getElementById('board');
            bg.style.backgroundPosition = (parseInt(bg.style.backgroundPosition.replace('px', ''))-1) + 'px';
            
            //update score
            document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + 1;
            
            //call function recursive
            setBgMoving();
        },5);
    }
}
//inisialisasi fungsi
setBgMoving();

// ============ fungsi untuk membuat obstacle ============
function setBoxMoving(){
    var box = document.getElementById('box'),
    dino = document.getElementById('dino');
    
    setTimeout(function(){
        box.style.marginLeft = (parseInt(box.style.marginLeft.replace('px',''))-1) + 'px';
        
        if(parseInt(box.style.marginLeft.replace('px','')) < -100){
            box.style.marginLeft = "650px";
        }

        if(dino.offsetTop + 50 >= box.offsetTop && 
            dino.offsetLeft + 50 >= box.offsetLeft && 
            dino.offsetTop + 50 <= box.offsetTop + 50 && 
            dino.offsetLeft <= box.offsetLeft + 50){
            alert('Game Over, Your Score is : ' + document.getElementById('score').innerHTML);
            dino.setAttribute('class','freeze');
            isMoving = false;

        }else{
            //call function recursive
            setBoxMoving();
        }
    },5); 
}
//inisialisasi fungsi
setBoxMoving();

//mengambil trigger dari keyboard
window.addEventListener('keyup', function(e){
    //mengecek kode dari tombol yang ditekan pada keyboard
    console.log(e.keyCode);

    if(isMoving == true) {
        //mendeteksi tombol spasi
        if(e.keyCode == 32){
            //setting jump dino
            this.document.getElementById('dino').style.marginTop = "30px";
            this.document.getElementById('dino').setAttribute('class','freeze');

            //dino in ground
            this.setTimeout(function(){
                this.document.getElementById('dino').style.marginTop = "170px";
                this.document.getElementById('dino').setAttribute('class','');
            }, 700);
        }
    }
});