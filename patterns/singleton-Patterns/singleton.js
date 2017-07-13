var Singleton = function () {

    /* 私有信息 */
    var privateInfo = 'private info';

    /* 闭包操作私有信息 */
    function showPrivate() {
        console.log(privateInfo);
    }

    /* 公有对象暴露接口*/
    return {
        publicMethod: function () {
            showPrivate();
        },
        publicVar: 'the public can see this!'
    };
};

var single = mySingleton();
single.publicMethod();         // 输出 'something private'
console.log(single.publicVar); // 输出 'the public can see this!'


/*
  升级版 实现目标:结合静态初始化和缓存实例，节约开销，减少程序运行处理，提升速度。
 */

var Singleton = (function () {
    var instantiated;
    function init() {
        /*单例代码*/
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();


/*
    高级版 静态公有对象结合缓存实例与(new)构造函数暴露出公有单例
 */
var SingletonTester = (function () {

    //参数：传递给单例的一个参数集合
    function Singleton(args) {

        //设置args变量为接收的参数或者为空（如果没有提供的话）
        var args = args || {};
        //设置name参数
        this.name = 'SingletonTester';
        //设置pointX的值
        this.pointX = args.pointX || 6; //从接收的参数里获取，或者设置为默认值
        //设置pointY的值
        this.pointY = args.pointY || 10;

    }

    //实例容器
    var instance;

    var _static = {
        name: 'SingletonTester',

        //获取实例的方法
        //返回Singleton的实例
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
    return _static;
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.pointX);        // 输出 5 