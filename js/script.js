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
        .on('keyup','#search',view)
})

function findText(){
    let data = [];
    const key = $('#search').val();
    const keyCho = changeCho(key);

    let json = window.json;
    
    json.forEach( e =>{
        let garden = Object.assign({},e); //여긴 모르겠고
        let gardenCho = changeCho(garden.name);
        let str = [];
        let gardenName = garden.name.split('');

        for (let i in gardenCho){
            let idx = gardenCho.indexOf(keyCho,i);
            if( idx !== -1 && str.indexOf(idx) === -1)
                str.push(idx);
        }

        let check = false;
        str.forEach(idx=>{
            let cho = keyCho.split('');
            for (let i in key){
                if( key[i].charCodeAt() - 44032 >= 0) cho[i] = gardenName[idx + i * 1];
            }

            if(cho.join('') === key){
                check = true;
                for (let i = idx; i < idx+key.length;i++){
                    gardenName[i] = `<span style="color: #fff;background-color: #1c7430">${gardenName[i]}</span>`;
                }
            }
        })
        e.searchName = gardenName.join('');
        if(check){
            data.push(e);
        }
    });
    return data;
}

function changeCho(key){
    let res = '',
        choArr = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    for ( let i in key){
        let code = Math.floor((key[i].charCodeAt() - 44032) / 588);
        res += code >= 0 ? choArr[code] : key[i];
    }
    return res;

}

function clickTag(){
    $(this).hasClass('select') ? $(this).removeClass('select') : $(this).addClass('select');
    window.tag = [];
    $('.tag.select').each((idx,item)=>window.tag.push($(item).text()));
    view();
}

function view(){
    let data = findText();
    let text = '';
    data.forEach((item,idx)=>{
        let _class = item.themes.join(' ');
        text += `<div class="d-none box w-75 m-2 ${_class}" style="border: 1px solid #ccc; border-radius: 10px;">
            <img src="./garden/${item.name}1.jpg" alt="" class="w-25 h-100" style="object-fit: cover">
            <div class="text m-4">
                <h3>${item.searchName}</h3>
                <p>${item.themes.join(', ')}</p>
            </div>
        </div>`
    })
    $('.list').html(text);
    _tag();
}

function _tag(){
    if(window.tag.length === 0) return $('.box').removeClass('d-none').addClass('d-flex')
    let _class =  '.'+window.tag.join('.');
    $(_class).removeClass('d-none').addClass('d-flex');
    $('.box.d-flex .text p').each((idx,item)=>{
        let txt = $(item).text();
        let text = window.tag.reduce((acc,cur)=>{
            if(txt.includes(cur))
            return acc += txt.replace(cur,`<span style="color: #fff;background-color: #1c7430">${cur}</span>`);
        },'')
        $(item).html(text);
    });
}