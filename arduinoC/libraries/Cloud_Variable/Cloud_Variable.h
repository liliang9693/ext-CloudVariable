
#ifdef CLOUD_VAR_OBLOQ

    
    String device_mac="00000016EAAE3C40";

    void post_cloud_set(String variable_name,String variable_value)
    {
        //http://iot.openblock.online:81/IotRecord/set/00000016EAAE3C40/val/int64/456
        String url="IotRecord/set/"+device_mac+"/"+variable_name+"/int64/"+variable_value;
        //Serial.println(url);
        olq.post(url, "", 5000);
    }
    int post_cloud_get(String variable_name)
    {
        //http://iot.openblock.online:81/IotRecord/get/00000016EAAE3C40/val/int64
        String url="IotRecord/get/"+device_mac+"/"+variable_name+"/int64/";
        //Serial.println(url);
        String result = olq.post(url, "", 2000);
        //{"name":"val","value":1234}
        //{"name":"val","value":"12"}
        //Serial.println(result);
        int startIndex = result.indexOf("\"value\":");
        if (startIndex >= 0) { 
            int endIndex = result.indexOf("}"); 
            String numberString = result.substring(startIndex+8, endIndex); 
            //Serial.println(numberString); 
            int number = numberString.toInt(); 
            //Serial.println(number); 
            return number;
        } else {
            return -1;
        }
    }
    void post_cloud_clear()
    {
        //http://iot.openblock.online:81/IotRecord/clear/00000016EAAE3C40
        String url="IotRecord/clear/"+device_mac;
        //Serial.println(url); 
        olq.post(url, "", 5000);
    }


#endif

    
#ifdef CLOUD_VAR_ESP32


    String device_mac="00000016EAAE3C40";


    String getMacAddress(){
        String mac_address = String(WiFi.macAddress());
        mac_address.replace(":", "");
        return "0000" + mac_address;
    }


    void post_cloud_set(String variable_name,String variable_value)
    {
        //http://iot.openblock.online:81/IotRecord/set/00000016EAAE3C40/val/int64/456
        String url="http://iot.openblock.online:81/IotRecord/set/"+device_mac+"/"+variable_name+"/int64/"+variable_value;
        //Serial.println(url);
        http.POST(url, 10000);
    }
    int post_cloud_get(String variable_name)
    {
        //http://iot.openblock.online:81/IotRecord/get/00000016EAAE3C40/val/int64
        String url="http://iot.openblock.online:81/IotRecord/get/"+device_mac+"/"+variable_name+"/int64/";
        //Serial.println(url);
        http.POST(url, 10000);
        String result = http.getLine();
        //{"name":"val","value":1234}
        //{"name":"val","value":"12"}
        //Serial.println(result);
        int startIndex = result.indexOf("\"value\":");
        if (startIndex >= 0) { 
            int endIndex = result.indexOf("}"); 
            String numberString = result.substring(startIndex+8, endIndex); 
            //Serial.println(numberString); 
            int number = numberString.toInt(); 
            //Serial.println(number); 
            return number;
        } else {
            return -1;
        }
    }
    void post_cloud_clear()
    {
        //http://iot.openblock.online:81/IotRecord/clear/00000016EAAE3C40
        String url="http://iot.openblock.online:81/IotRecord/clear/"+device_mac;
        //Serial.println(url); 
        http.POST(url, 10000);
    }

#endif