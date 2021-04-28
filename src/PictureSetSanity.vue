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
      :loading="loading"
      :style="imgStyle"
      :class="imgClass"
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
    size: {
      type: Array | Number,
      required: true
    },
    fit: {
      type: String,
      default: () => 'fill',
      validator: value => ['pad', 'fill', 'scale', 'crop', 'thumb']
    },
    mediaQueries: {
      type: Array,
      default: () => [1980, 1536, 1280, 1024, 768, 640]
    },
    quality: {
      type: Object | Number,
      default: () => { webp: 75, default: 80 }
    },
    imgStyle: {
      type: Object,
      default: () => {}
    },
    imgClass: {
      type: String,
      default: () => ''
    },
    loading: {
      type: String,
      default: () => 'lazy',
      validator: value => ['lazy', 'eager', 'auto']
    }
  },
  computed: {
    srcset: {
      get () {
        if (Array.isArray(this.size)) {          
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
                return `${this.src}?${attrs}&fm=${ext}&q=${quality.default} ${i + 1}x`
              })
                .join(', ')
              const densityWebp = Array.from(Array(2).keys()).map((i) => {
                const attrs = Object.keys(item.attr)
                  .map((attr) => {
                    if (attr === 'w' || attr === 'h') return `${attr}=${item.attr[attr] * (i + 1) > 2048 ? 2048 : parseInt(item.attr[attr] * 0.75) * (i + 1)}`
                    return `${attr}=${item.attr[attr]}`
                  })
                  .join('&')
                return `${this.src}?${attrs}&fm=webp&q=${quality.webp} ${i + 1}x`
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
        if (typeof this.size === 'number') {
          const ext = this.src.split('.').pop()
          return this.mediaQueries
            .map((media, i) => {
              const w = i !== 0
                ? this.size * this.mediaQueries[i - 1]
                : this.size * media
              const densityJpg = Array.from(Array(2).keys()).map((i) => {
                return `${this.src}?w=${w}&fit=${this.fit}&fm=${ext}&q=${quality.default} ${i + 1}x`
              })
                .join(', ')
              const densityWebp = Array.from(Array(2).keys()).map((i) => {
                return `${this.src}?w=${w}&fit=${this.fit}&fm=webp&q=${quality.webp} ${i + 1}x`
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
    }
  },
  methods: {
    loaded () {
      this.$emit('loaded')
    }
  }
}
</script>
