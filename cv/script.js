(function(){
  "use strict";
  var root = document.documentElement; root.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function(id){ return document.getElementById(id); };

  /* language */
  /* Every piece of text exists in both languages; each element is switched directly, so nothing depends on the page's root attributes. */
  var cur = "de";
  var tagged = Array.prototype.slice.call(document.querySelectorAll('body [lang="de"], body [lang="en"]'));
  var switches = Array.prototype.slice.call(document.querySelectorAll(".lang-switch"));
  function setLang(l){
    cur = l;
    tagged.forEach(function(el){
      var off = el.getAttribute("lang") !== l;
      el.hidden = off; el.style.display = off ? "none" : "";
    });
    switches.forEach(function(b){ b.textContent = l === "de" ? "English" : "Deutsch"; });
    try{ root.setAttribute("data-lang", l); root.setAttribute("lang", l); }catch(e){}
    try{
      document.title = l === "de" ? "Soban Ahmed Waris – Lebenslauf" : "Soban Ahmed Waris – CV";
      $("nav").setAttribute("aria-label", l === "de" ? "Abschnitte" : "Sections");
    }catch(e){}
    try{ localStorage.setItem("cv-lang", l); }catch(e){}
  }
  var saved = null; try{ saved = localStorage.getItem("cv-lang"); }catch(e){}
  setLang(saved === "en" ? "en" : "de");
  var lastFlip = 0, startX = 0, startY = 0;
  function flip(){ var now = Date.now(); if(now - lastFlip < 400) return; lastFlip = now; setLang(cur === "de" ? "en" : "de"); }
  switches.forEach(function(b){
    b.addEventListener("click", flip);
    /* a tap also counts if the click never arrives, as long as the finger did not move (so scrolling past the button does nothing) */
    b.addEventListener("touchstart", function(e){ var t=e.changedTouches[0]; startX=t.clientX; startY=t.clientY; }, {passive:true});
    b.addEventListener("touchend", function(e){ var t=e.changedTouches[0]; if(Math.abs(t.clientX-startX)<10 && Math.abs(t.clientY-startY)<10) flip(); }, {passive:true});
  });

  /* cards unfold once as they enter */
  var rv = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {rootMargin:"0px 0px -10% 0px"});
    rv.forEach(function(el){ io.observe(el); });
  } else rv.forEach(function(el){ el.classList.add("in"); });

  /* cards lean toward the pointer and catch a highlight */
  if(!reduced && window.matchMedia("(hover:hover) and (pointer:fine)").matches){
    rv.forEach(function(el){
      el.addEventListener("pointermove", function(e){
        var r = el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
        el.classList.add("tilt");
        el.style.setProperty("--ry", ((x-.5)*3.2).toFixed(2)+"deg");
        el.style.setProperty("--rx", (-(y-.5)*2.2*Math.min(1,520/r.height)).toFixed(2)+"deg");
        el.style.setProperty("--gx", (x*100).toFixed(1)+"%"); el.style.setProperty("--gy", (y*100).toFixed(1)+"%");
      });
      el.addEventListener("pointerleave", function(){
        el.classList.remove("tilt"); el.style.setProperty("--rx","0deg"); el.style.setProperty("--ry","0deg");
      });
    });
  }

  /* top bar: name appears after the hero, progress line, current section */
  var bar=$("bar"), prog=$("prog"), hero=$("hero");
  var links = Array.prototype.slice.call(document.querySelectorAll("#nav a"));
  var targets = links.map(function(a){ return document.querySelector(a.getAttribute("href")); });
  var ticking=false;
  function onScroll(){
    ticking=false;
    var y=window.scrollY, h=window.innerHeight, max=Math.max(1, document.documentElement.scrollHeight-h);
    bar.classList.toggle("solid", y>24);
    bar.classList.toggle("past", hero.getBoundingClientRect().bottom < h*.45);
    prog.style.transform = "scaleX("+Math.min(1,y/max).toFixed(4)+")";
    var cur=-1;
    for(var i=0;i<targets.length;i++){ if(targets[i].getBoundingClientRect().top < h*.45) cur=i; }
    links.forEach(function(a,i){ a.classList.toggle("on", i===cur); if(i===cur) a.setAttribute("aria-current","true"); else a.removeAttribute("aria-current"); });
  }
  window.addEventListener("scroll", function(){ if(!ticking){ ticking=true; requestAnimationFrame(onScroll); } }, {passive:true});
  onScroll();

  /* ---------- glossy shapes ---------- */
  var canvas = $("scene");
  if(!window.THREE){ canvas.style.display="none"; return; }
  var renderer;
  try{ renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true, powerPreference:"high-performance"}); }
  catch(e){ canvas.style.display="none"; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  var scene = new THREE.Scene();
  var FOV = 35, CAMZ = 14, VIS = 2*CAMZ*Math.tan(FOV*Math.PI/360), K = 0.85;
  var camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100); camera.position.z = CAMZ;

  /* a small studio to reflect: one room and a few softboxes */
  var pmrem = new THREE.PMREMGenerator(renderer);
  function studio(room, power){
    var s = new THREE.Scene();
    function glow(r,g,b){ var m=new THREE.MeshBasicMaterial({side:THREE.DoubleSide, toneMapped:false}); m.color.setRGB(r*power,g*power,b*power); return m; }
    var box = new THREE.Mesh(new THREE.BoxGeometry(24,24,24), new THREE.MeshBasicMaterial({side:THREE.BackSide, toneMapped:false}));
    box.material.color.setRGB(room[0],room[1],room[2]); s.add(box);
    function panel(w,h,mat,x,y,z,rx,ry){ var p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat); p.position.set(x,y,z); p.rotation.set(rx,ry,0); s.add(p); }
    panel(12,9, glow(1,1,1),        0,11,2,   Math.PI/2,0);
    panel(5,14, glow(.75,.85,1),   -11,1,0,   0,Math.PI/2);
    panel(3,12, glow(.45,.62,1),    11,0,-3,  0,-Math.PI/2);
    panel(9,3,  glow(1,.82,.6),     2,-4,11,  0,Math.PI);
    panel(7,7,  glow(.6,.6,.65),    3,3,-11,  0,0);
    panel(2,2,  glow(1.6,1.6,1.6), -6,7,8,    0,Math.PI);
    return pmrem.fromScene(s, 0.03).texture;
  }
  var envLight = studio([.17,.19,.25], 6.5), envDark = studio([.012,.018,.032], 7.5);
  var key = new THREE.DirectionalLight(0xffffff, .6); key.position.set(4,8,6); scene.add(key);

  function phys(o){ return new THREE.MeshPhysicalMaterial(o); }
  var mats = {
    blue:  phys({color:0x0a2ec2, metalness:.05, roughness:.1, envMapIntensity:.8, clearcoat:1, clearcoatRoughness:.03}),
    pearl: phys({color:0xf3f5f9, metalness:0,  roughness:.14, clearcoat:1, clearcoatRoughness:.04}),
    chrome:phys({color:0xffffff, metalness:1,  roughness:.02}),
    ink:   phys({color:0x0d1730, metalness:.55, roughness:.07, clearcoat:1, clearcoatRoughness:.03}),
    gold:  phys({color:0xf2b45c, metalness:1,  roughness:.12}),
    glass: phys({color:0xdfe9ff, metalness:0,  roughness:0, transmission:.86, transparent:true, clearcoat:1, clearcoatRoughness:0, envMapIntensity:1.5})
  };
  var geos = {
    knot:  new THREE.TorusKnotGeometry(1,.34,260,36),
    sphere:new THREE.SphereGeometry(1,64,40),
    torus: new THREE.TorusGeometry(1,.4,40,110),
    ring:  new THREE.TorusGeometry(1,.04,16,180),
    gem:   new THREE.IcosahedronGeometry(1,0),
    octa:  new THREE.OctahedronGeometry(1,0),
    cone:  new THREE.ConeGeometry(.85,1.7,72),
    pill:  new THREE.CylinderGeometry(.55,.55,1.9,56)
  };

  var seed = 8062004;
  function rnd(){ seed=(seed*1664525+1013904223)%4294967296; return seed/4294967296; }
  function mesh(geo, mat){ var m=new THREE.Mesh(geos[geo], mats[mat]); m.rotation.set(rnd()*6.28, rnd()*6.28, rnd()*6.28); return m; }
  function spin(){ return [(rnd()-.5)*.5, (rnd()-.5)*.6, (rnd()-.5)*.3]; }

  /* clusters turn as a whole, so their satellites orbit */
  function cluster(defs){
    var g = new THREE.Group(); scene.add(g);
    var parts = defs.map(function(d,i){
      var m = mesh(d[0], d[1]); m.position.set(d[3][0], d[3][1], d[3][2]); g.add(m);
      return {m:m, s:d[2], spin:d[4]||spin(), i:i};
    });
    return {g:g, parts:parts, x:0, y:0, cs:1};
  }
  var top = cluster([
    ["knot","blue",1.25,[0,0,0],[.16,.26,.05]],
    ["ring","chrome",2.2,[0,0,0],[.24,.1,.32]],
    ["sphere","chrome",.7,[1.9,1.3,-.9]],
    ["torus","pearl",.76,[-1.7,-1.2,.8]],
    ["octa","gold",.48,[1.6,-1.5,1]],
    ["sphere","ink",.52,[-1.55,1.5,-1.3]],
    ["sphere","glass",.42,[.3,2.15,1.1]],
    ["sphere","blue",.26,[2.45,-.1,-1.6]]
  ]);
  var end = cluster([
    ["torus","pearl",1.3,[0,0,0],[.2,.14,.06]],
    ["sphere","chrome",.62,[0,0,0]],
    ["ring","chrome",2.0,[0,0,0],[.12,.3,.2]],
    ["octa","gold",.42,[2.0,.9,-.4]],
    ["sphere","blue",.36,[-1.95,-.8,.6]],
    ["gem","ink",.4,[-1.5,1.3,-.9]],
    ["sphere","glass",.5,[1.5,-1.3,.9]]
  ]);

  /* the rest drift past the cards on the way down */
  var loose = [];
  var order = [["torus","blue"],["gem","pearl"],["sphere","chrome"],["cone","ink"],["sphere","glass"],["knot","pearl"],["octa","blue"],
               ["pill","gold"],["torus","chrome"],["gem","ink"],["sphere","pearl"],["gem","glass"],["knot","ink"],["torus","gold"],
               ["sphere","blue"],["gem","chrome"],["pill","pearl"],["sphere","glass"],["octa","ink"],["torus","pearl"],["sphere","chrome"],["knot","blue"]];
  order.forEach(function(o,i){
    var m = mesh(o[0], o[1]); scene.add(m);
    loose.push({m:m, s:.42+rnd()*.5, spin:spin(), ph:rnd()*6.28, bob:.6+rnd()*.6,
      yf:.16+.74*(i+rnd()*.6)/order.length, xn:(i%2?-1:1)*(.66+rnd()*.42), z:-5.5+rnd()*7.5});
  });

  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function applyTheme(){
    var t=root.getAttribute("data-theme"), dark = t==="dark" || (t!=="light" && mq.matches);
    scene.environment = dark ? envDark : envLight;
    renderer.toneMappingExposure = dark ? 1.2 : 1.05;
    key.intensity = dark ? .9 : .7;
  }
  applyTheme();
  if(mq.addEventListener) mq.addEventListener("change", applyTheme);
  new MutationObserver(applyTheme).observe(root,{attributes:true, attributeFilter:["data-theme"]});

  var W=1,H=1,halfW=1,travel=1,narrow=false;
  var contact=$("kontakt");
  function layout(){
    W=window.innerWidth; H=window.innerHeight; narrow=W<760;
    renderer.setSize(W,H,false); camera.aspect=W/H; camera.updateProjectionMatrix();
    halfW = VIS*W/H/2;
    var maxS = Math.max(0, document.documentElement.scrollHeight-H), sy=window.scrollY;
    travel = maxS/H*VIS*K;
    /* opening cluster: beside the name on wide screens, above it on a phone */
    if(narrow){
      top.cs = Math.min(.95, halfW/2.25);
      top.x = 0; top.y = VIS/2 - VIS*.215 - .05;
    } else { top.cs = Math.min(1.6, halfW/4.4); top.x = halfW*.62; top.y = 0; }
    /* closing cluster: under the contact card, in view at the end of the page */
    end.cs = narrow ? Math.min(.95, halfW/2.3) : 1.2;
    var under = -travel + VIS/2 - (contact.getBoundingClientRect().bottom + sy - maxS)/H*VIS;
    end.x = 0; end.y = Math.min(under - .5 - 2.1*end.cs, -travel + .2);
    loose.forEach(function(it){
      it.x = it.xn*halfW*(narrow?1.05:1); it.y = -it.yf*travel - (narrow?1.5:0); it.sc = it.s*(narrow?1.8:2.2);
    });
  }
  window.addEventListener("resize", layout); layout();
  if(window.ResizeObserver) new ResizeObserver(layout).observe(document.body);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  var px=0, py=0, tx=0, ty=0;
  window.addEventListener("pointermove", function(e){ tx=e.clientX/W-.5; ty=e.clientY/H-.5; }, {passive:true});

  var clock=new THREE.Clock(), born=0, camY=null, lastS=window.scrollY, boost=0, shown=false;
  function out(x){ x=Math.min(1,Math.max(0,x)); return 1-Math.pow(1-x,3); }
  function drive(c, t, dt, sp, delay){
    c.g.position.set(c.x, c.y + (reduced?0:Math.sin(t*.5+delay)*.12), 0);
    c.g.scale.setScalar(c.cs);
    if(!reduced){
      c.g.rotation.y += dt*.16*sp;
      c.g.rotation.x = Math.sin(t*.27+delay)*.16 + py*.35;
      c.g.rotation.z = Math.cos(t*.21+delay)*.08 - px*.25;
    }
    for(var i=0;i<c.parts.length;i++){
      var p=c.parts[i], grow = reduced ? 1 : out((born - delay - .15 - p.i*.09)/1.15);
      p.m.scale.setScalar(Math.max(.0001, p.s*grow));
      if(!reduced){ p.m.rotation.x += p.spin[0]*dt*sp; p.m.rotation.y += p.spin[1]*dt*sp; p.m.rotation.z += p.spin[2]*dt*sp; }
    }
  }
  function frame(){
    requestAnimationFrame(frame);
    var dt=Math.min(clock.getDelta(),.1), t=clock.elapsedTime;
    born += dt;
    var sy=window.scrollY, vel=(sy-lastS)/Math.max(dt,.001)/H; lastS=sy;
    boost += (Math.max(-6,Math.min(6,vel))*1.6 - boost)*Math.min(1,dt*4);
    var sp = 1 + Math.abs(boost);
    var targetY = -sy/H*VIS*K;
    camY = (camY===null||reduced) ? targetY : camY+(targetY-camY)*(1-Math.exp(-dt*9));
    px+=(tx-px)*.05; py+=(ty-py)*.05;
    camera.position.set(px*.9, camY-py*.6, CAMZ);
    camera.lookAt(px*.3, camY, 0);

    drive(top, t, dt, sp, 0);
    drive(end, t, dt, sp, 0);
    for(var i=0;i<loose.length;i++){
      var it=loose[i], m=it.m, grow = reduced ? 1 : out((born-.4)/1.2);
      m.scale.setScalar(Math.max(.0001, it.sc*grow));
      if(reduced){ m.position.set(it.x,it.y,it.z); continue; }
      m.rotation.x += it.spin[0]*dt*sp; m.rotation.y += it.spin[1]*dt*sp; m.rotation.z += it.spin[2]*dt*sp;
      m.position.set(it.x + Math.sin(t*.4*it.bob+it.ph)*.14, it.y + Math.sin(t*.7*it.bob+it.ph)*.24, it.z);
    }
    renderer.render(scene,camera);
    if(!shown){ shown=true; canvas.classList.add("on"); }
  }
  frame();
})();
