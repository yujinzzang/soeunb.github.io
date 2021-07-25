window.onload = function(){

    const mainCard = document.querySelector('.calendar.main');
    const addCard = document.querySelector('.calendar.add');

    const addDateInput = document.querySelector('.calendar.add .add_date');
    const addNameInput = document.querySelector('.calendar.add .add_name');
    const addQuantityInput = document.querySelector('.calendar.add .add_quantity');
    const addPriceInput = document.querySelector('.calendar.add .add_price');
    const addMemoInput = document.querySelector('.calendar.add .add_memo');

    const modeToggle = document.querySelector('.switch-label');
    if( mainCard && modeToggle ){
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
        if( addValidChk() ){
            displayCard('main');
        }
    }, false);

    function toggleClick(){
        const modeToggleChk = document.querySelector('.switch-input').checked;
        if( !modeToggleChk ){
            modeToggle.setAttribute('data-on-off', 'on');
            mainCard.classList.replace('light', 'dark');
        }else{
            modeToggle.setAttribute('data-on-off', 'off');
            mainCard.classList.replace('dark', 'light');
        }
    }

    function displayCard( type ){   
        if( type === 'main' ){
            mainCard.style.display = 'block';
            addCard.style.display = 'none';
        }else if( type === 'add' ){
            addDateInput.value = curYear + '-' + curMonth + '-' + curDate;
            addNameInput.value = '';
            addQuantityInput.value = '';
            addPriceInput.value = '';
            addMemoInput.value = '';
            if( modeToggle.getAttribute('data-on-off') === 'on' ){
                addCard.classList.add('dark');
                addCard.classList.remove('light');
            }else{
                addCard.classList.add('light');
                addCard.classList.remove('dark');
            }
            mainCard.style.display = 'none';
            addCard.style.display = 'block';
        }
    }

    const inputNumberList = document.querySelectorAll('input.num');
    for( const inputNumber of inputNumberList ){
        inputNumber.addEventListener('keyup', function(){
            regNumber = /^[0-9]*$/;
            var str = this.value;
            if(!regNumber.test(str)) {
                var res = str.substring(0, str.length-1);
                this.value = res; 
            }
        });
    }

    const cur = new Date();
    const curYear = cur.getFullYear();
    let curMonth = cur.getMonth() + 1;
    if( String(curMonth).length === 1 ){
        curMonth = '0' + curMonth;
    }
    let curDate = cur.getDate();
    if( String(curDate).length === 1 ){
        curDate = '0' + curDate;
    }
    const dateFormat = curYear + '-' + curMonth + '-' + curDate;
    addDateInput.setAttribute('value', dateFormat)
    addDateInput.value = dateFormat;
    addDateInput.max = dateFormat;

    function addValidChk(){
        if( addDateInput.value === ''){
            addDateInput.parentNode.classList.add('error');
            addDateInput.focus();
        }else if( addNameInput.value === ''){
            addDateInput.parentNode.classList.remove('error');
            addNameInput.parentNode.classList.add('error');
            addNameInput.focus();
        }else if( addQuantityInput.value === ''){
            addNameInput.parentNode.classList.remove('error');
            addQuantityInput.parentNode.classList.add('error');
            addQuantityInput.focus();
        }else if( addPriceInput.value === ''){
            addQuantityInput.parentNode.classList.remove('error');
            addPriceInput.parentNode.classList.add('error');
            addPriceInput.focus();
        }else{
            addPriceInput.parentNode.classList.remove('error');
            return true;
        }
    }
}