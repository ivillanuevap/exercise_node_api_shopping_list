# API - Shopping List
This is a basic exercise of node.js and express.
## Instructions

**Test list**
- Return 401 if api_hey header is not present
- Return 401 if api_hey header is invalid
- Append api_key in text file 
- Return JSON with http 201 code { "api_key": API_KEY }

**TODO**

Check these files for more details

- api-key-ks.js
- api-key-mw.js

**Commands**

- Start
```bash
bash npm start
```

| Route | Method | Protected |
| :---: | :---: | :---: |
| / | GET | No | ./routes/items.js |
| /authenticate | GET | No |
| /items/ | GET | Yes |
| /items/:id | GET | No |
| /items/ | POST | Yes |

**Test Commands**

- Route /
```bash
curl -X GET localhost:8000/
```
Result
```bash
<p>Shopping List</p>
``` 

**Generate api_key**

- Route /authenticate
```bash
curl -v -X GET localhost:8000/authenticate
```
Result
```bash
HTTP 200 Created

{"api_key":"ffc2afca9349e8b7539861ee43112fb6"}
``` 

- Route /items

**Get All**
```bash
curl -H "api_key: ffc2afca9349e8b7539861ee43112fb6" -X GET localhost:8000/items/
```
Result
```bash
HTTP 200 OK

[{"id":1,"name":"Milk"},{"id":2,"name":"Eggs"},{"id":3,"name":"Cheese"}]
``` 

**Get By Id**
```bash
 curl -X GET localhost:8000/items/3
```
Result
```bash
HTTP 200 OK

{"id":3,"name":"Cheese"}
``` 


**Add Item**
```bash
curl -H "api_key: ffc2afca9349e8b7539861ee43112fb6" -X POST localhost:8000/items/ -d "item=Cookies"
```
Result
```bash
HTTP 201 OK

{"id":6}
``` 

## Versions

- Node: 12.22.1

## Test

- Run *./test/index.spec.js* for all tests 