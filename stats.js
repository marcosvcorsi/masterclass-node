const os = require('os');
const logger = require('./logger');

function convertMemToMB(mem) {
  return parseInt(mem / 1024 / 1024);
}

setInterval(() => {
  const { freemem, totalmem } = os;

  const total = convertMemToMB(totalmem());
  const mem = convertMemToMB(freemem());
  const percent = parseInt((mem / total) * 100);

  const stats = {
    free: `${mem} MB`,
    total: `${total} MB`,
    usage: `${percent} %`,
  };

  console.clear();
  console.log('=== PC STATS ===');
  console.table(stats);

  logger(`${JSON.stringify(stats)}\n`);
}, 1000);
