const express = require('express');
const app = express();
const path = require('path');
const Router = express.Router;

app.set('port', 4001);


app.use(express.static(path.join(__dirname, 'build')));
app.use('/*', express.static(path.join(__dirname, 'build')));



app.get('sample', (req, res) => {
  res.send('this is a sample!')
})

const server = app.listen(app.get('port'), function() {
  const port = server.address().port;
  //console.log('Form serving on port: ' + port);
});
