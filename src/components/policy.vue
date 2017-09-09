<template>
  <div class="layout-content">
    <div class="layout-breadcrumb">
      <p class="main-title">
        <span class="main-title-color">
          <Icon type="paper-airplane"></Icon>
        </span>
        <span class="main-title-text">企业服务-政策咨询</span>
      </p>
    </div>
    <div class="layout-content-main">
      <div class="item-block-title clients-title">
        申请指南
      </div>
      <div class="clients-title" style="border:1px solid #ccc;padding:15px;overflow:hidden">
        <Button :class="title-button" @click="showPolicyDetail(index,'policymethods','product_doc_content')" v-for="(item,index) in policymethods" :key="index">{{item.product_doc_name}}</Button>
      </div>
      <div class="item-block-title clients-title">
        政策申报
      </div>
      <div class="clients-title" style="border:1px solid #ccc;padding:15px;overflow:hidden">
        <Button :class="title-button" @click="showPolicyDetail(index,'policymethods','product_doc_content')" v-for="(item,index) in policylist" :key="index">{{item.product_name}}</Button>
      </div>
      <Button type="primary" @click="showApply">政策申请</Button>
    </div>

<Modal v-model="isApplyPolicy" title="政策申请">
    <Form :model="applyForm" :rules="applyRule" :label-width="80" label-position="left" ref="applyForm">
        <Form-item label="申报政策" prop="product_id">
          <Select v-model="applyForm.product_id">
            <Option :value="item.product_id" v-for="(item,index) in policylist" :key="item.product_id">{{item.product_name}}</Option>
          </Select>
        </Form-item>
        <Form-item label="联系人" prop="cts_name">
          <Input v-model="applyForm.cts_name"></Input>
        </Form-item>
        <Form-item label="联系电话" prop="cts_phone">
          <Input v-model="applyForm.cts_phone"></Input>
        </Form-item>
        <Form-item label="验证码" prop="code">
          <Input v-model="applyForm.code" style="width:200px"></Input>
          <img src="/web/CommonController/authCode" alt="" style="width:60px;vertical-align:middle;">
        </Form-item>
    </Form>
    <div slot="footer">
          <Button @click="shutApplyBox" long style="width:45%">取消</Button>
          <Button type="primary" @click="subPolicy" long style="width:45%">提交</Button>      
    </div>
</Modal>

<Modal v-model="isShowDetail" title="详细页面">
  <div v-html="detailContent"></div>
</Modal>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      policymethods:[],
      policylist:[],
      isApplyPolicy:false,
      applyForm:{
          product_id:null,
          cts_name:'',
          cts_phone:'',
          code:''
      },
      applyRule:{
        product_id:[{
          type:'number',
          required:true,
          message:'申报政策必选',
          trigger:'change'
        }],
        cts_name:[{
          required:true,
          message:'联系人必填',
          trigger:'blur'
        },{
          type:'string',
          min:2,
          max:20,
          message:'联系人名字介于2-20字符之间',
          trigger:'blur'
        }],
        cts_phone:[{
          pattern:/^([0-9]{3,4}-)?[0-9]{7,8}$/ || /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/,
          message:'请输入合法的手机号码',
          trigger:'blur'
        }],
        code:[{
          type:'string',
          required:true,
          message:'验证码不能为空',
          trigger:'blur'
        }]
      },
      isShowDetail:false,
      detailContent:''
    }
  },
  created(){
    this.getMethods();
    this.getPolicylist();
  },
  methods:{
    showPolicyDetail(index,arr,key){
      this.detailContent=this[arr][index][key];
      this.isShowDetail=true;
    },
    showApply(){
      this.$refs.applyForm.resetFields();
      this.isApplyPolicy=true;
    },
    getMethods(){
      this.$http.post('/web/Park_policy_product_typeFront/findpark_service_product_docMessageisPublish',{}).then(
        (res)=>{
          if(res.data.b==1){
            this. policymethods=res.data.a;
          }else{
            this.$handleError(res);
          }
        }
      ).catch()
    },
    getPolicylist(){
      this.$http.post('/web/Park_policy_product_typeFront/findMattersMessageisPublish',{}).then(
        (res)=>{
          if(res.data.b==1){
            this. policylist=res.data.a;
          }
        }
      ).catch()
    },
    shutApplyBox(){
      this.isApplyPolicy=false;
      this.$refs.applyForm.resetFields();
    },
    subPolicy(){
      this.$refs.applyForm.validate((valid)=>{
        if(valid){
          this.$http.post('/web/Park_policy_product_typeFront/addFrontPark_service_product_typeMessage',this.applyForm).then((res)=>{
            if(res.data.b==1){
              this.$Message.success({content:'提交成功，稍后工作人员会联系您',onClose:()=>{
                this.isApplyPolicy=false;
              }});
            }else{
              this.$Message.error('提交失败')
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
