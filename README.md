# node-form-example

![node-form-example-app](https://cloud.githubusercontent.com/assets/12876929/20828838/ee063ac4-b83e-11e6-9ae5-535e855f75c0.gif)


### Steps
- Clone or download repo
- `cd node-form-example`
- `npm install`
- start with `node .` or `node index.js`

### Example Endpoints
- `http://localhost:3000/` - Default endpoint
- `http://localhost:3000/hi` - Plain text response example
- `http://localhost:3000/token` - Randomly generated token
- `http://localhost:3000/user?username=nick&password=awesomestuff&token=123456789` - Query parameter parsting example

If your form looks like this:
```html
<form action="http://localhost:3000/submit" method="post">
		<input type="text" placeholder="username" name="username">
		<input type="password" placeholder="password" name="password">
		<input type="submit">
</form>
```

you can access the POST submitted text data this way:
```javascript
console.log('Username: ' + req.body.username);
console.log('Password: ' + req.body.password);
```

#### Reference
- https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
- https://github.com/request/request#http-authentication
