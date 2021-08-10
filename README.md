# Get `key` from kong
```shell
http :8001/consumers/login_server_issuer/jwt
```
ex.
```json
{
    "data": [
        {
            "algorithm": "HS256",
            "consumer": {
                "id": "3b13b1c7-93ff-5a81-87ff-61a30dfff91b"
            },
            "created_at": 1628579740,
            "id": "b8fde43c-ff69-4025-b74b-892b3b51c397",
            "key": "tAz8JshyNid58Yq8Tz3KQWjM3PBetmIV",
            "rsa_public_key": null,
            "secret": "jwtsecret",
            "tags": null
        }
    ],
    "next": null
}
```
# Craft JWT with `key` and `secret`
- call jwtapp
> kid = key
```shell
http :3000/craftjwt \
    kid==tAz8JshyNid58Yq8Tz3KQWjM3PBetmIV \
    email==tko@nida.ac.th \
    secret==jwtsecret
```
- result
```json
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 232
Content-Type: application/json; charset=utf-8
Date: Tue, 10 Aug 2021 07:22:46 GMT
ETag: W/"e8-82lR089IQC8vAGHtPyqCvKiSm68"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRBejhKc2h5TmlkNThZcThUejNLUVdqTTNQQmV0bUlWIn0.eyJlbWFpbCI6InRrb0BuaWRhLmFjLnRoIiwiaWF0IjoxNjI4NTgwMTY2LCJleHAiOjE2Mjg1ODAyMjZ9.vfFLCTWHJctkfKT6Lqdm7EgEHuAlanGO7xvIBX4-KWQ"
}
```
# Test Call kong api with jwt
```shell
http :3000/api \
    jwt==eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRBejhKc2h5TmlkNThZcThUejNLUVdqTTNQQmV0bUlWIn0.eyJlbWFpbCI6InRrb0BuaWRhLmFjLnRoIiwiaWF0IjoxNjI4NTgwMTY2LCJleHAiOjE2Mjg1ODAyMjZ9.vfFLCTWHJctkfKT6Lqdm7EgEHuAlanGO7xvIBX4-KWQ
```
- result
```json
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 1181
Content-Type: application/json
Date: Tue, 10 Aug 2021 07:27:17 GMT
Server: gunicorn/19.9.0
Via: kong/2.5.0
X-Cache: MISS from localhost
X-Cache-Lookup: MISS from localhost:3128
X-Kong-Proxy-Latency: 152
X-Kong-Upstream-Latency: 812

{
    "args": {
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRBejhKc2h5TmlkNThZcThUejNLUVdqTTNQQmV0bUlWIn0.eyJlbWFpbCI6InRrb0BuaWRhLmFjLnRoIiwiaWF0IjoxNjI4NTgwNDE5LCJleHAiOjE2Mjg1ODA0Nzl9.Nxg5oVmetiWuHdxlIBKSiVv20PEDIEdz3Bj4oictIM8"
    },
    "data": "",
    "files": {},
    "form": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Cache-Control": "max-age=0",
        "Host": "httpbin.org",
        "User-Agent": "HTTPie/1.0.3",
        "X-Amzn-Trace-Id": "Root=1-61122a55-47bde6f50a70b7c55b3c9b82",
        "X-Consumer-Id": "3b13b1c7-93ff-5a81-87ff-61a30dfff91b",
        "X-Consumer-Username": "login_server_issuer",
        "X-Credential-Identifier": "tAz8JshyNid58Yq8Tz3KQWjM3PBetmIV",
        "X-Forwarded-Host": "localhost",
        "X-Forwarded-Path": "/api",
        "X-Forwarded-Prefix": "/api"
    },
    "json": null,
    "method": "GET",
    "origin": "172.22.0.1, 10.0.7.47, 14.207.44.177",
    "url": "http://localhost/anything?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRBejhKc2h5TmlkNThZcThUejNLUVdqTTNQQmV0bUlWIn0.eyJlbWFpbCI6InRrb0BuaWRhLmFjLnRoIiwiaWF0IjoxNjI4NTgwNDE5LCJleHAiOjE2Mjg1ODA0Nzl9.Nxg5oVmetiWuHdxlIBKSiVv20PEDIEdz3Bj4oictIM8"
}
```

