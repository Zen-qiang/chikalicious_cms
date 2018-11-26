<template>
  <div>
    <Row class="row-container">
      <Col span="2"><p class="row-label">商品名称：</p></Col>
      <Col span="12"><Input type='text' v-model="productName" icon="md-medical" placeholder='商品标题名称长度至少3个字符，最长50个汉字' /></Col>
    </Row>
    <Row class="row-container">
      <Col span="2"><p class="row-label">商品分类：</p></Col>
      <Col span="12">
        <CheckboxGroup v-model="fkCategoryIds" @on-change="checkCategory">
          <Checkbox v-for="category in categoryList" :label="category.id" :key="category.id" style="margin-right:20px">{{category.value}}</Checkbox>
        </CheckboxGroup>
      </Col>
    </Row>
    <Row class="row-container">
      <Col span="2"><p class="row-label">商品规格：</p></Col>
      <Col span="12">
        <Row class="row-container" v-for="(spec, index) in specList" :key="index">
          <Col span="6">
            <i-switch v-model="specList[index].checked" /><span style="margin-left: 10px">{{spec.value}}</span>
          </Col>
          <Col span="6">
            <span>原价(元)：</span>
            <InputNumber :disabled="!specList[index].checked" :max="100000" v-model="specList[index].originalPrice" :min="0"></InputNumber>
          </Col>
          <Col span="6">
            <span>优惠价(元)：</span>
            <InputNumber :disabled="!specList[index].checked" :max="100000" v-model="specList[index].preferentialPrice" :min="0"></InputNumber>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="row-container" style="height:140px">
      <Col span="2">
        <p class="row-label">商品主图：</p>
      </Col>
      <Col span="12">
        <div class="demo-upload-list" v-for="(item, index) in masterList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item, $refs.master.fileList)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="master"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :default-file-list="masterDefaultList"
          :format="['jpg','jpeg','png', 'bmp']"
          :max-size="1048"
          name="files"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :with-credentials="true"
          type="drag"
          action="https://mp.chikalicious.cn/common/uploadPicture"
          style="display: inline-block;width:116px;">
          <div style="width: 116px;height:116px;line-height: 116px;" v-if="masterList.length < 1">
            <Icon type="ios-camera" size="50"></Icon>
          </div>
        </Upload>
      </Col>
    </Row>
    <Row class="row-container" style="height:140px">
      <Col span="2">
        <p style="padding: 10px">商品图片（1-6张）：支持jpg、gif、png格式上传，建议使用尺寸800x800像素以上，大小不超过1M的正方形图片</p>
      </Col>
      <Col span="16">
        <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
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
    <Row class="row-container">
      <Col span="2"><p class="row-label">商品描述：</p></Col>
      <Col span="13">
        <Editor ref="editor" :value='content' :isClear='isClear' @change="change"></Editor>
      </Col>
    </Row>
    <Row class="row-container" v-if="type==='CAKE'">
      <Col span="2"><p class="row-label">商品销售区域：</p></Col>
      <Col span="18">
        <Row class="row-container" :gutter="16" v-for="(item, index) of regionList" :label="item" :name="item + '_' + index" :key="index">
          <Col span="12">
            <RegionSelect ref="regionSelect" @getCurrentProvince="getCurrentProvince" @getCurrentCity="getCurrentCity" :index="index" :pid="item.provinceId" :cid="item.fkRegionId"></RegionSelect>
          </Col>
          <Col span="8">
            <!-- 店铺 -->
            <Select v-model="regionList[index].shops" multiple>
              <Option v-for="shopObj in regionShopList[index]" :value="shopObj.id" :key="shopObj.id">{{ shopObj.name }}</Option>
            </Select>
          </Col>
          <Col span="4">
            <!-- 添加按钮 -->
            <Button type="default" icon="md-add" shape="circle" size="small" @click="addRegion()"/>
            <Button type="default" icon="md-remove" shape="circle" size="small" @click="removeRegion(index)"/>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="row-container"  v-if="type==='SNACK'">
      <Col span="2"><p class="row-label">是否显示<br/>快递价格：</p></Col>
      <Col span="12">
        <Row class="row-container">
          <Col span="6">
            <i-switch v-model="showExpressPrice" /><span style="margin-left: 10px"></span>
          </Col>
          <Col span="12" style="">
          <span>价格：</span>
            <InputNumber :disabled="!showExpressPrice" :max="100000" v-model="expressPrice" :min="0"></InputNumber>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="row-container">
      <Col span="2"><p class="row-label">商品发布：</p></Col>
      <Col span="13">
        <RadioGroup v-model="releaseMode" vertical>
          <Radio label="NOW">
            <span>立即发布</span>
          </Radio>
          <Radio label="SPECIFY">
            <span style="margin-right: 10px">上架时间</span>
            <DatePicker @on-change="changeOnSaleTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择上架时间" style="width: 200px" :value="new Date()" :transfer="transfer"></DatePicker>
          </Radio>
        </RadioGroup>
      </Col>
    </Row>
    <Row type="flex" class="row-container" justify="center" style="margin-top: 20px">
      <Col span="8">
        <Button type="success" long size="large" @click="submit()">确认商品发布</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import Editor from '../../components/Editor.vue'
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  components: {
    Editor, RegionSelect
  },
  props: ['productStatus'],
  data () {
    return {
      id: this.$route.params.id || null,
      productName: '',
      // 所有商品分类，用于显示
      categoryList: [],
      // 所有商品规格
      specList: [],
      // 选中的分类ID
      fkCategoryIds: [],
      type: this.$route.params.type,
      content: '',
      isClear: false,
      lastSelectRegionIndex: 0,
      regionList: [],
      // 用于展示各地区商店，需要动态更新
      regionShopList: [],
      // 发布方式
      releaseMode: 'NOW',
      onSaleTime: '',
      transfer: true,
      // 图片上传相关
      masterList: [],
      uploadList: [],
      showPreview: false,
      previewObj: {},
      previewUrl: '',
      masterDefaultList: [],
      imagesDefaultList: [],
      showExpressPrice: false,
      expressPrice: null
    }
  },
  created () {
    this.getCategoryInfo()
    this.getSpecInfo()
  },
  methods: {
    getProductInfoById (id) {
      this.$axios.get('/product/queryProductById', {
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.code !== 666) {
          this.$Message.warning(res.data.message)
        } else {
          console.log(res.data.data)
          if (!res.data.data) {
            this.$Message.warning('未找到相关商品数据')
            return
          }
          let product = res.data.data.product
          let categoryIds = res.data.data.categoryIds
          let specificationIds = res.data.data.specificationIds
          let regionShops = res.data.data.regionShops
          let images = res.data.data.images
          let showExpressPrice = res.data.data.showExpressPrice
          let expressPrice = res.data.data.expressPrice
          this.showExpressPrice = showExpressPrice
          this.expressPrice = expressPrice
          this.productName = product.name
          // refs
          this.$refs.master.fileList.push({
            name: 'masterImg',
            status: 'finished',
            url: product.image
          })
          this.previewObj['masterImg'] = product.image
          // 渲染顺序有问题
          // this.masterDefaultList.push({
          //   name: 'masterImg',
          //   url: product.image
          // })
          if (images && images.length > 0) {
            for (let i in images) {
              let name = images[i].substring(images[i].lastIndexOf('/') + 1, images[i].lastIndexOf('.'))
              this.previewObj[name] = images[i]
              // this.imagesDefaultList.push({
              //   name: name,
              //   url: images[i]
              // })
              this.$refs.images.fileList.push({
                name: name,
                url: images[i],
                status: 'finished'
              })
            }
          }
          // 商品描述
          this.content = product.content
          this.$refs.editor.setValue(product.content)
          // 回显分类
          if (categoryIds && categoryIds.length > 0) {
            for (let i in categoryIds) {
              this.fkCategoryIds.push(categoryIds[i])
            }
          }
          // 回显规格
          if (specificationIds && specificationIds.length > 0) {
            for (let i in this.specList) {
              for (let j in specificationIds) {
                if (this.specList[i].id === specificationIds[j].fk_specification_id) {
                  let data = this.specList[i]
                  data.checked = true
                  data.originalPrice = specificationIds[j].original_price
                  data.preferentialPrice = specificationIds[j].preferential_price
                  this.$set(this.specList, i, data)
                }
              }
            }
          }
          // 回显地区
          if (regionShops && regionShops.length > 0) {
            for (let i in regionShops) {
              this.$set(this.regionList, i, regionShops[i])
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeOnSaleTime (val1) {
      this.onSaleTime = val1
    },
    /**
     * @name  勾选分类
     */
    checkCategory () {
      // console.log(this.fkCategoryIds)
    },
    /**
     * @name  修改富文本
     */
    change (content) {
      this.content = content
    },
    /**
     * @name  获取当前商品所有分类信息
     */
    getCategoryInfo () {
      this.$axios.get('/product/queryProductCategoryByType', {
        params: {
          type: this.type
        }
      }).then(res => {
        if (res.data.code !== 666) {
          this.$Message.warning(res.data.message)
        } else {
          // console.log(res.data.data)
          this.categoryList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * @name  获取所有规格
     */
    getSpecInfo () {
      this.$axios.get('/product/queryProductSpecByType', {
        params: {
          type: this.type
        }
      }).then(res => {
        if (res.data.code !== 666) {
          this.$Message.warning(res.data.message)
        } else {
          // console.log(res.data.data)
          this.specList = res.data.data
          for (const i in this.specList) {
            this.specList[i].originalPrice = 0
            this.specList[i].preferentialPrice = 0
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * @name  获取当前省
     */
    getCurrentProvince (provinceId) {
    },
    /**
     * @name  获取当前城市
     * @param cityId 城市ID
     * @param index 城市下标
     */
    getCurrentCity (cityId, index) {
      // 保存最后选中地区下标
      this.lastSelectRegionIndex = index
      this.regionList[index].fkRegionId = cityId
      // 管理员动态获取当前地区店铺
      this.getShopListByCity(cityId)
    },
    /**
     * @name  根据地区获取店铺
     * @param cityId 城市ID
     * @param index 城市下标
     */
    getShopListByCity (cityId) {
      if (cityId) {
        this.$axios.get('/shop/queryShopTypeByRegionId', {
          params: {
            cityId: cityId
          }
        }).then(res => {
          if (res.data.code === 666) {
            // console.log(res.data.data)
            this.$set(this.regionShopList, this.lastSelectRegionIndex, res.data.data)
            let obj = this.regionList[this.lastSelectRegionIndex]
            this.$set(this.regionList, this.lastSelectRegionIndex, obj)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    /**
     * @name  获取当前地区选中店铺ID
     * @param shops 所选中店铺ID
     */
    selectRegionShops (shops, index) {
      // this.regionList[index].shops = shops
    },
    /**
     * @name  添加地区下拉
     */
    addRegion () {
      this.regionList.push({})
    },
    /**
     * @name  删除地区下拉
     * @param index 需要删除的地区下标
     */
    removeRegion (index) {
      this.regionList.splice(index, 1)
    },
    /**
     * @name  生成提交参数
     */
    generateParams () {
      let params = {}
      params.id = this.id
      params.name = this.productName
      params.type = this.type
      params.status = this.productStatus
      params.fkCategoryIds = this.fkCategoryIds
      params.specList = []
      for (let i in this.specList) {
        if (this.specList[i].checked) {
          params.specList.push({
            id: this.specList[i].id,
            originalPrice: this.specList[i].originalPrice,
            preferentialPrice: this.specList[i].preferentialPrice
          })
        }
      }
      // 商品主图
      params.masterImage = this.masterList[0].url
      // 商品图片
      params.images = []
      for (let i in this.uploadList) {
        if (this.uploadList[i].url) {
          params.images.push(this.uploadList[i].url)
        }
      }
      params.content = this.content
      params.regionList = this.regionList
      params.releaseMode = this.releaseMode
      params.onSaleTime = this.onSaleTime
      params.showExpressPrice = this.showExpressPrice
      params.expressPrice = this.expressPrice
      return params
    },
    /**
     * @name  提交保存
     */
    submit () {
      let data = this.generateParams()
      // 数据校验
      if (!data.name) {
        this.$Message.error('商品名称不能为空')
        return
      }
      if (!data.type) {
        this.$Message.error('商品类型不能为空')
        return
      }
      if (!data.fkCategoryIds || data.fkCategoryIds.length === 0) {
        this.$Message.error('商品分类不能为空')
        return
      }
      if (!data.specList || data.specList.length === 0) {
        this.$Message.error('商品规格不能为空')
        return
      }
      if (this.type === 'CAKE' && (!data.regionList || data.regionList.length === 0 || !data.regionList[0].shops || data.regionList[0].shops.length === 0)) {
        this.$Message.error('商品销售区域不能为空')
        return
      }
      if (!data.releaseMode) {
        this.$Message.error('商品发布方式不能为空')
        return
      }
      if (this.masterList === null || this.masterList.length === 0) {
        this.$Message.error('商品主图不能为空')
        return
      }
      if (this.uploadList === null || this.uploadList.length === 0) {
        this.$Message.error('商品图片不能为空')
        return
      }
      this.$Modal.confirm({
        title: '是否确认提交',
        onOk: () => {
          this.$axios.post('/product/saveProduct', {
            dataJson: JSON.stringify(data)
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.$Message.success('保存成功')
              this.$router.go(-1)
              // if (this.type === 'CAKE') {
              //   this.$router.push({name: 'CakeManage'})
              // } else if (this.type === 'SNACK') {
              //   this.$router.go(-1)
              //   // window.open('../SnacksManage', '_self')
              // }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
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
    }
  },
  mounted () {
    if (this.id) {
      this.getProductInfoById(this.id)
    } else {
      this.regionList.push({})
    }
    this.masterList = this.$refs.master.fileList
    this.uploadList = this.$refs.images.fileList
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
