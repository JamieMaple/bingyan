var os = require('os');

function getLocalIps(flagIpv6) {
   var ifaces = os.networkInterfaces();
   var ips = [];
   var func = function(details) {
       if (!flagIpv6 && details.family === 'IPv6') {
           return;
       }
       ips.push(details.address);
   };
   for (var dev in ifaces) {
       ifaces[dev].forEach(func);
   }
   return ips;
};

console.log('本机ip地址(不包括Ipv6):', getLocalIps()[1]);