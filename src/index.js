import PictureSetContentful from "./PictureSetContentful.vue"
import PictureSetStoryblok from "./PictureSetStoryblok.vue"
import PictureSetSanity from "./PictureSetSanity.vue"

const PictureSetInstall = {
 install(Vue, options = { imagesApi: 'contentful' }) {
  const imagesApi = {
    contentful: PictureSetContentful,
    storyblok: PictureSetStoryblok,
    sanity: PictureSetSanity
  }
  Vue.component("picture-set", imagesApi[options.imagesApi])
 }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PictureSetInstall)
}

export default PictureSetInstall