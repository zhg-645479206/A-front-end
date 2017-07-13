/* 
* @Author: anchen
* @Date:   2017-07-14 03:18:22
* @Last Modified by:   anchen
* @Last Modified time: 2017-07-14 03:19:06
*/

#include <stdio.h>

int main() {

    class CSingleton
    {
    private:
        CSingleton() //构造函数是私有的
        {
        }
    public:
        static CSingleton * GetInstance()
        {
            static CSingleton *m_pInstance;
            if(m_pInstance == NULL) //判断是否第一次调用
                m_pInstance = new CSingleton();
            return m_pInstance;
        }
    };
    
    return 0;
}

