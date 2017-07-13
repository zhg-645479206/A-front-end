/*
第一种形式:懒汉式，也是常用的形式。
 */
public class SingletonClass{
    private static SingletonClass instance=null;
    public static　synchronized　SingletonClass getInstance(){
        if(instance==null){
               instance=new SingletonClass();
        }
        return instance;
    }
    private SingletonClass(){
    }
}

/*
第二种形式:饿汉式
 */
//对第一行static的一些解释
// java允许我们在一个类里面定义静态类。比如内部类（nested class）。
//把nested class封闭起来的类叫外部类。
//在java中，我们不能用static修饰顶级类（top level class）。
//只有内部类可以为static。
public class Singleton{
    //在自己内部定义自己的一个实例，只供内部调用
    private static final Singleton instance = new Singleton();
    private Singleton(){
        //do something
    }
    //这里提供了一个供外部访问本class的静态方法，可以直接访问
    public static Singleton getInstance(){
        return instance;
    }
}

/*
第三种形式: 双重锁的形式。
 */
public class Singleton{
    private static volatile Singleton instance=null;
    private Singleton(){
        //do something
    }
    public static  Singleton getInstance(){
        if(instance==null){
            synchronized(SingletonClass.class){
                if(instance==null){
                    instance=new Singleton();
                }
            }
        }
        return instance;
     }
}
//这个模式将同步内容下方到if内部，提高了执行的效率，不必每次获取对象时都进行同步，只有第一次才同步，创建了以后就没必要了。
//这种模式中双重判断加同步的方式，比第一个例子中的效率大大提升，因为如果单层if判断，在服务器允许的情况下，
//假设有一百个线程，耗费的时间为100*（同步判断时间+if判断时间），而如果双重if判断，100的线程可以同时if判断，理论消耗的时间只有一个if判断的时间。
//所以如果面对高并发的情况，而且采用的是懒汉模式，最好的选择就是双重判断加同步的方式。