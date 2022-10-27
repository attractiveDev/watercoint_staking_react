

interface menuState{
  index:any,
}
const initialState:menuState = {
  index:0,
}
const reducer = (state = initialState , action:any) => {
  switch(action.type){
    case 'SET_MENU_LIST':
      return{
        ...state , index: action.payload,
      }
    default:
      return state;
  }
}
export default reducer;