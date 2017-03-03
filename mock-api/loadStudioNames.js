let studioNames = {};
for(let i = 1; i < 100; i++){
  studioNames[i] = 'Studio name: ' + i;
}

module.exports = {
  response: function(ctx){
    ctx.body = JSON.stringify(studioNames);
  }
};