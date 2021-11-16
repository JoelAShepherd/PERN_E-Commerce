import {api} from './api.js';

test("get date contains year, month and date", () => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth());
    const day = String(date.getDate());

    expect(api.getDate()).toContain(year);
    expect(api.getDate()).toContain(month);
    expect(api.getDate()).toContain(day);

})

test("transformOrderForDB trnasforms items in cart into DB format", () =>{
    const testItems = [{id: 2, quantity: 5}, {id: 1, quantity: 5}]
    const testProducts = [{
        product_id: 1,
        name: 'Beans',
        unit_price: '1.50',
        in_stock: 25,
        description: 'Beans beans, they\'re good for your heart! Buy them here in the Pern Store Mart!'
      },
      {
        product_id: 2,
        name: 'Potatoes',
        unit_price: '2.50',
        in_stock: 25,
        description: 'Boil \'em, mash \'em, put\'em in a stew!'
      }
    ]

    const result = api.transformOrderForDB(testItems, testProducts)

    expect(result).toEqual(`{"items":[{"product_id":2,"product_name":"Potatoes","quantity":5},{"product_id":1,"product_name":"Beans","quantity":5}]}`)
})
