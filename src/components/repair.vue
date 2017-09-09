<template>
  <div class="layout-content">
    <div class="layout-breadcrumb">
      <p class="main-title">
        <span class="main-title-color">
          <Icon type="ios-gear-outline"></Icon>
        </span>
        <span class="main-title-text">园区服务-报修服务</span>
      </p>
    </div>
    <div class="layout-content-main">
      <div class="item-block-title clients-title">
  
        报修记录
        <Button type="primary" @click="addRepair" style="float:right;margin-right:10px;">我要报修</Button>
      </div>
      <Table :columns="cols" :data="datas" :height="tableHeight" show-footer>
        <div slot="footer">
          <Page :total="total" style="float:right;margin-right:20px;" @on-change="changePage($event)"></Page>
        </div>
      </Table>
    </div>

    <Modal title="报修申请" v-model="isShowAddRepair">
     <Form :model="repairObj" :rules="repairRules" label-position="left" :label-width="80" ref="addForm">
       <Form-item label="门牌号" prop="repair_no">
         <Input v-model="repairObj.repair_no"></Input>
       </Form-item>
       <Form-item label="联系人" prop="link_man">
         <Input v-model="repairObj.link_man"></Input>
       </Form-item>
       <Form-item label="联系电话" prop="link_tel">
         <Input v-model="repairObj.link_tel"></Input>
       </Form-item>
       <Form-item label="问题描述" prop="repair_problem">
         <Input v-model="repairObj.repair_problem" type="textarea" placeholder="问题描述，长度介于5-140个字符之间"></Input>
       </Form-item>
       </Form> 
        <div slot="footer">
              <Button @click="shutAddBox" long style="width:45%">取消</Button>
              <Button type="primary" @click="subAdd" long style="width:45%">提交</Button>      
        </div>       
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowAddRepair: false,
      repairObj: {
        repair_no:'',
        link_man:'',
        link_tel:'',
        repair_problem:''
      },
      repairRules:{
        repair_no:[{
          required:true,
          message:'门牌号必填',
          trigger:'blur'
        }],
        link_man:[{
          required:true,
          message:'联系人必填',
          trigger:'blur'
        }],
        link_tel:[{
          required:true,
          message:'联系电话必填',
          trigger:'blur'
        }],
        repair_problem:[{
          required:true,
          message:'维修描述为必填项',
          trigger:'blur'
        },{
          min:5,
          max:140,
          message:'长度介于5-140个字符之间',
          trigger:'blur'
        }]
      },
      cols:[{
        type:'index',
        width:30,
        align:'center'
      },{
        key:'repair_problem',
        title:'问题描述',
        
      },{
        key:'createtime',
        title:'提交时间',
        width:180
      },{
        key:'repair_status',
        title:'处理状态',
        width:90,
        render:(h,p)=>{
          let arr=["","未处理","处理中","已处理"];
          return h('span',{},arr[p.row.repair_status]);
        }
      }],
      datas:[{
        repair_problem:'水管坏了，快点找人来修，水漫金山啦',
        createtime:'2017-06-09',
        repair_status:2
      },{
        repair_problem:'水管坏了，快点找人来修，水漫金山啦kdfsdhjgfwejhwghj，快点啊',
        createtime:'2017-07-09',
        repair_status:1
      }],
      total:30,
      pageObj:{
        pi:1,
        ps:10,
      }
    }
  },
  computed: {
      tableHeight() {
          let pHeight=document.body.scrollHeight;
          let bheight = document.body.clientHeight;
          let cHeight=pHeight>bheight?pHeight:bheight;
          // cheight = cheight > 400 ? cheight : 400;
          return this.datas.length > 1 ? (cHeight - 320) : 0;
      }
  },
  created(){
    //this.getRepairList();
  },
  methods: {
    changePage(c){
      this.pageObj.pi=c;
      this.getRepairList();
    },
    addRepair () {
      this.$refs.addForm.resetFields();
      this.isShowAddRepair=true;
    },
    getRepairList(){
      this.$http.post('/web/ParkServe/findRepairList',this.pageObj).then((res)=>{
        if (res.data.b==1) {
          this.total=res.data.page.total
          this.datas=res.data.a;
        }else{
          this.$handleError(res);
        }
      })
    },
    shutAddBox(){
       this.$refs.addForm.resetFields();
      this.isShowAddRepair=false;
    },
    subAdd(){
      this.$refs.addForm.validate((valid)=>{
        if (valid) {
          this.$http.post('/web/ParkServe/addRepairInfo',this.repairObj).then((res)=>{
            if (res.data.b==1) {
              this.$Message.success({content:'提交成功',onClose:()=>{
                this.isShowAddRepair=false;
              }})
            }else{
              this.$handleError(res);
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
