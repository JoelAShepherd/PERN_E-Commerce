const testData = [{data1: 1, data2: 2, data3: 3}]


export const api = {
    async getProducts(){
        console.log('api called');
        try{
            console.log('api try called');
            const response = await fetch('http://localhost:5000/products');
            if (response.ok){
                const jsonResponse = await Promise.resolve(response.json());
                return jsonResponse;
            }
            throw new Error('Request to sever 5000 failed at api request');
        } catch (err){
            console.log(err);
        }
    },
    getTest(){
        return testData
    }
};

console.log('api self-check', api.getProducts())