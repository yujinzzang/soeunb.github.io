window.onload = function(){
    const cardWrap = document.querySelector('.calendar');
    const modeToggle = document.querySelector('.switch-label');
    if( cardWrap &&  modeToggle ){
        modeToggle.addEventListener("click", toggleClick);
    }
    function toggleClick(){
        if( cardWrap.className === 'calendar light' ){
            cardWrap.classList.replace('light', 'dark');
        }else{
            cardWrap.classList.replace('dark', 'light');
        }
        console.log('aa');
    }
}