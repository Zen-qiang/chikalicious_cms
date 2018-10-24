<template>
  <div>
    <section class="cakeNews-container">
     <div class="fx">
      <p>商品名称:</p>
      <p>
        <Input id="productName" type='text' v-model='name' placeholder='title' />
      </p>
      </div>
      <div class="fx" style="margin-top:30px">
      <p>商品分类:</p>
      <p>
          <CheckboxGroup v-model="fkCategoryIds">
            <Checkbox v-for="categoryInfo in categoryInfoList" :label="categoryInfo.id" :key="categoryInfo.id" style="margin-right:20px">{{categoryInfo.value}}</Checkbox>
          </CheckboxGroup>
      </p>
      </div>
      <div class="fx" style="margin-top:30px">
      <p>商品规格:</p>
      <p>
        <i-switch/>
      </p>
      </div>
    </section>
  </div>
</template>
<script>
import Editor from '../../components/Editor.vue'
import { notBlank } from '../../mixin/mixin'
export default {
  components: {
    Editor
  },
  data () {
    return {
      src: '',
      name: '',
      categoryInfoList: [],
      specificationsList: [],
      fkCategoryIds: []
    }
  },
  mixins: [notBlank],
  created () {
    if (this.routerParams) this.getNewInfo()
    this.getCategoryInfo()
  },
  computed: {
    routerParams () {
      return this.$route.params.id
    }
  },
  methods: {
    getNewInfo () {
      // this.loading = true
      this.$axios.get('/product/queryNewsById', {
        params: {
          id: this.routerParams
        }
      }).then(res => {
        console.log(res.data)
        // this.loading = false
        if (res.data.code === 666) {
          this.formInline.title = res.data.data.title
          this.formInline.file = res.data.data.surfacePlot
          this.formInline.content = res.data.data.content
          this.formInline.id = res.data.data.id
        }
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    getCategoryInfo () {
      this.$axios.get('/product/queryProductTypeByListId', {
        params: {
          type: this.cake
          // provinceId: 34,
          // cityId: this.cityId
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.categoryInfoList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        let formData = new FormData()
        formData.append('id', this.formInline.id)
        formData.append('title', this.formInline.title)
        formData.append('file', this.formInline.file)
        formData.append('content', this.formInline.content)
        console.log(formData.get('file'))
        if (valid) {
          this.$axios({
            url: '/product/saveNews',
            method: 'post',
            data: {
              id: this.formInline.id,
              title: this.formInline.title,
              content: this.formInline.content
            }
            // headers: {'Content-Type': 'multipart/form-databoundary=21'}
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.$router.replace('/CakeNews')
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
            this.$Message.error('系统异常,请联系管理员')
          })
        } else {
          this.$Message.error('请补全表单!')
        }
      })
    }
  }
}
</script>
