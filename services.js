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

setStyle([
    {
        nameTag:'dashboard',
        style:{
            height:'100%',
            width:'100%',
            background:'rgba(242,244,243)',
            display:'flex',
            columnGap:'40px',
            rowGap:'40px',
            overflowY:'scroll',
            padding:'15px',
            position:'relative'
        }
    },
    {
        nameTag:"dataheaderContent",
        style:{
            height:'fit-content',
            display:'flex',
            flexDirection:'column',
            rowGap:'10px',
            padding:'12px',
            paddingTop:'15px',
            background:'#fff',
            position:'relative',
            transition:'opacity linear .3s'
        }
    },
    {
        nameTag:'dataPage',
        style:{
            position:'absolute',
            top:'0',
            left:'0',
            height:'fit-content',
            width:'100%',
            flexDirection:'column',
            background:'#fff',
            boxShadow:'-2px 8px 20px rgba(0,0,0,.2)',
            transition:'opacity linear .3s'
        }
    },
    {
        nameTag:'info_box',
        style:{
            display:'flex',
            flexDirection:'column',
            rowGap:'8px',
            width:'100%',
            padding:'10px',
        }
    },
    {
        nameTag:'input',
        style:{
            height:'40px',
            background:'#F3F3F3',
            width:'100%',
            outline:'none',
            borderRadius:'7px',
            width:'100%',
            paddingLeft:'20px',
            textTransform:'capitalize'
        }
    },
    {
        nameTag:'blocks',
        style:{
            height:'fit-content',
            display:'flex',
            flexDirection:'column',
            rowGap:'10px'
        }
    }
])

const selectObject = {
    network:[
        'mtn',
        'airtel',
        'glo',
        '9mobile'
    ],
    data:[
        '200mb ---- ₦00.00',
        '500mb ---- ₦00.00',
        '1gb ---- ₦00.00',
        '2gb ---- ₦00.00',
        '5gb ---- ₦00.00'
    ]
}

sydDOM.dataServices = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.dashboard()
        },
        [
            sydDOM.mainDataPage(),
            sydDOM.transactionPage()
        ]
    )
}
sydDOM.mainDataPage = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.dataPage({
                method:'add',
                style:{
                    display:preState(['mainDataPage','d'],'flex'),
                    opacity:preState(['mainDataPage','o'],'1'),
                }
            })
        },
        [
            sydDOM.dataHeader({content:['data subscription','view transaction'],param:0}),
            createElement(
                'form',
                {
                    style:styleComponent.dataheaderContent({method:'add',style:{background:''}})
                },
                [
                    sydDOM.select_box('Network'),
                    sydDOM.select_box('Data'),
                    sydDOM.info_box({text:'Mobile Number',params:['number','mobile_name','mobile_id'],readonly:false}),
                    sydDOM.login_button()
                ]
            )
        ],
        {
            createState:{
                stateName:'mainDataPage',
                state:{d:'flex',o:'1'}
            },
            type:'mainDataPage'
        }
    )
}
sydDOM.transactionPage = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.dataPage({
                method:'add',
                style:{
                    display:preState(['transactionPage','d'],'none'),
                    opacity:preState(['transactionPage','o'],'0'),
                }
            })
        },
        [
            sydDOM.dataHeader({content:['transaction history','buy data'],param:1}),
            sydDOM.rowElement({content:['s/n','mobile no.','subscription','date']}),
            // sydDOM.rowElement({content:['1','09078762938','data','04/27/2004']}),
            // sydDOM.rowElement({content:['2','09078762938','data','04/27/2004']}),
            // sydDOM.rowElement({content:['3','09078762938','data','04/27/2004']}),
            // sydDOM.rowElement({content:['4','09078762938','data','04/27/2004']}),
            // sydDOM.rowElement({content:['5','09078762938','data','04/27/2004']}),
            // sydDOM.rowElement({content:['6','09078762938','data','04/27/2004']}),
        ],
        {
            createState:{
                stateName:'transactionPage',
                state:{d:'none',o:'0',transacData:{}}
            },
            type:'transactionPage'
        }
    )
}

sydDOM.rowElement = ({content = []} = {}) =>{
    return createElement(
        'div',
        {
            style:'height:fit-content;min-height:50px;display:flex;align-items:center;text-transform:capitalize;border-bottom:1px solid lightgrey'
        },
        [
            sydDOM.col1(content[0]),
            sydDOM.col2(content[1]),
            sydDOM.col2(content[2]),
            sydDOM.col2(content[3]),
        ]
    )
}
sydDOM.col1 = (text = 's/n') =>{
    return createElement(
        'div',
        {
            style:'height:fit-content;min-width:50px;width:50px;display:flex;justify-content:center;align-items:center'
        },
        [
            text
        ]
    )
}

sydDOM.col2 = (text = 'mobile no.') =>{
    return createElement(
        'div',
        {
            style:'height:fit-content;width:calc((100% - 50px)/3);display:flex;justify-content:center;align-items:center'
        },
        [
            text
        ]
    )
}

sydDOM.transTextModel = (text) =>{
    return createElement(
        'p',
        {style:'text-transform:capitalize'},
        [
            text
        ]
    )
}

sydDOM.dataHeader = ({content = [],param} = {}) =>{
    changeDataTab = (id) =>{
        const states = ['transactionPage','mainDataPage'];

        const trueState = getState(states[id]);
        trueState.d = 'flex';
        useState(states[id],{type:'a',value:trueState})
        const timer = setTimeout(() =>{
            clearTimeout(timer);
            trueState.o = '1'
            useState(states[id],{type:'a',value:trueState})
        },100);

        // update false states
        for(let state_id in states)
        {
            switch(true)
            {
                case Number(state_id) !== id:
                    const falseState = getState(states[state_id]);
                    falseState.o = '0';
                    useState(states[state_id],{type:'a',value:falseState})
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        falseState.d = 'none';
                        useState(states[state_id],{type:'a',value:falseState})
                    }, 300);
            }
        }


    }
    return createElement(
        'div',
        {
            style:'height:80px;width:100%;border-bottom:1px solid lightgrey;display:flex;justify-content:space-between;padding:0 15px;align-items:center;',
            id:"header"
        },
        [
            createElement('h3',{style:"font-weight:300;color:#000;text-transform:capitalize"},[content[0]]),
            createElement(
                'p',
                {
                    style:'padding:10px 15px;color:#fff;background:#2F55DC;border-radius:5px;',
                    class:'select',
                    onclick:`changeDataTab(${param})`
                },
                [
                    content[1]
                ]
            )
        ]
    )
}














sydDOM.info_box = ({text = 'Email',params = [],readonly = true} = {}) =>{
    return createElement(
        'div',
        {
            style:styleComponent.info_box()
        },
        [
            createElement('p',{style:'color:grey'},[!readonly ? text+'*' : text]),
            createElement(
                'input',
                {
                    style:styleComponent.input()+`pointer-events:${readonly ? 'none' : 'unset'}`,
                    // oninput:`updateInput.bind()(this,'${text}')`,
                    value:preState(['view','data',text.toLowerCase()],''),
                    type:params[0],
                    name:params[1],
                    id:params[2]
                })
        ]
    )
}



sydDOM.select_box = (type = 'state',bool = false) =>{
    const options = () =>{
        let array = [sydDOM.disable_option(`select ${type}`)];
        selectObject[type.toLowerCase()].forEach(val =>{
            array.push(sydDOM.option(val))
        });
        return array;
    }
    return createElement(
        'div',
        {
            style:styleComponent.info_box()
        },
        [
            createElement('p',{style:'color:grey'},[bool ? type+'*' : type]),
            createElement('select',{
                style:styleComponent.input({method:'add',style:{cursor:'pointer',fontSize:'16px',fontFamily:'ubuntu',textTransform:'capitalize'}}),
                name:type.split(' ').join('_') +`_${type[0].toLowerCase()}_`+'n',
                id:type.split(' ').join('_') +`_${type[0].toLowerCase()}_`+'id',
            },
            [
                ...options()
            ]
            )
        ]
    )
}

sydDOM.login_button = () =>{
    return createElement(
        'div',
        {
            style:'padding:10px 0;width:100%;height:60px;min-height:60px;padding-right:25px;padding-left:10px;display:flex;align-items:center'
        },
        [
            createElement(
                'button',
                {
                    style:'height:fit-content;width:fit-content;padding:10px 20px;background:#2F55DC;display:flex;justify-content:center;align-items:center;border-radius:7px;font-weight:700;color:#fff',
                    class:'select',
                    type:'submit'
                    // onclick:'submit_details()'
                },
                [
                    "proceed"
                ]
            )
        ]
    )
}

sydDOM.option = (value) =>{
    return createElement(
        'option',
        {
            value:value,
            style:'font-family:ubuntu;font-size:16px;text-transform:capitalize;font-family:ubuntu'
        },
        [
            value
        ]
    )
}
sydDOM.disable_option = (value) =>{
    return createElement(
        'option',
        {
            value:value,
            disabled:true,
            selected:true,
            style:'font-family:ubuntu;font-size:16px;'
        },
        [
            value
        ]
    )
}