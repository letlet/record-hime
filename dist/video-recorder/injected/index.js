/*!
 * video-recorder v1.0.0
 * Github: undefined
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

var videoRecorderInjected=function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var n=function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e};return new(function(){function t(){e(this,t),this.blobs=[],this.src="",this.timer=null,this.video=null,this.stream=null,this.mediaRecorder=null,this.createUI(),this.bindEvent()}return n(t,[{key:"log",value:function(e){throw new Error("录播姬 --\x3e "+e)}},{key:"durationToTime",value:function(e){var t=String(Math.floor(e/60)).slice(-5),n=String(e%60);return"".concat(1===t.length?"0".concat(t):t,":").concat(1===n.length?"0".concat(n):n)}},{key:"mergeBlobs",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=this.size;return new Promise((function(i){i(t.reduce((function(t,i){var r=new Blob([t,i],{type:"video/webm"});return e.$wait.textContent="".concat(Math.floor(100*(r.size/n||0)),"%"),r}),new Blob([])))}))}},{key:"createUI",value:function(){var e=this;this.$container=document.createElement("div"),this.$container.classList.add("video-recorder"),this.$container.innerHTML='\n            <div class="vr-states">\n                <div class="vr-state vr-state-before-record vr-active">开始</div>\n                <div class="vr-state vr-state-recording">停止</div>\n                <div class="vr-state vr-state-after-record">下载</div>\n                <div class="vr-state vr-state-wait">0%</div>\n            </div>\n            <div class="vr-monitors">\n                <div class="vr-monitor vr-monitor-top">\n                    <div class="vr-monitor-name">时长：</div>\n                    <div class="vr-monitor-value vr-duration">00:00</div>\n                </div>\n                <div class="vr-monitor vr-monitor-bottom">\n                    <div class="vr-monitor-name">大小：</div>\n                    <div class="vr-monitor-value vr-size">0.00M</div>\n                </div>\n            </div>\n        ',this.$states=Array.from(this.$container.querySelectorAll(".vr-state")),this.$beforeRecord=this.$container.querySelector(".vr-state-before-record"),this.$recording=this.$container.querySelector(".vr-state-recording"),this.$afterRecord=this.$container.querySelector(".vr-state-after-record"),this.$wait=this.$container.querySelector(".vr-state-wait"),this.$duration=this.$container.querySelector(".vr-duration"),this.$size=this.$container.querySelector(".vr-size"),this.$monitor=this.$container.querySelector(".vr-monitor"),this.$container.classList.add("vr-focus"),document.body.appendChild(this.$container),setTimeout((function(){e.$container.classList.remove("vr-focus")}),1e4)}},{key:"bindEvent",value:function(){var e=this;this.$beforeRecord.addEventListener("click",(function(){e.start()})),this.$recording.addEventListener("click",(function(){e.stop()})),this.$afterRecord.addEventListener("click",(function(){e.download().then((function(){e.reset()}))}));var t=!1,n=0,i=0,r=0,o=0;this.$monitor.addEventListener("mousedown",(function(){t=!0,n=event.pageX,i=event.pageY,r=e.$container.offsetLeft,o=e.$container.offsetTop})),document.addEventListener("mousemove",(function(r){if(t){var o=r.pageX-n,s=r.pageY-i;e.$container.style.transform="translate(".concat(o,"px, ").concat(s,"px)")}})),document.addEventListener("mouseup",(function(){if(t){t=!1,e.$container.style.transform="translate(0, 0)";var s=r+event.pageX-n,a=o+event.pageY-i;e.$container.style.left="".concat(s,"px"),e.$container.style.top="".concat(a,"px")}}))}},{key:"start",value:function(){var e=this,n=Array.from(document.querySelectorAll("video"));n.length?(this.video=n.find((function(e){return e.captureStream})),this.video?(this.src=this.video.src,this.changeState("recording"),this.stream=this.video.captureStream(),MediaRecorder&&MediaRecorder.isTypeSupported(t.options.mimeType)?(this.mediaRecorder=new MediaRecorder(this.stream,t.options),this.mediaRecorder.ondataavailable=function(t){e.blobs.push(t.data);var n=e.size/1024/1024;e.$size.textContent="".concat(n.toFixed(2).slice(-8),"M"),e.$duration.textContent=e.durationToTime(e.blobs.filter((function(e){return e.size>1024})).length)},this.mediaRecorder.start(1e3),this.timer=setInterval((function(){e.src!==e.video.src&&e.stop()}),1e3)):this.log("不支持录制格式："+t.options.mimeType)):this.log("未发现视频流")):this.log("未发现视频元素")}},{key:"stop",value:function(){this.changeState("after-record"),this.mediaRecorder.stop(),clearInterval(this.timer)}},{key:"download",value:function(){return this.changeState("wait"),this.mergeBlobs(this.blobs).then((function(e){var t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="".concat(Date.now(),".webm"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}))}},{key:"reset",value:function(){this.changeState("before-record"),this.blobs=[],this.src="",this.timer=null,this.video=null,this.stream=null,this.mediaRecorder=null,this.$duration.textContent="00:00",this.$size.textContent="0.00M",this.$wait.textContent="0%"}},{key:"changeState",value:function(e){this.$states.forEach((function(t){t.classList.contains("vr-state-".concat(e))?t.classList.add("vr-active"):t.classList.remove("vr-active")}))}},{key:"size",get:function(){return this.blobs.reduce((function(e,t){return e+t.size}),0)}}],[{key:"options",get:function(){return{audioBitsPerSecond:128e3,videoBitsPerSecond:5e6,mimeType:'video/webm; codecs="vp8, opus"'}}}]),t}())}();
