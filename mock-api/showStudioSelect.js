module.exports = {
  response: function(ctx){    
    selectedStudioID = true;
    if(Math.random() > 0.5){
        selectedStudioID = true;
    }
    ctx.body = JSON.stringify(selectedStudioID);
  }
};