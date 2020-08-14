<template>
  <div class="pt-40">
    <button >click me</button>
    <button @click="getTop">Get Top</button>
  </div>
</template>

<script>
import qs from "querystring"
export default {
  data() {
    return {
      token: "",
    }
	},
	async asyncData({$axios}) {
      const clientId = process.env.REACT_APP_BASIC_CLIENT_ID
      const clientSecret = process.env.REACT_APP_BASIC_CLIENT_SECRET

      const headers = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: "04c0c948f06e4e85a21a792f63d99bdf",
          password: "51c329ad367c4e109e7d203f7ede6409",
        },
      }
      const data = {
        grant_type: "client_credentials",
      }

      try {
        const response = await $axios.post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        )
				console.log(response)
				return {
					token: response.data.access_token
				}
        // return response.data.access_token
      } catch (error) {
        console.log(error)
      }
	},
  methods: {
    // async name() {
    //   const clientId = process.env.REACT_APP_BASIC_CLIENT_ID
    //   const clientSecret = process.env.REACT_APP_BASIC_CLIENT_SECRET

    //   const headers = {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     auth: {
    //       username: "",
    //       password: "",
    //     },
    //   }
    //   const data = {
    //     grant_type: "client_credentials",
    //   }

    //   try {
    //     const response = await this.$axios.post(
    //       "https://accounts.spotify.com/api/token",
    //       qs.stringify(data),
    //       headers
    //     )
		// 		this.token = response.data.access_token
		// 		console.log(this.token)
    //     return response.data.access_token
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // async getTop() {

    //   try {
    //     const response = await this.$axios.get(
    //       "https://api.spotify.com/v1/me/top/artists",
    //       {
    //         headers: {
    //           "Authorization": 'Bearer ' + this.token,
    //         },
    //       }
		// 		)
		// 		console.log(response)
    //     return response
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
  },
}
</script>
