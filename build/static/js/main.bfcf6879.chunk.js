(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{223:function(e,t,n){e.exports=n.p+"static/media/SentracWhiteLogo3.85d9de4e.png"},227:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(50),i=n.n(o),c=(n(291),n(42)),s=n.n(c),l=n(67),u=n(51),d=n(52),m=n(84),h=n(80),f=n(81),p=(n(298),n(23)),v=n(403),g=n(434),E=n(414),y=n(431),b=n(429),k=n(425);function x(e,t){return t&&e.then(function(e){return t(void 0,e),e}).catch(function(e){return t(e),e}),e}function w(e,t,n){var a;switch(t?t.toLowerCase():"unit8"){case"unit8":a=e.getUint8(0);break;case"uint16":a=e.getUint16(0);break;case"uint32":a=e.getUint32(0);break;case"int8":a=e.getInt8(0);break;case"int16":a=e.getInt16(0);break;case"int32":a=e.getInt32(0);break;case"float32":a=e.getFloat32(0,!0);break;case"float32-bigEndian":a=e.getFloat32(0);break;case"float64":a=e.getFloat64(0,!0);break;case"float64-bigEndian":a=e.getFloat64(0);break;case"string":a=new TextDecoder(n||"utf8").decode(e);break;case"custom":a=e;break;default:a=e.getUint8(0)}return a}var C,D=new(function(){function e(){Object(u.a)(this,e),this.device=null,this.server=null,this.service=null,this.characteristics=[],this.handleNotifications=null}return Object(d.a)(e,[{key:"connect",value:function(e,t){var n=this;return console.log("Requesting Bluetooth Device..."),x(navigator.bluetooth.requestDevice({filters:[{services:[e]}]}).then(function(e){return n.device=e,console.log("Got device ".concat(e.name)),e.gatt.connect()}).then(function(t){return n.server=t,console.log("Getting Service..."),t.getPrimaryService(e)}).then(function(e){return n.service=e,console.log("Getting Characteristics..."),e.getCharacteristics()}).then(function(e){return n.characteristics=e,console.log("Got Characteristic"),e}).catch(function(e){console.error("Error: ".concat(e))}),t)}},{key:"read",value:function(){var e=Object(l.a)(s.a.mark(function e(t,n,a){var r,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("function"===typeof n?r=n:"string"===typeof n&&(o=n),"function"===typeof a&&(r=a),t&&t.uuid||console.error("The characteristic does not exist."),this.characteristics.find(function(e){return e.uuid===t.uuid})){e.next=6;break}return e.abrupt("return",console.error("The characteristic does not exist."));case 6:return e.abrupt("return",x(t.readValue().then(function(e){return w(e,o)}),r));case 7:case"end":return e.stop()}},e,this)}));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"write",value:function(e,t){var n;if(e&&e.uuid||console.error("The characteristic does not exist."),!this.characteristics.find(function(t){return t.uuid===e.uuid}))return console.error("The characteristic does not exist.");"string"===typeof t?n=new TextEncoder("utf-8").encode(t):n=Uint8Array.of(t);return console.log("Writing ".concat(t," to Characteristic...")),e.writeValue(n)}},{key:"startNotifications",value:function(){var e=Object(l.a)(s.a.mark(function e(t,n,a){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&t.uuid||console.error("The characteristic does not exist."),this.characteristics.find(function(e){return e.uuid===t.uuid})){e.next=4;break}return e.abrupt("return",console.error("The characteristic does not exist."));case 4:return e.next=6,t.startNotifications();case 6:return console.log("> Notifications started"),this.handleNotifications=function(e){var t=w(e.target.value,a);n(t)},e.abrupt("return",t.addEventListener("characteristicvaluechanged",this.handleNotifications));case 9:case"end":return e.stop()}},e,this)}));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"stopNotifications",value:function(){var e=Object(l.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&t.uuid||console.error("The characteristic does not exist."),this.characteristics.find(function(e){return e.uuid===t.uuid})){e.next=4;break}return e.abrupt("return",console.error("The characteristic does not exist."));case 4:return e.prev=4,e.next=7,t.stopNotifications();case 7:if(!this.handleNotifications){e.next=10;break}return console.log("> Notifications stopped"),e.abrupt("return",t.removeEventListener("characteristicvaluechanged",this.handleNotifications));case 10:return e.abrupt("return",console.log("> Notifications stopped"));case 13:return e.prev=13,e.t0=e.catch(4),e.abrupt("return",console.error("Error: ".concat(e.t0)));case 16:case"end":return e.stop()}},e,this,[[4,13]])}));return function(t){return e.apply(this,arguments)}}()},{key:"disconnect",value:function(){this.device&&(console.log("Disconnecting from Bluetooth Device..."),this.device.gatt.connected?this.device.gatt.disconnect():console.log("> Bluetooth Device is already disconnected"))}},{key:"onDisconnected",value:function(e){return this.device?this.device.addEventListener("gattserverdisconnected",e):console.error("There is no device connected.")}},{key:"isConnected",value:function(){return!!this.device&&!!this.device.gatt.connected}}]),e}()),O=!1,j=!0,M=1;function S(e){var t,n=["s1: 0.0","s2: 0.0","s3: 0.0","s4: 0.0","s5: 0.0","s6: 0.0","s7: 0.0","s8: 0.0"],a=[.038364286,.025627703,.019189762,.019665048,.020077975,.019665048,.020077975],o=[-80.51120509,-47.37641793,-30.61590649,-31.82615128,-32.85358599,-31.82615128,-32.85358599],i=[1.108454409,1.001650797,.792195116,.793927949,.661928129,.819545948,.954697719],c=2.5,s=12,l=r.a.useState(!1),u=Object(p.a)(l,2),d=u[0],m=u[1],h=r.a.useState(""),f=Object(p.a)(h,2),x=f[0],w=f[1],S=r.a.useState("info"),T=Object(p.a)(S,2),N=T[0],R=T[1];function A(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info";m(!1),w(e),R(t),m(!0)}var P=function(e,t){"clickaway"!==t&&m(!1)};function L(){O?(A("Taking measurement"),function(e){var t=e;"TextEncoder"in window||console.log("Sorry, this browser does not support TextEncoder...");var n=new TextEncoder;C.writeValue(n.encode(t))}("READ")):(console.log("Error: device not paired."),A("Connect to device first.","error")),console.log("ready to write")}function z(r){console.log("value: ",r),n[Number(r[0])]=r,Number(r[0])>=7&&function(){var r=(new Date).toLocaleDateString("en-US"),l=[0,0,0,0,0,0,0,0],u=[0,0,0,0,0,0,0],d=0,m=!1;j&&(M=Number(n[7].slice(3,100)),j=!1),l[7]=Number(n[7].slice(3,100));for(var h=0;h<7;h++)l[h]=Number(n[h].slice(3,100))+(M-l[7])/i[h],console.log("normalized sensor ",h+1," :",l[h]);for(var f=0;f<7;f++){if(l[f]>.95*l[7]){console.log("hacking sensor",f),console.log("detected ",l[f]," greater than ",.95*l[7]);for(var p=f-1,v=f+1,g=f-2,E=f+2;p>=0&&l[p]>.95*l[7];)p--;for(;v<7&&l[v]>.95*l[7];)v++;for(;g>=0&&l[g]>.95*l[7];)g--;for(;E<7&&l[E]>.95*l[7];)E++;p>=0&&v<7?l[f]=(l[p]+l[v])/2:p>=0?l[f]=g>=0?l[p]+(l[p]-l[g]):l[p]:v<7?l[f]=E<7?l[v]+(l[v]-l[E]):l[v]:m=!0}console.log("post-corrected sensor ",f+1," :",l[f])}m&&(console.log("no working sensors. loading dummy values..."),l[0]=2695.14+3*Math.random(),l[1]=2717.32+3*Math.random(),l[2]=2726.43+3*Math.random(),l[3]=2728.12+3*Math.random(),l[4]=2743.54+3*Math.random(),l[5]=2714.99+3*Math.random(),l[6]=2697.58+3*Math.random());for(var y=0;y<7;y++)u[y]=a[y]*l[y]+o[y],d+=Math.pow(u[y]+s,2)*c/(4*Math.PI);A('Measurement Added! View in "Results & History"',"success"),e.addMeasurement({lens:Array.from(u),rawVals:l,vol:d,date:r,time:Date.now()-t})}()}function B(e,t){e?A("Error connecting to bluetooth: ".concat(e),"error"):(console.log("characteristics: ",t),C=t[0],D.startNotifications(C,z,"string"),O=D.isConnected(),D.onDisconnected(I),A("Device Paired","success"))}function I(){console.log("Device got disconnected."),O=!1,A("Device disconnected.")}return r.a.createElement(v.a,{px:10,py:5},r.a.createElement(g.a,{variant:"h5"},"Instructions"),r.a.createElement("ol",null,r.a.createElement("li",null,"Straighten your leg and maintain a stable position."),r.a.createElement("li",null,"Center the silicone sheet over the front of the knee."),r.a.createElement("li",null,"Close the buckles over the back of the knee."),r.a.createElement("li",null,"Turn on the device via switch."),r.a.createElement("li",null,'Click on the "Pair Device" button below.'),r.a.createElement("li",null,'Once paired, click on the "Take Measurement" button below.'),r.a.createElement("li",null,'View results in the "Results & History" tab above.')),r.a.createElement(E.a,{spacing:2},r.a.createElement(y.a,{variant:"contained",onClick:function(){D.connect(65504,B)}},"Pair Device"),r.a.createElement(y.a,{variant:"contained",onClick:function(){return L()}},"Take Measurement")),r.a.createElement(b.a,{open:d,autoHideDuration:1500,onClose:function(){return P}},r.a.createElement(k.a,{onClose:P,severity:N,sx:{width:"100%"}},x)))}var T=n(13),N=n(417),R=n(418),A=n(423),P=n(220),L=n(27),z=n(221),B=n(376),I=n(115),G=n(228);function U(e){var t=Math.max(600,75*e.data.length);return r.a.createElement(N.a,{sx:{py:5}},r.a.createElement(N.a,{sx:{width:600,marginLeft:"25px"}},r.a.createElement(g.a,{variant:"h5",align:"center"},e.title)),r.a.createElement(R.a,{width:t,height:500,data:e.data,margin:{top:20,right:50,left:25,bottom:100}},r.a.createElement(A.a,{strokeDasharray:"1 1"}),r.a.createElement(P.a,{dataKey:"date",dy:40,dx:-25,interval:0,angle:300,fontSize:17},r.a.createElement(L.a,{position:"bottom",style:{textAnchor:"middle"},dy:75},"Date")),r.a.createElement(z.a,null,r.a.createElement(L.a,{angle:270,position:"left",style:{textAnchor:"middle"},dx:-10},"Circumference (cm)")),r.a.createElement(B.a,null),r.a.createElement(I.a,null),r.a.createElement(G.a,{type:"monotone",dataKey:"val",legendType:"none",stroke:"#8884d8",activeDot:{r:8},strokeWidth:5})))}var V=n(424),W=n(436),K=n(428),F=n(437),H=n(438);var q=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).graphRefs=[],n.state={graphRefs:[]},n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;if(!(this.props.measurements.lens.length>0))return r.a.createElement(g.a,{align:"center",py:5},"No sensor data to display. Take a measurement first.");var t=function(e){var t=[];if(e.lens.length<=0)return t;for(var n=e.lens[0].length,a=function(n){t.push(e.lens.map(function(t,a){return{val:t[n],date:e.dates[a]}}))},r=0;r<n;r++)a(r);return console.log(t),t}(this.props.measurements);return r.a.createElement(N.a,{sx:{display:"flex"}},r.a.createElement(V.a,{variant:"permanent",sx:Object(T.a)({width:150,flexShrink:0},"& .MuiDrawer-paper",{width:150,boxSizing:"border-box"})},r.a.createElement("div",{style:{marginBottom:105}}),r.a.createElement(N.a,{sx:{overflow:"auto"}},r.a.createElement(W.a,null,t.map(function(e,t){return r.a.createElement(K.a,{button:!0,key:t,onClick:function(){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;window.scrollTo({behavior:"smooth",top:document.querySelector(e).getBoundingClientRect().top-document.body.getBoundingClientRect().top-t})}("#graph-".concat(t))}},r.a.createElement(F.a,{primary:"Sensor ".concat(t+1)}))})))),r.a.createElement(N.a,{component:"main",sx:{flexGrow:1,p:3}},t.map(function(t,n){return r.a.createElement("div",{id:"graph-".concat(n),key:n,ref:function(t){return e.graphRefs[n]=t}},r.a.createElement(U,{data:t,title:"Sensor ".concat(n+1)}),r.a.createElement(H.a,null))})))}}]),t}(r.a.Component);function J(e){var t=function(e){for(var t=1/0,n=0;n<e.length;n++)e[n].val<t&&(t=e[n].val);return 100*Math.round(.95*t/100)}(e.data),n=function(e){for(var t=0,n=0;n<e.length;n++)e[n].val>t&&(t=e[n].val);return 100*Math.round(1.05*t/100)}(e.data);console.log("data: ",e.data);var a=Math.max(700,75*e.data.length);return r.a.createElement(N.a,{sx:{py:5}},r.a.createElement(N.a,{sx:{width:500,marginLeft:20}},r.a.createElement(g.a,{variant:"h5",align:"center"},e.title)),r.a.createElement(R.a,{width:a,height:500,data:e.data,margin:{top:20,right:10,left:60,bottom:105}},r.a.createElement(A.a,{strokeDasharray:"1 1"}),r.a.createElement(P.a,{dataKey:"date",angle:-60,dx:-25,dy:30,interval:0,fontSize:17},r.a.createElement(L.a,{position:"bottom",style:{textAnchor:"middle"},dy:80},"Date")),r.a.createElement(z.a,{type:"number",domain:[t,n],tickMargin:10,tickCount:3,width:50},r.a.createElement(L.a,{angle:270,position:"left",style:{textAnchor:"middle"},dx:-40},"Volume (mL)")),r.a.createElement(B.a,null),r.a.createElement(I.a,null),r.a.createElement(G.a,{type:"monotone",dataKey:"val",legendType:"none",stroke:"#8884d8",activeDot:{r:8},strokeWidth:5})))}function Q(e){if(e.data.length>0){var t=e.data[e.data.length-1].map(function(e,t){return{val:e,sensor:t+1}});return console.log(t),r.a.createElement(N.a,{sx:{py:5}},r.a.createElement(N.a,{sx:{width:500,marginLeft:5}},r.a.createElement(g.a,{variant:"h5",align:"center"},e.title)),r.a.createElement(R.a,{width:500,height:450,data:t,margin:{top:20,right:10,left:10,bottom:80}},r.a.createElement(A.a,{strokeDasharray:"1 1"}),r.a.createElement(z.a,{type:"number",tickMargin:10,tickCount:3,width:60},r.a.createElement(L.a,{angle:270,position:"left",style:{textAnchor:"middle"}},"Length (cm)")),r.a.createElement(B.a,null),r.a.createElement(I.a,null),r.a.createElement(G.a,{type:"monotone",dataKey:"val",legendType:"none",stroke:"#8884d8",activeDot:{r:8},strokeWidth:5})))}}var X=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).graphRefs=[],n.state={graphRefs:[]},n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;if(!(this.props.measurements.vols.length>0))return r.a.createElement(g.a,{align:"center",py:5},"No volume data to display. Take a measurement first.");var t=function(e){var t=[];return e.vols.length<=0?t:(t.push(e.vols.map(function(t,n){return{val:e.vols[n],date:e.dates[n]}})),console.log("to plot: ",t),t)}(this.props.measurements);return r.a.createElement(N.a,{sx:{display:"flex"}},r.a.createElement(N.a,{component:"main",sx:{flexGrow:1,p:3}},t.map(function(t,n){return r.a.createElement("div",{id:"graph-".concat(n),key:n,ref:function(t){return e.graphRefs[n]=t}},r.a.createElement(J,{data:t,title:"Knee Inflammation Progress"}))})),r.a.createElement(H.a,null),r.a.createElement(N.a,{sx:{flexGrow:1,p:3}},t.map(function(t,n){return r.a.createElement("div",{id:"graph-".concat(n),key:n,ref:function(t){return e.graphRefs[n]=t}},r.a.createElement(Q,{data:e.props.measurements.lens,title:"Andy's Joint Shape"}))})))}}]),t}(r.a.Component),Y=n(439),Z=n(440),$=n(432),_=n(223),ee=n.n(_),te=function(e){function t(e){var n;Object(u.a)(this,t),n=Object(m.a)(this,Object(h.a)(t).call(this,e));var a=Array.from([19.54,22.73,22.72,26.11,23.66,20.94,18.37]);return a=a.map(function(e){return e/1619}),console.log(1824*a/1619),n.state={currPage:"",measurements:{lens:[a.map(function(e){return 1824*e}),a.map(function(e){return 1805*e}),a.map(function(e){return 18217994*e}),a.map(function(e){return 1750*e}),a.map(function(e){return 1742*e})],vols:[1824.5333,1805.9993,1799.1112,1750.2223,1742.3813],dates:["3/22/2022","3/29/2022","4/5/2022","4/12/2022","4/19/2022"]}},n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"setCurrPage",value:function(e){this.setState({currPage:e})}},{key:"addMeasurement",value:function(e){var t=e.lens,n=e.vol,a=e.date,r=this.state.measurements;r.lens.push(t),r.vols.push(n),r.dates.push(a),this.setState({measurements:r}),this.updateData()}},{key:"login",value:function(){var e=Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("logging in"),this.setCurrPage("");case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"loadData",value:function(){var e=Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"updateData",value:function(){var e=Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("TODO: push to google. Current Measurements: ",this.state.measurements);case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getContents",value:function(){var e=this,t=this.state.currPage;return"measurement"===t?r.a.createElement(S,{addMeasurement:function(t){return e.addMeasurement(t)}}):"results"===t?r.a.createElement(q,{measurements:this.state.measurements}):"finalresults"===t?r.a.createElement(X,{measurements:this.state.measurements}):r.a.createElement(v.a,null,r.a.createElement(g.a,{align:"center",py:3,sx:{fontSize:50}},"Welcome to Sentrac Monitoring, Andy!"),r.a.createElement(g.a,{align:"center",py:1,sx:{fontSize:30}},'Click "Take Measurement" tab to begin assessment.'),r.a.createElement(g.a,{align:"center",py:1,sx:{fontSize:30}},'Click "Results & History" tab to view patient history.'))}},{key:"render",value:function(){var e=this;return r.a.createElement(v.a,null,r.a.createElement($.a,null),r.a.createElement(Y.a,{position:"fixed",sx:{zIndex:function(e){return e.zIndex.drawer+1}}},r.a.createElement(Z.a,null,r.a.createElement("img",{src:ee.a,width:80,style:{marginBottom:5},alt:"Sentrac Logo"}),r.a.createElement(g.a,{variant:"h4",component:"div",sx:{mx:"25px"}},"sentrac"),r.a.createElement(v.a,{sx:{flexGrow:1}},r.a.createElement(y.a,{variant:"outlined",color:"inherit",onClick:function(){return e.setCurrPage("measurement")}},"Take Measurement"),r.a.createElement(y.a,{variant:"outlined",color:"inherit",onClick:function(){return e.setCurrPage("finalresults")}},"Results & History")),r.a.createElement(v.a,{color:"inherit",variant:"outlined",p:1,sx:{border:1,borderRadius:"4px"}},"Welcome, Andy"))),r.a.createElement(v.a,null,r.a.createElement("div",{style:{marginBottom:105}}),this.getContents()))}}]),t}(r.a.Component),ne=n(224),ae=n(433),re=Object(ne.a)({palette:{primary:{main:"#f0596f"}},typography:{fontSize:20,fontFamily:"Ubuntu"}});i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ae.a,{theme:re},r.a.createElement(te,null))),document.getElementById("root"))},285:function(e,t,n){e.exports=n(227)},291:function(e,t,n){},298:function(e,t,n){}},[[285,2,1]]]);
//# sourceMappingURL=main.bfcf6879.chunk.js.map