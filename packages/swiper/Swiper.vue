<template>
  <div :class="['vx-swiper', 'swiper-container']" ref="el">
    <div class="swiper-wrapper" >
      <slot></slot>
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
    <div v-if="prev" class="swiper-button-prev"></div>
    <div v-if="next" class="swiper-button-next"></div>
    <div v-if="scrollbar" class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import {  } from 'vue'
export default {
  name: 'VxSwiper',
  props: {
    active: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Number,
      default: 2000
    },
    options: {
      type: Object
    },
    pagination: {
      type: Boolean,
      default: true
    },
    prev: {
      type: Boolean,
      default: false
    },
    next: {
      type: Boolean,
      default: false
    },
    scrollbar: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {
    }
  }
}
</script>
