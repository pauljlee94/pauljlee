<template>
  <div>
    <section id="hero" class="flex flex-col h-screen pt-48 max-w-xl justify-between mx-auto">
      <div>
        <div id="intro">
          <h2>
            <span class="underlineText">Web developer</span>
            and
            <span class="underlineText">software engineer</span> based out of
            <span class="underlineText">Atlanta, Georgia</span>.
          </h2>
        </div>
        <div id="about" class="flex mt-10">
          <div class="flex-1">
            <p>{{ $prismic.asText(home.about) }}</p>
          </div>
          <div class="flex-1">test</div>
        </div>
      </div>
      <div class="mx-auto py-10">
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
        portfolio: portfolio,
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
        ease: "power4",
      })
      // gsap.from("#intro",{
      //   y: '-100%',
      //   duration: 1,
      //   ease: "power4"
      // })
    },
  },
  scrollTo() {
    console.log("hello")
    window.scrollTo(0, 1000)
  },
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

#intro h2,
#intro span {
  font-family: "Cardo", serif;
  font-size: 50px;
  line-height: 60px;
  text-shadow: 2px 0px 0px white, -2px 0px 0px white, 0px 2px 0px white,
    0px -2px 0px white, 0px 2px 0px white, 2px -2px 0px white,
    -2px -2px 0px white, 2px 2px 0px white, -2px 2px 0px white;
  /* text-shadow: -5px 0px 0px white, 5px 0px 0px white, 0px 5px 0px white;  */
}

.underlineText {
  background-repeat: repeat-x;
  background-image: url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAQAAAAnZu5uAAAAEElEQVR42mNk+M8ABYwkMAGbQQUBEvGWBAAAAABJRU5ErkJggg==);
  background-position: left 55px;
}
</style>