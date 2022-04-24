import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)

export default new Vuex.Store({
    state: { //要设置的全局访问的state对象
        //要设置的初始属性值
        count: 0,
        dynasty: '先秦',
        place: ''
    },
    getters: { //实时监听state变化值
        getCount(state) { //改变count//测试函数
            return state.count;
        },
        getDynasty() {
            return state.dynasty;
        },
        getPlace() {
            return state.place
        },
    },
    mutations: {
        addCount(state, num) { //在commit时需多传入num参数//测试函数
            state.count = state.count + num;
        }
    },
    actions: {
        getAddCount(context, num) { //调用mutation的方法 可以异步使用//测试函数
            context.commit('addCount', num);
        },
    }
})