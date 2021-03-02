# vue-pictureset
v0.0.3
Vue plugin to manage all pictures in your project. Handle all srcsets in a picture tag with a simple and lightweight plugin.
You can specify sizes for every media query or select a ratio based on screen width.
It will generate src file for the defined media queries and for 1x, 2x, 3x pixel ratio. It will also convert your image in webp format (wherever possible), using the input format as fallback.
It works with Contentful and Storyblok images API. Custom resize will work soon.
## Installation
```
npm i vue-pictureset
```
or
```
yarn add vue-pictureset
```

Then you can install your plugin globally with
```
...
import PictureSet from 'vue-pictureset'

Vue.use(PictureSet, {
  imagesApi: 'contentful'
})
...
```
At this moment only "contentful" is available as Image Api

## Usage
You can use the plugin as a simple component in Vue.
```
<picture-set src="YOUR_IMAGE_URL" alt="YOUR_IMAGE_ALT" title="YOUR_IMAGE_TITLE" :size="0.75" />
```

## Options
| Parameter    | Required | Type            | Default                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|--------------|----------|-----------------|------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src          | true     | String          |                                                | Source url of your image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| alt          |          | String          |                                                | Alternative description of your image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| title        |          | String          |                                                | Title of your image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| size         | true     | Array \| Number |                                                | If is a number it will use the value as ratio for the higher screen size in mediaQuery param. Ex: <picture-set :size="0.75" /> and mediaQueries is [1200, 1024, 768] it will return images with the following width: 1200*0.75, 1024*0.75, 768*0.75  It can also be an array of media queries with width and height defined. Ex: size = [  { 1200: { w: 1000, h: 500 } },  { 768: { w: 300, h: 150 } } ]  If you're using the Contentful plugin you can also specify the fit property inside the object. Ex: size = [ { 1200: { w: 1000, h: 500, fit: 'fill' } },  { 768: { w: 300, h: 150, fit: 'fill' } } ]            |
| mediaQueries |          | Array           | [ 1980 ,  1536 ,  1280 ,  1024 ,  768 ,  640 ] | Array of media queries                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Quality      |          | Object          | {  webp :  75 ,  default :  80  }              | Define the quality to be use in webp format and input format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| imgStyle     |          | Object          |                                                | Style object for the img tag.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| imgClass     |          | String          |                                                | Class of img tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| loading      |          | String          | lazy                                           | Loading property of img tag. Accepted values are "auto", "lazy", "eager"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


## Coming very very soon
Prismic and Storyblok support
## Coming soon
Integrated resize tool for every image.
Skeleton as placeholder for image loading.
Support to various images api systems.