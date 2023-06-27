

//% color="#0fbd8c" iconWidth=50 iconHeight=40
namespace CloudVariable{

    //% board="esp32,firebeetleesp32,firebeetleesp32e,fireBeetleEsp32E"
    //% block="Wi-Fi连接到 热点:[NAME] 密码:[PSWD] 直到成功" blockType="command"
    //% NAME.shadow="string" NAME.defl="yourSSID"
    //% PSWD.shadow="string" PSWD.defl="yourPASSWD"
    export function setWiFi(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let pswd=parameter.PSWD.code;
        Generator.addInclude("includeiot", "#include <DFRobot_Iot.h>");
        Generator.addObject(`iotobject`, `DFRobot_Iot`, `myIot;`);
        Generator.addCode(`myIot.wifiConnect(${name}, ${pswd});\nwhile (!myIot.wifiStatus()) {yield();}`)
        
        
    }

    //% block="---"
    export function noteSep() {

    }


    //% block="设置设备地址[MAC]" blockType="command"
    //% MAC.shadow="string" MAC.defl="00-16-EA-AE-3C-40"
    export function setMac(parameter: any, block: any) {
        let mac=parameter.MAC.code;
        mac = mac.replace(/-/g, ""); // 将字符串中的-去除
        mac=replaceQuotationMarks(mac)
        mac="0000"+mac;

        Generator.addSetup("setmac",`device_mac = "${mac}";`)

    }

    //% block="向服务器上传变量[NAME]值为[VAL]" blockType="command"
    //% NAME.shadow="string" NAME.defl="val"
    //% VAL.shadow="number" VAL.defl="123"
    export function set(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let val=parameter.VAL.code;
        Generator.addInclude("includeh", `#include "Cloud_Variable.h"`);

        Generator.addCode(`post_cloud_set(${name},"${val}");`)
    }

    //% block="从服务器读取变量[NAME]的值" blockType="reporter"
    //% NAME.shadow="string" NAME.defl="val"
    export function read(parameter: any, block: any) {
        let name=parameter.NAME.code;
        Generator.addCode(`post_cloud_get(${name})`)
    }

    //% block="清除服务器数据" blockType="command"
    export function clear(parameter: any, block: any) {

    Generator.addCode(`post_cloud_clear();`)

    }


    function replaceQuotationMarks(str:string){
            str=str.replace(/"/g, ""); //去除所有引号
            return str
    }


    
}
