POST http://34.172.19.169/orchestrator/order/
Authorization: Bearer {{accessToken}}
Content-Type: application/json

{
"start_date": "2023-05-22",
"finish_date": "2023-05-22",
"receiver": "Winson Bar",
"orderer": "test",
"amount": 3000,
"product_id": 15
}

POST http://34.172.19.169/orchestrator/transaction/update-status
Authorization: Bearer {{accessToken}}
Content-Type: application/json

{
"id": 603,
"status": "REJECTED"
}

POST http://34.172.19.169/orchestrator/transaction/delete
Authorization: Bearer {{accessToken}}
Content-Type: application/json

{
"id": 0,
}
