var Server = function (api) {

    api.Pagesize = 10;//table 每页条数
    api.api = "zcqapi";//nginx配置的服务端ip
    api.image_default = '/common/img/no-image.jpg';
    api.filepath = api.api + '/File';

    //*************************************************服务URL*******************************************************
    api.service = {

        //用户
        Login: api.api + '/UserManageService.asmx/Login',     //登录
        LogOff: api.api + '/UserManageService.asmx/LogOff',     //注销登录
        GetAllUser: api.api + '/UserManageService.asmx/GetAllUser',     //用户列表
        GetUserInfo: api.api + '/UserManageService.asmx/GetUserInfo',     //获取用户信息
        AddorEditUser: api.api + '/UserManageService.asmx/AddorEditUser',     //添加用户信息
        DelUser: api.api + '/UserManageService.asmx/DelUser',     //删除用户
        GetRole: api.api + '/UserManageService.asmx/GetRole',     //获取用户列表

        GetCondition: api.api + '/CommonManageService.asmx/GetCondition',     //获取已存在的查询条件 0省份 1申请年份 2获证年份
        GetMenuYears: api.api + '/CommonManageService.asmx/GetMenuYears',     //获取左侧菜单栏年份
        AddYears: api.api + '/CommonManageService.asmx/AddYears',     //添加年份
        DelYears: api.api + '/CommonManageService.asmx/DelYears',     //删除年份

        GetProvince: api.api + '/CommonManageService.asmx/GetProvince',     //获取左侧菜单栏省份
        AddProvince: api.api + '/CommonManageService.asmx/AddProvince',     //添加省份
        DelProvince: api.api + '/CommonManageService.asmx/DelProvince',     //删除省份
        
        GetClassifyList: api.api + '/CommonManageService.asmx/GetClassifyList',     //根据Type获取类别 0产品 1权限

        GetAllArchives: api.api + '/ArchivesManageService.asmx/GetAllArchives',     //获取档案列表
        GetArchivesInfoByID: api.api + '/ArchivesManageService.asmx/GetArchivesInfoByID',     //获取档案详情
        AddorEditArchives: api.api + '/ArchivesManageService.asmx/AddorEditArchives',     //提交档案信息
        Operation: api.api + '/ArchivesManageService.asmx/Operation',     //是否公开，核销，删除 Type 0是否删除操作 1是否公开操作 2是否核销操作 
        GetArchivesCountByYear: api.api + '/ArchivesManageService.asmx/GetArchivesCountByYear',     //数据统计列表
        GetCountByClassifyId: api.api + '/ArchivesManageService.asmx/GetCountByClassifyId',     //数据统计扇形图列表
       
        FullTextSearch: api.api + '/ArchivesManageService.asmx/FullTextSearch',     //全文检索

        UploadAll: api.api + '/UploadManageService.asmx/UploadAll',     //文件上传
        

    },


    //****************************************************用户信息********************************************************
    //保存登录信息
    api.setUserLogin = function (user) {
        localStorage.setItem("userID", user.ID || '');
        localStorage.setItem("loginTime", new Date().getTime());
        localStorage.setItem("userName", user.Name || '');
        localStorage.setItem("user", JSON.stringify(user) || '{}');
    },
    //获取登录信息
     api.getUserLoginData = function () {
         var lastTime = localStorage.getItem("loginTime");
         var currentTime = new Date().getTime();
         if (!lastTime || currentTime - parseInt(lastTime) > 12 * 60 * 60 * 1000) {
             this.setUserLogout();
         }
         localStorage.setItem("loginTime", new Date().getTime());
         return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
     },
    //获取用户id
    api.getUserId = function () {
        var lastTime = localStorage.getItem("loginTime");
        var currentTime = new Date().getTime();
        if (!lastTime || currentTime - parseInt(lastTime) > 6 * 60 * 60 * 1000) {
            this.setUserLogout();
            return null;
        } else {
            localStorage.setItem("loginTime", new Date().getTime());
            return localStorage.getItem("userID");
        }

    },
    // 获取用户name
    api.getUserName = function () {
        return localStorage.getItem("userName");
    },
    //清空
    api.setUserLogout = function () {
        localStorage.clear();
        //localStorage.hasOwnProperty('name')
        //localStorage.removeItem("name");
    },



    //****************************************************获取URL地址中的特定参数****************************************
    //@param name 参数名称
    //@returns {*} 参数值，如果参数不存在，返回null
    api.getUrlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(decodeURIComponent(window.location.href));
        if (results == null) {
            return null;
        }
        else {
            return results[1] || '';
        }
    }

    return api;
}
(Server || {});