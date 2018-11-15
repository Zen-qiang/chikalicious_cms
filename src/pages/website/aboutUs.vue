<template>
  <div>
           <Row class="row-container" style="height:140px">
      <Col span="2">
        <p style="padding: 10px">图片（1-6张）：支持jpg、gif、png格式上传，大小不超过1M的图片</p>
      </Col>
      <Col span="16">
        <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
              <Icon type="ios-trash-outline" @click.native="handleRemove(item, $refs.images.fileList)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="images"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :default-file-list="imagesDefaultList"
          :format="['jpg','jpeg','png', 'bmp']"
          :max-size="1048"
          name="files"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :with-credentials="true"
          type="drag"
          action="https://mp.chikalicious.cn/common/uploadPicture"
          style="display: inline-block;width:116px;">
          <div style="width: 116px;height:116px;line-height: 116px;" v-if="uploadList.length !== 6">
            <Icon type="ios-camera" size="50"></Icon>
          </div>
        </Upload>
      </Col>
    </Row>
    <Modal title="图片预览" v-model="showPreview">
      <img :src="previewUrl" v-if="showPreview" style="width: 100%">
    </Modal>
          <editor :isClear='isClear' :value='content' @change="change" ></editor>
          <Button type='primary' @click="handleSubmit('formInline')">保存</Button>
          <Button type="primary" @click="toShowPreview()">预览</Button>
          <preview :imgs="imgs" :content="content" :showPreview.sync="showPreviewDiv"></preview>
  </div>
</template>
<script>
import Editor from '../../components/Editor.vue'
import Preview from '../../components/Preview'
export default {
  components: {
    Editor,
    Preview
  },
  data () {
    return {
      addressForm: [{src: null, file: null}],
      isClear: false,
      uploadList: [],
      imagesDefaultList: [],
      content: null,
      contentId: null,
      showPreviewDiv: false,
      showPreview: false
    }
  },
  computed: {
    imgs () {
      return this.$lodash.map(this.uploadList, 'url')
    }
  },
  created () {
    this.getAbountUsInfo()
  },
  mounted () {
    this.uploadList = this.$refs.images.fileList
  },
  methods: {
    getAbountUsInfo () {
      // this.loading = true
      this.$axios.post('/us/searchAboutUs', {
        params: {}
      }).then(res => {
        // this.loading = false
        if (res.data.code === 666) {
          for (var i in res.data.data.cover) {
            this.$refs.images.fileList.push({
              id: res.data.data.cover[i].id,
              name: '你好',
              url: res.data.data.cover[i].pictureUrl,
              status: 'finished'
            })
            this.content = res.data.data.content[0].contentHtmlValue
            this.contentId = res.data.data.content[0].id
          }
        }
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    change (data) {
      this.content = data
    },
    uploading (event, index) {
      // 获取文件
      var windowURL = window.URL || window.webkitURL
      this.addressForm[index].file = event.target.files[0] // 创建图片文件的url
      this.addressForm[index].src = windowURL.createObjectURL(event.target.files[0])
    },
    deleteItem (index) {
      if (this.addressForm.length > 0) {
        this.addressForm.splice(index, 1)
      } else {
        this.$Message.warning('至少需要一张图片')
      }
      console.log(index)
    },
    /**
    * 图片上传相关方法
    */
    handleView (name) {
      this.previewUrl = this.previewObj[name]
      this.showPreview = true
    },
    handleRemove (file, fileList) {
      // const fileList = this.$refs.images.fileList
      // this.$refs.images.fileList.splice(fileList.indexOf(file), 1)
      fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file, fileList) {
      console.log(res)
      let url = res.data[0]
      file.url = url
      file.name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
      this.previewObj[file.name] = url
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '提示',
        desc: '图片格式错误，请上传jpg、jpeg、png、bmp.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '提示',
        desc: '图片上传文件限制大小为1M.'
      })
    },
    toShowPreview () {
      if (this.uploadList[0].url === null) {
        this.$Message.warning('至少需要一张图片')
      } else {
        this.showPreviewDiv = true
      }
    },
    handleSubmit (name) {
      if (this.uploadList[0].url === null || this.content === null) {
        this.$Message.error('请补全内容')
      } else {
        let data = []
        for (var i in this.uploadList) {
          data.push({
            id: this.uploadList[i].id,
            type: 'COVER',
            pictureUrl: this.uploadList[i].url,
            contentHtmlValue: null
          })
        }
        data.push({
          id: this.contentId,
          type: 'CONTENT',
          pictureUrl: null,
          contentHtmlValue: this.content
        })
        this.$axios({
          url: '/us/saveAboutUs',
          method: 'post',
          // headers: {'Content-Type': 'multipart/form-data'}
          data: {
            aboutUsData: JSON.stringify(data)
          }
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('保存成功')
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
          this.$Message.error('系统异常,请联系管理员')
        })
      }
    }
  }
}
</script>
<style scoped>
  .row-container {
    padding: 10px 0;
  }
  .row-label {
    text-align: center;
  }
  .demo-upload-list{
      display: inline-block;
      width: 120px;
      height: 120px;
      text-align: center;
      line-height: 120px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 4px;
    }
    .demo-upload-list img{
      width: 100%;
      height: 100%;
    }
    .demo-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
      display: block;
    }
    .demo-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
</style>
