<template>
  <div class="example-root">
    <x-header/>
    <div class="example-body">
      <sidebar @click="toTop"/>
      <div class="markdown-body">
        <router-view></router-view>
      </div>
      <!-- <div class="example-iphone">
        <div class="example-iphone-iframe">
          <iframe :src="toDemo" frameborder="0"></iframe>
          <div class="example-iphone-home" @click="handleHome"></div>
        </div>
        <div class="example-iphone-code">
          <div class="example-iphone-code-item" style="margin-right:40px;">
            <qrcode :text="toDemo" :height="100" :width="100" />
            示例预览
          </div>
          <div class="example-iphone-code-item">
            <img :src="'/images/pay-code.png'" style="vertical-align: inherit;" :height="100" :width="100" />
            打赏赞助
          </div>
        </div>
      </div> -->
      <div class="example-iphone">
        <div class="example-iphone-iframe">
          <div class="simulator-content">
            <iframe :src="toDemo" frameborder="0" class="simulator-iframe"></iframe>
          </div>
        </div>
        <div class="example-iphone-code">
          <div class="example-iphone-code-item">
            <qrcode :text="toDemo" :height="100" :width="100" />
            示例预览
          </div>
        </div>
      </div>
    </div>
    <x-footer/>
  </div>
</template>

<script>
import XHeader from './components/XHeader'
import XFooter from './components/XFooter'
import Sidebar from './components/Sidebar'
import Qrcode from '../../packages/qrcode'

export default {
  components: {
    XHeader,
    XFooter,
    Sidebar,
    Qrcode
  },
  computed: {
    toDemo () {
      let path = this.$route.path === '/' ? '' : '#/demos' + this.$route.path
      if (!location.origin) {
        location.origin = location.protocol + '//' + location.host
      }
      return location.origin + location.pathname + 'demos.html' + path
    }
  },
  methods: {
    handleHome () {
      console.log(this)
    },
    toTop (e) {
      if (/^a$/i.test(e.target.nodeName)) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
<style lang="scss">
  $color-iphone-border: rgba(0,0,0,0.3);
  label{
    font-weight:normal;
  }
  a{
    color:$--color-primary;
    text-decoration: none!important;
    box-sizing: border-box;
    &.router-link-active{
      @include active;
    }
  }
  .wrapper{
    max-width:1200px;
    margin: 0 auto;
  }
  .example{
    &-body{
      padding-top:56px;
      aside{
        width:220px;
        padding-left:16px;
        overflow: auto;
        position:fixed;
        height: calc(100% - 55px);
        &::-webkit-scrollbar{  
          width: 5px;
          height:10px;
        }  
        &::-webkit-scrollbar-track{
          background-color:#fff;
        }
        &::-webkit-scrollbar-thumb{
          border-radius: 10px;
          background-color:rgba(0,0,0,0.2);
        } 
      }
      .markdown-body{
        padding-left:250px;
        padding-right:400px;
        h4{
          margin-top:30px;
        }
      }
    }
    &-iphone{
      background:#fff;
      position:fixed;
      top:0px;
      right:0px;
      z-index:1;
      text-align:center;
      &-home{
        position:absolute;
        left:50%;
        border:1px solid $color-iphone-border;
        width:45px;
        height:45px;
        bottom:30px;
        border-radius:100%;
        margin-left:-25px;
        margin-bottom:-20px;
        z-index:100;
      }
      &-iframe{
        // iframe{
        //   border:1px solid $color-iphone-border;
        //   width:320px;
        //   height:480px;
        // }
        // position: -webkit-sticky;
        // position: sticky;
        // top: 0px;
        // z-index: 9;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        flex-shrink: 0;
        width: 390.26px;
        height: 790px;
        border-radius: 20px;
        background-color: #fff;
        transform: scale(0.85);
        box-sizing: border-box;
        background-image: url('~@/assets/phone-wrap.png');
        //background-image: url('https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_255356ffde6cc5c8c1.png');
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: 30px;
        overflow: hidden;
        padding: 58px 14px 32px;

        .simulator-content {
          position: relative;
          flex: 1;
          border-radius: 5px;
          background-color: #FFFFFF;
          overflow: hidden;
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;

          .simulator-iframe {
            margin: -2px 0;
            width: 100%;
            height: calc(100% + 4px);
            border: none;
          }
        }

        &.simulator-fixed {
          position: fixed;
        }

        @media (max-width: 1300px) {
          display: none;
        }
      }
      &-code{
        margin-top: -40px;
        text-align: center;
        &-item{
          width:140px;
          display:inline-block;
        }
      }
    }
    &-root{
      font-family: Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #666;
      font-size:14px;
      .markdown-body {
        h2{
          margin-top:0
        }
        /*
        .language-javascript,.language-html{
          font-size: 12px;
          padding: 18px 24px;
          background-color: #fafafa;
          border: 1px solid #eaeefb;
          margin-bottom: 25px;
          border-radius: 4px;
          -webkit-font-smoothing: auto;
          display: block;
        }
        */
        pre{
          border: 1px solid #eaeefb;
          background-color: #fafafa;
        }
        table{
          width:100%;
          text-align: left;
          td, th{
            border-bottom:1px solid #f5f5f5;
            padding:8px;
          }
        }
      }
    }
  }
</style>
