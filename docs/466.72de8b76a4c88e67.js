"use strict";(self.webpackChunksakiademo=self.webpackChunksakiademo||[]).push([[466],{2466:(b,a,i)=>{i.r(a),i.d(a,{AccountsModule:()=>P});var u=i(177),t=i(4438),p=i(1497),s=i(5779),_=i(7693),m=i(8726),f=i(563),C=i(4799),d=i(1141),v=i(2242);function x(n,g){1&n&&(t.j41(0,"h3"),t.EFF(1,"Redemption code"),t.k0s())}function h(n,g){1&n&&(t.j41(0,"div"),t.nrm(1,"input",35),t.k0s(),t.EFF(2," a "))}function j(n,g){if(1&n){const o=t.RV6();t.j41(0,"button",36),t.bIt("click",function(){t.eBV(o),t.XpG();const e=t.sdS(65);return t.Njj(e.reject())}),t.k0s(),t.j41(1,"button",37),t.bIt("click",function(){t.eBV(o),t.XpG();const e=t.sdS(65);return t.Njj(e.accept())}),t.k0s()}}let k=(()=>{class n{constructor(o,c,e){this.layoutService=o,this.appService=c,this.confirmationService=e,this._router=(0,t.WQX)(p.Ix)}onFooterClick(o){this._router.navigate([`home/as-riders-${o}`])}onSignOutClick(o){this._router.navigate([o])}confirm(){this.confirmationService.confirm({message:"Are you sure that you want to perform this action?",accept:()=>{}})}static#t=this.\u0275fac=function(c){return new(c||n)(t.rXU(_.Y),t.rXU(m.g),t.rXU(s.td))};static#n=this.\u0275cmp=t.VBU({type:n,selectors:[["app-accounts"]],features:[t.Jv_([s.td])],decls:71,vars:0,consts:[["cd",""],[1,"dash_board_body"],[1,"wrapper"],[1,"container"],[1,"profile_div"],[1,"user-img"],[1,"profile_img"],["src","http://i.pravatar.cc/100","alt","user"],[1,"profile_details"],[1,"user_wallet"],[1,"wallet_details"],[1,"my_balance"],[1,"count_details"],[1,"rupees_cntnt","rupees"],[1,"order_details"],[1,"rupees_cntnt"],[1,"content"],[1,"user-settings"],[1,"list_settings_div"],[1,"theme_color"],[1,"list_settings"],[1,"list_settings_tab",3,"click"],[1,"pi","pi-user"],[1,"pi","pi-shield"],[1,"pi","pi-file-check"],[1,"pi","pi-chart-bar"],[1,"pi","pi-question-circle"],[1,"pi","pi-id-card"],[1,"pi","pi-sitemap"],[1,"pi","pi-gift"],["pTemplate","header","icon","pi pi-gift"],["pTemplate","content"],["pTemplate","footer"],[1,"signout"],["pRipple","","label","Sign out",3,"click"],["type","text","pInputText",""],["type","button","pButton","","icon","pi pi-times","label","No",3,"click"],["type","button","pButton","","icon","pi pi-check","label","Yes",3,"click"]],template:function(c,e){if(1&c){const l=t.RV6();t.j41(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"div",6),t.nrm(6,"img",7),t.k0s(),t.j41(7,"div",8)(8,"h3"),t.EFF(9,"Shaik Basha"),t.k0s(),t.j41(10,"label"),t.EFF(11,"7680800985 "),t.k0s()()(),t.j41(12,"div",9)(13,"div",10)(14,"div",11)(15,"div",12)(16,"span",13),t.EFF(17,"1000"),t.k0s()(),t.j41(18,"h6"),t.EFF(19,"Balance"),t.k0s()()(),t.j41(20,"div",14)(21,"div",12)(22,"span",15),t.EFF(23,"2"),t.k0s()(),t.j41(24,"h6"),t.EFF(25,"Orders"),t.k0s()()()(),t.j41(26,"div",16)(27,"div",17)(28,"div",18)(29,"h4",19),t.EFF(30,"User Settings"),t.k0s(),t.j41(31,"div",20)(32,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("addaccount"))}),t.nrm(33,"i",22),t.j41(34,"label"),t.EFF(35,"Add Account"),t.k0s()(),t.j41(36,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("security"))}),t.nrm(37,"i",23),t.j41(38,"label"),t.EFF(39,"Security Center"),t.k0s()(),t.j41(40,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("consumption"))}),t.nrm(41,"i",24),t.j41(42,"label"),t.EFF(43,"Consumption List"),t.k0s()(),t.j41(44,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("finance"))}),t.nrm(45,"i",25),t.j41(46,"label"),t.EFF(47,"Finance Product"),t.k0s()(),t.j41(48,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("help"))}),t.nrm(49,"i",26),t.j41(50,"label"),t.EFF(51,"Help Center"),t.k0s()(),t.j41(52,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("about"))}),t.nrm(53,"i",27),t.j41(54,"label"),t.EFF(55,"About Us"),t.k0s()(),t.j41(56,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onFooterClick("referrals"))}),t.nrm(57,"i",28),t.j41(58,"label"),t.EFF(59,"Referrals"),t.k0s()(),t.j41(60,"div",21),t.bIt("click",function(){return t.eBV(l),t.Njj(e.confirm())}),t.nrm(61,"i",29),t.j41(62,"label"),t.EFF(63,"Redeem Code"),t.k0s()(),t.j41(64,"p-confirmDialog",null,0),t.DNE(66,x,2,0,"ng-template",30)(67,h,3,0,"ng-template",31)(68,j,2,0,"ng-template",32),t.k0s()()(),t.j41(69,"div",33)(70,"p-button",34),t.bIt("click",function(){return t.eBV(l),t.Njj(e.onSignOutClick("as-riders-sigin"))}),t.k0s()()()()()()()}},dependencies:[s.Ei,f.n,C.T,d._f,d.$n,v.S],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:22px}header[_ngcontent-%COMP%]{background-image:linear-gradient(to left,#4d51aa,var(--theme_color));background-color:var(--theme_color);text-align:center;display:flex;justify-content:space-between;align-items:center}header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#fff;font-weight:700}header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}header[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{padding:20px;color:#fff;font-size:1.5em}.content[_ngcontent-%COMP%]{display:flex;flex:1;flex-direction:column;padding:0 10px 10px;gap:10px}.profile_details[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:5px}.profile_details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;color:var(--theme_color);font-weight:700;flex:1}.profile_img[_ngcontent-%COMP%]{width:70px;height:70px;border-radius:50%;display:flex;flex-direction:column}.user-img[_ngcontent-%COMP%]{padding:20px 10px;display:flex;align-items:center;gap:10px;justify-content:center}.user-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:50%}.user-img[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{position:absolute;top:20px;right:130px}.user-img[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{padding:10px;border-radius:50%;background-color:#fff;color:var(--theme_color);box-shadow:1px 2px 2px #333}.count_details[_ngcontent-%COMP%]{flex:1;align-items:center;display:flex;justify-content:center}.profile_div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.user-settings[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:15px;flex:1}.user_wallet[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{color:#20261d!important}.user-settings[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-weight:900}.my_balance[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], .order_details[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{color:var(--theme_color)}.user_wallet[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.user_wallet[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;box-shadow:#0000003d 0 3px 8px;flex:1;padding:5px;min-height:66px}.user-settings[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#313230}.user-settings[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%], .user-settings[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .fab[_ngcontent-%COMP%]{color:var(--theme_color);margin-right:20px}.list_settings[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px}.list_settings[_ngcontent-%COMP%]   .list_settings_tab[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;padding:10px;color:#000;background-color:#e8edef;border-radius:3px}.list_settings_div[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}"]})}return n})();var M=i(1130);const O=[{path:"",component:k}];let P=(()=>{class n{static#t=this.\u0275fac=function(c){return new(c||n)};static#n=this.\u0275mod=t.$C({type:n});static#e=this.\u0275inj=t.G2t({imports:[u.MD,p.iI.forChild(O),M.G]})}return n})()}}]);