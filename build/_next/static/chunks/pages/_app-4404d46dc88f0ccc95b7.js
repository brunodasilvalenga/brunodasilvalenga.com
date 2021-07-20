(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{425:function(e,t,n){"use strict";n.d(t,{f:function(){return u},F:function(){return i}});var r=n(9748),a=n(9008),o=(0,r.createContext)({setTheme:function(e){},themes:[]}),i=function(){return(0,r.useContext)(o)},c=["light","dark"],l="(prefers-color-scheme: dark)",u=function(e){var t=e.forcedTheme,n=e.disableTransitionOnChange,a=void 0!==n&&n,i=e.enableSystem,u=void 0===i||i,h=e.enableColorScheme,m=void 0===h||h,v=e.storageKey,g=void 0===v?"theme":v,y=e.themes,b=void 0===y?["light","dark"]:y,w=e.defaultTheme,x=void 0===w?u?"system":"light":w,O=e.attribute,_=void 0===O?"data-theme":O,k=e.value,j=e.children,M=(0,r.useState)((function(){return f(g,x)})),E=M[0],Z=M[1],C=(0,r.useState)((function(){return f(g)})),P=C[0],z=C[1],S=k?Object.values(k):b,N=(0,r.useCallback)((function(e){var n=p(e);z(n),"system"!==E||t||B(n,!1)}),[E,t]),T=(0,r.useRef)(N);T.current=N;var B=(0,r.useCallback)((function(e,t,n){void 0===t&&(t=!0),void 0===n&&(n=!0);var r=(null==k?void 0:k[e])||e,o=a&&n?d():null;if(t)try{localStorage.setItem(g,e)}catch(e){}if("system"===e&&u){var i=p();r=(null==k?void 0:k[i])||i}if(n){var c,l=document.documentElement;"class"===_?((c=l.classList).remove.apply(c,S),l.classList.add(r)):l.setAttribute(_,r),null==o||o()}}),[]);(0,r.useEffect)((function(){var e=function(){return T.current.apply(T,[].slice.call(arguments))},t=window.matchMedia(l);return t.addListener(e),e(t),function(){return t.removeListener(e)}}),[]);var L=(0,r.useCallback)((function(e){t?B(e,!0,!1):B(e),Z(e)}),[t]);return(0,r.useEffect)((function(){var e=function(e){e.key===g&&L(e.newValue)};return window.addEventListener("storage",e),function(){return window.removeEventListener("storage",e)}}),[L]),(0,r.useEffect)((function(){if(m){var e=t&&c.includes(t)?t:E&&c.includes(E)?E:"system"===E&&P||null;document.documentElement.style.setProperty("color-scheme",e)}}),[m,E,P,t]),r.default.createElement(o.Provider,{value:{theme:E,setTheme:L,forcedTheme:t,resolvedTheme:"system"===E?P:E,themes:u?[].concat(b,["system"]):b,systemTheme:u?P:void 0}},r.default.createElement(s,{forcedTheme:t,storageKey:g,attribute:_,value:k,enableSystem:u,defaultTheme:x,attrs:S}),j)},s=(0,r.memo)((function(e){var t=e.forcedTheme,n=e.storageKey,o=e.attribute,i=e.enableSystem,c=e.defaultTheme,u=e.value,s="class"===o?"var d=document.documentElement.classList;d.remove("+e.attrs.map((function(e){return"'"+e+"'"})).join(",")+");":"var d=document.documentElement;",f=function(e,t){e=(null==u?void 0:u[e])||e;var n=t?e:"'"+e+"'";return"class"===o?"d.add("+n+")":"d.setAttribute('"+o+"', "+n+")"},d="system"===c;return r.default.createElement(a.default,null,r.default.createElement("script",t?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){"+s+f(t)+"}()"}}:i?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){try {"+s+"var e=localStorage.getItem('"+n+"');"+(d?"":f(c)+";")+'if("system"===e||(!e&&'+d+')){var t="'+l+'",m=window.matchMedia(t);m.media!==t||m.matches?'+f("dark")+":"+f("light")+"}else if(e) "+(u?"var x="+JSON.stringify(u)+";":"")+f(u?"x[e]":"e",!0)+"}catch(e){}}()"}}:{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){try{"+s+'var e=localStorage.getItem("'+n+'");if(e){'+(u?"var x="+JSON.stringify(u)+";":"")+f(u?"x[e]":"e",!0)+"}else{"+f(c)+";}}catch(t){}}();"}}))}),(function(e,t){return e.forcedTheme===t.forcedTheme})),f=function(e,t){if("undefined"!=typeof window){var n;try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},d=function(){var e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),function(){window.getComputedStyle(document.body),setTimeout((function(){document.head.removeChild(e)}),1)}},p=function(e){return e||(e=window.matchMedia(l)),e.matches?"dark":"light"}},1890:function(e,t,n){"use strict";var r=n(6265),a=n(6690),o=n(8347),i=n(1664);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.Z=function(e){var t=e.href,n=(0,o.Z)(e,["href"]),r=t&&t.startsWith("/"),c=t&&t.startsWith("#");return r?(0,a.tZ)(i.default,{href:t,children:(0,a.tZ)("a",l({},n))}):c?(0,a.tZ)("a",l({href:t},n)):(0,a.tZ)("a",l({target:"_blank",rel:"noopener noreferrer",href:t},n))}},9648:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(6690);function a(e){var t=e.children;return(0,r.tZ)("div",{className:"max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0",children:t})}},3974:function(e,t,n){"use strict";n.d(t,{Z:function(){return x}});var r,a,o,i,c,l,u,s,f=n(6690),d=n(9748);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var w={mail:function(e){return d.createElement("svg",p({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},e),r||(r=d.createElement("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"})),a||(a=d.createElement("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})))},github:function(e){return d.createElement("svg",h({viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e),o||(o=d.createElement("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})))},youtube:function(e){return d.createElement("svg",m({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},e),i||(i=d.createElement("path",{d:"M23.499 6.203a3.008 3.008 0 00-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 00-2.088 2.09A31.258 31.26 0 000 12.01a31.258 31.26 0 00.523 5.785 3.008 3.008 0 002.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 002.089-2.09 31.258 31.26 0 00.5-5.784 31.258 31.26 0 00-.5-5.808zm-13.891 9.4V8.407l6.266 3.604z"})))},linkedin:function(e){return d.createElement("svg",v({viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e),c||(c=d.createElement("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})))},instagram:function(e){return d.createElement("svg",g({viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e),l||(l=d.createElement("path",{d:"M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"})))},medium:function(e){return d.createElement("svg",y({viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e),u||(u=d.createElement("path",{d:"M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"})))},devdotto:function(e){return d.createElement("svg",b({viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e),s||(s=d.createElement("path",{d:"M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"})))}},x=function(e){var t=e.kind,n=e.href,r=e.size,a=void 0===r?8:r;if(!n)return null;var o=w[t];return(0,f.BX)("a",{className:"text-sm text-gray-500 transition hover:text-gray-600",target:"_blank",rel:"noopener noreferrer",href:n,children:[(0,f.tZ)("span",{className:"sr-only",children:t}),(0,f.tZ)(o,{className:"fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-".concat(a," w-").concat(a)})]})}},4067:function(e){e.exports={title:"Blog",author:"Bruno da Silva Valenga",headerTitle:"Bruno Valenga",description:"Sharing my daily experiences.",language:"en-us",siteUrl:"brunodasilvalenga.github.io",siteRepo:"https://github.com/brunodasilvalenga/brunodasilvalenga.github.io",siteLogo:"/static/images/logo.png",image:"/static/images/avatar.png",socialBanner:"/static/images/twitter-card.png",email:"brunodasilvalenga@gmail.com",github:"https://github.com/brunodasilvalenga",youtube:"https://youtube.com",linkedin:"https://www.linkedin.com/in/bruno-da-silva-valenga",instagram:"https://instagram.com/brunodasilvalenga",devdotto:"https://dev.to/brunodasilvalenga",medium:"https://medium.com/@brunodasilvalenga",locale:"en-US",comment:{provider:"giscus",giscusConfig:{repo:"brunodasilvalenga/brunodasilvalenga.github.io",repositoryId:"MDEwOlJlcG9zaXRvcnkxNzg2NjAzMjc=",category:"Blog Comments",categoryId:"DIC_kwDOCqYj584B-Y0a",mapping:"pathname",reactions:"1",metadata:"0",theme:"light",darkTheme:"transparent_dark",themeURL:""}}}},2167:function(e,t,n){"use strict";var r=n(3848),a=n(9448);t.default=void 0;var o=a(n(9748)),i=n(9414),c=n(4651),l=n(7426),u={};function s(e,t,n,r){if(e&&(0,i.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,a=(0,c.useRouter)(),f=o.default.useMemo((function(){var t=(0,i.resolveHref)(a,e.href,!0),n=r(t,2),o=n[0],c=n[1];return{href:o,as:e.as?(0,i.resolveHref)(a,e.as):c||o}}),[a,e.href,e.as]),d=f.href,p=f.as,h=e.children,m=e.replace,v=e.shallow,g=e.scroll,y=e.locale;"string"===typeof h&&(h=o.default.createElement("a",null,h));var b=(t=o.Children.only(h))&&"object"===typeof t&&t.ref,w=(0,l.useIntersection)({rootMargin:"200px"}),x=r(w,2),O=x[0],_=x[1],k=o.default.useCallback((function(e){O(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,O]);(0,o.useEffect)((function(){var e=_&&n&&(0,i.isLocalURL)(d),t="undefined"!==typeof y?y:a&&a.locale,r=u[d+"%"+p+(t?"%"+t:"")];e&&!r&&s(a,d,p,{locale:t})}),[p,d,_,y,n,a]);var j={ref:k,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,c,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(n))&&(e.preventDefault(),null==c&&r.indexOf("#")>=0&&(c=!1),t[a?"replace":"push"](n,r,{shallow:o,locale:l,scroll:c}))}(e,a,d,p,m,v,g,y)},onMouseEnter:function(e){(0,i.isLocalURL)(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),s(a,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var M="undefined"!==typeof y?y:a&&a.locale,E=a&&a.isLocaleDomain&&(0,i.getDomainLocale)(p,M,a&&a.locales,a&&a.domainLocales);j.href=E||(0,i.addBasePath)((0,i.addLocale)(p,M,a&&a.defaultLocale))}return o.default.cloneElement(t,j)};t.default=f},7426:function(e,t,n){"use strict";var r=n(3848);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!i,l=(0,a.useRef)(),u=(0,a.useState)(!1),s=r(u,2),f=s[0],d=s[1],p=(0,a.useCallback)((function(e){l.current&&(l.current(),l.current=void 0),n||f||e&&e.tagName&&(l.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var r=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:a,elements:r}),n}(n),a=r.id,o=r.observer,i=r.elements;return i.set(e,t),o.observe(e),function(){i.delete(e),o.unobserve(e),0===i.size&&(o.disconnect(),c.delete(a))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return(0,a.useEffect)((function(){if(!i&&!f){var e=(0,o.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[f]),[p,f]};var a=n(9748),o=n(3447),i="undefined"!==typeof IntersectionObserver;var c=new Map},3398:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var a=((r=n(9748))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=a},6393:function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=i,t.useAmp=function(){return i(a.default.useContext(o.AmpStateContext))};var r,a=(r=n(9748))&&r.__esModule?r:{default:r},o=n(3398);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery,i=void 0!==o&&o;return n||a&&i}},2775:function(e,t,n){"use strict";var r=n(1682);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}t.__esModule=!0,t.defaultHead=d,t.default=void 0;var o,i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=f();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var o=r?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=e[a]}n.default=e,t&&t.set(e,n);return n}(n(9748)),c=(o=n(3244))&&o.__esModule?o:{default:o},l=n(3398),u=n(1165),s=n(6393);function f(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return f=function(){return e},e}function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var h=["name","httpEquiv","charSet","itemProp"];function m(e,t){return e.reduce((function(e,t){var n=i.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(p,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0,i=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){i=!0;var c=a.key.slice(a.key.indexOf("$")+1);e.has(c)?o=!1:e.add(c)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var l=0,u=h.length;l<u;l++){var s=h[l];if(a.props.hasOwnProperty(s))if("charSet"===s)n.has(s)?o=!1:n.add(s);else{var f=a.props[s],d=r[s]||new Set;"name"===s&&i||!d.has(f)?(d.add(f),r[s]=d):o=!1}}}return o}}()).reverse().map((function(e,n){var o=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return c["data-href"]=c.href,c.href=void 0,c["data-optimized-fonts"]=!0,i.default.cloneElement(e,c)}return i.default.cloneElement(e,{key:o})}))}var v=function(e){var t=e.children,n=(0,i.useContext)(l.AmpStateContext),r=(0,i.useContext)(u.HeadManagerContext);return i.default.createElement(c.default,{reduceComponentsToState:m,headManager:r,inAmpMode:(0,s.isInAmpMode)(n)},t)};t.default=v},3244:function(e,t,n){"use strict";var r=n(3115),a=n(2553),o=n(2012),i=(n(450),n(9807)),c=n(7690),l=n(9828);function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var a=l(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return c(this,n)}}t.__esModule=!0,t.default=void 0;var s=n(9748),f=function(e){i(n,e);var t=u(n);function n(e){var o;return a(this,n),(o=t.call(this,e))._hasHeadManager=void 0,o.emitChange=function(){o._hasHeadManager&&o.props.headManager.updateHead(o.props.reduceComponentsToState(r(o.props.headManager.mountedInstances),o.props))},o._hasHeadManager=o.props.headManager&&o.props.headManager.mountedInstances,o}return o(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(s.Component);t.default=f},5412:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r,a,o,i=n(6690),c=n(6265),l=(n(7384),n(425)),u=n(9008),s=n(4067),f=n.n(s),d=[{href:"/blog",title:"Blog"},{href:"/tags",title:"Tags"},{href:"/about",title:"About"}],p=n(9748);function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var m=function(e){return p.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"344.564 330.278 111.737 91.218",width:53.87,height:43.61},e),r||(r=p.createElement("defs",null,p.createElement("linearGradient",{id:"logo_svg__b",gradientUnits:"userSpaceOnUse",x1:420.97,y1:331.28,x2:420.97,y2:418.5},p.createElement("stop",{offset:"0%",stopColor:"#06b6d4"}),p.createElement("stop",{offset:"100%",stopColor:"#67e8f9"})),p.createElement("linearGradient",{id:"logo_svg__d",gradientUnits:"userSpaceOnUse",x1:377.89,y1:331.28,x2:377.89,y2:418.5},p.createElement("stop",{offset:"0%",stopColor:"#06b6d4"}),p.createElement("stop",{offset:"100%",stopColor:"#67e8f9"})),p.createElement("path",{d:"M453.3 331.28v28.57l-64.66 58.65v-30.08l64.66-57.14z",id:"logo_svg__a"}),p.createElement("path",{d:"M410.23 331.28v28.57l-64.67 58.65v-30.08l64.67-57.14z",id:"logo_svg__c"}))),a||(a=p.createElement("use",{xlinkHref:"#logo_svg__a",fill:"url(#logo_svg__b)"})),o||(o=p.createElement("use",{xlinkHref:"#logo_svg__c",fill:"url(#logo_svg__d)"})))},v=n(1890),g=n(9648),y=n(3974);function b(){return(0,i.tZ)("footer",{children:(0,i.BX)("div",{className:"flex flex-col items-center mt-16",children:[(0,i.BX)("div",{className:"flex mb-3 space-x-4",children:[(0,i.tZ)(y.Z,{kind:"mail",href:"mailto:".concat(f().email),size:"6"}),(0,i.tZ)(y.Z,{kind:"github",href:f().github,size:"6"}),(0,i.tZ)(y.Z,{kind:"instagram",href:f().instagram,size:"6"}),(0,i.tZ)(y.Z,{kind:"devdotto",href:f().devdotto,size:"6"}),(0,i.tZ)(y.Z,{kind:"medium",href:f().medium,size:"6"}),(0,i.tZ)(y.Z,{kind:"linkedin",href:f().linkedin,size:"6"})]}),(0,i.BX)("div",{className:"flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400",children:[(0,i.tZ)("div",{children:f().author}),(0,i.tZ)("div",{children:" \u2022 "}),(0,i.tZ)("div",{children:"\xa9 ".concat((new Date).getFullYear())}),(0,i.tZ)("div",{children:" \u2022 "}),(0,i.tZ)(v.Z,{href:"/",children:f().title})]}),(0,i.tZ)("div",{className:"mb-8 text-sm text-gray-500 dark:text-gray-400",children:(0,i.tZ)(v.Z,{href:"https://github.com/timlrx/tailwind-nextjs-starter-blog",children:"Tailwind Nextjs Theme"})})]})})}var w=function(){var e=(0,p.useState)(!1),t=e[0],n=e[1],r=function(){n((function(e){return document.body.style.overflow=e?"auto":"hidden",!e}))};return(0,i.BX)("div",{className:"sm:hidden",children:[(0,i.tZ)("button",{type:"button",className:"w-8 h-8 ml-1 mr-1 rounded","aria-label":"Toggle Menu",onClick:r,children:(0,i.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"text-gray-900 dark:text-gray-100",children:t?(0,i.tZ)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"}):(0,i.tZ)("path",{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"})})}),(0,i.BX)("div",{className:"fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ".concat(t?"translate-x-0":"translate-x-full"),children:[(0,i.tZ)("button",{type:"button","aria-label":"toggle modal",className:"fixed w-full h-full cursor-auto focus:outline-none",onClick:r}),(0,i.tZ)("nav",{className:"fixed h-full mt-8",children:d.map((function(e){return(0,i.tZ)("div",{className:"px-12 py-4",children:(0,i.tZ)(v.Z,{href:e.href,className:"text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100",onClick:r,children:e.title})},e.title)}))})]})]})},x=function(){var e=(0,p.useState)(!1),t=e[0],n=e[1],r=(0,l.F)(),a=r.theme,o=r.setTheme,c=r.resolvedTheme;return(0,p.useEffect)((function(){return n(!0)}),[]),(0,i.tZ)("button",{"aria-label":"Toggle Dark Mode",type:"button",className:"w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4",onClick:function(){return o("dark"===a||"dark"===c?"light":"dark")},children:(0,i.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"text-gray-900 dark:text-gray-100",children:!t||"dark"!==a&&"dark"!==c?(0,i.tZ)("path",{d:"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"}):(0,i.tZ)("path",{fillRule:"evenodd",d:"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",clipRule:"evenodd"})})})},O=function(e){var t=e.children;return(0,i.tZ)(g.Z,{children:(0,i.BX)("div",{className:"flex flex-col justify-between h-screen",children:[(0,i.BX)("header",{className:"flex items-center justify-between py-10",children:[(0,i.tZ)("div",{children:(0,i.tZ)(v.Z,{href:"/","aria-label":"Bruno Valenga Blog",children:(0,i.BX)("div",{className:"flex items-center justify-between",children:[(0,i.tZ)("div",{className:"mr-3",children:(0,i.tZ)(m,{})}),"string"===typeof f().headerTitle?(0,i.tZ)("div",{className:"hidden h-6 text-2xl font-semibold sm:block",children:f().headerTitle}):f().headerTitle]})})}),(0,i.BX)("div",{className:"flex items-center text-base leading-5",children:[(0,i.tZ)("div",{className:"hidden sm:block",children:d.map((function(e){return(0,i.tZ)(v.Z,{href:e.href,className:"p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100",children:e.title},e.title)}))}),(0,i.tZ)(x,{}),(0,i.tZ)(w,{})]})]}),(0,i.tZ)("main",{className:"mb-auto",children:t}),(0,i.tZ)(b,{})]})})};function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){(0,c.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e){var t=e.Component,n=e.pageProps;return(0,i.BX)(l.f,{attribute:"class",children:[(0,i.tZ)(u.default,{children:(0,i.tZ)("meta",{content:"width=device-width, initial-scale=1",name:"viewport"})}),(0,i.tZ)(O,{children:(0,i.tZ)(t,k({},n))})]})}},1780:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(5412)}])},7384:function(){},9008:function(e,t,n){e.exports=n(2775)},1664:function(e,t,n){e.exports=n(2167)},8164:function(e,t,n){var r=n(4360);e.exports=function(e){if(Array.isArray(e))return r(e)}},1682:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},6265:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})},8347:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.d(t,{Z:function(){return r}})},7381:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},5725:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},3115:function(e,t,n){var r=n(8164),a=n(7381),o=n(3585),i=n(5725);e.exports=function(e){return r(e)||a(e)||o(e)||i()}},6690:function(e,t,n){"use strict";n.d(t,{HY:function(){return r.Fragment},tZ:function(){return r.jsx},BX:function(){return r.jsxs}});var r=n(6584)},6584:function(e,t,n){"use strict";n.r(t),n.d(t,{Fragment:function(){return r.HY},jsx:function(){return o},jsxs:function(){return o},jsxDEV:function(){return o}});var r=n(6400),a=0;function o(e,t,n,o,i){var c,l,u={};for(l in t)"ref"==l?c=t[l]:u[l]=t[l];var s={type:e,props:u,key:n,ref:c,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--a,__source:o,__self:i};if("function"==typeof e&&(c=e.defaultProps))for(l in c)void 0===u[l]&&(u[l]=c[l]);return r.YM.vnode&&r.YM.vnode(s),s}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[179],(function(){return t(1780),t(4651)}));var n=e.O();_N_E=n}]);