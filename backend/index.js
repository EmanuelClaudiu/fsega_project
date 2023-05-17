const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/scrape', async (req, res) => {
  try {
    // const response = await axios.get('https://www.ufc.com/rankings');
    // const $ = cheerio.load(response.data);

    // const id = $('//*[@id="block-mainpagecontent"]/div/div[2]/div/div/div/div/div/div/div[1]/div[2]/table/tbody/tr[1]/td[1]').text();
    // const name = $('//*[@id="block-mainpagecontent"]/div/div[2]/div/div/div/div/div/div/div[1]/div[2]/table/tbody/tr[1]/td[2]/a').text();

    const fighters = await axios.get('http://localhost:3000/fighters', req.body);

    res.json(fighters.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.post('/fighters', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3000/fighters', req.body);
    const fighters = await axios.get('http://localhost:3000/fighters', req.body);
    res.send(fighters.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending data to JSON server');
  }
});

app.delete('/fighters', async (req, res) => {
  try {
    let fighters = await axios.get('http://localhost:3000/fighters', req.body);
    const fighterToDelete = fighters.data.find(f => f.name === req.body.name);
    console.log(fighterToDelete);
    const deleteFighter = await axios.delete('http://localhost:3000/fighters/' + fighterToDelete.id.toString());
    fighters = await axios.get('http://localhost:3000/fighters', req.body);
    res.send(fighters.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting fighter');
  }
});

app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});