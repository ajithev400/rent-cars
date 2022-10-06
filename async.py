# import asyncio

# async def main ():
#     print('doo')
#     task = asyncio.create_task(foo('fooo'))
#     print('finished')
    

# async def foo(text):
#     print(text)
#     await asyncio.sleep(1)

# asyncio.run(main())


import json
data ={"razorpay_payment_id":"pay_KQRIEe5usYSaVb","razorpay_order_id":"order_KQRGXUz3BZj9qU","razorpay_signature":"2360b35ca995202aa7674f7ff52dce45e844ef7effd96d379bc84523d2468bbf"}

du =json.dumps(data)
res = json.loads(du)
print("res:",res)
print(res["razorpay_payment_id"])
