

//% color="#0fbd8c" iconWidth=50 iconHeight=40
namespace CloudVariable{

    //% board="esp32,firebeetleesp32,firebeetleesp32e,fireBeetleEsp32E"
    //% block="Wi-Fi连接到 热点:[NAME] 密码:[PSWD] 直到成功" blockType="command"
    //% NAME.shadow="string" NAME.defl="yourSSID"
    //% PSWD.shadow="string" PSWD.defl="yourPASSWD"
    export function setWiFi(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let pswd=parameter.PSWD.code;
        Generator.addInclude("includecvh", `#include <DFRobot_HTTPClient.h>\n#include <DFRobot_Iot.h>\nDFRobot_Iot myIot;\nDFRobot_HTTPClient http;\n#define CLOUD_VAR_ESP32\n#include "Cloud_Variable.h"`);

        Generator.addCode(`myIot.wifiConnect(${name}, ${pswd});\nwhile (!myIot.wifiStatus()) {yield();}`)
        
        
    }
    
    
    //% board="arduino,arduinonano"
    //% block="Obloq http初始化 [HSSerial] Rx(绿)[RX] Tx(蓝)[TX]" blockType="command"
    //% HSSerial.shadow="dropdown"   HSSerial.options="HSSerial" 
    //% RX.shadow="dropdown" RX.options="PIN_DigitalRead" 
    //% TX.shadow="dropdown" TX.options="PIN_DigitalWrite" 
    export function setObloqPinUno(parameter: any, block: any) {
        let hs=parameter.HSSerial.code;
        let rx=parameter.RX.code;
        let tx=parameter.TX.code;
        Generator.addInclude("includecvh", `#include <UNO_Obloq.h>\nUNO_Obloq olq;\n#define CLOUD_VAR_OBLOQ\n#include "Cloud_Variable.h"`);
         
        //console.log(hs)
        if(hs=="SSerial"){
            Generator.addInclude("includess", "#include <SoftwareSerial.h>");
            Generator.addObject(`ssobject`, `SoftwareSerial`, `softSerial(${rx}, ${tx});`);
            Generator.addCode(`softSerial.begin(9600);\nolq.startConnect(&softSerial, WiFi_Name, WiFi_PSWD, "iot.openblock.online:81", 81);`)
        }else if(hs=="HSerial"){
            Generator.addCode(`olq.startConnect(${rx}, ${tx}, WiFi_Name, WiFi_PSWD, "iot.openblock.online:81", 81);`)
        }
        
    }

    //% board="microbit"
    //% block="Obloq http初始化 [HSSerial] Rx(绿)[RX] Tx(蓝)[TX]" blockType="command"
    //% HSSerial.shadow="dropdown"   HSSerial.options="HSSerial" 
    //% RX.shadow="dropdown" RX.options="PIN_DigitalRead" 
    //% TX.shadow="dropdown" TX.options="PIN_DigitalWrite" 
    export function setObloqPinBit(parameter: any, block: any) {
        let hs=parameter.HSSerial.code;
        let rx=parameter.RX.code;
        let tx=parameter.TX.code;
        Generator.addInclude("includecvh", `#include <Microbit_Obloq.h>\nMicrobit_Obloq olq;\n#define CLOUD_VAR_OBLOQ\n#include "Cloud_Variable.h"`);
        //console.log(hs)
        if(hs=="SSerial"){
            Generator.addInclude("includess", "#include <SoftwareSerial.h>");
            Generator.addObject(`ssobject`, `SoftwareSerial`, `softSerial(${rx}, ${tx});`);
            Generator.addCode(`softSerial.begin(9600);\nolq.startConnect(&softSerial, WiFi_Name, WiFi_PSWD, "iot.openblock.online:81", 81);`)
        }else if(hs=="HSerial"){
            Generator.addCode(`olq.startConnect(${rx}, ${tx}, WiFi_Name, WiFi_PSWD, "iot.openblock.online:81", 81);`)
        }
        
    }

    //% board="leonardo,mega2560"
    //% block="Obloq http初始化 [HSSerial] Rx(绿)[RX] Tx(蓝)[TX]" blockType="command"
    //% HSSerial.shadow="dropdown"   HSSerial.options="HSSerial" 
    //% RX.shadow="dropdown" RX.options="PIN_DigitalRead" 
    //% TX.shadow="dropdown" TX.options="PIN_DigitalWrite" 
    export function setObloqPin(parameter: any, block: any) {
        let hs=parameter.HSSerial.code;
        let rx=parameter.RX.code;
        let tx=parameter.TX.code;
        Generator.addInclude("includecvh", `#include <DFRobot_Obloq.h>\nDFRobot_Obloq olq;\n#define CLOUD_VAR_OBLOQ\n#include "Cloud_Variable.h"`);

        //console.log(hs)
        if(hs=="SSerial"){
            Generator.addInclude("includess", "#include <SoftwareSerial.h>");
            Generator.addObject(`ssobject`, `SoftwareSerial`, `softSerial(${rx}, ${tx});`);
            Generator.addCode(`softSerial.begin(9600);\nolq.startConnect(&softSerial, WiFi_Name, WiFi_PSWD, "iot.openblock.online:81", 81);`)
        }else if(hs=="HSerial"){
            Generator.addCode(`olq.startConnect(${rx}, ${tx}, WiFi_Name, WiFi_PSWD, "iot.openblock.online:81", 81);`)
        }
        
    }

        
    //% board="arduino,microbit,arduinonano,leonardo,mega2560"
    //% block="Wi-Fi连接到 热点:[NAME] 密码:[PSWD] 直到成功" blockType="command"
    //% NAME.shadow="string" NAME.defl="yourSSID"
    //% PSWD.shadow="string" PSWD.defl="yourPASSWD"
    export function setObloqWiFi(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let pswd=parameter.PSWD.code;

        Generator.addObject(`wifiname`, `String`,`WiFi_Name=${name};`);
        Generator.addObject(`wifipswd`, `String`,`WiFi_PSWD=${pswd};`);
        
        
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
