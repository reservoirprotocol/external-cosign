# external-cosign


## Handle external sign request

/eth/cosign

``` shell
curl --location 'http://localhost:8082/eth/cosign' \
--header 'x-api-key: test' \
--header 'Content-Type: application/json' \
--data '{
        "cosigner": "0xef37d6e83ce06503ec58b201aba60232bfa0fd69",
        "method": "eth_signTypedData_v4",
        "params": [
            {
    "domain": {
        "name": "PaymentProcessor",
        "version": "2",
        "chainId": 11155111,
        "verifyingContract": "0x6abe007ac55e8f7b3b2744814af04b843809871c"
    },
    "types": {
        "SaleApproval": [
            {
                "name": "protocol",
                "type": "uint8"
            },
            {
                "name": "cosigner",
                "type": "address"
            },
            {
                "name": "seller",
                "type": "address"
            },
            {
                "name": "marketplace",
                "type": "address"
            },
            {
                "name": "fallbackRoyaltyRecipient",
                "type": "address"
            },
            {
                "name": "paymentMethod",
                "type": "address"
            },
            {
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "name": "amount",
                "type": "uint256"
            },
            {
                "name": "itemPrice",
                "type": "uint256"
            },
            {
                "name": "expiration",
                "type": "uint256"
            },
            {
                "name": "marketplaceFeeNumerator",
                "type": "uint256"
            },
            {
                "name": "maxRoyaltyFeeNumerator",
                "type": "uint256"
            },
            {
                "name": "nonce",
                "type": "uint256"
            },
            {
                "name": "masterNonce",
                "type": "uint256"
            }
        ]
    },
    "message": {
        "protocol": 0,
        "cosigner": "0x0000000000000000000000000000000000000000",
        "seller": "0xe194be586919965a187d9aab28a92f6c1f0293dc",
        "marketplace": "0x0000000000000000000000000000000000000000",
        "fallbackRoyaltyRecipient": "0x0000000000000000000000000000000000000000",
        "paymentMethod": "0x0000000000000000000000000000000000000000",
        "tokenAddress": "0x5d2ab1f930ce63778ce0ae81bd01142435aef35b",
        "tokenId": "1",
        "amount": "1",
        "itemPrice": "1000000000000000000",
        "expiration": "1704285606",
        "marketplaceFeeNumerator": "0",
        "maxRoyaltyFeeNumerator": "0",
        "nonce": "1063371009440821441053095",
        "masterNonce": "0"
    }
}
        ]
      }'
```