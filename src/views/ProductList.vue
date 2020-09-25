<template>
  <div>
    搜尋結果
    {{ products }}
  </div>
</template>

<script>
import productAPI from '../apis/product'
import { mapState } from 'vuex'

export default {
  name: 'ProductList',
  data() {
    return {
      products: []
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['isLoading'])
  },
  methods: {
    async fetchData() {
      try {
        this.$store.state.isLoading = true
        if (this.$route.query.q) {
          const searchProducts = await productAPI.searchProducts(this.$route.query.q)
          this.products = searchProducts.data
          this.$store.state.isLoading = false
        } else {
          const allProducts = await productAPI.getProducts()
          this.products = allProducts.data
          this.$store.state.isLoading = false
        }
      } catch (error) {
        this.$store.state.isLoading = false
        console.log(error)
      }
    }
  }
}
</script>