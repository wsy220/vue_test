<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="parent">
      <user-profile ref="profile"></user-profile>
      <button class="zan" @click="approve($event.target)">滴滴滴</button>
    </div>
    <!--<div id="animateDemo">-->
    <!--<button v-on:click="show=!show">Toggle</button>-->
    <!--<transition name="fade" class="animated fade">-->
    <!--<p v-if="show">HELLO</p>-->
    <!--</transition>-->
    <!--</div>-->
    <div id="animateDemo2">
      <button @click="show=!show">
        Toggle render
      </button>
      <transition name="custom-classes-transition" enter-active-class="animated tada"
                  leave-active-class="animated bounceOutRight">
        <p v-if="show">HELLO</p>
      </transition>
    </div>
    <div id="example-4">
      <button @click="show = !show">
        Toggle
      </button>
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        v-bind:css="false"
      >
        <p v-if="show">
          Demo
        </p>
      </transition>
    </div>
    <div>
      <transition>
        <button v-if="isEditing" key="save">
          Save
        </button>
        <button v-else key="edit">
          Edit
        </button>
      </transition>
    </div>
    <div>
      <transition>
        <button v-bind:key="isEditing">
          {{isEditing?'Save':'Edit'}}
        </button>
      </transition>
    </div>
    <div>
      <transition name="fade" mode="out-in">
        <button v-bind:key="docState">{{buttonMessage}}</button>
      </transition>
    </div>
    <div>
      <transition name="component-fade" mode="out-in">
        <transition-components-demo v-bind:is="view"></transition-components-demo>
      </transition>
    </div>
    <div id="list-demo" class="demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">remove</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">{{item}}</span>
        <li
          v-for="(item, index) in computedList"
          v-bind:key="item.msg"
          v-bind:data-index="index"
        >{{ item.msg }}</li>
      </transition-group>
    </div>
    <div id="staggered-list-demo">
      <input v-model="query">
      <transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">

      </transition-group>
    </div>
    <div>
      <el-button @click="visible = true">Button</el-button>
      <el-dialog :visible.sync="visible" title="Hello world">
        <p>Try Element</p>
      </el-dialog>
    </div>
    <div>
      <el-button @click="show=!show">Click Me</el-button>
      <div style="display: flex;margin-top:20px;height: 100px;">
        <transition name="el-fade-in-linear">
          <div v-show="show" class="transition-box">.el-fade-in-linear</div>
        </transition>
        <transition name="el-fade-in">
          <div v-show="show" class="transition-box">.el-fade-in</div>
        </transition>
      </div>
    </div>
    <div>
      <el-button @click="show2 = !show2">Click Me</el-button>

      <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-zoom-in-center">
          <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
        </transition>

        <transition name="el-zoom-in-top">
          <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
        </transition>

        <transition name="el-zoom-in-bottom">
          <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
        </transition>
      </div>
    </div>
    <div>
      <el-button @click="show3=!show3">click Me</el-button>
      <div style="margin-top: 20px; height: 200px;">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">el-collapse-transition</div>
            <div class="transition-box">el-collapse-transition</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>import Vue from 'vue'
import Zan from '../plugin/zan'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// import Velocity from '../plugin/velocity'
// import Velocity from 'https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js'
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc',
      visible: 'false'
    }
  }
}
export default {
  // 引用zan.js插件
  install (Vue, options) {
    Vue.prototype.$zan = function (ele) {
      ele.style.animation = 'zan 1s ease-in'
      setTimeout(function () {
        ele.parentNode.querySelector('path').style.fill = '#ff6600'
      })
    }
  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true,
      isEditing: 'edit',
      docState: 'saved',
      view: 'v-a',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ],
      mixins: [mixin],
      show2: true,
      show3: true
    }
  },
  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved':
          return 'Edit'
        case 'edited':
          return 'Save'
        case 'editing' :
          return 'Cancel'
      }
    },
    computedList: function () {
      var vm = this
      return this.list.filter(function (item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    approve (t) {
      this.$zan(t)
    },
    // beforeEnter: function (el) {
    //   el.style.opacity = 0
    //   el.style.transformOrigin = 'left'
    // },
    // enter: function (el, done) {
    //   Velocity(el, {opacity: 1, fontSize: '1.4em'}, {duration: 300})
    //   Velocity(el, {fontSize: '1em'}, {complete: done})
    // },
    // leave: function (el, done) {
    //   Velocity(el, {translateX: '15px', rotateZ: '50deg'}, {duration: 600})
    //   Velocity(el, {rotateZ: '100deg'}, {loop: 2})
    //   Velocity(el, {
    //     rotateZ: '45deg',
    //     translateY: '30px',
    //     translateX: '30px',
    //     opacity: 0
    //   }, {complete: done})
    // }
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}
// 组件中如果有大量静态内容，可以v-once 缓存到本地
Vue.component('user-profile', {
  template: '<div v-once><h1>Terms of Service</h1></div>'
})
Vue.use(Zan)
Vue.use(ElementUI, {size: 'small', zIndex: 3000})
Vue.use(CollapseTransition, CollapseTransition)
Vue.component('transition-components-demo', {
  'v-a': {
    template: '<div>Component A</div>'
  },
  'v-b': {
    template: '<div>Component B</div>'
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .transition-box{
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 20px;
    background-color: aqua;
  }
</style>
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css"/>
