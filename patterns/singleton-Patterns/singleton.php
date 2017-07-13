<?php
class test {
    private static $_instance;//保存类实例的私有静态成员变量
    //定义一个私有的构造函数，确保单例类不能通过new关键字实例化，只能被其自身实例化
    private final function __construct() {
        echo 'test __construct';
    }
    //定义私有的__clone()方法，确保单例类不能被复制或克隆
    private function __clone() {}
    public static function getInstance() {
        //检测类是否被实例化
        if ( ! (self::$_instance instanceof self) ) {
            self::$_instance = new test();
        }
        return self::$_instance;
    }
}
//调用单例类
test::getInstance();