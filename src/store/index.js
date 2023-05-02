import Vuex from 'vuex'
 

const store = new Vuex.Store(
    {
        state: {
            toogleSidebar: false,   
            renderFeed: false       
            
        },
        mutations: {
            setToggleSidebar(state, status) {
                state.toogleSidebar = status;
            },
            setRenderFeed(state,status){
                state.renderFeed = status
            }
        },

        getters:{
            sidebar: state =>{
                return state.toogleSidebar
            },
            render: state =>{
                return state.renderFeed
            }
             
        }

    }
  );

export default store;

