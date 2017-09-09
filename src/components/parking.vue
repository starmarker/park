<template>
  <div class="layout-content">
    <div class="layout-breadcrumb">
      <p class="main-title">
        <span class="main-title-color">
          <Icon type="android-car"></Icon>
        </span>
        <span class="main-title-text">园区服务-停车位申请</span>
      </p>
    </div>
    <div class="layout-content-main">
      <div class="item-block-title clients-title">
  
        车位申请记录
        <Button type="primary" @click="addRepair" style="float:right;margin-right:10px;">申请车位</Button>
      </div>
      <Table :columns="cols" :data="datas" :height="tableHeight" show-footer>
        <div slot="footer">
          <Page :total="total" style="float:right;margin-right:20px;" @on-change="changePage($event)"></Page>
        </div>
      </Table>
    </div>

    <Modal title="车位申请" v-model="isShowAddRepair">
     <Form :model="repairObj" :rules="repairRules" label-position="right" :label-width="80" ref="addForm">
       <Form-item label="停车场" prop="park_id">
         <Select v-model="repairObj.park_id">
           <Option v-for="(item,index) in parkList" :key="item.park_id" :value="item.park_id" :disabled="item.parking_num-item.use_parkingnum==0">{{item.park_name}}(可用车位: {{item.parking_num-item.use_parkingnum}})</Option>
         </Select>
       </Form-item>
       <Form-item label="车牌号" prop="detail_platenumber">
         <Input v-model="repairObj.detail_platenumber"></Input>
       </Form-item>
       <Form-item label="品牌型号" prop="detail_carversion">
         <Input v-model="repairObj.detail_carversion"></Input>
       </Form-item>
       <Form-item label="排量" prop="detail_caremissions">
         <Input v-model="repairObj.detail_caremissions"></Input>
       </Form-item>
       <Form-item label="开始时间" prop="detail_starttime">
         <Date-picker type="date" placeholder="选择日期" v-model="repairObj.detail_starttime" @on-change="settime($event,'detail_starttime')"></Date-picker>
       </Form-item>
       <Form-item label="结束时间" prop="detail_endtime">
          <Date-picker type="date" placeholder="选择日期" v-model="repairObj.detail_endtime" @on-change="settime($event,'detail_endtime')"></Date-picker>
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
        park_id:null,
        detail_platenumber:"",
        detail_carversion:"",
        detail_caremissions:"",
        detail_starttime:"",
        detail_endtime:""
      },
      repairRules:{
        park_id:[{
          type:'number',
          required:true,
          message:'停车场为必选项目',
          trigger:'change'          
        }],
        detail_platenumber:[{
          required:true,
          message:'车牌号必填',
          trigger:'blur'
        },{
          min:5,
          max:10,
          message:'长度介于5-10个字符之间',
          trigger:'blur'
        }],
        detail_carversion:[{
          required:true,
          message:'品牌型号必填',
          trigger:'blur'
        }],
        detail_starttime:[{
          type:'string',
          required:true,
          message:'开始时间必填',
          trigger:'change'
        }],
        detail_endtime:[{
          type:'string',
          required:true,
          message:'结束时间必填',
          trigger:'change'
        }],
      },
      cols:[{
        type:'index',
        width:30,
        align:'center'
      },{
        key:'detail_platenumber',
        title:'车牌号',  
        width:180     
      },{
        key:'detail_carversion',
        title:'品牌型号',
        
      },{
        key:'detail_caremissions',
        title:'排量',
        width:80
      },{
        key:'detail_starttime',
        title:'开始时间',
        width:120
      },{
        key:'detail_endtime',
        title:'结束时间',
        width:120
      },{
        key:'detail_status',
        title:'车位状态',
        width:90,
        render:(h,p)=>{
          let arr=["","申请中","租用中","结束租用","申请未通过"];
          return h('span',{},arr[p.row.detail_status]);
        }
      }],
      parkList:[],
      datas:[{
        detail_platenumber:'川A F724v',
        detail_carversion:'梅赛德斯-奔驰',
        detail_carversion:'S300',
        detail_caremissions:'3.0L',
        detail_starttime:'2017-06-23',
        detail_endtime:'2017-09-22',
        detail_status:2
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
      this.$http.post('/web/ParkServe/findParkstationDetailList',this.pageObj).then((res)=>{
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
      console.log(this.repairObj);
      this.$refs.addForm.validate((valid)=>{
        if (valid) {
          this.$http.post('/web/ParkServe/addParkstationInfo',this.repairObj).then((res)=>{
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
    },
    // 获取停车场信息
    getParkList(){
       this.$http.post('/web/ParkServe/findParkList',{pi:1,ps:50}).then((res)=>{
        if (res.data.b==1) {          
          this.parkList=res.data.a;
        }else{
          this.$handleError(res);
        }
      })     
    },
    settime(value,key){
      this.repairObj[key]=value;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
