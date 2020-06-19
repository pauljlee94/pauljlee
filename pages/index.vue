<template>
  <div>
    <section id="hero" class="flex flex-col h-screen pt-48 pb-20 px-64 justify-between">
      <div>
        <div id="intro">
          <h2>
            Detail
            <br />Oriented
            <br />Web Developer
          </h2>
        </div>
        <div id="about" class="flex mt-10">
          <div class="flex-1">
            <p>{{ $prismic.asText(home.about) }}</p>
          </div>
          <div class="flex-1">test</div>
        </div>
      </div>
      <div>
        <button @click="scrollTo()">Next Section</button>
      </div>
    </section>
    <section class="flex flex-col px-40 py-20">
      <div v-for="(item,index) in portfolio" :key="item.id" class="flex justify-between mt-40">
        <!-- Card -->
        <template v-if="index % 2 == 0">
          <nuxt-link to="/work/offerbarn" class="testclass" :style="{backgroundImage: 'url(' + item.data.image.url + ')'}">
            <h2>{{ $prismic.asText(item.data.title) }}</h2>
          </nuxt-link>
          <!-- Text -->
          <div>test</div>
        </template>
        <template v-else>
          <!-- Text -->
          <div>test</div>
          <div class="testclass" :style="{backgroundImage: 'url(' + item.data.image.url + ')'}">
            <h2>{{ $prismic.asText(item.data.title) }}</h2>
          </div>
        </template>
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
      gsap.from("#intro, .poop", {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power4"
      })
      // gsap.from("#intro",{
      //   y: '-100%',
      //   duration: 1,
      //   ease: "power4"
      // })
    }
  },
  scrollTo() {
    console.log('hello');
    window.scrollTo(0, 1000);
  }
}
</script>

<style>
.testclass {
  width: 400px;
  height: 600px;
  box-shadow: 5px 5px;
  transition: all 0.3s ease-in-out;
  border: 2px solid black;
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