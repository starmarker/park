<template>
  <div class="layout-content">
    <div class="layout-breadcrumb">
      <p class="main-title">
        <span class="main-title-color">
          <Icon type="social-usd-outline"></Icon>
        </span>
        <span class="main-title-text">园区服务-费用查看</span>
      </p>
    </div>
    <div class="layout-content-main">
      <div class="item-block-title clients-title">
  
        近期费用列表
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
        title:'费用名称',
        key:'account_name',
      },{
        title:'开始时间',
        key:'charging_starttime',
      },{
        title:'结束时间',
        key:'charging_endtime',
      },{
        title:'应缴金额',
        key:'feepayable',
      },{
        title:'已缴金额',
        key:'paidamount',
      },{
        title:'截至日期',
        key:'charging_closingdate',
      }],
      datas:[{
        account_name:'租金',
        charging_starttime:'2017-07-09',
        charging_endtime:'2017-09-08',
        feepayable:'2000',
        paidamount:'1000',
        charging_closingdate:'2017-09-15'
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

    getRepairList(){
      this.$http.post('/web/ParkServe/findBillList',this.pageObj).then((res)=>{
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
