$(()=>{
    window.piece = false;
    window.clear = false;
    window.clearTime = false;
    $(document)
        .on('click','.select_img',gameStart)
        .on('mousedown','.image_data',selectPiece)
        .on('keydown',window,rotatePiece)
        .on('click','.hint_btn',hint)
})


//초기 설정
window.onload = () =>{
    let list = '';
    for (let i = 1; i <= 6;i++){
        list+= `<img src="./2과제/A${i}.jpg" alt="" class="select_img" data-id="${i}" style="width: 200px;height: 200px;object-fit: cover">`
    }
    $('.photo_list').html(list);
}

//힌트보기
function hint(){
    $('.hint').css('z-index','3');
    setTimeout(()=>{
        $('.hint').css('z-index','-3');
    },5000)
}

//조각 선택
function selectPiece(){
    window.piece = $(this).attr('data-id');
}

//조각 돌리기
function rotatePiece(e){
    let type = e.keyCode === 38 ? 15 :  e.keyCode === 40 ? -15 : false;
    if(!window.piece || !type) return;
    let setPiece = $(`.piece_gallery img[data-id="${window.piece}"]`);
    let value = parseInt(setPiece.attr('data-rotate')) + type;
    setPiece.attr('data-rotate',value);
    setPiece.css('transform','rotate('+value+'deg)');

}

//이미지 클릭 이벤트 && 퍼즐 시작
function gameStart(){
    const setInter = setInterval(';');
    for (let i = 0; i < setInter;i++){
        clearInterval(i);
    }
    $('.complete img').remove();
    const id = $(this).attr('data-id');
    let text = '';
    for (let i = 1; i <= 9;i++){
        let random = Math.floor(Math.random()*24) * 15;
        text += `<img class="position-absolute image_data can_drag" data-type="${null}" data-rotate="${random}" src="./2과제/A${id}.jpg" alt="" data-id="${i}" style="clip-path: url(#data-${i});top:${Math.random()*3 * 50}px;left: ${Math.random()*3 * 50}px;transform: rotate(${random}deg)">`
    }
    $('.piece_gallery').html(text);
    $('.complete').append(`<img class="hint position-absolute" style="top: 0;left: 0;z-index: -1;width: 200px;height: 200px;" src="./2과제/A${id}.jpg" alt="">`)
    window.cnt = 0;
    setUi();
    time();
}

//jquery 설정
function setUi() {
    $( ".piece_gallery .can_drag" ).draggable({
        drag:function(e){
            window.drag = this;
        }
    });
    $( ".drop_box" ).droppable({
        drop: function( e, ui ) {
            let check = $(window.drag).attr('data-rotate') % 360;
            if(check !== 0)return;
            $(window.drag).removeClass('can_drag').css('top','0').css('left','0').attr('data-type','complete');
            $('.complete').append(window.drag);
            $(window.drag).draggable( "option", "disabled", true );
            window.cnt++;
            if(window.cnt === 9) endGame();
        }
    });
}

//시간 설정
function time(){
    let second = 60;
    const interval = setInterval(()=>{
        $('.time').html(`<p>남은 시간 : ${second}</p>`)
        second--;
        if(window.clear || second < 0) {
            clearInterval(interval);
            window.clearTime = second;
        }
        if(second < 0) location.href = '';
    },1000)
}

//게임 종료
function endGame(){
    alert('축하합니다.');
    window.clear = true;
    $('#view').modal('show');
}

//값 입력
async function drawCanvas(){
    let name = $('#name').val();
    let canvas = $('<canvas id="canvas" width="452px" height="300px"></canvas>')[0];
    let ctx = canvas.getContext('2d');
    canvas.width = 452;
    canvas.height = 300;
    let img = await imgLoad('/2과제/무료체험권.png');
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    ctx.fillText(name,170,140,);
    ctx.fillText(window.clearTime + '초',170,170);
    $('#view .modal-body').html(canvas);
    $('#view .modal-footer').html(`<button class="btn btn-outline-primary download" onclick="download('canvas')">다운로드</button>`);
}

//이미지 로드
async function imgLoad(url){
    return new  Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function download(canvas){
    let data = $(`#${canvas}`)[0].toDataURL('image/png');
    let tag = document.createElement('a');
    tag.download = '1일_체험권.png';
    tag.href = data;
    tag.click();
}