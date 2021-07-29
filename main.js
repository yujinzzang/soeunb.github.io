window.onload = function(){

    const mainCard = document.querySelector('.calendar.main');
    const addCard = document.querySelector('.calendar.add');

    const totalPrice = document.querySelector('.calendar_plan .cl_copy');
    
    const addDateInput = document.querySelector('.calendar.add .add_date');
    const addNameInput = document.querySelector('.calendar.add .add_name');
    const addQuantityInput = document.querySelector('.calendar.add .add_quantity');
    const addPriceInput = document.querySelector('.calendar.add .add_price');
    const addMemoInput = document.querySelector('.calendar.add .add_memo');

    const modeToggle = document.querySelector('.switch-label');
    if( mainCard && modeToggle ){
        modeToggle.addEventListener('click', toggleClick);
    }

    if( localStorage.getItem('totalPrice') === null ){
       localStorage.setItem('totalPrice', 0);
    }

    const stockList = localStorage.getItem('stockInfo');
    gridTimeLine('main', JSON.parse(stockList));

    const addBtn = document.querySelector('.cl_add');
    addBtn.addEventListener('click', function(){
        displayCard('add');
    }, false);
    
    const deleteBtn = document.querySelector('.delete_btn');
    deleteBtn.addEventListener('click', function(){
        
    }, false);

    const closeBtn = document.querySelector('.close_btn');
    closeBtn.addEventListener('click', function(){
        displayCard('main');
    }, false);

    const applyBtn = document.querySelector('.apply_btn');
    applyBtn.addEventListener('click', function(){
        if( addValidChk() ){
            gridTimeLine('add');
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
            document.querySelectorAll('.add_type_wrap input')[0].checked = true;
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
            addCard.style.display = 'block';
            mainCard.style.display = 'none';
        }
    }

    function gridTimeLine(type, info){
        let menuHtml = '';
        menuHtml += '<div class="menuBox">';
        menuHtml += '    <ul>';
        menuHtml += '        <li><i class="far fa-edit edit_btn"></i></li>';
        menuHtml += '        <li><i class="far fa-trash-alt delete_btn"></i></li>';
        menuHtml += '    </ul>';
        menuHtml += '   <div class="arrow-up"></div>';
        menuHtml += '</div>';

        if(type === 'add'){
            let cnt = 0;

            const addPrice = addQuantityInput.value * addPriceInput.value;
            const addPriceFormat = priceFormat(addQuantityInput.value * addPriceInput.value);
            if( totalPrice.getAttribute('data-total-price') === null ){
                totalPrice.setAttribute('data-total-price', 0);
            }

            const addType = document.querySelector('.add_type_wrap input:checked').getAttribute('data-add-type');
            let dotTypeClass = '';
            if( addType === 'buy'){
                dotTypeClass = 'dot_buy';
                addTypeText = '매수';
                totalPrice.textContent = priceFormat(Number(localStorage.getItem('totalPrice')) + addPrice) + '원';
                totalPrice.setAttribute('data-total-price', Number(localStorage.getItem('totalPrice')) + addPrice);
            }else{
                dotTypeClass = 'dot_sell';
                addTypeText = '매도';
                totalPrice.textContent = priceFormat(Number(localStorage.getItem('totalPrice')) - addPrice) + '원';
                totalPrice.setAttribute('data-total-price', Number(localStorage.getItem('totalPrice')) - addPrice);
            }
            
            localStorage.setItem('totalPrice', totalPrice.getAttribute('data-total-price'));

            let timeLineHtml = '';
            timeLineHtml += '<div class="event_item">';
            timeLineHtml += '   <div class="ei_Dot ' + dotTypeClass + '"></div>';
            timeLineHtml += '   <i class="fas fa-tools menu_btn"></i>';
            timeLineHtml +=     menuHtml;
            timeLineHtml += '   <div class="ei_Title">' + addDateInput.value + '</div>';
            timeLineHtml += '   <div class="ei_Copy">';
            timeLineHtml +=         addNameInput.value + ' (' + priceFormat(addPriceInput.value) + '원) - ' + addQuantityInput.value + '주 ' + addTypeText;
            timeLineHtml += '   </div>';
            timeLineHtml += '   <div class="ei_Copy">' + '총 ' + addPriceFormat + '원</div>';
            timeLineHtml += '</div>';

            if( mainCard.querySelectorAll('.event_item_wrap .event_item').length === 0 ){
                mainCard.querySelector('.event_item_wrap').innerHTML = timeLineHtml;
                cnt = 1;
            }else{
                mainCard.querySelector('.event_item_wrap .event_item').insertAdjacentHTML('beforebegin', timeLineHtml);
                cnt = mainCard.querySelectorAll('.event_item_wrap .event_item').length;
            }
            document.querySelector('.event_item').setAttribute('data-idx', cnt);

            const setStockInfo = { 'num': cnt, 'addType': addType, 'dotTypeClass': dotTypeClass, 'addDateInput': addDateInput.value, 'addMemoInput': addMemoInput.value, 'addTypeText': addTypeText,
                                'addNameInput': addNameInput.value, 'addPriceInput': addPriceInput.value, 'addQuantityInput': addQuantityInput.value, 'addPrice': addPrice };
            const getStockInfo = localStorage.getItem('stockInfo');
            if( getStockInfo !== null ){
                let tempArr = JSON.parse(getStockInfo);
                if( !Array.isArray(tempArr) ){
                    tempArr = [JSON.parse(getStockInfo)];
                }
                tempArr.push(setStockInfo);
                localStorage.setItem('stockInfo', JSON.stringify(tempArr));
            }else{
                localStorage.setItem('stockInfo', JSON.stringify(setStockInfo));
            }
            
        }else{
            totalPrice.textContent = '0 원';
            if( info ){
                if( Array.isArray(info) ){
                    info = info.reverse();
                }else{
                    info = [info];
                }
                let timeLineHtml = '';
                for( let i=0; i<info.length; i++ ){
                    timeLineHtml += '<div class="event_item" data-idx="' + info[i].num + '">';
                    timeLineHtml += '   <div class="ei_Dot ' + info[i].dotTypeClass + '"></div>';
                    timeLineHtml += '   <i class="fas fa-cog menu_btn"></i>';
                    timeLineHtml +=     menuHtml;
                    timeLineHtml += '   <div class="ei_Title">' + info[i].addDateInput + '</div>';
                    timeLineHtml += '   <div class="ei_Copy">';
                    timeLineHtml +=         info[i].addNameInput + ' (' + priceFormat(info[i].addPriceInput) + '원) - ' + info[i].addQuantityInput + '주 ' + info[i].addTypeText;
                    timeLineHtml += '   </div>';
                    timeLineHtml += '   <div class="ei_Copy">' + '총 ' + priceFormat(info[i].addPrice) + '원</div>';
                    timeLineHtml += '</div>';
                }
                totalPrice.textContent = priceFormat(totalPrice.getAttribute('data-total-price')) + '원';

                if( mainCard.querySelectorAll('.event_item_wrap .event_item').length === 0 ){
                    mainCard.querySelector('.event_item_wrap').innerHTML = timeLineHtml;
                }else{
                    mainCard.querySelector('.event_item_wrap .event_item').insertAdjacentHTML('beforebegin', timeLineHtml);
                }
            }
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

    function priceFormat( str ){
        return Number(str).toLocaleString();
    }
}