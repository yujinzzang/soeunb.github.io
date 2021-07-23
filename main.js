window.onload = function(){
    const cardWrap = document.querySelector('.calendar');
    const modeToggle = document.querySelector('.switch-label');
    if( cardWrap &&  modeToggle ){
        modeToggle.addEventListener("click", toggleClick);
    }
    function toggleClick(){
        if( modeToggle.getAttribute('data-on-off') === 'off' ){
            modeToggle.setAttribute('data-on-off', 'on');
            cardWrap.classList.remove('light');
            cardWrap.classList.add('dark');
        }else{
            modeToggle.setAttribute('data-on-off', 'off');
            cardWrap.classList.remove('dark');
            cardWrap.classList.add('light');
        }
    }
}
