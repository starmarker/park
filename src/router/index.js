const routers = [
    {
        path: '/',
        meta: {
            title: 'smk园区管理页面'
        },
        component: (resolve) => require(['../components/Hello.vue'], resolve)
    },
    {
        path: '/proxy',
        meta: {
            title: 'smk园区财务代理服务'
        },
        component: (resolve) => require(['../components/proxy.vue'], resolve)
    },
    {
        path: '/policy',
        meta: {
            title: 'smk园区政策咨询服务'
        },
        component: (resolve) => require(['../components/policy.vue'], resolve)
    },
    {
        path: '/finance',
        meta: {
            title: 'smk园区融资服务'
        },
        component: (resolve) => require(['../components/finance.vue'], resolve)
    },
    {
        path: '/repair',
        meta: {
            title: 'smk园区服务-报修服务'
        },
        component: (resolve) => require(['../components/repair.vue'], resolve)
    },
    {
        path: '/fee',
        meta: {
            title: 'smk园区服务-费用查看'
        },
        component: (resolve) => require(['../components/fee.vue'], resolve)
    },
    {
        path: '/parking',
        meta: {
            title: 'smk园区服务-停车位申请'
        },
        component: (resolve) => require(['../components/parking.vue'], resolve)
    },
    {
        path: '/meetingHall',
        meta: {
            title: 'smk园区服务-会议室申请'
        },
        component: (resolve) => require(['../components/meetingHall.vue'], resolve)
    },
    {
        path: '/offices',
        meta: {
            title: 'smk园区服务-办公室续租'
        },
        component: (resolve) => require(['../components/offices.vue'], resolve)
    },
    ]

export default routers;
