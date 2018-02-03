[{"id":"ba77a002.5546d","type":"visual-recognition-v3","z":"18c403cc.8151dc","name":"じゃんけん認識","apikey":"bbe19e2884ee8607f73ed07cb79643a5521e0e4e","image-feature":"classifyImage","lang":"en","x":168.50003814697266,"y":262.00000953674316,"wires":[["8b87bcdb.2c674","98d9b0c5.16911"]]},{"id":"8b87bcdb.2c674","type":"function","z":"18c403cc.8151dc","name":"最も正確度が高い結果を抽出","func":"var jsonObj = msg.result;\nvar result_list = new Array();\nfor(var i = 0; i < jsonObj.images.length; )\n{\n    var cf = jsonObj.images.pop();\n    for(var j = 0; j < cf.classifiers.length; )\n    {\n        var cls = cf.classifiers.pop();\n        for(var k = 0; k < cls.classes.length; )\n        {\n            item = cls.classes.pop();\n            console.log(item);\n            var result = new Object();\n            result.name = item.class;\n            result.score = item.score;\n            result_list.push(result);\n        }\n    }\n}\nresult_list.sort(function(a,b){\n    if(a.score > b.score) return -1;\n    if(a.score < b.score) return 1;\n    return 0;\n});\nmsg.payload = result_list[0];\nreturn msg;","outputs":1,"noerr":0,"x":411.50003814697266,"y":287.00000953674316,"wires":[["d5ff9772.fd9198","390abcf3.cb7ac4"]]},{"id":"d5ff9772.fd9198","type":"debug","z":"18c403cc.8151dc","name":"識別結果","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":627.5000686645508,"y":243.00000762939453,"wires":[]},{"id":"161bb52.80f1e4b","type":"function","z":"18c403cc.8151dc","name":"From URL","func":"msg.payload = \"http://file.194.janken-pon.net/6c832057.jpg\";\nreturn msg;","outputs":1,"noerr":0,"x":371.5000343322754,"y":40.000009536743164,"wires":[["3956cf60.af7db"]]},{"id":"900d0bed.3587e8","type":"inject","z":"18c403cc.8151dc","name":"URL","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":154.10000610351562,"y":38.00000286102295,"wires":[["161bb52.80f1e4b"]]},{"id":"3956cf60.af7db","type":"function","z":"18c403cc.8151dc","name":"Set parameters","func":"msg.hedears={\"content-type\":\"image/png\"};\nmsg.params={\"classifier_ids\":[\"RockPaperScissors_1768505145\"],\"threshold\":0.01};\nreturn msg;","outputs":1,"noerr":0,"x":623.1001167297363,"y":67.00000286102295,"wires":[["ba77a002.5546d"]]},{"id":"9b04357a.dd1b68","type":"exec","z":"18c403cc.8151dc","command":"cp /home/tomoyuki/.node-red/public/images/rock.png /home/tomoyuki/.node-red/public/images/result.png","addpay":false,"append":"","useSpawn":"false","timer":"","oldrc":false,"name":"勝てる手グー","x":384.1000099182129,"y":413.5000171661377,"wires":[[],[],[]]},{"id":"487a44da.40cfac","type":"exec","z":"18c403cc.8151dc","command":"cp /home/tomoyuki/.node-red/public/images/scissors.png /home/tomoyuki/.node-red/public/images/result.png","addpay":false,"append":"","useSpawn":"false","timer":"","oldrc":false,"name":"勝てる手チョキ","x":381.00003814697266,"y":472.0000629425049,"wires":[[],[],[]]},{"id":"b34a188d.257498","type":"exec","z":"18c403cc.8151dc","command":"cp /home/tomoyuki/.node-red/public/images/paper.png /home/tomoyuki/.node-red/public/images/result.png","addpay":false,"append":"","useSpawn":"false","timer":"","oldrc":false,"name":"勝てる手パー","x":381.0000305175781,"y":532.000020980835,"wires":[[],[],[]]},{"id":"390abcf3.cb7ac4","type":"switch","z":"18c403cc.8151dc","name":"","property":"payload.name","propertyType":"msg","rules":[{"t":"eq","v":"scissors","vt":"str"},{"t":"eq","v":"paper","vt":"str"},{"t":"eq","v":"rock","vt":"str"}],"checkall":"true","repair":false,"outputs":3,"x":136.10001373291016,"y":470.00001335144043,"wires":[["9b04357a.dd1b68"],["487a44da.40cfac"],["b34a188d.257498"]]},{"id":"98d9b0c5.16911","type":"debug","z":"18c403cc.8151dc","name":"Watsonの解析結果","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"result","x":386.500057220459,"y":226.00003051757812,"wires":[]},{"id":"3be4a448.dbd9fc","type":"http in","z":"18c403cc.8151dc","name":"camera","url":"camera","method":"post","upload":true,"swaggerDoc":"","x":80.10011672973633,"y":110.00003623962402,"wires":[["9e92000.1023","63df2b50.4d6fc4"]]},{"id":"9e92000.1023","type":"http response","z":"18c403cc.8151dc","name":"","statusCode":"","headers":{},"x":112.1001205444336,"y":172.00006198883057,"wires":[]},{"id":"63df2b50.4d6fc4","type":"function","z":"18c403cc.8151dc","name":"Extract image","func":"msg.payload = msg.req.files[0].buffer\nreturn msg;","outputs":1,"noerr":0,"x":368.10008239746094,"y":109.000009059906,"wires":[["3956cf60.af7db"]]}]
