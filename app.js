'use strict';
const titles=["外滩大会现场表演", "L1 多机扭扭舞", "L1 多机腰鼓舞", "L1 站立与躺下", "L1 单机腰鼓舞", "L1 躺下与起身", "L1 鲨鱼舞", "G1 仿真训练", "G1 跨仿真器迁移", "G1 舞蹈实机效果", "G1 动作重定向", "AMP 跑步迁移验证", "AMP 行走迁移验证", "AMP 跑步实机效果", "AMP 行走实机效果", "G1 武术模仿训练", "G1 世界模型行走", "Go2 仿真效果", "Go2 迁移验证"];
const order=[0,2,1,6,4,3,5,9,10,7,8,14,13,12,11,15,16,17,18];
const dialog=document.getElementById('video-dialog');
const player=document.getElementById('player');
const error=document.getElementById('video-error');
let current=0,trigger=null;
function openVideo(id){
 current=id;
 const src=`assets/video-${String(id).padStart(2,'0')}-v2.mp4`;
 document.getElementById('video-title').textContent=titles[id];
 document.getElementById('video-position').textContent=`${order.indexOf(id)+1} / ${order.length}`;
 document.getElementById('prev-video').disabled=order.indexOf(id)===0;
 document.getElementById('next-video').disabled=order.indexOf(id)===order.length-1;
 error.hidden=true;
 document.getElementById('direct-video').href=src;
 player.pause();
 player.muted=id!==0;
 player.defaultMuted=id!==0;
 player.poster=`assets/video-${String(id).padStart(2,'0')}.jpg`;
 player.src=src;
 if(typeof dialog.showModal!=='function'){window.location.href=src;return;}
 if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}
 player.load();
 const promise=player.play();
 if(promise)promise.catch(()=>{});
}
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{trigger=button;openVideo(Number(button.dataset.video));}));
document.getElementById('close-video').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();document.body.classList.remove('modal-open');if(trigger)trigger.focus({preventScroll:true});});
document.getElementById('prev-video').addEventListener('click',()=>{const i=order.indexOf(current);if(i>0)openVideo(order[i-1]);});
document.getElementById('next-video').addEventListener('click',()=>{const i=order.indexOf(current);if(i<order.length-1)openVideo(order[i+1]);});
player.addEventListener('error',()=>{if(player.getAttribute('src'))error.hidden=false;});
