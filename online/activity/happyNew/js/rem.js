(function(){
    var docEl = document.documentElement;
    var width = docEl.getBoundingClientRect().width;
    if (width > 450) {width = 450};
    var rootRem = width / 375 * 50;
    docEl.style.fontSize = rootRem + 'px';
  })();