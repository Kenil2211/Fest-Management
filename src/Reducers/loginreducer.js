export const loginreducer = (state={logindetail:[]},action)=>{
    switch(action.type){
        case 'GET_LOGIN_REQUEST':return{...state,loading:true}
        case 'GET_LOGIN_SUCESS' :return{logindetail:action.payload,loading:false}
        case 'GET_LOGIN_FAIL' : return{error:action.payload , loading:false}
        default :return state
    }  
} 