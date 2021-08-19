module.exports = {
    set: async function(host, username, privatekey, yourfilepath, targetfilepath, valuename, valuedata) {
        const Database = require("noir.db")
        const {NodeSSH} = require('node-ssh')
        const ssh = new NodeSSH()
        
       return await ssh.connect({
          host: host,
          username: username,
          privateKey: privatekey
        })
        .then(() => {
          return ssh.execCommand(`cat database.json`).then(async (cikti) => {
            const db =  Database.ObjDB
            await db.allSet(cikti)
            await db.set(valuename, valuedata)
            var alldataget = await db.All()
            var stringyaplan = JSON.stringify(alldataget)
            return ssh.execCommand(`jq -n --arg greeting world '` + stringyaplan + `' > database.json`).then(async (result) => {
            
            return "YAZILDI"
            })
            })
      })
    },
    add: async function(host, username, privatekey, yourfilepath, targetfilepath, valuename, valuedata) {
      const Database = require("noir.db")
      const {NodeSSH} = require('node-ssh')
      const ssh = new NodeSSH()
      
     return await ssh.connect({
        host: host,
        username: username,
        privateKey: privatekey
      })
      .then(() => {
        return ssh.execCommand(`cat database.json`).then(async (cikti) => {
          const db =  Database.ObjDB
          await db.allSet(cikti)
          await db.add(valuename, valuedata)
          var alldataget = await db.All()
          var stringyaplan = JSON.stringify(alldataget)
          return ssh.execCommand(`jq -n --arg greeting world '` + stringyaplan + `' > database.json`).then(async (result) => {
          
          return "YAZILDI"
          })
          })
    }) 
},
get: function(host, username, privatekey, valuename) {
    const {NodeSSH} = require('node-ssh')
        
    const ssh = new NodeSSH()
   return ssh.connect({
      host: host,
      username: username,
      privateKey: privatekey
    }).then(() => {
        return ssh.execCommand('cat database.json').then(async (result) => {
        
            var response = result.stdout
          var parsetheresponse = JSON.parse(response)
            return parsetheresponse[valuename]
            //console.log(result.stdout)
          })
    })
       
    
},
has:  function(host, username, privatekey, checkvalue) {
    
    const {NodeSSH} = require('node-ssh')
        
    const ssh = new NodeSSH()
    
   return ssh.connect({
      host: host,
      username: username,
      privateKey: privatekey
    })
    .then(() => {
    return ssh.execCommand('cat database.json').then(async (result) => {
        if(result.stderr) {
console.log('Komut Çalıştırılırken Bir Hata İle Karşılaşıldı: ' + result.stderr)
        } else {
            var response = await result.stdout
            var parsetheresponse = await JSON.parse(response)
            return checkvalue in parsetheresponse
        }
      })
    })
},
push: function(host, username, privatekey, yourfilepath, targetfilepath, valuename, valuedata) {
    const Database = require("noir.db")
    const db = new Database()
    db.push(valuename,valuedata)
    const {NodeSSH} = require('node-ssh')
    
    const ssh = new NodeSSH()
    
   return ssh.connect({
      host: host,
      username: username,
      privateKey: privatekey
    })
    .then(function() {
       return ssh.putFile(yourfilepath, targetfilepath).then(async (sa) => {
            return "Veri SSH Bağlantısıyla Sunucuya Yazıldı!"
          }, function(error) {
              return "Bir Hata Oluştu: " + error
          })
    })
},
delete: function(host, username, privatekey, yourfilepath, targetfilepath, valuename) {
    const Database = require("noir.db")
    const db = new Database()
    db.delete(valuename)
    const {NodeSSH} = require('node-ssh')
    
    const ssh = new NodeSSH()
    
   return ssh.connect({
      host: host,
      username: username,
      privateKey: privatekey
    })
    .then(function() {
       return ssh.putFile(yourfilepath, targetfilepath).then(async (sa) => {
            return "Veri SSH Bağlantısıyla Sunucuya Yazıldı!"
          }, function(error) {
              return "Bir Hata Oluştu: " + error
          })
    })
},
all: async function(host, username, privatekey) {
    const {NodeSSH} = require('node-ssh')
        
    const ssh = new NodeSSH()
    
   return ssh.connect({
      host: host,
      username: username,
      privateKey: privatekey
    })
    .then(() => {
    return ssh.execCommand('cat database.json').then(async (result) => {
        if(result.stderr) {
console.log('Komut Çalıştırılırken Bir Hata İle Karşılaşıldı: ' + result.stderr)
        } else {
            var response = await result.stdout
            var parsetheresponse = await JSON.parse(response)
            return parsetheresponse
        }
      })
    })
},
findOne: function(jsonarray, keyword, valuetosearch) {



  function findwhereitis(code) {
    return jsonarray.filter(
        function(data){ return data[keyword] == code }
    );
  }//bu kısmı stackten çaldım :(
  var found = findwhereitis(valuetosearch);
  return found



      }
    
  
}





