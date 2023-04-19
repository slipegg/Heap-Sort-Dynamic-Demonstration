function get_real_number(a) { //通过字符串得到真正的数字
    var temp = '';
    var i = 0;
    while (a[i] != '·' && i < a.length) { //排除·
        temp += a[i];
        i++;
    }
    return parseInt(temp, 10)
}

function Max_Heapify(tree, start, end) {
    var parent = start;
    var child = parent * 2 + 1;
    while (child <= end) { //防止出界
        if (child + 1 <= end && get_real_number(tree[child]) < get_real_number(tree[child + 1])) //使得左右儿子中最大的值在child中
        {
            child += 1;
        }
        if (get_real_number(tree[parent]) < get_real_number(tree[child])) // 父节点小于子节点则交换值
        {
            var t = tree[parent];
            tree[parent] = tree[child];
            tree[child] = t;
            parent = child;
            child = parent * 2 + 1;
        } else { //交换完毕
            break;
        }
    }
    return tree;
};

function heap_sort(tree) {
    var used_tree = []; //每一步遍历的数组
    var used_head = []; //每一步遍历后排除的
    var first = Math.floor(tree.length / 2) - 1; //得到第一个非子节点坐标
    for (var i = first; i >= 0; i--) {
        tree = Max_Heapify(tree, i, tree.length - 1)
    };
    used_tree.push(deepClone(tree));
    used_head.push([]);
    for (var j = tree.length - 1; j >= 0; j--) {
        var t = tree[0]; //交换堆顶和最后一个
        tree[0] = tree[j];
        tree[j] = t;
        tree = Max_Heapify(tree, 0, j - 1);
        var tt = [];
        var th = [];
        for (var i = 0; i < tree.length; i++) { //将结果记录
            if (i < j) {
                tt.push(tree[i]);
            } else {
                th.push(tree[i]);
            }
        }
        used_tree.push(deepClone(tt));
        used_head.push(deepClone(th));
    };
    var res = [];
    res.push(used_tree); //统一放入res中返回
    res.push(used_head);
    return res;
};

function deepClone(target) { //深度克隆
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
};

function same_num(list, a) { //a在list中的相同数量
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == a) {
            sum++;
        }
    }
    return sum;
}

function get_name(name, used_data) { //得到name，如果used_data中有相同的name，就往name中加入·
    var same_len = same_num(used_data, name);
    for (var i = 0; i < same_len; i++) {
        name += '·';
    }
    return name;
}

function draw_tree(t) { //绘制二叉树
    var init_chartDom = document.getElementById('main'); //定位
    var init_myChart = echarts.init(init_chartDom);
    var option;
    var f_data = [];
    var temp = {
        name: '',
        x: 0,
        y: 0
    };
    //对节点定位，添加
    var w = 2000;
    var depth = Math.ceil(Math.log(t.length + 1) / Math.log(2));
    var width = w / (Math.pow(2, depth - 1) + 1);
    var k = 1;
    for (var x = 1; x <= depth; x++) {
        var start_x = Math.pow(2, depth - x - 1) * width + width / 2;
        var width_x = Math.pow(2, depth - x) * width;
        while (k < Math.pow(2, x) && k <= t.length) {
            var tt = deepClone(temp);
            tt.x = start_x + (k - Math.pow(2, x - 1)) * width_x;
            tt.y = 200 * x;
            tt.name = t[k - 1];
            f_data.push(tt);
            k++;
        }
    }
    //加入连线数据
    var f_link = [];
    var link_temp = {
        source: "",
        target: ""
    };
    for (var i = 1; i < Math.pow(2, depth - 1); i++) {
        var lc = i * 2;
        var rc = i * 2 + 1;
        if (lc <= t.length) {
            lt = deepClone(link_temp);
            lt.source = t[i - 1];
            lt.target = t[lc - 1];
            f_link.push(lt);
        }
        if (rc <= t.length) {
            rt = deepClone(link_temp);
            rt.source = t[i - 1];
            rt.target = t[rc - 1];
            f_link.push(rt);
        }
    }

    //配置绘图基础设置
    option = {
        tooltip: {
            show: true // 是否显示
        },
        series: [{
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: true
            },
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 40
            },
            data: f_data,
            links: f_link,

            symbolSize: 37, //节点大小为17
            itemStyle: { //给所有节点的类型一个默认样式，特殊的可在其节点下单独修改样式
                color: "#ffffff", //颜色默认白色
                borderColor: "#ff0000" //边框默认绿色

            },
            label: { //标签
                show: true,
                position: 'inside',
            },
            lineStyle: { //线条
                width: 6,
                color: '#ff0000'
            },
            scaleLimit: { //放缩限制
                min: 0.8,
                max: 10
            },
        }]
    };
    option && init_myChart.setOption(option);
}

function draw_head(head) { //绘制头部
    var init_chartDom = document.getElementById('res');
    var init_myChart = echarts.init(init_chartDom);
    var option;
    var f_data = [];
    var temp = {
        name: '',
        x: 0,
        y: 0
    };
    var f_link = [];
    var link_temp = {
        source: "",
        target: ""
    };
    //节点和连线信息
    var w = 2000;
    var width = w / (head.length + 1);
    for (var i = 0; i < head.length; i++) {
        var tt = deepClone(temp);
        tt.name = head[i];
        tt.x = width * (i + 1);
        tt.y = 200;
        f_data.push(tt);
        if (i < head.length - 1) {
            var tl = deepClone(link_temp);
            tl.source = head[i].toString();
            tl.target = head[i + 1].toString();
            f_link.push(tl);
        }
    }
    var res_txt = '';
    for (var i = 0; i < head.length; i++) {
        res_txt = res_txt + get_real_number(head[i]) + " ";
    }
    //绘图配置项
    option = {
        tooltip: {
            show: true // 是否显示
        },
        title: {
            text: '排序结果:' + res_txt,
            padding: [20, 20, 100, 100],
        },
        series: [{
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: true
            },
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 40
            },
            data: f_data,
            links: f_link,

            symbolSize: 37, //节点大小为17
            itemStyle: { //给所有节点的类型一个默认样式，特殊的可在其节点下单独修改样式
                color: "#ffffff", //颜色默认白色
                borderColor: "#ff0000" //边框默认绿色

            },
            label: {
                show: true,
                position: 'inside', //['50%', '50%'], //
            },
            lineStyle: {
                width: 10,
                color: "#ff0000"
            },
            scaleLimit: {
                min: 0.8,
                max: 10
            },
        }]
    };
    option && init_myChart.setOption(option);
};

function get_number() {
    //得到要排序的数据
    var number = document.getElementsByClassName("number");
    var res = [];
    for (var i = 0; i < number.length; i++) {
        res.push(number[i].value);
    }
    res2 = [];
    var used_data = [];
    for (var i = 0; i < res.length; i++) {
        var temp = get_name(res[i], used_data);
        res2.push(temp);
        used_data.push(res[i]);
    }

    return res2;
}

function get_time() {
    //得到间隙时间
    var number = document.getElementById("time_set");
    if (number.value == '') {
        return 2000;
    } else {
        return parseInt(number.value, 10);
    }
}

function dui_draw() { //绘制
    var numbers = get_number();
    var d_time = get_time();
    draw_tree(numbers); //初始绘制
    close_win();
    var used_tree, used_head, res;
    res = heap_sort(numbers); //堆排序
    used_tree = res[0];
    used_head = res[1];
    var i = 0;
    var test = window.setInterval(function() { //间隔绘制
        draw_tree(used_tree[i]);
        draw_head(used_head[i++]);
    }, d_time);
}