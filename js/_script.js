$(async ()=> {
    let json = await fetch('./JSON/garden.json').then(res => res.json());
    window.json = json.gardens;
    window.view = [];
    window.longitude = (129.2097 - 127.5718) / 100;
    window.latitude = (35.9255 - 34.71) / 100;
    let list =window.json.reduce((acc,cur)=>{
        return acc += `<option class="" value="${cur.name}">${cur.name}</option>`;
    },'')

    $('#garden').append(list);


    $(document)
        .on('change','#garden',select)

});


function select(){
    let type = $(this).val();
    $('option').removeClass('select');
    $(`option[value="${type}"]`).addClass('select');
    $('.removePlz').remove();
    let data = window.json.find(e=>e.name === type);
    $('.detail').html(`
<img src="./garden/${data.name}1.jpg" alt="" style="width: 200px;height: 200px;">
<h2>${data.name}</h2>
<p class="m-0">${data.address}</p>
<p>${data.phone}</p>
<div class="d-flex">
    <button class="btn btn-outline-success m-1"> 리뷰 바로가기</button>
    <button class="btn btn-outline-success m-1"> 예약 바로가기</button>
    <button class="btn btn-outline-success m-1"> 파노라마 버튼</button>
</div>`);
    pointer(data);
}

function pointer(data){

}