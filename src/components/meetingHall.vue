<template>
  <div class="layout-content">
    <div class="layout-breadcrumb">
      <p class="main-title">
        <span class="main-title-color">
          <Icon type="ios-people"></Icon>
        </span>
        <span class="main-title-text">园区服务-会议室租用</span>
      </p>
    </div>
    <div class="layout-content-main">
      <div class="item-block-title clients-title">
  
        会议室申请记录
        <Button type="primary" @click="addRepair" style="float:right;margin-right:10px;">申请会议室</Button>
      </div>
      <Table :columns="cols" :data="datas" :height="tableHeight" show-footer>
        <div slot="footer">
          <Page :total="total" style="float:right;margin-right:20px;" @on-change="changePage($event)"></Page>
        </div>
      </Table>
    </div>

    <Modal title="会议室申请" v-model="isShowAddRepair">
     <Form :model="repairObj" :rules="repairRules" label-position="right" :label-width="80" ref="addForm">
       <Form-item label="会议室" prop="park_id">
         <Select v-model="repairObj.selected_index">
           <Option v-for="(item,index) in parkList" :key="item.officearea_id" :value="index">{{item.officearea_alias}}(编号：{{item.officearea_no}}容量: {{item.officearea_area}})</Option>
         </Select>
       </Form-item>
       <Form-item label="租用日期" prop="detail_day">
         <Date-picker type="date" placeholder="选择日期" v-model="repairObj.detail_day" @on-change="settime($event,'detail_day')"></Date-picker>
       </Form-item>
       <Form-item label="开始时间" prop="detail_starttime">
         <Time-picker type="time" format="HH:mm" placeholder="选择时间"  @on-change="settime($event,'detail_starttime')"></Time-picker>
        
       </Form-item>
       <Form-item label="结束时间" prop="detail_endtime">
         <Time-picker type="time" format="HH:mm" placeholder="选择时间"  @on-change="settime($event,'detail_endtime')"></Time-picker>
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
        selected_index:0,
        // officearea_id:null,
        detail_day:"",
        detail_starttime:"",
        detail_endtime:""
      },
      repairRules:{
        selected_index:[{
          type:'number',
          required:true,
          message:'会议室必选',
          trigger:'change'          
        }],
        detail_day:[{
          required:true,
          message:'拟租用日期必填',
          trigger:'blur'
        }],
        detail_starttime:[{
          type:'string',
          required:true,
          message:'开始时间必填',
          trigger:'blur'
        }],
        detail_endtime:[{
          type:'string',
          required:true,
          message:'结束时间必填',
          trigger:'blur'
        }],
      },
      cols:[{
        key:'officearea_no',
        title:'会议室编号',  
        width:100     
      },{
        key:'officearea_alias',
        title:'会议室名称',
      },{
        key:'detail_day',
        title:'申请日期',
        width:120
      },{
        key:'detail_starttime',
        title:'开始时间',
        width:100
      },{
        key:'detail_endtime',
        title:'结束时间',
        width:100
      },{
        key:'detail_status',
        title:'目前状态',
        width:90,
        render:(h,p)=>{
          let arr=["","申请中","通过","不通过","撤销"];
          return h('span',{},arr[p.row.detail_status]);
        }
      },{
        type:'action',
        title:'操作',
        width:100,
        render:(h,p)=>{
          if(p.row.detail_status==1){
          return h('Button',{
            props:{
              type:'error',
              size:'small'
            },
            on:{
              click:()=>{
                this.cancelMeeting(p.row.detail_id,4);
              }
            }
          },'撤销')
          }else{
            return;
          }
        }
      }],
      parkList:[],
      datas:[{
        officearea_no:'101',
        officearea_alias:'3楼大会议室',
        detail_day:'2017-06-23',
        detail_starttime:'16:00',
        detail_endtime:'18:00',
        detail_status:1
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
    this.getRepairList();
    this.getParkList();
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
      this.$http.post('/web/ParkServe/findMeetingOfficeDetailList',this.pageObj).then((res)=>{
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
          let index=this.repairObj.selected_index||0;
          let officeObj=this.parkList[index];
          let obj=Object.assign(this.repairObj,officeObj);
          console.log(obj);
          return false;
      //console.log(this.repairObj);
      this.$refs.addForm.validate((valid)=>{
        if (valid) {
          let index=this.repairObj.selected_index||0;
          let officeObj=this.parkList[index];
          let obj=Object.assign(this.repairObj,officeObj);
          console.log(obj);
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
       this.$http.post('/web/ParkServe/findMeetingOfficeList',{pi:1,ps:50}).then((res)=>{
        if (res.data.b==1) {          
          this.parkList=res.data.a;
        }else{
          this.$handleError(res);
        }
      })     
    },
    settime(value,key){
      console.log(value);
      this.repairObj[key]=value;
    },
    cancelMeeting(id,value){
       this.$http.post('/web/ParkServe/updateOfficeAreaStatus',{detail_id:id,detail_status:4}).then((res)=>{
        if (res.data.b==1) {          
         this.getParkList();
        }else{
          this.$handleError(res);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
