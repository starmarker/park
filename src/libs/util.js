// import Vue from 'vue';
// import iView from 'iview';
// import vueRouter from 'vue-router';

let util = {

};
util.title = function (title) {
    title = title ? title + ' - 主页' : 'smk-Crm系统';
    window.document.title = title;
};
util.FlatToNested = function(data, opt) {//树数据源扁平结构转嵌套
            opt = opt || {};
            var idField = opt.idField || 'id';
            var textField = opt.textField || 'title';
            var parentField = opt.parentField || 'parent_id';
            var i, l, treeData = [], tmpMap = [];
            for (i = 0, l = data.length; i < l; i++) tmpMap[data[i][idField]] = data[i];
            for (i = 0, l = data.length; i < l; i++) {
                if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
                    if (!tmpMap[data[i][parentField]]['children'])
                        tmpMap[data[i][parentField]]['children'] = [];
                    data[i]['title'] = data[i][textField];
                    tmpMap[data[i][parentField]]['children'].push(data[i]);
                } else {
                    data[i]['title'] = data[i][textField];
                    treeData.push(data[i]);
                }
            }
            return treeData;
        }
util.iviewMenu = function(data, opt,target) {//树数据源扁平结构转嵌套
            var opt = opt || {},target = target || {};
            var idField = opt.idField || 'id';
            var textField = opt.textField || 'title';
            var parentField = opt.parentField || 'parent_id';
            var targetId = target.targetId || 'value';
            var targetText = target.targetText || 'label';
            var i, l, treeData = [], tmpMap = [];
            for (i = 0, l = data.length; i < l; i++) tmpMap[data[i][idField]] = data[i];
            for (i = 0, l = data.length; i < l; i++) {
                if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
                    if (!tmpMap[data[i][parentField]]['children'])
                        tmpMap[data[i][parentField]]['children'] = [];
                    data[i][targetText] = data[i][textField];
                    data[i][targetId] = data[i][idField];
                    tmpMap[data[i][parentField]]['children'].push(data[i]);
                } else {
                    data[i][targetText] = data[i][textField];
                    data[i][targetId] = data[i][idField];
                    treeData.push(data[i]);
                }
            }
            return treeData;
        }
util.arrayToValue=function(array,value,comField,resultField){
    if (!array instanceof Array) {
        alert("第一个参数必须为数组");
        return false;
    }
    var comField=comField || 'value',resultField= resultField || "name",result="未知";
    array.map((obj)=>{
        if (obj[comField]==value) {
            result=obj[resultField];
        }
    })
    return result;

}
util.getBrowerType=function(){
        var agent = navigator.userAgent.toLowerCase() ;  
        var sUserAgent = navigator.userAgent;   
        var regStr_ie = /msie [\d.]+;/gi ;  
        var regStr_ff = /firefox\/[\d.]+/gi  
        var regStr_chrome = /chrome\/[\d.]+/gi ;  
        var regStr_saf = /safari\/[\d.]+/gi ;  
        //IE  
        if(agent.indexOf("msie") > 0)  
        {  
            return 'Inernet Explore';  
        }else if(agent.indexOf("firefox") > 0)  
        {  
            return 'FireFox';  
        } else if(agent.indexOf("chrome") > 0)  
        {  
            return 'Chorme';  
        }else if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)  
        {  
            return 'Safari' ;  
        } else{
            return '未知浏览器';
        }  

}
util.getOsType=function(){
       var sUserAgent = navigator.userAgent;   
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");   
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");   
        if (isMac) return "Mac";   
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;   
        if (isUnix) return "Unix";   
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);   
        var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";  
        if (isLinux) {  
        if(bIsAndroid) return "Android";  
        else return "Linux";   
        }  
        if (isWin) {   
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;   
        if (isWin2K) return "Win2000";   
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1  
        if (isWinXP) return "WinXP";   
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;   
        if (isWin2003) return "Win2003";   
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;   
        if (isWinVista) return "Win Vista";   
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;   
        if (isWin7) return "Win7";   
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;  
        if (isWin8) return "Win8"; 
        var isWin10=  sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1; 
        if(isWin10) return "Win10"; 
        else return "其他win系统";
        }    
    }
util.isPc=function(){
    	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return false
		}else{
            return true;
        }

}
util.inputType=function(id){
    var result={};
    switch (id){
        case 1:
            result.type= 'integer';
            result.typeName= '正整数';
            break;
        case 2:
            result.type= 'float';
            result.typeName= '浮点数';
            break;
        case 3:
            result.type= 'string';
            result.typeName= '字符串';
            break;
        case 4:
            result= 'string';
            result.typeName= '长文本';
            break;
        case 5:
            result.type= 'email';
            result.typeName= '邮箱';
            break;
        case 6:
            result.type= 'url';
            result.typeName= '网址';
            break; 
        case 7:
            result.type= 'string';
            result.typeName= '字符串';
            break;  
        case 8:
            result.type= 'string';
            result.typeName= '数值';
            break;
        case 9:
            result.type= 'array';
            result.typeName= '数组';
            break; 
        case 10:
            result.type= 'string';
            result.typeName= '时间格式';
            break; 
        case 11:
            result.type= 'integer';
            result.typeName= '选择项';
            break; 
        default:
           result.type= 'string'; 
           result.typeName= '字符串1';   
    }
    return result;
}
util.createRuleObj=function(arr){
    var result={};
    arr.map((obj)=>{
        var arr1=[];     
        var  type=util.inputType(obj.field_type).type,typeName=util.inputType(obj.field_type).typeName;
        var length=obj.field_length;
        var name=obj.field_name_show;
        var method=obj.field_type==8 || obj.field_type==9 ||obj.field_type==11?'change':'blur';
        result[obj.field_name_db]=arr1;
    var requiredObj={
        type:type,
        required:true,
        message:name+'为必填项，且类型为'+typeName,
        trigger:method
    };
        if (obj.field_isnull){
           arr1.push(requiredObj); 
        }
            var  tempObj={
                type:type,
                message:name+'长度最大为'+length,
                max:length,
                trigger:method
            }
            if (obj.field_type!=8 && obj.field_type!=11&&obj.field_type!=1&&obj.field_type!=2) {
                arr1.push(tempObj);  //下拉框id不做max验证
            }                   
    })
    return result;
}
export default util;