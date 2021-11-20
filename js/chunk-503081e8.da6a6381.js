(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-503081e8"],{"5c21":function(t,e,s){"use strict";s("765e")},7138:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"booking-container-wrapper"},[t.isLoading?s("Spinner"):t._e(),t.isAuthenticated?[s("div",{staticClass:"booking-container"},[s("div",{staticClass:"booking-step"},[s("div",{staticClass:"step-pay",style:{color:"#000",fontWeight:900}},[t._v(" 付款 ")]),s("span",{staticClass:"mx-2"},[t._v(" > ")]),s("div",{staticClass:"step-finish",style:{color:"#AAA",fontWeight:350}},[t._v(" 付款完成 ")])]),s("div",{staticClass:"booking-block booking-user"},[s("button",{staticClass:"block-top",on:{click:t.toggleDisplay}},[s("div",{staticClass:"stop-event d-flex"},[s("div",{staticClass:"fold-icon-wrapper"},[s("span",{ref:"userFoldIcon",staticClass:"fold-icon",style:{transform:"rotate(135deg)"}})]),t._v(" 訂購人資料 ")]),s("i",{directives:[{name:"show",rawName:"v-show",value:t.checkUser,expression:"checkUser"}],staticClass:"fas fa-check-circle check-form-icon"})]),s("form",{ref:"userForm",staticClass:"form-content",style:{display:"block",transition:"display .3s ease-in-out"},on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.checkUserForm.apply(null,arguments)}}},[s("div",{staticClass:"form-item"},[s("label",{staticClass:"required-label",attrs:{for:""}},[t._v("名字")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.firstName,expression:"firstName"}],attrs:{type:"text",placeholder:"例：小明",required:""},domProps:{value:t.firstName},on:{input:function(e){e.target.composing||(t.firstName=e.target.value)}}})]),s("div",{staticClass:"form-item"},[s("label",{staticClass:"required-label",attrs:{for:""}},[t._v("姓氏")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.lastName,expression:"lastName"}],attrs:{type:"text",placeholder:"例：陳",required:""},domProps:{value:t.lastName},on:{input:function(e){e.target.composing||(t.lastName=e.target.value)}}})]),t._m(0),s("div",{staticClass:"form-item"},[s("label",{staticClass:"required-label",attrs:{for:""}},[t._v("聯絡電話")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.orderDetail.contactNumber,expression:"orderDetail.contactNumber"}],attrs:{type:"text",placeholder:"請輸入聯絡電話",required:""},domProps:{value:t.orderDetail.contactNumber},on:{input:function(e){e.target.composing||t.$set(t.orderDetail,"contactNumber",e.target.value)}}})]),s("div",{staticClass:"form-item"},[s("label",{staticClass:"required-label",attrs:{for:""}},[t._v("電子郵件信箱")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.orderDetail.email,expression:"orderDetail.email"}],attrs:{type:"text",placeholder:"請輸入常用電子郵件信箱",required:""},domProps:{value:t.orderDetail.email},on:{input:function(e){e.target.composing||t.$set(t.orderDetail,"email",e.target.value)}}})]),s("button",{staticClass:"continue-btn"},[t._v("繼續")])])]),s("div",{staticClass:"booking-sub-title"},[t._v("旅客資料")]),s("div",{ref:"guestContent",staticClass:"booking-block booking-guest",attrs:{id:"guestContent"}},[s("button",{staticClass:"block-top",on:{click:t.toggleDisplay}},[s("div",{staticClass:"d-flex stop-event"},[s("div",{staticClass:"fold-icon-wrapper"},[s("span",{ref:"guestFoldIcon",staticClass:"fold-icon",style:{transform:"rotate(135deg)"}})]),s("div",{staticClass:"ticket-detail"},[s("img",{attrs:{src:t.bookingDetail.plan.product.image,alt:""}}),s("div",{staticClass:"ticket-info"},[s("div",{staticClass:"ticket-title"},[s("div",{staticClass:"link-to-product",on:{click:t.windowOpen}},[t._v(" "+t._s(t.bookingDetail.plan.product.title)+" ")]),t._v(" "+t._s(t.bookingDetail.plan.planOption[0].title)+" ")]),s("div",{staticClass:"ticket-info-list"},[s("span",[s("i",{staticClass:"icon-calendar",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.bookingDetail.date)+" ")]),t.bookingDetail.time?s("span",[s("i",{staticClass:"icon-clock"}),t._v(" "+t._s(t.bookingDetail.time)+" ")]):t._e(),t._l(t.type,(function(e,i){return s("span",{key:i},[s("i",{staticClass:"icon-people"}),t._v(" "+t._s(e.name)+" x "+t._s(e.quantity)+" ")])}))],2)])]),t.checkGuest?s("i",{staticClass:"fas fa-check-circle check-form-icon"}):t._e()])]),s("form",{ref:"guestForm",staticClass:"form-content",style:{display:"block"},on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.checkGuestForm.apply(null,arguments)}}},[s("div",{staticClass:"guest-form"},[s("div",{staticClass:"guest-form-title"},[t._v(" 旅客代表人 "),s("span",{on:{click:t.cleanPassenger}},[t._v("清空")])]),s("div",{staticClass:"form-item"},[s("label",{staticClass:"required-label",attrs:{for:""}},[t._v("本國名")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.passengerFirstName,expression:"passengerFirstName"}],attrs:{type:"text",placeholder:"例：小明",required:""},domProps:{value:t.passengerFirstName},on:{input:function(e){e.target.composing||(t.passengerFirstName=e.target.value)}}})]),s("div",{staticClass:"form-item"},[s("label",{staticClass:"required-label",attrs:{for:""}},[t._v("本國姓")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.passengerLastName,expression:"passengerLastName"}],attrs:{type:"text",placeholder:"例：陳",required:""},domProps:{value:t.passengerLastName},on:{input:function(e){e.target.composing||(t.passengerLastName=e.target.value)}}})]),s("div",{staticClass:"form-item"},[s("label",{attrs:{for:"gender"}},[t._v("性別")]),s("div",{staticClass:"select-wrapper"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.orderDetail.gender,expression:"orderDetail.gender"}],attrs:{name:"gender",id:"gender"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.orderDetail,"gender",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("請選擇")]),s("option",{attrs:{value:"female"}},[t._v("女性")]),s("option",{attrs:{value:"male"}},[t._v("男性")])])])])]),t._m(1),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.orderDetail.reminder,expression:"orderDetail.reminder"}],attrs:{name:"reminder",id:"reminder",cols:"30",rows:"10"},domProps:{value:t.orderDetail.reminder},on:{input:function(e){e.target.composing||t.$set(t.orderDetail,"reminder",e.target.value)}}}),s("div",{staticClass:"form-sub-title"},[t._v("使用折扣")]),s("div",{staticClass:"coupon-option"},[s("input",{attrs:{type:"radio",name:"coupon",id:"noCoupon"}}),s("label",{attrs:{for:"noCoupon"},on:{click:t.hideCouponInput}},[t._v("不使用")])]),s("hr"),s("div",{staticClass:"coupon-option"},[s("input",{attrs:{type:"radio",name:"coupon",id:"useCoupon"}}),s("label",{attrs:{for:"useCoupon"},on:{click:t.displayCouponInput}},[t._v("我有折扣券")])]),s("div",{ref:"couponInput",staticClass:"coupon-input",style:{display:"none"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.coupon,expression:"coupon"}],staticClass:"coupon-number",attrs:{type:"text",id:"coupon-number",placeholder:"請輸入折扣券代碼"},domProps:{value:t.coupon},on:{input:function(e){e.target.composing||(t.coupon=e.target.value)}}}),s("label",{ref:"discountTip",style:{color:"red"},attrs:{for:"coupon-number"}},[t._v(" "+t._s(t.discountTip)+" ")]),s("div",{staticClass:"coupon-btn",on:{click:t.checkCoupon}},[t._v(" 使用折扣代碼 ")])]),s("button",{staticClass:"continue-btn"},[t._v("繼續")])])]),s("div",{staticClass:"booking-sub-title"},[t._v("付款")]),s("div",{staticClass:"booking-block booking-pay",attrs:{id:"payContent"}},[s("button",{staticClass:"block-top",on:{click:t.toggleDisplay}},[s("div",{staticClass:"stop-event d-flex"},[s("div",{staticClass:"fold-icon-wrapper"},[s("span",{ref:"payFoldIcon",staticClass:"fold-icon",style:{transform:"rotate(-45deg)"}})]),t._v(" 請選擇付款方式 ")])]),s("form",{ref:"payForm",staticClass:"form-content",style:{display:"none"}},[s("div",{staticClass:"pay-content"},[s("div",{staticClass:"pay-option"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.payWay,expression:"payWay"}],attrs:{type:"radio",name:"payOption",id:"linePay",value:"linePay"},domProps:{checked:t._q(t.payWay,"linePay")},on:{change:function(e){t.payWay="linePay"}}}),s("label",{attrs:{for:"linePay"}},[t._v("LINE PAY")])]),s("hr"),s("div",{staticClass:"pay-option"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.payWay,expression:"payWay"}],attrs:{type:"radio",name:"payOption",id:"creditCard",value:"creditCard"},domProps:{checked:t._q(t.payWay,"creditCard")},on:{change:function(e){t.payWay="creditCard"}}}),s("label",{attrs:{for:"creditCard"}},[t._v("信用卡")])])]),s("p",{staticClass:"caption-tag"},[t._v(" ⓘ 請注意本平台不會向您收取任何平台交易手續費，但你下單時使用的信用卡或第三方支付平台可能會向您收取相關手續費，請參考其相關服務政策和規定，並向你所選的交易服務商取得更多資訊。 ")])])]),s("div",{staticClass:"booking-block bill-content",attrs:{id:"payContent"}},[s("button",{staticClass:"block-top",on:{click:t.toggleDisplay}},[s("div",{staticClass:"stop-event d-flex"},[s("div",{staticClass:"fold-icon-wrapper"},[s("span",{staticClass:"fold-icon",style:{transform:"rotate(135deg)"}})]),t._v(" 付款明細 ")])]),s("div",{staticClass:"pay-detail-content"},[s("div",{staticClass:"ticket-detail pay-ticket-detail"},[s("img",{attrs:{src:t.bookingDetail.plan.product.image,alt:""}}),s("div",{staticClass:"bill-info"},[s("div",{staticClass:"ticket-title"},[s("div",{staticClass:"link-to-product",on:{click:t.windowOpen}},[t._v(" "+t._s(t.bookingDetail.plan.product.title)+" ")]),t._v(" "+t._s(t.bookingDetail.plan.planOption[0].title)+" "),s("div",{staticClass:"bill-detail"},[s("div",{staticClass:"ticket-info-list"},[s("span",[s("i",{staticClass:"icon-calendar",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.bookingDetail.date)+" ")]),t.bookingDetail.time?s("span",[s("i",{staticClass:"icon-clock"}),t._v(t._s(t.bookingDetail.time)+" ")]):t._e()]),s("div",{staticClass:"bill-deatil-people"},t._l(t.type,(function(e,i){return s("div",{key:i,staticClass:"item"},[t._v(" "+t._s(e.name)+" x "+t._s(e.quantity)+" "),s("span",[t._v(" "+t._s(t.bookingDetail.currency)+" "+t._s(t._f("exchange")(e.price*e.quantity)))])])})),0),s("div",{staticClass:"bill-total"},[t._v(" 總金額 "),s("span",[t._v(t._s(t._f("exchange")(t.bookingDetail.totalPrice)))])]),0!==t.discount?s("div",{staticClass:"bill-discount"},[t._v(" 折扣 "),s("span",[t._v(" - "+t._s(t.discount))])]):t._e()])])])]),s("div",{staticClass:"total-price"},[t._v(" 支付金額"),s("span",[t._v(" "+t._s(t.bookingDetail.currency)+" "+t._s(t._f("exchange")(t.orderDetail.billPrice)))])])])]),s("div",{staticClass:"booking-block d-flex justify-end"},[s("transition",{attrs:{name:"slide-fade"}},[t.alert?s("v-alert",{staticClass:"alert",attrs:{type:"error",outlined:"",color:"red lighten-2"}},[t._v(" "+t._s(t.alert)+" ")]):t._e()],1),s("button",{staticClass:"pay-btn",on:{click:t.checkout}},[t._v("確認付款")])],1)])]:s("div",[t._v(" 請先登入 ")])],2)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-item"},[s("label",{attrs:{for:""}},[t._v("國家/地區")]),s("div",{staticClass:"select-wrapper"},[s("select",{attrs:{name:"",id:"",disabled:""}},[s("option",{attrs:{value:"taiwan"}},[t._v("台灣")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-sub-title"},[t._v("訂單備註 "),s("span",[t._v("(備註事項)")])])}],o=s("5530"),r=(s("ac1f"),s("5319"),s("d3b7"),s("25f0"),s("4de4"),s("d81d"),s("caad"),s("99af"),s("2f62")),n=s("2375"),l=s("2708"),c=s("3db5"),d=[["GOTRIP2020",500],["HELLO2WORLD",150]],p="rotate(-45deg)",u="rotate(135deg)";function m(){return"xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0,s="x"==t?e:3&e|8;return s.toString(16)}))}var v={name:"booking",components:{Spinner:n["a"]},mixins:[l["a"]],data:function(){return{type:[],bookingDetail:{},orderDetail:{id:m().toUpperCase(),fullName:"",contactNumber:"",email:"",mainPassenger:"",dateOfBirth:"",gender:"",reminder:"",billPrice:0},firstName:"",lastName:"",passengerFirstName:"",passengerLastName:"",coupon:"",discount:0,discountTip:"",payWay:"",checkUser:!1,checkGuest:!1,alert:""}},created:function(){this.bookingDetail=JSON.parse(localStorage.getItem("booking")),this.orderDetail.billPrice=this.bookingDetail.totalPrice,this.orderDetail.email=this.$store.state.user.email,this.orderDetail.contactNumber=this.$store.state.user.tel,this.type=this.bookingDetail.type.filter((function(t){return 0!==t.quantity}))},watch:{step:{handler:function(t){2===t?(this.$refs.step1.style.color="#AAA",this.$refs.step1.style.fontWeight=350,this.$refs.step2.style.color="#000",this.$refs.step2.style.fontWeight=900):(this.$refs.step2.style.color="#AAA",this.$refs.step2.style.fontWeight=350,this.$refs.step1.style.color="#000",this.$refs.step1.style.fontWeight=900)}},fullName:function(t){this.orderDetail.fullName=t},passengerName:function(t){this.orderDetail.mainPassenger=t}},computed:Object(o["a"])(Object(o["a"])({},Object(r["b"])(["isAuthenticated","user","isLoading"])),{},{fullName:function(){return this.lastName+" "+this.firstName},passengerName:function(){return this.passengerLastName+" "+this.passengerFirstName},exchangeTypePrice:function(){var t=this;this.bookingDetail.type=this.bookingDetail.type.map((function(e){return Object(o["a"])(Object(o["a"])({},e),{},{price:e.price*e.quantity/t.bookingDetail.exchangeRate})}))}}),methods:{toggleDisplay:function(t){if("link-to-product"!==t.target.classList.value){var e=t.target.nextElementSibling,s=t.target.children[0].children[0].children[0];"block"===e.style.display?e.style.display="none":e.style.display="block",s.style.transform===u?s.style.transform=p:s.style.transform=u}},windowOpen:function(){var t=this.bookingDetail.plan.product.id,e=this.$router.resolve({path:"/products/".concat(t)});window.open(e.href,"_blank")},checkUserForm:function(t){t&&(this.$refs.userForm.style.display="none",this.$refs.userFoldIcon.style.transform=p,this.checkUser=!0,this.checkGuest||(this.$refs.guestForm.style.display="block",this.$refs.guestFoldIcon.style.transform=u))},checkGuestForm:function(t){t&&(this.$refs.guestForm.style.display="none",this.$refs.guestFoldIcon.style.transform=p,this.$refs.payForm.style.display="block",this.$refs.payFoldIcon.style.transform=u,this.checkGuest=!0,window.scroll({top:100,behavior:"smooth"}))},cleanPassenger:function(){this.passengerFirstName="",this.passengerLastName="",this.orderDetail.gender=""},displayCouponInput:function(){this.$refs.couponInput.style.display="block"},hideCouponInput:function(){this.$refs.couponInput.style.display="none",this.discount=0,this.coupon="",this.discountTip="",this.orderDetail.billPrice=this.bookingDetail.totalPrice},checkCoupon:function(){var t=this,e=this.coupon.toUpperCase(),s=[];d.forEach((function(t){return s.push(t[0])}));var i=s.includes(e);i?(d.forEach((function(s){if(s[0]===e)return t.discount=Object(c["a"])(s[1]/t.bookingDetail.exchangeRate,0)})),this.discount>=this.bookingDetail.totalPrice?this.orderDetail.billPrice=0:this.orderDetail.billPrice-=this.discount,this.$refs.discountTip.style.color="green",this.discountTip=" 折扣 ".concat(this.bookingDetail.currency," ").concat(this.discount," ")):(this.discountTip="折扣碼錯誤",this.$refs.discountTip.style.color="red",this.discount=0,this.coupon="",this.orderDetail.billPrice=this.bookingDetail.totalPrice)},checkout:function(t){var e=this,s=this.orderDetail,i=s.fullName,a=s.contactNumber,o=s.email,r=s.mainPassenger;if(!i||!a||!o||!r)return this.alert="請填寫必填欄位",setTimeout((function(){e.alert=null}),3e3);if("linePay"!==this.payWay&&"creditCard"!==this.payWay)return this.alert="請選擇付款方式",setTimeout((function(){e.alert=null}),3e3);this.orderDetail.bookingDetail=this.bookingDetail,this.$store.state.isLoading=!0;var n=JSON.parse(localStorage.getItem("orderList"))||[];n.push(this.orderDetail),localStorage.setItem("orderList",JSON.stringify(n)),localStorage.setItem("checkout",JSON.stringify(this.orderDetail)),localStorage.removeItem("booking"),setTimeout((function(){e.$store.state.isLoading=!1,e.$router.push("/booking/step2")}),2500)}}},f=v,g=(s("5c21"),s("2877")),h=s("6544"),y=s.n(h),b=s("0798"),k=Object(g["a"])(f,i,a,!1,null,"7cd4f735",null);e["default"]=k.exports;y()(k,{VAlert:b["a"]})},"765e":function(t,e,s){}}]);
//# sourceMappingURL=chunk-503081e8.da6a6381.js.map