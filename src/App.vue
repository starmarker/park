<style scoped>
    @import 'assets/style/common.css';
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="4" class="layout-menu-left">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['/']" accordion @on-select="routerJump">
                    <div class="layout-logo-left"></div>
                    <Menu-item name="/">
                        <Icon type="home"></Icon>
                        <span class="layout-text">首页</span>
                    </Menu-item>
                    <Submenu name="1">
                        <template slot="title">
                           <Icon type="paper-airplane"></Icon>
                            企业服务
                        </template>
                        <Menu-item name="proxy">财务代理</Menu-item>
                        <Menu-item name="policy">政策咨询</Menu-item>
                        <Menu-item name="finance">融资服务</Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="at"></Icon>
                            园区服务
                        </template>
                        <Menu-item name="repair">报修服务</Menu-item>
                        <Menu-item name="fee">费用查看</Menu-item>
                        <Menu-item name="parking">车位申请</Menu-item>
                        <Menu-item name="meetingHall">会议室租用</Menu-item>
                        <Menu-item name="offices">办公室续租</Menu-item>
                    </Submenu>

                </Menu>
            </i-col>
            <i-col span="20">
                <div class="layout-header"></div>
                  <router-view></router-view>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
          return {
          }
        },
        updated(){
          this.fixHeight();
        },
        computed:{
            contentHeight() {
                let pHeight=document.body.scrollHeight-200;
                let bheight = document.body.clientHeight;
                let cheight=pHeight>bheight?pHeight:bheight;
                return (cheight-140);
            },          
        },
        methods:{
            routerJump(s) {
                this.$router.push(s);
            },
            fixHeight() {
                let ele = document.querySelector('.layout-content');
                let ele1 = document.querySelector('.layout-content-main');
                let ele2 = document.querySelectorAll('.item-block');
                if (ele) {
                    ele.style.height = (this.contentHeight-20) + 'px';
                }
                if (ele1) {
                    ele1.style.height = (this.contentHeight-80)+'px';
                } 
                console.log(ele2);
                if (ele2) {
                    [].forEach.call(ele2, function(obj) {
                        console.log(obj);
                        obj.style.height = (this.contentHeight - 140) + 'px';
                    }, this);
                }
            }, //修正内容高度            
        }
    }
</script>