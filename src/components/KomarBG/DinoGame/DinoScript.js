// This uses a modified version of https://cs.chromium.org/chromium/src/components/neterror/resources/offline.js
// License for the code bellow:
// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file here: https://cs.chromium.org/chromium/src/LICENSE.

const DinoScript = '!function(){"use strict";function l(t,i){if(l.instance_)return l.instance_;(l.instance_=this).outerContainerEl=document.querySelector(t),this.containerEl=null,this.detailsButton=this.outerContainerEl.querySelector("#details-button"),this.config=i||l.config,this.dimensions=l.defaultDimensions,this.canvas=null,this.canvasCtx=null,this.tRex=null,this.distanceMeter=null,this.distanceRan=0,this.highestScore=0,this.time=0,this.runningTime=0,this.msPerFrame=1e3/e,this.currentSpeed=this.config.SPEED,this.obstacles=[],this.started=!1,this.activated=!1,this.crashed=!1,this.paused=!1,this.resizeTimerId_=null,this.playCount=0,this.audioBuffer=null,this.soundFx={},this.audioContext=null,this.images={},this.imagesLoaded=0,this.loadImages()}window.Runner=l;var e=60,T=1<window.devicePixelRatio,n=-1<window.navigator.userAgent.indexOf("UIWebViewForStaticFileContent"),h=-1<window.navigator.userAgent.indexOf("Mobi")||n;window;function o(t,i){return Math.floor(Math.random()*(i-t+1))+t}function a(t){for(var i=t.length/4*3,s=atob(t),e=new ArrayBuffer(i),n=new Uint8Array(e),h=0;h<i;h++)n[h]=s.charCodeAt(h);return n.buffer}function r(){return n?(new Date).getTime():performance.now()}function I(t,i,s,e){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.canvasDimensions=e,this.textSprite=i,this.restartImg=s,this.draw()}function m(t,i){return new g(t.x+i.x,t.y+i.y,t.width,t.height)}function E(t,i,s){t.save(),t.strokeStyle="#f00",t.strokeRect(i.x,i.y,i.width,i.height),t.strokeStyle="#0f0",t.strokeRect(s.x,s.y,s.width,s.height),t.restore()}function f(t,i){var s=!1,e=(t.x,t.y,i.x);i.y;return t.x<e+i.width&&t.x+t.width>e&&t.y<i.y+i.height&&t.height+t.y>i.y&&(s=!0),s}function g(t,i,s,e){this.x=t,this.y=i,this.width=s,this.height=e}function c(t,i,s,e,n,h){this.canvasCtx=t,this.image=s,this.typeConfig=i,this.gapCoefficient=n,this.size=o(1,c.MAX_OBSTACLE_LENGTH),this.dimensions=e,this.remove=!1,this.xPos=0,this.yPos=this.typeConfig.yPos,this.width=0,this.collisionBoxes=[],this.gap=0,this.init(h)}function C(t,i){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.image=i,this.xPos=0,this.yPos=0,this.groundYPos=0,this.currentFrame=0,this.currentAnimFrames=[],this.blinkDelay=0,this.animStartTime=0,this.timer=0,this.msPerFrame=1e3/e,this.config=C.config,this.status=C.status.WAITING,this.jumping=!1,this.jumpVelocity=0,this.reachedMinHeight=!1,this.speedDrop=!1,this.jumpCount=0,this.jumpspotX=0,this.init()}function u(t,i,s){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.image=i,this.x=0,this.y=5,this.currentDistance=0,this.maxScore=0,this.highScore=0,this.container=null,this.digits=[],this.acheivement=!1,this.defaultString="",this.flashTimer=0,this.flashIterations=0,this.config=u.config,this.init(s)}function d(t,i,s){this.canvas=t,this.canvasCtx=this.canvas.getContext("2d"),this.image=i,this.containerWidth=s,this.xPos=s,this.yPos=0,this.remove=!1,this.cloudGap=o(d.config.MIN_CLOUD_GAP,d.config.MAX_CLOUD_GAP),this.init()}function s(t,i){this.image=i,this.canvas=t,this.canvasCtx=t.getContext("2d"),this.sourceDimensions={},this.dimensions=s.dimensions,this.sourceXPos=[0,this.dimensions.WIDTH],this.xPos=[],this.yPos=0,this.bumpThreshold=.5,this.setSourceDimensions(),this.draw()}function p(t,i,s,e){this.canvas=t,this.canvasCtx=this.canvas.getContext("2d"),this.config=p.config,this.dimensions=s,this.gapCoefficient=e,this.obstacles=[],this.horizonOffsets=[0,0],this.cloudFrequency=this.config.CLOUD_FREQUENCY,this.clouds=[],this.cloudImg=i.CLOUD,this.cloudSpeed=this.config.BG_CLOUD_SPEED,this.horizonImg=i.HORIZON,this.horizonLine=null,this.obstacleImgs={CACTUS_SMALL:i.CACTUS_SMALL,CACTUS_LARGE:i.CACTUS_LARGE},this.init()}l.config={ACCELERATION:.001,BG_CLOUD_SPEED:.2,BOTTOM_PAD:10,CLEAR_TIME:3e3,CLOUD_FREQUENCY:.5,GAMEOVER_CLEAR_TIME:750,GAP_COEFFICIENT:.6,GRAVITY:.6,INITIAL_JUMP_VELOCITY:12,MAX_CLOUDS:6,MAX_OBSTACLE_LENGTH:3,MAX_SPEED:12,MIN_JUMP_HEIGHT:35,MOBILE_SPEED_COEFFICIENT:1.2,RESOURCE_TEMPLATE_ID:"audio-resources",SPEED:6,SPEED_DROP_COEFFICIENT:3},l.defaultDimensions={WIDTH:600,HEIGHT:150},l.classes={CANVAS:"runner-canvas",CONTAINER:"runner-container",CRASHED:"crashed",ICON:"icon-offline",TOUCH_CONTROLLER:"controller"},l.imageSources={LDPI:[{name:"CACTUS_LARGE",id:"1x-obstacle-large"},{name:"CACTUS_SMALL",id:"1x-obstacle-small"},{name:"CLOUD",id:"1x-cloud"},{name:"HORIZON",id:"1x-horizon"},{name:"RESTART",id:"1x-restart"},{name:"TEXT_SPRITE",id:"1x-text"},{name:"TREX",id:"1x-trex"}],HDPI:[{name:"CACTUS_LARGE",id:"2x-obstacle-large"},{name:"CACTUS_SMALL",id:"2x-obstacle-small"},{name:"CLOUD",id:"2x-cloud"},{name:"HORIZON",id:"2x-horizon"},{name:"RESTART",id:"2x-restart"},{name:"TEXT_SPRITE",id:"2x-text"},{name:"TREX",id:"2x-trex"}]},l.sounds={BUTTON_PRESS:0,HIT:1,SCORE:2},l.keycodes={JUMP:{38:1,32:1},DUCK:{40:1},RESTART:{13:1}},l.events={ANIM_END:"webkitAnimationEnd",CLICK:"click",KEYDOWN:"keydown",KEYUP:"keyup",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",RESIZE:"resize",TOUCHEND:"touchend",TOUCHSTART:"touchstart",VISIBILITY:"visibilitychange",BLUR:"blur",FOCUS:"focus",LOAD:"load"},l.prototype={updateConfigSetting:function(t,i){if(t in this.config&&null!=i)switch(this.config[t]=i,t){case"GRAVITY":case"MIN_JUMP_HEIGHT":case"SPEED_DROP_COEFFICIENT":this.tRex.config[t]=i;break;case"INITIAL_JUMP_VELOCITY":this.tRex.setJumpVelocity(i);break;case"SPEED":this.setSpeed(i)}},loadImages:function(){for(var t=T?l.imageSources.HDPI:l.imageSources.LDPI,i=t.length-1;0<=i;i--){var s=t[i];this.images[s.name]=document.getElementById(s.id)}this.init()},loadSounds:function(){if(!n){this.audioContext=new AudioContext;var t=document.getElementById(this.config.RESOURCE_TEMPLATE_ID);for(var i in l.sounds){var s=t.children[l.sounds[i]].src,e=a(s=s.substr(s.indexOf(",")+1));this.audioContext.decodeAudioData(e,function(t,i){this.soundFx[t]=i}.bind(this,i))}}},setSpeed:function(t){var i=t||this.currentSpeed;if(this.dimensions.WIDTH<600){var s=i*this.dimensions.WIDTH/600*this.config.MOBILE_SPEED_COEFFICIENT;this.currentSpeed=i<s?i:s}else t&&(this.currentSpeed=t)},init:function(){var t,i,s,e,n;this.adjustDimensions(),this.setSpeed(),this.containerEl=document.createElement("div"),this.containerEl.className=l.classes.CONTAINER,this.canvas=(t=this.containerEl,i=this.dimensions.WIDTH,s=this.dimensions.HEIGHT,e=l.classes.PLAYER,(n=document.createElement("canvas")).className=e?l.classes.CANVAS+" "+e:l.classes.CANVAS,n.width=i,n.height=s,t.appendChild(n),n),this.canvasCtx=this.canvas.getContext("2d"),this.canvasCtx.fillStyle="#f7f7f7",this.canvasCtx.fill(),l.updateCanvasScaling(this.canvas),this.horizon=new p(this.canvas,this.images,this.dimensions,this.config.GAP_COEFFICIENT),this.distanceMeter=new u(this.canvas,this.images.TEXT_SPRITE,this.dimensions.WIDTH),this.tRex=new C(this.canvas,this.images.TREX),this.outerContainerEl.appendChild(this.containerEl),h&&this.createTouchController(),this.startListening(),this.update(),window.addEventListener(l.events.RESIZE,this.debounceResize.bind(this))},createTouchController:function(){this.touchController=document.createElement("div"),this.touchController.className=l.classes.TOUCH_CONTROLLER},debounceResize:function(){this.resizeTimerId_||(this.resizeTimerId_=setInterval(this.adjustDimensions.bind(this),250))},adjustDimensions:function(){clearInterval(this.resizeTimerId_),this.resizeTimerId_=null;var t=window.getComputedStyle(this.outerContainerEl),i=Number(t.paddingLeft.substr(0,t.paddingLeft.length-2));this.dimensions.WIDTH=this.outerContainerEl.offsetWidth-2*i,this.canvas&&(this.canvas.width=this.dimensions.WIDTH,this.canvas.height=this.dimensions.HEIGHT,l.updateCanvasScaling(this.canvas),this.distanceMeter.calcXPos(this.dimensions.WIDTH),this.clearCanvas(),this.horizon.update(0,0,!0),this.tRex.update(0),this.activated||this.crashed?(this.containerEl.style.width=this.dimensions.WIDTH+"px",this.containerEl.style.height=this.dimensions.HEIGHT+"px",this.distanceMeter.update(0,Math.ceil(this.distanceRan)),this.stop()):this.tRex.draw(0,0),this.crashed&&this.gameOverPanel&&(this.gameOverPanel.updateDimensions(this.dimensions.WIDTH),this.gameOverPanel.draw()))},playIntro:function(){if(this.started||this.crashed)this.crashed&&this.restart();else{this.playingIntro=!0,this.tRex.playingIntro=!0;var t="@-webkit-keyframes intro { from { width:"+C.config.WIDTH+"px }to { width: "+this.dimensions.WIDTH+"px }}";document.styleSheets[0].insertRule(t,0),this.containerEl.addEventListener(l.events.ANIM_END,this.startGame.bind(this)),this.containerEl.style.webkitAnimation="intro .4s ease-out 1 both",this.containerEl.style.width=this.dimensions.WIDTH+"px",this.touchController&&this.outerContainerEl.appendChild(this.touchController),this.activated=!0,this.started=!0}},startGame:function(){this.runningTime=0,this.playingIntro=!1,this.tRex.playingIntro=!1,this.containerEl.style.webkitAnimation="",this.playCount++,window.addEventListener(l.events.VISIBILITY,this.onVisibilityChange.bind(this)),window.addEventListener(l.events.BLUR,this.onVisibilityChange.bind(this)),window.addEventListener(l.events.FOCUS,this.onVisibilityChange.bind(this))},clearCanvas:function(){this.canvasCtx.clearRect(0,0,this.dimensions.WIDTH,this.dimensions.HEIGHT)},update:function(){this.drawPending=!1;var t=r(),i=t-(this.time||t);if(this.time=t,this.activated){this.clearCanvas(),this.tRex.jumping&&this.tRex.updateJump(i,this.config),this.runningTime+=i;var s=this.runningTime>this.config.CLEAR_TIME;1!=this.tRex.jumpCount||this.playingIntro||this.playIntro(),this.playingIntro?this.horizon.update(0,this.currentSpeed,s):(i=this.started?i:0,this.horizon.update(i,this.currentSpeed,s)),s&&function(t,i,s){l.defaultDimensions.WIDTH,t.xPos;var e=new g(i.xPos+1,i.yPos+1,i.config.WIDTH-2,i.config.HEIGHT-2),n=new g(t.xPos+1,t.yPos+1,t.typeConfig.width*t.size-2,t.typeConfig.height-2);s&&E(s,e,n);if(f(e,n))for(var h=t.collisionBoxes,o=C.collisionBoxes,a=0;a<o.length;a++)for(var r=0;r<h.length;r++){var c=m(o[a],e),d=m(h[r],n),u=f(c,d);if(s&&E(s,c,d),u)return[c,d]}return!1}(this.horizon.obstacles[0],this.tRex)?this.gameOver():(this.distanceRan+=this.currentSpeed*i/this.msPerFrame,this.currentSpeed<this.config.MAX_SPEED&&(this.currentSpeed+=this.config.ACCELERATION)),this.distanceMeter.getActualDistance(this.distanceRan)>this.distanceMeter.maxScore&&(this.distanceRan=0),this.distanceMeter.update(i,Math.ceil(this.distanceRan))&&this.playSound(this.soundFx.SCORE)}this.crashed||(this.tRex.update(i),this.raq())},handleEvent:function(s){return function(t,i){switch(t){case i.KEYDOWN:case i.TOUCHSTART:case i.MOUSEDOWN:this.onKeyDown(s);break;case i.KEYUP:case i.TOUCHEND:case i.MOUSEUP:this.onKeyUp(s)}}.bind(this)(s.type,l.events)},startListening:function(){document.addEventListener(l.events.KEYDOWN,this),document.addEventListener(l.events.KEYUP,this),h?(this.touchController.addEventListener(l.events.TOUCHSTART,this),this.touchController.addEventListener(l.events.TOUCHEND,this),this.containerEl.addEventListener(l.events.TOUCHSTART,this)):(document.addEventListener(l.events.MOUSEDOWN,this),document.addEventListener(l.events.MOUSEUP,this))},stopListening:function(){document.removeEventListener(l.events.KEYDOWN,this),document.removeEventListener(l.events.KEYUP,this),h?(this.touchController.removeEventListener(l.events.TOUCHSTART,this),this.touchController.removeEventListener(l.events.TOUCHEND,this),this.containerEl.removeEventListener(l.events.TOUCHSTART,this)):(document.removeEventListener(l.events.MOUSEDOWN,this),document.removeEventListener(l.events.MOUSEUP,this))},onKeyDown:function(t){t.target!=this.detailsButton&&(this.crashed||!l.keycodes.JUMP[String(t.keyCode)]&&t.type!=l.events.TOUCHSTART||(this.activated||(this.loadSounds(),this.activated=!0),this.tRex.jumping||(this.playSound(this.soundFx.BUTTON_PRESS),this.tRex.startJump())),this.crashed&&t.type==l.events.TOUCHSTART&&t.currentTarget==this.containerEl&&this.restart()),l.keycodes.DUCK[t.keyCode]&&this.tRex.jumping&&(t.preventDefault(),this.tRex.setSpeedDrop())},onKeyUp:function(t){var i=String(t.keyCode),s=l.keycodes.JUMP[i]||t.type==l.events.TOUCHEND||t.type==l.events.MOUSEDOWN;if(this.isRunning()&&s)this.tRex.endJump();else if(l.keycodes.DUCK[i])this.tRex.speedDrop=!1;else if(this.crashed){var e=r()-this.time;(l.keycodes.RESTART[i]||t.type==l.events.MOUSEUP&&t.target==this.canvas||e>=this.config.GAMEOVER_CLEAR_TIME&&l.keycodes.JUMP[i])&&this.restart()}else this.paused&&s&&this.play()},raq:function(){this.drawPending||(this.drawPending=!0,this.raqId=requestAnimationFrame(this.update.bind(this)))},isRunning:function(){return!!this.raqId},gameOver:function(){var t;this.playSound(this.soundFx.HIT),t=200,h&&window.navigator.vibrate&&window.navigator.vibrate(t),this.stop(),this.crashed=!0,this.distanceMeter.acheivement=!1,this.tRex.update(100,C.status.CRASHED),this.gameOverPanel?this.gameOverPanel.draw():this.gameOverPanel=new I(this.canvas,this.images.TEXT_SPRITE,this.images.RESTART,this.dimensions),this.distanceRan>this.highestScore&&(this.highestScore=Math.ceil(this.distanceRan),this.distanceMeter.setHighScore(this.highestScore)),this.time=r()},stop:function(){this.activated=!1,this.paused=!0,cancelAnimationFrame(this.raqId),this.raqId=0},play:function(){this.crashed||(this.activated=!0,this.paused=!1,this.tRex.update(0,C.status.RUNNING),this.time=r(),this.update())},restart:function(){this.raqId||(this.playCount++,this.runningTime=0,this.activated=!0,this.crashed=!1,this.distanceRan=0,this.setSpeed(this.config.SPEED),this.time=r(),this.containerEl.classList.remove(l.classes.CRASHED),this.clearCanvas(),this.distanceMeter.reset(this.highestScore),this.horizon.reset(),this.tRex.reset(),this.playSound(this.soundFx.BUTTON_PRESS),this.update())},onVisibilityChange:function(t){document.hidden||document.webkitHidden||"blur"==t.type?this.stop():this.play()},playSound:function(t){if(t){var i=this.audioContext.createBufferSource();i.buffer=t,i.connect(this.audioContext.destination),i.start(0)}}},l.updateCanvasScaling=function(t,i,s){var e=t.getContext("2d"),n=Math.floor(window.devicePixelRatio)||1,h=Math.floor(e.webkitBackingStorePixelRatio)||1,o=n/h;if(n===h)return!1;var a=i||t.width,r=s||t.height;return t.width=a*o,t.height=r*o,t.style.width=a+"px",t.style.height=r+"px",e.scale(o,o),!0},I.dimensions={TEXT_X:0,TEXT_Y:13,TEXT_WIDTH:191,TEXT_HEIGHT:11,RESTART_WIDTH:36,RESTART_HEIGHT:32},I.prototype={updateDimensions:function(t,i){this.canvasDimensions.WIDTH=t,i&&(this.canvasDimensions.HEIGHT=i)},draw:function(){var t=I.dimensions,i=this.canvasDimensions.WIDTH/2,s=t.TEXT_X,e=t.TEXT_Y,n=t.TEXT_WIDTH,h=t.TEXT_HEIGHT,o=Math.round(i-t.TEXT_WIDTH/2),a=Math.round((this.canvasDimensions.HEIGHT-25)/3),r=t.TEXT_WIDTH,c=t.TEXT_HEIGHT,d=t.RESTART_WIDTH,u=t.RESTART_HEIGHT,l=i-t.RESTART_WIDTH/2,m=this.canvasDimensions.HEIGHT/2;T&&(e*=2,s*=2,n*=2,h*=2,d*=2,u*=2),this.canvasCtx.drawImage(this.textSprite,s,e,n,h,o,a,r,c),this.canvasCtx.drawImage(this.restartImg,0,0,d,u,l,m,t.RESTART_WIDTH,t.RESTART_HEIGHT)}},c.MAX_GAP_COEFFICIENT=1.5,c.MAX_OBSTACLE_LENGTH=3,c.prototype={init:function(t){this.cloneCollisionBoxes(),1<this.size&&this.typeConfig.multipleSpeed>t&&(this.size=1),this.width=this.typeConfig.width*this.size,this.xPos=this.dimensions.WIDTH-this.width,this.draw(),1<this.size&&(this.collisionBoxes[1].width=this.width-this.collisionBoxes[0].width-this.collisionBoxes[2].width,this.collisionBoxes[2].x=this.width-this.collisionBoxes[2].width),this.gap=this.getGap(this.gapCoefficient,t)},draw:function(){var t=this.typeConfig.width,i=this.typeConfig.height;T&&(t*=2,i*=2);var s=t*this.size*(.5*(this.size-1));this.canvasCtx.drawImage(this.image,s,0,t*this.size,i,this.xPos,this.yPos,this.typeConfig.width*this.size,this.typeConfig.height)},update:function(t,i){this.remove||(this.xPos-=Math.floor(i*e/1e3*t),this.draw(),this.isVisible()||(this.remove=!0))},getGap:function(t,i){var s=Math.round(this.width*i+this.typeConfig.minGap*t);return o(s,Math.round(s*c.MAX_GAP_COEFFICIENT))},isVisible:function(){return 0<this.xPos+this.width},cloneCollisionBoxes:function(){for(var t=this.typeConfig.collisionBoxes,i=t.length-1;0<=i;i--)this.collisionBoxes[i]=new g(t[i].x,t[i].y,t[i].width,t[i].height)}},c.types=[{type:"CACTUS_SMALL",className:" cactus cactus-small ",width:17,height:35,yPos:105,multipleSpeed:3,minGap:120,collisionBoxes:[new g(0,7,5,27),new g(4,0,6,34),new g(10,4,7,14)]},{type:"CACTUS_LARGE",className:" cactus cactus-large ",width:25,height:50,yPos:90,multipleSpeed:6,minGap:120,collisionBoxes:[new g(0,12,7,38),new g(8,0,7,49),new g(13,10,10,38)]}],C.config={DROP_VELOCITY:-5,GRAVITY:.6,HEIGHT:47,INIITAL_JUMP_VELOCITY:-10,INTRO_DURATION:1500,MAX_JUMP_HEIGHT:30,MIN_JUMP_HEIGHT:30,SPEED_DROP_COEFFICIENT:3,SPRITE_WIDTH:262,START_X_POS:50,WIDTH:44},C.collisionBoxes=[new g(1,-1,30,26),new g(32,0,8,16),new g(10,35,14,8),new g(1,24,29,5),new g(5,30,21,4),new g(9,34,15,4)],C.status={CRASHED:"CRASHED",JUMPING:"JUMPING",RUNNING:"RUNNING",WAITING:"WAITING"},C.BLINK_TIMING=7e3,C.animFrames={WAITING:{frames:[44,0],msPerFrame:1e3/3},RUNNING:{frames:[88,132],msPerFrame:1e3/12},CRASHED:{frames:[220],msPerFrame:1e3/60},JUMPING:{frames:[0],msPerFrame:1e3/60}},C.prototype={init:function(){this.blinkDelay=this.setBlinkDelay(),this.groundYPos=l.defaultDimensions.HEIGHT-this.config.HEIGHT-l.config.BOTTOM_PAD,this.yPos=this.groundYPos,this.minJumpHeight=this.groundYPos-this.config.MIN_JUMP_HEIGHT,this.draw(0,0),this.update(0,C.status.WAITING)},setJumpVelocity:function(t){this.config.INIITAL_JUMP_VELOCITY=-t,this.config.DROP_VELOCITY=-t/2},update:function(t,i){this.timer+=t,i&&(this.status=i,this.currentFrame=0,this.msPerFrame=C.animFrames[i].msPerFrame,this.currentAnimFrames=C.animFrames[i].frames,i==C.status.WAITING&&(this.animStartTime=r(),this.setBlinkDelay())),this.playingIntro&&this.xPos<this.config.START_X_POS&&(this.xPos+=Math.round(this.config.START_X_POS/this.config.INTRO_DURATION*t)),this.status==C.status.WAITING?this.blink(r()):this.draw(this.currentAnimFrames[this.currentFrame],0),this.timer>=this.msPerFrame&&(this.currentFrame=this.currentFrame==this.currentAnimFrames.length-1?0:this.currentFrame+1,this.timer=0)},draw:function(t,i){var s=t,e=i,n=this.config.WIDTH,h=this.config.HEIGHT;T&&(s*=2,e*=2,n*=2,h*=2),this.canvasCtx.drawImage(this.image,s,e,n,h,this.xPos,this.yPos,this.config.WIDTH,this.config.HEIGHT)},setBlinkDelay:function(){this.blinkDelay=Math.ceil(Math.random()*C.BLINK_TIMING)},blink:function(t){t-this.animStartTime>=this.blinkDelay&&(this.draw(this.currentAnimFrames[this.currentFrame],0),1==this.currentFrame&&(this.setBlinkDelay(),this.animStartTime=t))},startJump:function(){this.jumping||(this.update(0,C.status.JUMPING),this.jumpVelocity=this.config.INIITAL_JUMP_VELOCITY,this.jumping=!0,this.reachedMinHeight=!1,this.speedDrop=!1)},endJump:function(){this.reachedMinHeight&&this.jumpVelocity<this.config.DROP_VELOCITY&&(this.jumpVelocity=this.config.DROP_VELOCITY)},updateJump:function(t){var i=t/C.animFrames[this.status].msPerFrame;this.speedDrop?this.yPos+=Math.round(this.jumpVelocity*this.config.SPEED_DROP_COEFFICIENT*i):this.yPos+=Math.round(this.jumpVelocity*i),this.jumpVelocity+=this.config.GRAVITY*i,(this.yPos<this.minJumpHeight||this.speedDrop)&&(this.reachedMinHeight=!0),(this.yPos<this.config.MAX_JUMP_HEIGHT||this.speedDrop)&&this.endJump(),this.yPos>this.groundYPos&&(this.reset(),this.jumpCount++),this.update(t)},setSpeedDrop:function(){this.speedDrop=!0,this.jumpVelocity=1},reset:function(){this.yPos=this.groundYPos,this.jumpVelocity=0,this.jumping=!1,this.update(0,C.status.RUNNING),this.midair=!1,this.speedDrop=!1,this.jumpCount=0}},u.dimensions={WIDTH:10,HEIGHT:13,DEST_WIDTH:11},u.yPos=[0,13,27,40,53,67,80,93,107,120],u.config={MAX_DISTANCE_UNITS:5,ACHIEVEMENT_DISTANCE:100,COEFFICIENT:.025,FLASH_DURATION:250,FLASH_ITERATIONS:3},u.prototype={init:function(t){var i="";this.calcXPos(t),this.maxScore=this.config.MAX_DISTANCE_UNITS;for(var s=0;s<this.config.MAX_DISTANCE_UNITS;s++)this.draw(s,0),this.defaultString+="0",i+="9";this.maxScore=parseInt(i)},calcXPos:function(t){this.x=t-u.dimensions.DEST_WIDTH*(this.config.MAX_DISTANCE_UNITS+1)},draw:function(t,i,s){var e=u.dimensions.WIDTH,n=u.dimensions.HEIGHT,h=u.dimensions.WIDTH*i,o=t*u.dimensions.DEST_WIDTH,a=this.y,r=u.dimensions.WIDTH,c=u.dimensions.HEIGHT;if(T&&(e*=2,n*=2,h*=2),this.canvasCtx.save(),s){var d=this.x-2*this.config.MAX_DISTANCE_UNITS*u.dimensions.WIDTH;this.canvasCtx.translate(d,this.y)}else this.canvasCtx.translate(this.x,this.y);this.canvasCtx.drawImage(this.image,h,0,e,n,o,a,r,c),this.canvasCtx.restore()},getActualDistance:function(t){return t?Math.round(t*this.config.COEFFICIENT):0},update:function(t,i){var s=!0,e=!1;if(this.acheivement)this.flashIterations<=this.config.FLASH_ITERATIONS?(this.flashTimer+=t,this.flashTimer<this.config.FLASH_DURATION?s=!1:this.flashTimer>2*this.config.FLASH_DURATION&&(this.flashTimer=0,this.flashIterations++)):(this.acheivement=!1,this.flashIterations=0,this.flashTimer=0);else if(0<(i=this.getActualDistance(i))){i%this.config.ACHIEVEMENT_DISTANCE==0&&(this.acheivement=!0,e=!(this.flashTimer=0));var n=(this.defaultString+i).substr(-this.config.MAX_DISTANCE_UNITS);this.digits=n.split("")}else this.digits=this.defaultString.split("");if(s)for(var h=this.digits.length-1;0<=h;h--)this.draw(h,parseInt(this.digits[h]));return this.drawHighScore(),e},drawHighScore:function(){this.canvasCtx.save(),this.canvasCtx.globalAlpha=.8;for(var t=this.highScore.length-1;0<=t;t--)this.draw(t,parseInt(this.highScore[t],10),!0);this.canvasCtx.restore()},setHighScore:function(t){t=this.getActualDistance(t);var i=(this.defaultString+t).substr(-this.config.MAX_DISTANCE_UNITS);this.highScore=["10","11",""].concat(i.split(""))},reset:function(){this.update(0),this.acheivement=!1}},d.config={HEIGHT:14,MAX_CLOUD_GAP:400,MAX_SKY_LEVEL:30,MIN_CLOUD_GAP:100,MIN_SKY_LEVEL:71,WIDTH:46},d.prototype={init:function(){this.yPos=o(d.config.MAX_SKY_LEVEL,d.config.MIN_SKY_LEVEL),this.draw()},draw:function(){this.canvasCtx.save();var t=d.config.WIDTH,i=d.config.HEIGHT;T&&(t*=2,i*=2),this.canvasCtx.drawImage(this.image,0,0,t,i,this.xPos,this.yPos,d.config.WIDTH,d.config.HEIGHT),this.canvasCtx.restore()},update:function(t){this.remove||(this.xPos-=Math.ceil(t),this.draw(),this.isVisible()||(this.remove=!0))},isVisible:function(){return 0<this.xPos+d.config.WIDTH}},s.dimensions={WIDTH:600,HEIGHT:12,YPOS:127},s.prototype={setSourceDimensions:function(){for(var t in s.dimensions)T?"YPOS"!=t&&(this.sourceDimensions[t]=2*s.dimensions[t]):this.sourceDimensions[t]=s.dimensions[t],this.dimensions[t]=s.dimensions[t];this.xPos=[0,s.dimensions.WIDTH],this.yPos=s.dimensions.YPOS},getRandomType:function(){return Math.random()>this.bumpThreshold?this.dimensions.WIDTH:0},draw:function(){this.canvasCtx.drawImage(this.image,this.sourceXPos[0],0,this.sourceDimensions.WIDTH,this.sourceDimensions.HEIGHT,this.xPos[0],this.yPos,this.dimensions.WIDTH,this.dimensions.HEIGHT),this.canvasCtx.drawImage(this.image,this.sourceXPos[1],0,this.sourceDimensions.WIDTH,this.sourceDimensions.HEIGHT,this.xPos[1],this.yPos,this.dimensions.WIDTH,this.dimensions.HEIGHT)},updateXPos:function(t,i){var s=t,e=0==t?1:0;this.xPos[s]-=i,this.xPos[e]=this.xPos[s]+this.dimensions.WIDTH,this.xPos[s]<=-this.dimensions.WIDTH&&(this.xPos[s]+=2*this.dimensions.WIDTH,this.xPos[e]=this.xPos[s]-this.dimensions.WIDTH,this.sourceXPos[s]=this.getRandomType())},update:function(t,i){var s=Math.floor(i*(e/1e3)*t);this.xPos[0]<=0?this.updateXPos(0,s):this.updateXPos(1,s),this.draw()},reset:function(){this.xPos[0]=0,this.xPos[1]=s.dimensions.WIDTH}},p.config={BG_CLOUD_SPEED:.2,BUMPY_THRESHOLD:.3,CLOUD_FREQUENCY:.5,HORIZON_HEIGHT:16,MAX_CLOUDS:6},p.prototype={init:function(){this.addCloud(),this.horizonLine=new s(this.canvas,this.horizonImg)},update:function(t,i,s){this.runningTime+=t,this.horizonLine.update(t,i),this.updateClouds(t,i),s&&this.updateObstacles(t,i)},updateClouds:function(t,i){var s=this.cloudSpeed/1e3*t*i,e=this.clouds.length;if(e){for(var n=e-1;0<=n;n--)this.clouds[n].update(s);var h=this.clouds[e-1];e<this.config.MAX_CLOUDS&&this.dimensions.WIDTH-h.xPos>h.cloudGap&&this.cloudFrequency>Math.random()&&this.addCloud(),this.clouds=this.clouds.filter(function(t){return!t.remove})}},updateObstacles:function(t,i){for(var s=this.obstacles.slice(0),e=0;e<this.obstacles.length;e++){var n=this.obstacles[e];n.update(t,i),n.remove&&s.shift()}if(this.obstacles=s,0<this.obstacles.length){var h=this.obstacles[this.obstacles.length-1];h&&!h.followingObstacleCreated&&h.isVisible()&&h.xPos+h.width+h.gap<this.dimensions.WIDTH&&(this.addNewObstacle(i),h.followingObstacleCreated=!0)}else this.addNewObstacle(i)},addNewObstacle:function(t){var i=o(0,c.types.length-1),s=c.types[i],e=this.obstacleImgs[s.type];this.obstacles.push(new c(this.canvasCtx,s,e,this.dimensions,this.gapCoefficient,t))},reset:function(){this.obstacles=[],this.horizonLine.reset()},resize:function(t,i){this.canvas.width=t,this.canvas.height=i},addCloud:function(){this.clouds.push(new d(this.canvas,this.cloudImg,this.dimensions.WIDTH))}}}();';
export default DinoScript;
