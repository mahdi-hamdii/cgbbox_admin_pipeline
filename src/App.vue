<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>


<style scoped>
:root {
    --v-anchor-base: #16b1ff;
    --v-primary-base: #16b1ff;
    --v-secondary-base: #8a8d93;
    --v-accent-base: #0d6efd;
    --v-error-base: #ff4c51;
    --v-info-base: #16b1ff;
    --v-success-base: #56ca00;
    --v-warning-base: #ffb400;
}
</style>
<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
}
</script>
