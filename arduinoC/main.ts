

//% color="#0fbd8c" iconWidth=50 iconHeight=40
namespace CloudVariable{

    //% board="esp32,firebeetleesp32,fireBeetleEsp32E"
    //% block="Wi-Fi连接到 热点:[NAME] 密码:[PSWD] 直到成功" blockType="command"
    //% NAME.shadow="string" NAME.defl="yourSSID"
    //% PSWD.shadow="string" PSWD.defl="yourPASSWD"
    export function setespWiFi(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let pswd=parameter.PSWD.code;
        Generator.addInclude("includecvh", `#include <DFRobot_HTTPClient.h>\n#include <DFRobot_Iot.h>\nDFRobot_Iot myIot;\nDFRobot_HTTPClient http;\n#define CLOUD_VAR_ESP\n#include "Cloud_Variable.h"`);

        Generator.addCode(`myIot.wifiConnect(${name}, ${pswd});\nwhile (!myIot.wifiStatus()) {yield();}`)
        
        
    }
    //% board="esp32,firebeetleesp32,fireBeetleEsp32E"
    //% block="读取MAC地址" blockType="reporter"
    export function getMac(parameter: any, block: any) {
        Generator.addSetup("setmac",`device_mac = getMacAddress();`)
        Generator.addCode(`device_mac`);
        
        
    }

    
    //% block="---"
    export function noteSep() {

    }

    //% block="向服务器上传变量[NAME]值为[VAL]" blockType="command"
    //% NAME.shadow="string" NAME.defl="val"
    //% VAL.shadow="number" VAL.defl="123"
    export function set(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let val=parameter.VAL.code;

        Generator.addSetup("setmac",`device_mac = getMacAddress();`)
        Generator.addCode(`post_cloud_set(${name},String(${val}));`)
        
        
    }

    //% block="从服务器读取变量[NAME]的值" blockType="reporter"
    //% NAME.shadow="string" NAME.defl="val"
    export function read(parameter: any, block: any) {
        let name=parameter.NAME.code;
        Generator.addSetup("setmac",`device_mac = getMacAddress();`)
        Generator.addCode(`post_cloud_get(${name})`)
    }

    //% block="清除服务器数据" blockType="command"
    export function clear(parameter: any, block: any) {
        Generator.addSetup("setmac",`device_mac = getMacAddress();`)
        Generator.addCode(`post_cloud_clear();`)

    }

    function replaceQuotationMarks(str:string){
            str=str.replace(/"/g, ""); //去除所有引号
            return str
    }


    
}
