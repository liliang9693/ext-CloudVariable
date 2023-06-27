

//% color="#0fbd8c" iconWidth=50 iconHeight=40
namespace CloudVariable{

    //% block="设置设备地址[MAC]" blockType="command"
    //% MAC.shadow="string" MAC.defl="00-16-EA-AE-3C-40"
    export function setMac(parameter: any, block: any) {
        let mac=parameter.MAC.code;
        Generator.addDeclaration("setmac",`device_mac = ${mac}`)

    }

    //% block="向服务器上传变量[NAME]值为[VAL]" blockType="command"
    //% NAME.shadow="string" NAME.defl="val"
    //% VAL.shadow="number" VAL.defl=123
    export function set(parameter: any, block: any) {
        let name=parameter.NAME.code;
        let val=parameter.VAL.code;
        Generator.addDeclaration(`def_post_cloud`,`def post_cloud(action='get',variable_name='test',variable_value=0):
    import requests
    import json
    global device_mac
    api_server = "https://mlzone.areyeshot.com"
    headers = {"content-type": "application/json"}
    mac_hex = device_mac.replace("-", "")
    mac_hex = f"{int(mac_hex, 16):016X}"
    if action=='set':
        value_hex = format(variable_value, "016x")
        url = f"{api_server}/IotRecord/set/{mac_hex}/{variable_name}/int64"
        data = {"value": int(value_hex, 16)}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
    elif action=='get': 
        url = f"{api_server}/IotRecord/get/{mac_hex}/{variable_name}/int64"
        response = requests.post(url, headers=headers)
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
Generator.addCode(`post_cloud(action='set',variable_name=${name},variable_value=${val})`)
    }

    //% block="从服务器读取变量[NAME]的值" blockType="reporter"
    //% NAME.shadow="string" NAME.defl="val"
    export function read(parameter: any, block: any) {
        let name=parameter.NAME.code;
        Generator.addDeclaration(`def_post_cloud`,`def post_cloud(action='get',variable_name='test',variable_value=0):
    import requests
    import json
    api_server = "https://mlzone.areyeshot.com"
    headers = {"content-type": "application/json"}
    mac_hex = device_mac.replace("-", "")
    mac_hex = f"{int(mac_hex, 16):016X}"
    if action=='set':
        value_hex = format(variable_value, "016x")
        url = f"{api_server}/IotRecord/set/{mac_hex}/{variable_name}/int64"
        data = {"value": int(value_hex, 16)}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
    elif action=='get': 
        url = f"{api_server}/IotRecord/get/{mac_hex}/{variable_name}/int64"
        response = requests.post(url, headers=headers)
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
        Generator.addDeclaration(`def_post_cloud`,`def post_cloud(action='get',variable_name='test',variable_value=0):
    import requests
    import json
    api_server = "https://mlzone.areyeshot.com"
    headers = {"content-type": "application/json"}
    mac_hex = device_mac.replace("-", "")
    mac_hex = f"{int(mac_hex, 16):016X}"
    if action=='set':
        value_hex = format(variable_value, "016x")
        url = f"{api_server}/IotRecord/set/{mac_hex}/{variable_name}/int64"
        data = {"value": int(value_hex, 16)}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if not response.status_code == 200:
            print(f"请求失败:{response.status_code}")
    elif action=='get': 
        url = f"{api_server}/IotRecord/get/{mac_hex}/{variable_name}/int64"
        response = requests.post(url, headers=headers)
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
