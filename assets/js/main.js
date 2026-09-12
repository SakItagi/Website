(function(){
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 12);
  });

  var burger = document.getElementById('burger');
  var panel = document.getElementById('mobilePanel');
  var scrim = document.getElementById('scrim');
  function closeMenu(){ burger.classList.remove('open'); panel.classList.remove('open'); scrim.classList.remove('open'); }
  function toggleMenu(){
    var open = panel.classList.toggle('open');
    burger.classList.toggle('open', open);
    scrim.classList.toggle('open', open);
  }
  burger.addEventListener('click', toggleMenu);
  scrim.addEventListener('click', closeMenu);
  panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.14, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  var counters = document.querySelectorAll('[data-count]');
  var counted = new WeakSet();
  function runCounter(el){
    var target = parseInt(el.getAttribute('data-count'),10);
    var suffix = el.getAttribute('data-suffix') || '';
    if(reduce){ el.textContent = target + suffix; return; }
    var dur = 1400, t0 = null;
    function step(ts){
      if(!t0) t0 = ts;
      var p = Math.min((ts - t0)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !counted.has(e.target)){
          counted.add(e.target); runCounter(e.target); cio.unobserve(e.target);
        }
      });
    }, {threshold:0.6});
    counters.forEach(function(el){ cio.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  // generate window grid for hero building illustration
  var windowsGroup = document.getElementById('windows');
  if(windowsGroup){
    var frag = document.createDocumentFragment();
    for(var row=0; row<9; row++){
      for(var col=0; col<8; col++){
        var wx = 140 + col*40;
        var wy = 175 + row*22;
        if(wy > 320 && wy < 410) continue;
        var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute('x', wx);
        rect.setAttribute('y', wy);
        rect.setAttribute('width', 22);
        rect.setAttribute('height', 12);
        rect.setAttribute('fill', Math.random() > 0.55 ? '#3F79BE' : '#1B3E6C');
        rect.setAttribute('opacity', Math.random() > 0.55 ? '0.85' : '0.4');
        frag.appendChild(rect);
      }
    }
    windowsGroup.appendChild(frag);
  }

  var form = document.getElementById('quoteForm');
  var note = document.getElementById('formNote');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      note.classList.add('show');
    });
  }
})();
