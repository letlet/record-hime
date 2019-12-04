/*!
 * record-hime v1.0.0
 * Github: https://github.com/zhw2590582/record-hime
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

var recordHimeInjected=function(){"use strict";var t=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var n=function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t};return new(function(){function e(){t(this,e),this.blobs=[],this.src="",this.timer=null,this.video=null,this.stream=null,this.mediaRecorder=null,this.createUI(),this.bindEvent()}return n(e,[{key:"log",value:function(t){throw new Error("录播姬 --\x3e ".concat(t))}},{key:"durationToTime",value:function(t){var e=String(Math.floor(t/60)).slice(-5),n=String(t%60);return"".concat(1===e.length?"0".concat(e):e,":").concat(1===n.length?"0".concat(n):n)}},{key:"mergeBlobs",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=this.size;return new Promise((function(i){i(e.reduce((function(e,i){var r=new Blob([e,i],{type:"video/webm"});return t.$wait.textContent="".concat(Math.floor(100*(r.size/n||0)),"%"),r}),new Blob([])))}))}},{key:"createUI",value:function(){var t=this;this.$container=document.createElement("div"),this.$container.classList.add("video-recorder"),this.$container.innerHTML='\n            <div class="vr-states">\n                <div class="vr-state vr-state-before-record vr-active">开始</div>\n                <div class="vr-state vr-state-recording">停止</div>\n                <div class="vr-state vr-state-after-record">下载</div>\n                <div class="vr-state vr-state-wait">0%</div>\n            </div>\n            <div class="vr-monitors">\n                <div class="vr-monitor vr-monitor-top">\n                    <div class="vr-monitor-name">时长：</div>\n                    <div class="vr-monitor-value vr-duration">00:00</div>\n                </div>\n                <div class="vr-monitor vr-monitor-bottom">\n                    <div class="vr-monitor-name">大小：</div>\n                    <div class="vr-monitor-value vr-size">0.00M</div>\n                </div>\n            </div>\n        ',this.$states=Array.from(this.$container.querySelectorAll(".vr-state")),this.$beforeRecord=this.$container.querySelector(".vr-state-before-record"),this.$recording=this.$container.querySelector(".vr-state-recording"),this.$afterRecord=this.$container.querySelector(".vr-state-after-record"),this.$wait=this.$container.querySelector(".vr-state-wait"),this.$duration=this.$container.querySelector(".vr-duration"),this.$size=this.$container.querySelector(".vr-size"),this.$monitor=this.$container.querySelector(".vr-monitor"),this.$container.classList.add("vr-focus"),document.body.appendChild(this.$container),setTimeout((function(){t.$container.classList.remove("vr-focus")}),1e4)}},{key:"bindEvent",value:function(){var t=this;this.$beforeRecord.addEventListener("click",(function(){t.start()})),this.$recording.addEventListener("click",(function(){t.stop()})),this.$afterRecord.addEventListener("click",(function(){t.download().then((function(){t.reset()}))}));var e=!1,n=0,i=0,r=0,o=0;this.$monitor.addEventListener("mousedown",(function(s){e=!0,n=s.pageX,i=s.pageY,r=t.$container.offsetLeft,o=t.$container.offsetTop})),document.addEventListener("mousemove",(function(r){if(e){var o=r.pageX-n,s=r.pageY-i;t.$container.style.transform="translate(".concat(o,"px, ").concat(s,"px)")}})),document.addEventListener("mouseup",(function(s){if(e){e=!1,t.$container.style.transform="translate(0, 0)";var a=r+s.pageX-n,c=o+s.pageY-i;t.$container.style.left="".concat(a,"px"),t.$container.style.top="".concat(c,"px")}}))}},{key:"start",value:function(){var t=this,n=Array.from(document.querySelectorAll("video"));n.length?(this.video=n.find((function(t){return t.captureStream})),this.video?(this.src=this.video.src,this.changeState("recording"),this.stream=this.video.captureStream(),MediaRecorder&&MediaRecorder.isTypeSupported(e.options.mimeType)?(this.mediaRecorder=new MediaRecorder(this.stream,e.options),this.mediaRecorder.ondataavailable=function(e){t.blobs.push(e.data);var n=t.size/1024/1024;t.$size.textContent="".concat(n.toFixed(2).slice(-8),"M"),t.$duration.textContent=t.durationToTime(t.blobs.filter((function(t){return t.size>1024})).length)},this.mediaRecorder.start(1e3),this.timer=setInterval((function(){t.src!==t.video.src&&t.stop()}),1e3)):this.log("不支持录制格式：".concat(e.options.mimeType))):this.log("未发现视频流")):this.log("未发现视频元素")}},{key:"stop",value:function(){this.changeState("after-record"),this.mediaRecorder.stop(),clearInterval(this.timer)}},{key:"download",value:function(){return this.changeState("wait"),this.mergeBlobs(this.blobs).then((function(t){var e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="".concat(Date.now(),".webm"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}))}},{key:"reset",value:function(){this.changeState("before-record"),this.blobs=[],this.src="",this.timer=null,this.video=null,this.stream=null,this.mediaRecorder=null,this.$duration.textContent="00:00",this.$size.textContent="0.00M",this.$wait.textContent="0%"}},{key:"changeState",value:function(t){this.$states.forEach((function(e){e.classList.contains("vr-state-".concat(t))?e.classList.add("vr-active"):e.classList.remove("vr-active")}))}},{key:"size",get:function(){return this.blobs.reduce((function(t,e){return t+e.size}),0)}}],[{key:"options",get:function(){return{audioBitsPerSecond:128e3,videoBitsPerSecond:5e6,mimeType:'video/webm; codecs="vp8, opus"'}}}]),e}())}();
