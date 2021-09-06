
export const api = {
    async getProducts(){
        console.log('api called');
        try{
            console.log('api try called');
            const response = await fetch('http://localhost5000/products');
            if (response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error('Request to sever 5000 failed at api request');
        } catch (err){
            console.log(err);
        }
    }
};