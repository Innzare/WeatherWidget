<template>
   <content-loader
      viewBox="0 0 218 271"
      :speed="2"
      primaryColor="#dedede"
      secondaryColor="#ededed"
   >
      <rect x="1" y="2" rx="6" ry="6" width="93" height="13" /> 
      <rect x="2" y="30" rx="6" ry="6" width="216" height="112" /> 
      <rect x="36" y="86" rx="0" ry="0" width="10" height="0" /> 
      <rect x="176" y="3" rx="6" ry="6" width="39" height="13" /> 
      <rect x="116" y="142" rx="0" ry="0" width="13" height="0" /> 
      <rect x="1" y="215" rx="6" ry="6" width="216" height="20" /> 
      <rect x="1" y="162" rx="6" ry="6" width="216" height="33" /> 
      <rect x="0" y="250" rx="6" ry="6" width="216" height="20" />
   </content-loader>
</template>

<script lang='ts'>
   import { ContentLoader } from "vue-content-loader";

   export default {
      components: { ContentLoader }
   }
</script>
