"use strict";(self.webpackChunksakiademo=self.webpackChunksakiademo||[]).push([[268],{8268:(g,d,n)=>{n.r(d),n.d(d,{ProductModule:()=>f});var l=n(177),r=n(467),s=n(4438),v=n(1413),k=n(6977),u=n(8726),j=n(563),p=n(1141),c=n(4945);const o=a=>({tab_active:a});let E=(()=>{class a{constructor(){this._service=(0,s.WQX)(u.g),this.showSkeleton=!0,this.destroy$=new v.B,this.dashboardData=[],this.activeIndex=0}ngOnInit(){var e=this;return(0,r.A)(function*(){yield e.gridData()})()}gridData(){var e=this;return(0,r.A)(function*(){try{e.dashboardData=[];let i=yield e._service.getUserInfo("userCader");e._service.postApi("getDashboardDetails","postEndPoint",{cader:i.code,create_by:e._service.getUserInfo("_id")}).pipe((0,k.Q)(e.destroy$)).subscribe({next:t=>{200==(t=e._service.enableCryptoForResponse()?e._service.decrypt(t):t).S_CODE&&t.DATA.length>0&&(e.dashboardData=t.DATA)},error:t=>{e.dashboardData=[]}})}catch{}})()}static#s=this.\u0275fac=function(i){return new(i||a)};static#e=this.\u0275cmp=s.VBU({type:a,selectors:[["app-product"]],decls:362,vars:8,consts:[[1,"dash_board_body"],[3,"activeIndexChange","activeIndex","scrollable"],["header","Products",3,"ngClass"],[1,"cntnt_card"],[1,"products_head"],[1,"products_cntnt"],[1,"flex","h-full","gap-3","flex-wrap"],[1,"product_card","vip_0"],[1,"user_images"],["src","assets/demo/images/bikes/bike_1.png","alt",""],[1,"product_card_cntnt"],[1,"cntnt_name"],[1,"flex","gap-1","flex-column","align-items-center","justify-content-center"],[1,"flex","gap-2"],[1,"rupees"],[1,"rupees","d_income"],[1,"theme_color"],[1,"choosing_button"],["pButton","","pRipple","","label","Buy Now"],["pButton","","pRipple","","label","Add to Cart"],[1,"product_card","vip_1"],["src","assets/demo/images/bikes/bike_2.png","alt",""],[1,"ellipse"],["header","Finance",3,"ngClass"],[1,"y_dashboard","flex-column"],[1,"my_balance"],[1,"rupees_cntnt","rupees"],[1,"finance_ivesting"],[1,"inline_gap"],[1,"pi","pi-chart-bar"],[1,"flex","h-full","gap-3","flex-column","flex-wrap"],[1,"product_card","w-full","vip_0"],[1,"flex","gap-2","w-full","align-items-cente","flex-wrap","justify-content-center"],[1,"flex","gap-2","justify-content-center","w-4","align-items-center"],[1,"flex-1","flex","align-items-center","justify-content-center"],[1,"pi","pi-chart-line","theme_color",2,"font-size","25px"],[1,"flex-1","flex","flex-column","justify-content-center"],[1,"percentage","d_income"],[1,"flex","gap-1","flex-column","w-9","flex-grow-1","align-items-center","justify-content-center"],[1,"flex","align-items-center"],[1,"product_card","w-full","vip_1"],[1,"product_card","w-full","vip_2"],[1,"product_card","w-full","vip_3"],[1,"product_card","w-full","vip_4"],[1,"product_card","w-full","vip_5"]],template:function(i,t){1&i&&(s.j41(0,"div",0)(1,"p-tabView",1),s.mxI("activeIndexChange",function(F){return s.DH7(t.activeIndex,F)||(t.activeIndex=F),F}),s.j41(2,"p-tabPanel",2)(3,"div",3)(4,"div",4)(5,"h5"),s.EFF(6,"Products"),s.k0s(),s.nrm(7,"div"),s.k0s(),s.j41(8,"div",5)(9,"div",6)(10,"div",7)(11,"div",8),s.nrm(12,"img",9),s.k0s(),s.j41(13,"div",10)(14,"div",11)(15,"h6"),s.EFF(16,"KAWASAKI NINJA 650"),s.k0s(),s.j41(17,"label"),s.EFF(18,"(649 CC)"),s.k0s()(),s.j41(19,"div",12)(20,"label",13)(21,"span"),s.EFF(22,"Price: "),s.k0s(),s.j41(23,"h6",14),s.EFF(24,"0"),s.k0s()(),s.j41(25,"label",13)(26,"span"),s.EFF(27,"D-Income: "),s.k0s(),s.j41(28,"h6",15),s.EFF(29,"15.2"),s.k0s()(),s.j41(30,"label",13)(31,"span"),s.EFF(32,"R-Income: "),s.k0s(),s.j41(33,"h6",14),s.EFF(34,"5518.8"),s.k0s()(),s.j41(35,"label",13)(36,"span"),s.EFF(37,"Purchase Limit: "),s.k0s(),s.j41(38,"span")(39,"span",16),s.EFF(40,"0"),s.k0s(),s.EFF(41,"/1"),s.k0s()()(),s.j41(42,"div",17),s.nrm(43,"p-button",18)(44,"p-button",19),s.k0s()()(),s.j41(45,"div",20)(46,"div",8),s.nrm(47,"img",21),s.k0s(),s.j41(48,"div",10)(49,"div",11)(50,"h6",22),s.EFF(51,"Suzuki Gixxer SF"),s.k0s(),s.j41(52,"label"),s.EFF(53,"(200 CC )"),s.k0s()(),s.j41(54,"div",12)(55,"label",13)(56,"span"),s.EFF(57,"Price: "),s.k0s(),s.j41(58,"h6",14),s.EFF(59,"650"),s.k0s()(),s.j41(60,"label",13)(61,"span"),s.EFF(62,"D-Income: "),s.k0s(),s.j41(63,"h6",15),s.EFF(64,"64.8"),s.k0s()(),s.j41(65,"label",13)(66,"span"),s.EFF(67,"R-Income: "),s.k0s(),s.j41(68,"h6",14),s.EFF(69,"2916"),s.k0s()(),s.j41(70,"label",13)(71,"span"),s.EFF(72,"Purchase Limit: "),s.k0s(),s.j41(73,"span")(74,"span",16),s.EFF(75,"0"),s.k0s(),s.EFF(76,"/1"),s.k0s()()(),s.j41(77,"div",17),s.nrm(78,"p-button",18)(79,"p-button",19),s.k0s()()()()()()(),s.j41(80,"p-tabPanel",23)(81,"div",3)(82,"div",24)(83,"div",25)(84,"div")(85,"span",26),s.EFF(86,"0"),s.k0s()(),s.j41(87,"h6"),s.EFF(88,"Cumulative Income"),s.k0s()(),s.j41(89,"div",27)(90,"div",25)(91,"div")(92,"span",26),s.EFF(93,"0"),s.k0s()(),s.j41(94,"h6"),s.EFF(95,"Are Investing"),s.k0s()(),s.j41(96,"div",25)(97,"div")(98,"span",26),s.EFF(99,"0"),s.k0s()(),s.j41(100,"h6"),s.EFF(101,"Expected Return"),s.k0s()()()()(),s.j41(102,"div",3)(103,"div",4)(104,"h5",28),s.nrm(105,"i",29),s.EFF(106," Finance Products"),s.k0s(),s.nrm(107,"div"),s.k0s(),s.j41(108,"div",5)(109,"div",30)(110,"div",31)(111,"div",10)(112,"div",11)(113,"h6"),s.EFF(114,"Investment Fund Type A"),s.k0s()(),s.j41(115,"div",32)(116,"div",33)(117,"div",34),s.nrm(118,"i",35),s.k0s(),s.j41(119,"div",36)(120,"h6",37),s.EFF(121,"33.33 "),s.k0s(),s.j41(122,"label"),s.EFF(123,"Retuns"),s.k0s()()(),s.j41(124,"div",38)(125,"label",13)(126,"span"),s.EFF(127,"Buy "),s.k0s(),s.j41(128,"h6",14),s.EFF(129,"300.00"),s.k0s()(),s.j41(130,"label",13)(131,"span"),s.EFF(132,"Term: "),s.k0s(),s.j41(133,"h6",39)(134,"span"),s.EFF(135,"1 "),s.k0s(),s.EFF(136," days"),s.k0s()(),s.j41(137,"label",13)(138,"span"),s.EFF(139,"Income Due: "),s.k0s(),s.j41(140,"h6",15),s.EFF(141,"400.00"),s.k0s()(),s.j41(142,"label",13)(143,"span"),s.EFF(144,"Purchase Limit: "),s.k0s(),s.j41(145,"span")(146,"span",16),s.EFF(147,"0"),s.k0s(),s.EFF(148,"/1"),s.k0s()()()(),s.j41(149,"div",17),s.nrm(150,"p-button",18)(151,"p-button",19),s.k0s()()(),s.j41(152,"div",40)(153,"div",10)(154,"div",11)(155,"h6"),s.EFF(156,"Investment Fund Type B"),s.k0s()(),s.j41(157,"div",32)(158,"div",33)(159,"div",34),s.nrm(160,"i",35),s.k0s(),s.j41(161,"div",36)(162,"h6",37),s.EFF(163,"33.33 "),s.k0s(),s.j41(164,"label"),s.EFF(165,"Retuns"),s.k0s()()(),s.j41(166,"div",38)(167,"label",13)(168,"span"),s.EFF(169,"Buy "),s.k0s(),s.j41(170,"h6",14),s.EFF(171,"300.00"),s.k0s()(),s.j41(172,"label",13)(173,"span"),s.EFF(174,"Term: "),s.k0s(),s.j41(175,"h6",39)(176,"span"),s.EFF(177,"1 "),s.k0s(),s.EFF(178," days"),s.k0s()(),s.j41(179,"label",13)(180,"span"),s.EFF(181,"Income Due: "),s.k0s(),s.j41(182,"h6",15),s.EFF(183,"400.00"),s.k0s()(),s.j41(184,"label",13)(185,"span"),s.EFF(186,"Purchase Limit: "),s.k0s(),s.j41(187,"span")(188,"span",16),s.EFF(189,"0"),s.k0s(),s.EFF(190,"/1"),s.k0s()()()(),s.j41(191,"div",17),s.nrm(192,"p-button",18)(193,"p-button",19),s.k0s()()(),s.j41(194,"div",41)(195,"div",10)(196,"div",11)(197,"h6"),s.EFF(198,"Investment Fund Type C"),s.k0s()(),s.j41(199,"div",32)(200,"div",33)(201,"div",34),s.nrm(202,"i",35),s.k0s(),s.j41(203,"div",36)(204,"h6",37),s.EFF(205,"33.33 "),s.k0s(),s.j41(206,"label"),s.EFF(207,"Retuns"),s.k0s()()(),s.j41(208,"div",38)(209,"label",13)(210,"span"),s.EFF(211,"Buy "),s.k0s(),s.j41(212,"h6",14),s.EFF(213,"300.00"),s.k0s()(),s.j41(214,"label",13)(215,"span"),s.EFF(216,"Term: "),s.k0s(),s.j41(217,"h6",39)(218,"span"),s.EFF(219,"1 "),s.k0s(),s.EFF(220," days"),s.k0s()(),s.j41(221,"label",13)(222,"span"),s.EFF(223,"Income Due: "),s.k0s(),s.j41(224,"h6",15),s.EFF(225,"400.00"),s.k0s()(),s.j41(226,"label",13)(227,"span"),s.EFF(228,"Purchase Limit: "),s.k0s(),s.j41(229,"span")(230,"span",16),s.EFF(231,"0"),s.k0s(),s.EFF(232,"/1"),s.k0s()()()(),s.j41(233,"div",17),s.nrm(234,"p-button",18)(235,"p-button",19),s.k0s()()(),s.j41(236,"div",42)(237,"div",10)(238,"div",11)(239,"h6"),s.EFF(240,"Investment Fund Type D"),s.k0s()(),s.j41(241,"div",32)(242,"div",33)(243,"div",34),s.nrm(244,"i",35),s.k0s(),s.j41(245,"div",36)(246,"h6",37),s.EFF(247,"33.33 "),s.k0s(),s.j41(248,"label"),s.EFF(249,"Retuns"),s.k0s()()(),s.j41(250,"div",38)(251,"label",13)(252,"span"),s.EFF(253,"Buy "),s.k0s(),s.j41(254,"h6",14),s.EFF(255,"300.00"),s.k0s()(),s.j41(256,"label",13)(257,"span"),s.EFF(258,"Term: "),s.k0s(),s.j41(259,"h6",39)(260,"span"),s.EFF(261,"1 "),s.k0s(),s.EFF(262," days"),s.k0s()(),s.j41(263,"label",13)(264,"span"),s.EFF(265,"Income Due: "),s.k0s(),s.j41(266,"h6",15),s.EFF(267,"400.00"),s.k0s()(),s.j41(268,"label",13)(269,"span"),s.EFF(270,"Purchase Limit: "),s.k0s(),s.j41(271,"span")(272,"span",16),s.EFF(273,"0"),s.k0s(),s.EFF(274,"/1"),s.k0s()()()(),s.j41(275,"div",17),s.nrm(276,"p-button",18)(277,"p-button",19),s.k0s()()(),s.j41(278,"div",43)(279,"div",10)(280,"div",11)(281,"h6"),s.EFF(282,"Investment Fund Type E"),s.k0s()(),s.j41(283,"div",32)(284,"div",33)(285,"div",34),s.nrm(286,"i",35),s.k0s(),s.j41(287,"div",36)(288,"h6",37),s.EFF(289,"33.33 "),s.k0s(),s.j41(290,"label"),s.EFF(291,"Retuns"),s.k0s()()(),s.j41(292,"div",38)(293,"label",13)(294,"span"),s.EFF(295,"Buy "),s.k0s(),s.j41(296,"h6",14),s.EFF(297,"300.00"),s.k0s()(),s.j41(298,"label",13)(299,"span"),s.EFF(300,"Term: "),s.k0s(),s.j41(301,"h6",39)(302,"span"),s.EFF(303,"1 "),s.k0s(),s.EFF(304," days"),s.k0s()(),s.j41(305,"label",13)(306,"span"),s.EFF(307,"Income Due: "),s.k0s(),s.j41(308,"h6",15),s.EFF(309,"400.00"),s.k0s()(),s.j41(310,"label",13)(311,"span"),s.EFF(312,"Purchase Limit: "),s.k0s(),s.j41(313,"span")(314,"span",16),s.EFF(315,"0"),s.k0s(),s.EFF(316,"/1"),s.k0s()()()(),s.j41(317,"div",17),s.nrm(318,"p-button",18)(319,"p-button",19),s.k0s()()(),s.j41(320,"div",44)(321,"div",10)(322,"div",11)(323,"h6"),s.EFF(324,"Investment Fund Type F"),s.k0s()(),s.j41(325,"div",32)(326,"div",33)(327,"div",34),s.nrm(328,"i",35),s.k0s(),s.j41(329,"div",36)(330,"h6",37),s.EFF(331,"33.33 "),s.k0s(),s.j41(332,"label"),s.EFF(333,"Retuns"),s.k0s()()(),s.j41(334,"div",38)(335,"label",13)(336,"span"),s.EFF(337,"Buy "),s.k0s(),s.j41(338,"h6",14),s.EFF(339,"300.00"),s.k0s()(),s.j41(340,"label",13)(341,"span"),s.EFF(342,"Term: "),s.k0s(),s.j41(343,"h6",39)(344,"span"),s.EFF(345,"1 "),s.k0s(),s.EFF(346," days"),s.k0s()(),s.j41(347,"label",13)(348,"span"),s.EFF(349,"Income Due: "),s.k0s(),s.j41(350,"h6",15),s.EFF(351,"400.00"),s.k0s()(),s.j41(352,"label",13)(353,"span"),s.EFF(354,"Purchase Limit: "),s.k0s(),s.j41(355,"span")(356,"span",16),s.EFF(357,"0"),s.k0s(),s.EFF(358,"/1"),s.k0s()()()(),s.j41(359,"div",17),s.nrm(360,"p-button",18)(361,"p-button",19),s.k0s()()()()()()()()()),2&i&&(s.R7$(),s.R50("activeIndex",t.activeIndex),s.Y8G("scrollable",!0),s.R7$(),s.Y8G("ngClass",s.eq3(4,o,0==t.activeIndex)),s.R7$(78),s.Y8G("ngClass",s.eq3(6,o,1==t.activeIndex)))},dependencies:[l.YU,j.n,p._f,p.$n,c.JQ,c.Kp]})}return a})();var m=n(1497),h=n(83);const b=[{path:"",component:E}];let f=(()=>{class a{static#s=this.\u0275fac=function(i){return new(i||a)};static#e=this.\u0275mod=s.$C({type:a});static#n=this.\u0275inj=s.G2t({imports:[l.MD,m.iI.forChild(b),h.G]})}return a})()}}]);