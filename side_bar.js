import { 
	DomType,
	sydDOM,
	setStyle,
	styleComponent,
	mount,
	useState,
	getState,
	preState,
	createElement 
} from "./sydneyDom.js";

sydDOM.sideBar = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.sideBar({method:'remove',style:['overflowY','padding']}),
			id:'sideBar'
		},
		[
            sydDOM.side_bar_header(),
            createElement(
                'div',
                {
                    style:'height:100%;width:100%;'+styleComponent.sideBar({method:'use',style:['display','rowGap','flexDirection','overflowY','padding']})
                },
                [
                    sydDOM.sideElement({classType:'fa-solid fa-gauge-high'}),
                    sydDOM.sideElement({text:'My Profile',func:'profile',classType:'fa-solid fa-user'}),
                    sydDOM.sideElement({text:'e-Wallet',func:'wallet',classType:'fa-solid fa-user'}),
                    sydDOM.sideElement({text:'Buy Data',func:'data',classType:'fa-solid fa-tachograph-digital'}),
                    sydDOM.sideElement({text:'Transactions',func:'transac',classType:'fa-solid fa-money-bill-trend-up'}),
                    sydDOM.sideElement({text:'Purchased Services',func:'purchase',classType:'fa-solid fa-cart-shopping'}),
                    sydDOM.sideElement({text:'Logout',func:'logout',classType:'fa-solid fa-right-from-bracket'}), 
                ]
                )           
		]
	)
}
sydDOM.side_bar_header = () =>{
    return createElement(
        'div',
        {
            style:'height:80px;background:#fff;width:100%;display:flex;padding-left:20px;align-items:center;position:absolute;top:0;left:0;z-index:200;letter-spacing:1px;text-transform:uppercase;font-weight:700'
        },
        [
            sydDOM.logo({img:'logo.png'}),
            "kingdom computers",
            sydDOM.menuBtn().addAttr({style:styleComponent.menuBtn([{method:'add',style:{backgroundImage:'url("./img/exit.png")',height:'20px',width:'20px',marginLeft:'10px'}},{method:'remove',style:['position','top','left']}])+styleComponent.bg()})
        ]
    )
}
sydDOM.logo = ({size = '40px',img} = {}) =>{
    return createElement(
        'div',
        {
            style:styleComponent.bg({method:'add',style:{backgroundImage:`url('./img/${img}')`,height:size,width:size,minHeight:size,minWidth:size}})
        }
    )
}
sydDOM.sideElement = ({text = 'Dashboard',func = 'dashboard', classType = 'fa-solid fa-gauge-high'} = {}) =>{
    return createElement(
        'div',
        {
            style:'height:45px;min-height:45px;width:100%;display:flex;column-gap:10px;border-radius:5px;align-items:center;padding-left:10px',
            class:'sideElement select',
            onclick:`${func}()`
        },
        [
            // sydDOM.logo({size:'20px',img}),
            createElement('i',{class:classType}),
            text
        ]
    )
}