<template>
  <div class="question-details container">
    <loading v-if="!detail"></loading>
    <article v-if="detail">
      <h1 v-html="detail.question_title"></h1>
      <dl class="asker">
        <dt v-html="getAskerDescription(detail.asker)"></dt>
        <dd v-html="detail.question_content"></dd>
      </dl>
      <dl>
        <dt v-html="getAnswererDescription(detail.answerer)"></dt>
        <dd v-html="detail.answer_content"></dd>
      </dl>
    </article>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import { mapState, mapActions, mapMutations } from 'vuex'
import store from 'store/index'

export default {
  computed: {
    ...mapState('question', ['detail']),
  },
  watch: {
    detail(newVal) {
      if (newVal) {
        this.setFooter({
          ...this.detail,
          type: this.type,
        })
      }
    },
  },
  created() {
    this.getAskerDescription = info => `${info.user_name}问道：`
    this.getAnswererDescription = info => `${info.user_name}答：`
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('question/getDetailInfo', to.params.id)

    next()
  },
  activated() {
    const path = this.$route.path

    const reg = new RegExp(`/(.+)/(\\d+)`)
    const result = reg.exec(path)

    if (result) {
      const type = result[1]      
      const id = result[2]

      if (type && id) {
        this.type = type
        this.getDetailInfo(id)
      }
    }
  },
  deactivated() {
    this.leaveDetail()
    this.hideFooter()
  },
  beforeRouteUpdate(to, from, next) {
    this.hideFooter()
    this.getDetailInfo(to.params.id)
    next()
  },
  methods: {
    ...mapMutations('footer', {
      setFooter: 'SET_FOOTER',
      hideFooter: 'HIDE_FOOTER',
    }),
    ...mapMutations('question', {
      leaveDetail: 'RESET_DETAIL',
    }),
    ...mapActions('question', ['getDetailInfo']),
  },
  components: {
    Loading,
  },
}
</script>

<style lang="stylus" scoped>
  article
    padding 0 20px 50px

    h1
      font-size 28px
      font-weight bold
      line-height 1.8
      padding 10px 0
      position relative
      margin-bottom 20px

      &:after
        content ""
        position absolute
        left 0
        bottom 3px
        height 4px
        width 20%
        background-color #000

    dl
      padding 15px 0

      dt
        font-size 16px
        color #333
        line-height 24px
        margin-bottom 10px

      dd
        line-height 30px
        font-size 18px

      &.asker
        border-bottom 1px solid #eee
</style>

<style lang="stylus">
.question-details
  dl
    dd
      p
        margin-bottom 5px
</style>
