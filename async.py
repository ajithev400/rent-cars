import asyncio

async def main ():
    print('doo')
    task = asyncio.create_task(foo('fooo'))
    print('finished')
    

async def foo(text):
    print(text)
    await asyncio.sleep(1)

asyncio.run(main())