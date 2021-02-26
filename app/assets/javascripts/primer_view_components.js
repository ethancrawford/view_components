class t extends HTMLElement{constructor(){super(),this.addEventListener("keydown",(t=>{const n=t.target;if(!(n instanceof HTMLElement))return;if("tab"!==n.getAttribute("role")&&!n.closest('[role="tablist"]'))return;const r=Array.from(this.querySelectorAll('[role="tablist"] [role="tab"]')),a=r.indexOf(r.find((t=>t.matches('[aria-selected="true"]'))));if("ArrowRight"===t.code){let t=a+1;t>=r.length&&(t=0),e(this,t)}else if("ArrowLeft"===t.code){let t=a-1;t<0&&(t=r.length-1),e(this,t)}else"Home"===t.code?(e(this,0),t.preventDefault()):"End"===t.code&&(e(this,r.length-1),t.preventDefault())})),this.addEventListener("click",(t=>{const n=Array.from(this.querySelectorAll('[role="tablist"] [role="tab"]'));if(!(t.target instanceof Element))return;const r=t.target.closest('[role="tab"]');if(!r||!r.closest('[role="tablist"]'))return;e(this,n.indexOf(r))}))}connectedCallback(){for(const t of this.querySelectorAll('[role="tablist"] [role="tab"]'))t.hasAttribute("aria-selected")||t.setAttribute("aria-selected","false"),t.hasAttribute("tabindex")||("true"===t.getAttribute("aria-selected")?t.setAttribute("tabindex","0"):t.setAttribute("tabindex","-1"))}}function e(t,e){const n=t.querySelectorAll('[role="tablist"] [role="tab"]'),r=t.querySelectorAll('[role="tabpanel"]'),a=n[e],i=r[e];if(!!t.dispatchEvent(new CustomEvent("tab-container-change",{bubbles:!0,cancelable:!0,detail:{relatedTarget:i}}))){for(const t of n)t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1");for(const t of r)t.hidden=!0,t.hasAttribute("tabindex")||t.hasAttribute("data-tab-container-no-tabstop")||t.setAttribute("tabindex","0");a.setAttribute("aria-selected","true"),a.setAttribute("tabindex","0"),a.focus(),i.hidden=!1,t.dispatchEvent(new CustomEvent("tab-container-changed",{bubbles:!0,detail:{relatedTarget:i}}))}}window.customElements.get("tab-container")||(window.TabContainerElement=t,window.customElements.define("tab-container",t));const n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=["January","February","March","April","May","June","July","August","September","October","November","December"];function a(t){return"0".concat(t).slice(-2)}function i(t,e){const o=t.getDay(),s=t.getDate(),c=t.getMonth(),u=t.getFullYear(),l=t.getHours(),d=t.getMinutes(),m=t.getSeconds();return e.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g,(function(e){let h;switch(e[1]){case"%":return"%";case"a":return n[o].slice(0,3);case"A":return n[o];case"b":return r[c].slice(0,3);case"B":return r[c];case"c":return t.toString();case"d":return a(s);case"e":return String(s);case"H":return a(l);case"I":return a(i(t,"%l"));case"l":return String(0===l||12===l?12:(l+12)%12);case"m":return a(c+1);case"M":return a(d);case"p":return l>11?"PM":"AM";case"P":return l>11?"pm":"am";case"S":return a(m);case"w":return String(o);case"y":return a(u%100);case"Y":return String(u);case"Z":return h=t.toString().match(/\((\w+)\)$/),h?h[1]:"";case"z":return h=t.toString().match(/\w([+-]\d\d\d\d) /),h?h[1]:""}return""}))}function o(t){let e;return function(){if(e)return e;if("Intl"in window)try{return e=new Intl.DateTimeFormat(void 0,t),e}catch(t){if(!(t instanceof RangeError))throw t}}}let s=null;const c=o({day:"numeric",month:"short"});function u(){if(null!==s)return s;const t=c();if(t){const e=t.format(new Date(0));return s=!!e.match(/^\d/),s}return!1}let l=null;const d=o({day:"numeric",month:"short",year:"numeric"});function m(t){const e=t.closest("[lang]");return e instanceof HTMLElement&&e.lang?e.lang:"default"}const h=new WeakMap;class g extends HTMLElement{static get observedAttributes(){return["datetime","day","format","lang","hour","minute","month","second","title","weekday","year"]}connectedCallback(){const t=this.getFormattedTitle();t&&!this.hasAttribute("title")&&this.setAttribute("title",t);const e=this.getFormattedDate();e&&(this.textContent=e)}attributeChangedCallback(t,e,n){const r=this.getFormattedTitle();if("datetime"===t){const t=Date.parse(n);isNaN(t)?h.delete(this):h.set(this,new Date(t))}const a=this.getFormattedTitle(),i=this.getAttribute("title");"title"===t||!a||i&&i!==r||this.setAttribute("title",a);const o=this.getFormattedDate();o&&(this.textContent=o)}get date(){return h.get(this)}getFormattedTitle(){const t=this.date;if(!t)return;const e=f();if(e)return e.format(t);try{return t.toLocaleString()}catch(e){if(e instanceof RangeError)return t.toString();throw e}}getFormattedDate(){}}const f=o({day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}),w=new WeakMap;class b extends g{attributeChangedCallback(t,e,n){"hour"!==t&&"minute"!==t&&"second"!==t&&"time-zone-name"!==t||w.delete(this),super.attributeChangedCallback(t,e,n)}getFormattedDate(){const t=this.date;if(!t)return;const e=function(t,e){const n={weekday:{short:"%a",long:"%A"},day:{numeric:"%e","2-digit":"%d"},month:{short:"%b",long:"%B"},year:{numeric:"%Y","2-digit":"%y"}};let r=u()?"weekday day month year":"weekday month day, year";for(const e in n){const a=n[e][t.getAttribute(e)];r=r.replace(e,a||"")}return r=r.replace(/(\s,)|(,\s$)/,""),i(e,r).replace(/\s+/," ").trim()}(this,t)||"",n=function(t,e){const n={},r=t.getAttribute("hour");"numeric"!==r&&"2-digit"!==r||(n.hour=r);const a=t.getAttribute("minute");"numeric"!==a&&"2-digit"!==a||(n.minute=a);const s=t.getAttribute("second");"numeric"!==s&&"2-digit"!==s||(n.second=s);const c=t.getAttribute("time-zone-name");"short"!==c&&"long"!==c||(n.timeZoneName=c);if(0===Object.keys(n).length)return;let u=w.get(t);u||(u=o(n),w.set(t,u));const l=u();if(l)return l.format(e);return i(e,n.second?"%H:%M:%S":"%H:%M")}(this,t)||"";return"".concat(e," ").concat(n).trim()}}window.customElements.get("local-time")||(window.LocalTimeElement=b,window.customElements.define("local-time",b));class y{constructor(t,e){this.date=t,this.locale=e}toString(){const t=this.timeElapsed();if(t)return t;{const t=this.timeAhead();return t||"on ".concat(this.formatDate())}}timeElapsed(){const t=(new Date).getTime()-this.date.getTime(),e=Math.round(t/1e3),n=Math.round(e/60),r=Math.round(n/60),a=Math.round(r/24);return t>=0&&a<30?this.timeAgoFromMs(t):null}timeAhead(){const t=this.date.getTime()-(new Date).getTime(),e=Math.round(t/1e3),n=Math.round(e/60),r=Math.round(n/60),a=Math.round(r/24);return t>=0&&a<30?this.timeUntil():null}timeAgo(){const t=(new Date).getTime()-this.date.getTime();return this.timeAgoFromMs(t)}timeAgoFromMs(t){const e=Math.round(t/1e3),n=Math.round(e/60),r=Math.round(n/60),a=Math.round(r/24),i=Math.round(a/30),o=Math.round(i/12);return t<0||e<10?M(this.locale,0,"second"):e<45?M(this.locale,-e,"second"):e<90||n<45?M(this.locale,-n,"minute"):n<90||r<24?M(this.locale,-r,"hour"):r<36||a<30?M(this.locale,-a,"day"):i<18?M(this.locale,-i,"month"):M(this.locale,-o,"year")}microTimeAgo(){const t=(new Date).getTime()-this.date.getTime(),e=Math.round(t/1e3),n=Math.round(e/60),r=Math.round(n/60),a=Math.round(r/24),i=Math.round(a/30),o=Math.round(i/12);return n<1?"1m":n<60?"".concat(n,"m"):r<24?"".concat(r,"h"):a<365?"".concat(a,"d"):"".concat(o,"y")}timeUntil(){const t=this.date.getTime()-(new Date).getTime();return this.timeUntilFromMs(t)}timeUntilFromMs(t){const e=Math.round(t/1e3),n=Math.round(e/60),r=Math.round(n/60),a=Math.round(r/24),i=Math.round(a/30),o=Math.round(i/12);return i>=18||i>=12?M(this.locale,o,"year"):a>=45||a>=30?M(this.locale,i,"month"):r>=36||r>=24?M(this.locale,a,"day"):n>=90||n>=45?M(this.locale,r,"hour"):e>=90||e>=45?M(this.locale,n,"minute"):M(this.locale,e>=10?e:0,"second")}microTimeUntil(){const t=this.date.getTime()-(new Date).getTime(),e=Math.round(t/1e3),n=Math.round(e/60),r=Math.round(n/60),a=Math.round(r/24),i=Math.round(a/30),o=Math.round(i/12);return a>=365?"".concat(o,"y"):r>=24?"".concat(a,"d"):n>=60?"".concat(r,"h"):n>1?"".concat(n,"m"):"1m"}formatDate(){let t=u()?"%e %b":"%b %e";var e;return e=this.date,(new Date).getUTCFullYear()!==e.getUTCFullYear()&&(t+=function(){if(null!==l)return l;const t=d();if(t){const e=t.format(new Date(0));return l=!!e.match(/\d,/),l}return!0}()?", %Y":" %Y"),i(this.date,t)}formatTime(){const t=A();return t?t.format(this.date):i(this.date,"%l:%M%P")}}function M(t,e,n){const r=function(t,e){if("Intl"in window&&"RelativeTimeFormat"in window.Intl)try{return new Intl.RelativeTimeFormat(t,e)}catch(t){if(!(t instanceof RangeError))throw t}}(t,{numeric:"auto"});return r?r.format(e,n):function(t,e){if(0===t)switch(e){case"year":case"quarter":case"month":case"week":return"this ".concat(e);case"day":return"today";case"hour":case"minute":return"in 0 ".concat(e,"s");case"second":return"now"}else if(1===t)switch(e){case"year":case"quarter":case"month":case"week":return"next ".concat(e);case"day":return"tomorrow";case"hour":case"minute":case"second":return"in 1 ".concat(e)}else if(-1===t)switch(e){case"year":case"quarter":case"month":case"week":return"last ".concat(e);case"day":return"yesterday";case"hour":case"minute":case"second":return"1 ".concat(e," ago")}else if(t>1)switch(e){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return"in ".concat(t," ").concat(e,"s")}else if(t<-1)switch(e){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return"".concat(-t," ").concat(e,"s ago")}throw new RangeError("Invalid unit argument for format() '".concat(e,"'"))}(e,n)}const A=o({hour:"numeric",minute:"2-digit"});class T extends g{getFormattedDate(){const t=this.date;if(t)return new y(t,m(this)).toString()}connectedCallback(){E.push(this),D||(p(),D=setInterval(p,6e4)),super.connectedCallback()}disconnectedCallback(){const t=E.indexOf(this);-1!==t&&E.splice(t,1),E.length||D&&(clearInterval(D),D=null)}}const E=[];let D;function p(){let t,e,n;for(e=0,n=E.length;e<n;e++)t=E[e],t.textContent=t.getFormattedDate()||""}window.customElements.get("relative-time")||(window.RelativeTimeElement=T,window.customElements.define("relative-time",T));class F extends T{getFormattedDate(){const t=this.getAttribute("format"),e=this.date;if(e)return"micro"===t?new y(e,m(this)).microTimeAgo():new y(e,m(this)).timeAgo()}}window.customElements.get("time-ago")||(window.TimeAgoElement=F,window.customElements.define("time-ago",F));class S extends T{getFormattedDate(){const t=this.getAttribute("format"),e=this.date;if(e)return"micro"===t?new y(e,m(this)).microTimeUntil():new y(e,m(this)).timeUntil()}}window.customElements.get("time-until")||(window.TimeUntilElement=S,window.customElements.define("time-until",S));
