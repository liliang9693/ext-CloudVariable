

//% color="#0fbd8c" iconWidth=50 iconHeight=40
namespace CloudVariable{
    //% block="读取MAC地址" blockType="reporter"
    export function getMac(parameter: any, block: any) {

        Generator.addDeclaration("getmac",`
def get_mac_address():
    import uuid
    mac_num = hex(uuid.getnode()).replace('0x', '').upper()
    return mac_num
device_mac = get_mac_address()
        `)
        Generator.addCode(`device_mac`);
        
        
    }

    //% block="---"
    export function noteSep() {

    }

    //% block="向服务器上传变量[NAME]值为[VAL]" blockType="command"
    //% NAME.shadow="string" NAME.defl="val"
    //% VAL.shadow="number" VAL.defl=123
    export function set(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let val=parameter.VAL.code;

        Generator.addDeclaration("getmac",`
def get_mac_address():
    import uuid
    mac_num = hex(uuid.getnode()).replace('0x', '').upper()
    return mac_num
device_mac = get_mac_address()
        `)

        Generator.addDeclaration(`def_post_cloud`,`def post_cloud(action='get',variable_name='test',variable_value=0):
    import requests
    import json
    global device_mac
    api_server = "http://iot.openblock.online:81"
    if action=='set':
        url = f"{api_server}/IotRecord/set/0000{device_mac}/{variable_name}/int64/{variable_value}"
        response = requests.post(url)
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
    elif action=='get': 
        url = f"{api_server}/IotRecord/get/0000{device_mac}/{variable_name}/int64"
        response = requests.post(url)
        if response.status_code == 200:
            data = response.json()
            return data['value']
        else:
            print(f"请求失败:{response.status_code}")    
    elif action=='clear':
        url = f"{api_server}/IotRecord/clear/0000{device_mac}"
        response = requests.post(url)
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
`)
Generator.addCode(`post_cloud(action='set',variable_name=${name},variable_value=${val})`)
    }

    //% block="从服务器读取变量[NAME]的值" blockType="reporter"
    //% NAME.shadow="string" NAME.defl="val"
    export function read(parameter: any, block: any) {
        let name=parameter.NAME.code;
        Generator.addDeclaration("getmac",`
def get_mac_address():
    import uuid
    mac_num = hex(uuid.getnode()).replace('0x', '').upper()
    return mac_num
device_mac = get_mac_address()
        `)
        Generator.addDeclaration(`def_post_cloud`,`def post_cloud(action='get',variable_name='test',variable_value=0):
    import requests
    import json
    global device_mac
    api_server = "http://iot.openblock.online:81"
    mac_hex = device_mac.replace("-", "")
    mac_hex = f"{int(mac_hex, 16):016X}"
    if action=='set':
        value_hex = format(variable_value, "016x")
        url = f"{api_server}/IotRecord/set/{mac_hex}/{variable_name}/int64/{variable_value}"
        response = requests.post(url)
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
    elif action=='get': 
        url = f"{api_server}/IotRecord/get/{mac_hex}/{variable_name}/int64"
        response = requests.post(url)
        if response.status_code == 200:
            data = response.json()
            return data['value']
        else:
            print(f"请求失败:{response.status_code}")    
    elif action=='clear':
        url = f"{api_server}/IotRecord/clear/{mac_hex}"
        response = requests.post(url)
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
`)
    Generator.addCode(`post_cloud(action='get',variable_name=${name})`)
    }

    //% block="清除服务器数据" blockType="command"
    export function clear(parameter: any, block: any) {

        Generator.addDeclaration("getmac",`
def get_mac_address():
    import uuid
    mac_num = hex(uuid.getnode()).replace('0x', '').upper()
    return mac_num
device_mac = get_mac_address()
        `)
        Generator.addDeclaration(`def_post_cloud`,`def post_cloud(action='get',variable_name='test',variable_value=0):
    import requests
    import json
    global device_mac
    api_server = "http://iot.openblock.online:81"
    mac_hex = device_mac.replace("-", "")
    mac_hex = f"{int(mac_hex, 16):016X}"
    if action=='set':
        value_hex = format(variable_value, "016x")
        url = f"{api_server}/IotRecord/set/{mac_hex}/{variable_name}/int64/{variable_value}"
        response = requests.post(url)
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
    elif action=='get': 
        url = f"{api_server}/IotRecord/get/{mac_hex}/{variable_name}/int64"
        response = requests.post(url)
        if response.status_code == 200:
            data = response.json()
            return data['value']
        else:
            print(f"请求失败:{response.status_code}")    
    elif action=='clear':
        url = f"{api_server}/IotRecord/clear/{mac_hex}"
        response = requests.post(url)
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
`)
Generator.addCode(`post_cloud(action='clear')`)
    }


    function replaceQuotationMarks(str:string){
            str=str.replace(/"/g, ""); //去除所有引号
            return str
    }


    
}
