window.onload = function(){

    const mainCard = document.querySelector('.calendar.main');
    const addCard = document.querySelector('.calendar.add');

    const cardWrap = document.querySelector('.calendar');
    const modeToggle = document.querySelector('.switch-label');
    if( cardWrap && modeToggle ){
        modeToggle.addEventListener('click', toggleClick);
    }

    const addBtn = document.querySelector('.cl_add');
    addBtn.addEventListener('click', function(){
        displayCard('add');
    }, false);
    
    const closeBtn = document.querySelector('.close_btn');
    closeBtn.addEventListener('click', function(){
        displayCard('main');
    }, false);

    const applyBtn = document.querySelector('.apply_btn');
    applyBtn.addEventListener('click', function(){
        displayCard('main');
    }, false);

    function toggleClick(){
        const modeToggleChk = document.querySelector('.switch-input').checked;
        if( !modeToggleChk ){
            modeToggle.setAttribute('data-on-off', 'on');
            cardWrap.classList.replace('light', 'dark');
        }else{
            modeToggle.setAttribute('data-on-off', 'off');
            cardWrap.classList.replace('dark', 'light');
        }
    }

    function displayCard( type ){   
        if( type === 'main' ){
            mainCard.style.display = 'block';
            addCard.style.display = 'none';
        }else if( type === 'add' ){
            mainCard.style.display = 'none';
            addCard.style.display = 'block';
        }
    }
}
