 //拦截所有ajax请求：get/pots/ajax；处理参数
$.ajaxPrefilter(function (params) {
   //拼接对应环境的服务器地址
    params.url='http://ajax.frontend.itheima.net'+params.url
})