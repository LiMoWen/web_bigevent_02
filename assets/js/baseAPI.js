//拦截所有ajax请求：get/pots/ajax；处理参数
$.ajaxPrefilter(function (options) {
    //拼接对应环境的服务器地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //同一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //3.拦截所有响应，判断身份认证信息
    options.complete = function (res) {
        //判断，如果身份认真失败，跳转回登录页面
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //1.删除本地token
            localStorage.removeItem("token");
            //2.跳转页面
            location.href = '/login.html';
        }
    }

})
