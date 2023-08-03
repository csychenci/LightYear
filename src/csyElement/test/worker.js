// worker js
const portPool = [];
onconnect = function (e) {
  const port = e.ports[0];
  // 在connect时将 port添加到 portPool中
  portPool.push(port);
  port.postMessage('哈嘿');
  port.onmessage = (e) => {
    console.log(e.data);
  };
};

function boardcast(message) {
  portPool.forEach((port) => {
    port.portMessage(port);
  });
}
