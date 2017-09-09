<template>
  <div class="layout-content">
    <div class="layout-breadcrumb">
      <p class="main-title">
        <span class="main-title-color">
          <Icon type="home"></Icon>
        </span>
        <span class="main-title-text">园区服务-办公室租赁信息</span>
      </p>
    </div>
    <div class="layout-content-main">
      <div class="item-block-title clients-title">
  
        办公室租用信息
      </div>
      <Table :columns="cols" :data="datas" :height="tableHeight" show-footer>
        <div slot="footer">
          <Page :total="total" style="float:right;margin-right:20px;" @on-change="changePage($event)"></Page>
        </div>
      </Table>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      cols:[{
        type:'index',
        width:40
      }, {
        title:'办公室编号',
        key:'officearea_no',
      },{
        title:'办公室面积',
        key:'officearea_area',
      },{
        title:'办公室类型',
        key:'officearea_type',
        render:(h,p)=>{
          let arr=["","单独办公室","公共办公室",'会议室',"公共休息区","其他"];
          return h('span',{},arr[p.row.officearea_type]);
        }
      },{
        title:'开始时间',
        key:'starttime',
      },{
        title:'到期时间',
        key:'endtime',
      }],
      datas:[],
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

    getRepairList(){
      this.$http.post('/web/ParkServe/findRentOfficeList',this.pageObj).then((res)=>{
        if (res.data.b==1) {
          this.total=res.data.page.total
          this.datas=res.data.a;
        }else{
          this.$handleError(res);
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
