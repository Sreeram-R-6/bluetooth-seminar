// Test harness only. No dependency is required by the seminar itself.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {JSDOM} = process.env.JSDOM_PATH
  ? require(path.resolve(process.env.JSDOM_PATH))
  : require('jsdom');
const html = fs.readFileSync('index.html','utf8');
const code = fs.readFileSync('app.js','utf8');
const wait = () => new Promise(r=>setImmediate(r));
async function verify(){
  const errors=[];
  const dom=new JSDOM(html,{url:'http://localhost:8000/#slide-3',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window,d=w.document;
  let reduce=false,reduceListener,fullscreen=null,rejectFullscreen=false,printed=false;
  w.matchMedia=()=>({get matches(){return reduce},addEventListener(_,fn){reduceListener=fn}});
  w.ResizeObserver=class{observe(){}disconnect(){}};w.scrollTo=()=>{};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;this.querySelector('button').focus();};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  Object.defineProperty(d,'fullscreenElement',{get:()=>fullscreen});
  d.documentElement.requestFullscreen=async opts=>{assert.equal(opts.navigationUI,'hide');if(rejectFullscreen)throw Error('Rejected');fullscreen=d.documentElement;d.dispatchEvent(new w.Event('fullscreenchange'));};
  d.exitFullscreen=async()=>{fullscreen=null;d.dispatchEvent(new w.Event('fullscreenchange'));};
  w.print=()=>{printed=true;};
  w.addEventListener('error',e=>errors.push(String(e.error)));w.eval(code);
  const q=s=>d.querySelector(s),qa=s=>[...d.querySelectorAll(s)];
  const click=s=>{assert(q(s),`Missing ${s}`);if(!q(s).disabled)q(s).focus();q(s).click();};
  const go=n=>click(`#progress-dots [data-goto="${n-1}"]`);
  const key=k=>d.dispatchEvent(new w.KeyboardEvent('keydown',{key:k,bubbles:true}));
  assert.match(q('#slide h1').textContent,/Two Different/);assert.equal(q('#slide-count').textContent,'03 / 07');
  assert.equal(qa('#chapter-nav button').length,7);assert.equal(qa('#overview-grid button').length,7);
  for(let n=1;n<=7;n++){
    go(n);assert(q('#slide h1'));assert(q('#slide .takeaway'));assert.equal(q('#slide-count').textContent,`0${n} / 07`);
    assert.equal(qa('#chapter-nav [aria-current]').length,1);assert.equal(qa('#progress-dots [aria-current]').length,1);
    assert.equal(qa('#teaching-notes dt').length,7);assert(q('#teaching-notes').textContent.length>900);
    const ids=qa('[id]').map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Unique IDs');
    for(const b of qa('#slide button'))assert(b.textContent.trim()||b.getAttribute('aria-label'),'Accessible button name');
    assert(!/ASN\.1|textbook|9\.3|SNMP/.test(q('#slide').textContent),'No reference-topic residue');
  }
  go(1);assert(q('#previous').disabled);click('#previous');assert.equal(q('#slide-count').textContent,'01 / 07');
  key('End');assert(q('#next').disabled);click('#next');assert.equal(q('#slide-count').textContent,'07 / 07');
  key('Home');key('ArrowRight');assert.equal(q('#slide-count').textContent,'02 / 07');key('PageUp');assert.equal(q('#slide-count').textContent,'01 / 07');
  const input=d.createElement('input');d.body.append(input);input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(q('#slide-count').textContent,'01 / 07');input.remove();
  d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',ctrlKey:true,bubbles:true}));assert.equal(q('#slide-count').textContent,'01 / 07');
  click('#overview');key('End');assert.equal(q('#slide-count').textContent,'01 / 07');q('#overview-dialog').close();assert.equal(d.activeElement.id,'overview');
  click('#overview');click('#overview-grid [data-goto="3"]');assert(!q('#overview-dialog').open);assert.equal(q('#slide-count').textContent,'04 / 07');
  click('#notes-toggle');assert(!q('#teaching-notes').hidden);go(5);assert(!q('#teaching-notes').hidden);assert.match(q('#teaching-notes').textContent,/HID over GATT/);click('#notes-toggle');
  go(1);for(let i=0;i<6;i++){click(`[data-device="${i}"]`);assert.equal(qa('#slide [data-device][aria-pressed=true]').length,1);assert.equal(qa('#slide .links .selected').length,1);assert(q('.eco-result').textContent.length>45);}assert.match(q('.eco-result').textContent,/directly to the laptop/);
  go(2);assert(q('[data-connection=back]').disabled);for(let i=0;i<5;i++)click('[data-connection=next]');assert(q('[data-connection=next]').disabled);assert.match(q('.stage-result').textContent,/sends audio/);assert.equal(qa('#slide .packet').length,3);click('[data-connection=back]');assert.match(q('.stage-result').textContent,/active communication link/);click('[data-connection=reset]');assert(q('[data-connection=back]').disabled);
  go(3);click('[data-mode=ble]');assert.equal(q('[data-mode=ble]').getAttribute('aria-pressed'),'true');assert.equal(qa('#slide .packet').length,1);click('[data-mode=classic]');assert.equal(qa('#slide .packet').length,3);
  click('#motion');assert(d.body.classList.contains('paused'));reduce=true;reduceListener();assert(q('#motion').disabled);reduce=false;reduceListener();assert(!q('#motion').disabled);click('#motion');assert(!d.body.classList.contains('paused'));
  go(4);assert(q('[data-provision=back]').disabled);for(let i=0;i<5;i++)click('[data-provision=next]');assert(q('[data-provision=next]').disabled);assert.match(q('.stage-result').textContent,/Wi-Fi now/);assert.match(q('.config-example').textContent,/Classroom-Demo/);click('[data-provision=back]');assert.match(q('.stage-result').textContent,/Wi-Fi joined/);click('[data-provision=reset]');assert(q('[data-provision=back]').disabled);
  go(5);for(let i=0;i<4;i++){click(`[data-gatt="${i}"]`);assert.equal(qa('#slide [data-gatt][aria-pressed=true]').length,1);}assert.match(q('.gatt-result').textContent,/WRITE/);
  go(7);for(let i=0;i<3;i++){click(`[data-question="${i}"] [data-answer="2"]`);assert.match(q(`[data-question="${i}"] .answer`).textContent,/Try/);click(`[data-question="${i}"] [data-answer="${i===2?0:1}"]`);assert.match(q(`[data-question="${i}"] .answer`).textContent,/Yes/);}
  go(1);click('#present');await wait();assert(d.body.classList.contains('presenting'));assert(!d.body.classList.contains('hud-visible'));assert(fullscreen);key('h');assert(d.body.classList.contains('hud-visible'));click('#edge-next');assert.equal(q('#slide-count').textContent,'02 / 07');key('Escape');await wait();assert(!d.body.classList.contains('presenting'));assert(!fullscreen);
  rejectFullscreen=true;click('#present');await wait();assert(d.body.classList.contains('presenting'));assert.match(q('#toast').textContent,/unavailable/);key('Escape');await wait();rejectFullscreen=false;
  click('#present');await wait();fullscreen=null;d.dispatchEvent(new w.Event('fullscreenchange'));assert(!d.body.classList.contains('presenting'));
  click('#sources');click('#print');assert(printed);assert.equal(qa('.print-slide').length,7);assert.equal(qa('.print-notes').length,7);assert.match(qa('.print-slide')[1].textContent,/six-stage/);assert.equal(qa('.print-slide')[2].querySelectorAll('.comparison.active').length,2);assert.match(qa('.print-slide')[3].textContent,/Setup complete/);assert(qa('.print-slide')[6].querySelector('details').open);assert.equal(qa('.print-slide')[6].querySelectorAll('.answer').length,3);
  w.dispatchEvent(new w.Event('afterprint'));assert.equal(q('#print-deck').children.length,0);
  d.dispatchEvent(new w.Event('visibilitychange'));assert.equal(errors.length,0,errors.join('\n'));
  w.location.hash='#slide-99';await new Promise(r=>w.setTimeout(r,15));assert.equal(q('#slide-count').textContent,'07 / 07');
  w.location.hash='#slide-0';await new Promise(r=>w.setTimeout(r,15));assert.equal(q('#slide-count').textContent,'01 / 07');
  dom.window.close();
  // Local assets and offline portability are checked separately from browser rendering.
  for(const file of ['styles.css','app.js','favicon.svg','fonts/fonts.css'])assert(fs.existsSync(file));
  const css=fs.readFileSync('fonts/fonts.css','utf8');for(const match of css.matchAll(/url\(([^)]+)\)/g))assert(fs.existsSync(path.join('fonts',match[1])));
  assert(!/<script[^>]+src="https?:|<link[^>]+href="https?:/.test(html));
  console.log('PASS: 7 slides, navigation, notes, all interactions, keyboard guards, motion preferences, mocked fullscreen/fallback, completed print deck, hashes and local assets.');
  console.log('LIMIT: DOM tests do not verify native browser rendering, real fullscreen, CSS geometry or print pagination.');
}
verify().catch(e=>{console.error(e);process.exitCode=1});
