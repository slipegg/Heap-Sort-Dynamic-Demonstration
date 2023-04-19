function add_number_k() { //增加填写数据的文本框
    var sum = parseInt(document.getElementById("sum").value, 10); //定位
    var start = document.getElementById("start");
    var add_txt = '<img src="./static/红圆.png" class="imglv">\
    <input type="text" class="number" placeholder="请输入数值" onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')">\
    <div class="fengge"></div>'
    if (sum == '') {
        alert('无数字');
    } else {
        for (var i = 0; i < sum; i++) {
            start.insertAdjacentHTML('AfterEnd', add_txt); //添加
        }
    }
    var t = document.getElementsByClassName("fengge");
    t[t.length - 1].insertAdjacentHTML('AfterEnd', '<input type=button onclick="dui_draw()" id="sousuo" value="开始排序">');
    var ts = document.getElementById("sousuo");
    ts.insertAdjacentHTML('AfterEnd', '<input type="text" id="time_set" placeholder="动画停留时间，默认2000ms" onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')">');

}

function close_win() { //关闭窗口
    var n = document.getElementsByClassName("number"); //定位
    var f = document.getElementsByClassName("fengge");
    var img = document.getElementsByClassName("imglv");
    var ss = document.getElementById("sousuo");
    var ts = document.getElementById("time_set");
    //移除文本框
    ss.remove();
    ts.remove();
    var l = n.length;
    for (var i = 0; i < l; i++) {
        n[0].remove();
        f[0].remove();
        img[0].remove();
    }
    var sum = document.getElementById("sum");
    sum.value = '';
}