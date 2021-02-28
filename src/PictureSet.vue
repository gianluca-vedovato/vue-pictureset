<template>
  <picture>
    <source
      v-for="(source, index) in srcset"
      :key="index"
      :srcset="source.src"
      :media="`(min-width: ${source.media}px)`"
      :type="source.type"
    >
    <img
      :src="src + '?q=5'"
      :alt="alt"
      :title="title"
      :loading="lazy ? 'lazy' : 'eager'"
      :class="{ 'w-auto': !maxWidth }"
      @load="loaded"
    >
  </picture>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    maxWidth: {
      type: Boolean,
      default: () => true
    },
    size: {
      type: Array,
      required: true
    },
    lazy: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    srcset: {
      get () {
        const ext = this.src.split('.').pop()
        return this.size
          .map((item) => {
            const densityJpg = Array.from(Array(2).keys()).map((i) => {
              const attrs = Object.keys(item.attr)
                .map((attr) => {
                  if (attr === 'w' || attr === 'h') return `${attr}=${item.attr[attr] * (i + 1) > 2048 ? 2048 : parseInt(item.attr[attr] * 0.75) * (i + 1)}`
                  return `${attr}=${item.attr[attr]}`
                })
                .join('&')
              return `${this.src}?${attrs}&fm=${ext}&q=80 ${i + 1}x`
            })
              .join(', ')
            const densityWebp = Array.from(Array(2).keys()).map((i) => {
              const attrs = Object.keys(item.attr)
                .map((attr) => {
                  if (attr === 'w' || attr === 'h') return `${attr}=${item.attr[attr] * (i + 1) > 2048 ? 2048 : parseInt(item.attr[attr] * 0.75) * (i + 1)}`
                  return `${attr}=${item.attr[attr]}`
                })
                .join('&')
              return `${this.src}?${attrs}&fm=webp&q=75 ${i + 1}x`
            })
              .join(', ')
            return [
              {
                src: densityWebp,
                media: item.media,
                type: 'image/webp'
              },
              {
                src: densityJpg,
                media: item.media,
                type: 'image/' + ext
              }
            ]
          })
          .reduce((a, b) => a.concat(b), [])
      }
    }
  },
  methods: {
    loaded () {
      this.$nuxt.$emit('update-locomotive')
      this.$emit('loaded')
    }
  }
}
</script>

<style scoped>
picture {
  position: relative;
  display: flex;
  align-items: flex-start;
}

img {
  width: auto;
  max-width: 100%;
}
</style>
