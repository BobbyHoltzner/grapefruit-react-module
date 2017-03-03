let rosterRows = {};
for(let i = 1; i < 10; i++){
  rosterRows[i.toString()] = {
      name: "First Last",
      email: "test@test.com",
      phone: "1234567890",
      signatureUrl: "/assets/images/logo_glass_sm.png" 
  };
}

module.exports = {
  response: function(ctx){
    ctx.body = JSON.stringify(rosterRows);
  }
};