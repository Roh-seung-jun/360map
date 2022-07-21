$(async ()=>{
    let json = await fetch('./JSON/garden.json').then(res=>res.json());
    window.search = '';
    window.tag = [];
    window.json = json.gardens;
    view();

    let tag = window.json.reduce((acc,cur)=>{
        acc.push(...cur.themes);
        acc = [...new Set(acc)];
        return acc;
    },[]);

    let list = tag.reduce((acc,cur)=>{
        return acc += `<button class="btn btn-outline-success tag m-1">${cur}</button>`;
    },'');

    $('.tag_list').html(list);


    $(document)
        .on('click','.tag',clickTag)
})

function clickTag(){
    $(this).hasClass('select') ? $(this).removeClass('select') : $(this).addClass('select');
    window.tag = [];
    $('.tag.select').each((idx,item)=>)
}


function view(){
    const data = window.json;



    let text = '';
    data.forEach((item,idx)=>{
        text += `<div class="d-flex box w-75 m-2" style="border: 1px solid #ccc; border-radius: 10px;object-fit: ">
            <img src="./garden/${item.name}1.jpg" alt="" class="w-25 h-100" style="object-fit: cover">
            <div class="text m-4">
                <h3>${item.name}</h3>
                <p>${item.themes.join(', ')}</p>
            </div>
        </div>`
    })
    $('.list').html(text);
}

