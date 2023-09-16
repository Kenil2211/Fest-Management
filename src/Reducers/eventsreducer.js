export const getalleventreducer =(state={getallevent:[]},action)=>{
    switch (action.type) {
        case 'GET_EVENT_REQUEST':return{...state,loading:true}
        case 'GET_EVENT_SUCESS':return{getallevents:action.payload,loading:false}//pizzas 
        case 'GET_EVENT_FAIL' : return{error:action.payload,loading:false}//error whenever something come with payload it save in error
         default: return state
    }
}

export const addnewparticipantreducer =(state={},action)=>{
    switch (action.type) {
        case 'ADD_NEWPARTICIPANT_REQUEST':return{...state,loading:true}
        case 'ADD_NEWPARTICIPANT_SUCESS':return{sucess:true,loading:false}//pizzas 
        case 'ADD_NEWPARTCIPANT_FAILED' : return{error:action.payload,loading:false}//error whenever something come with payload it save in error
         default: return state
    }
}


