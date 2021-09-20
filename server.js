import express from 'express';
import fetch  from 'node-fetch';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;

app.use(cookieParser());
app.use(express.json());

app.use('/', express.static('web'));

app.get("/proxy", (req, res) => {
  let { url } = req.query;

  fetch(url).then((response) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'content-security-policy': '',
      'Content-Type': response.headers.get('Content-Type')
    });

    response.body.pipe(res);
  });
});

// more sophisticated proxy to render imported page without CORS

// app.get("/*", (req, res) => {
//   let { host } = req.query;


//   if (!host) {
//     // try with cookie
//     host = req.cookies.host;
//   }

//   if (!host) {
//     // try from referer    
//     const { referer } = req.headers;
//     if (referer) {
//       const u = new URL(referer);
//       host = u.searchParams.get('host');
//     }
//   }

//   if (!host) {
//     console.warn(`No host found for ${req.path}`);
//     res.status(404).send({
//       status: 404,
//       error: 'Unknown host'
//     });
//     return;
//   }

//   const url = `${host}${req.path}`;
//   console.log(`Proxying ${url}`);
//   fetch(url).then((response) => {
//     res.set({
//       'Access-Control-Allow-Origin': '*',
//       'content-security-policy': '',
//       'Content-Type': response.headers.get('Content-Type'),
//       'origin': host,
//       'host': host
//     });

//     if (!req.cookies.host) {
//       res.cookie('host',host, { maxAge: 900000, httpOnly: true });
//     }

//     response.body.pipe(res);
//     response.body.on('error', () => {})
//   });
// });

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});