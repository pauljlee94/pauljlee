<template>
  <div>
    <section id="hero" class="h-screen pt-24 px-64">
      <div id="intro" class="pt-40">
        <h2>
          Detail
          <br />Oriented
          <br />Web Developer
        </h2>
      </div>
      <div id="tagline">
        <p>{{ $prismic.asText(home.tagline) }}</p>
      </div>
    </section>
    <section class="px-64">
      <div v-for="item in portfolio" :key="item.id" class="mt-10 testclass" :style="{backgroundImage: 'url(' + item.data.image.url + ')'}">
        <h2>{{ $prismic.asText(item.data.title) }}</h2>
      </div>
    </section>
    <section id="heero" class="h-screen pt-16 bg-red-300">test</section>
  </div>
</template>

<script>
// Plugins
import { gsap } from "gsap"

// Components
import Logo from "~/components/Logo.vue"

// Directives
import "@/directives/in-view"

export default {
  layout: "default",
  components: { Logo },
  // data() {
  //   return {
  //     loading: true
  //   }
  // },
  async asyncData({ $prismic, error }) {
    try {
      const home = (await $prismic.api.getSingle("home")).data
      var portfolio = (
        await $prismic.api.query(
          $prismic.predicates.at("document.type", "portfolio")
        )
      ).results

      return {
        home: home,
        portfolio: portfolio
      }
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" })
    }
  },
  mounted() {
    this.animateUp()
  },
  methods: {
    animateUp() {
      console.log(gsap)
      gsap.from("#intro, .poop", { opacity: 0, y: -100, duration: 1, ease: "power4" })
    }
  }
}
</script>

<style>
.testclass {
  width: 300px;
  height: 500px;
  box-shadow: 5px 5px;
  transition: all 0.3s ease-in-out;
  /* transition: transform 0.3s ease-in-out; */
}
.testclass:hover {
  transform: scale(1.01);
  box-shadow: 10px 10px;
}

#intro h2 {
  font-family: "Cardo", serif;
  font-size: 100px;
  line-height: 100px;
  border-bottom: 5px black solid;
  text-shadow: -3px 0px 0px white, 3px 0px 0px white;
}
</style>