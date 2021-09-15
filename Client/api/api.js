const testData = [{data1: 1, data2: 2, data3: 3}]


const root = 'http://localhost:5000'

export const api = {
    async getProducts(){
        console.log('api called');
        try{
            console.log('api try called');
            const response = await fetch((root + '/products'));
            if (response.ok){
                const jsonResponse = await Promise.resolve(response.json());
                return jsonResponse;
            }
            throw new Error('Request to sever 5000 failed at api request');
        } catch (err){
            console.log(err);
        }
    },
    async registerUser(name, email, password){
        console.log('register user called')
        try{
            const newUser = {name: name, email: email, password:password};
            fetch('http://localhost:5000/auth/register', {
            'method': 'POST',
            'headers': {
              'Content-type': 'application/json'
            },
            'body': JSON.stringify(newUser)
            }).then(response => {
                if (response.ok){
                    console.log('response ok!')
                    console.log(response)
                    return response.json().then(token => {
                        if (token){
                            console.log(token)
                        }
                    })
                    //dipatch asyncThunk here
                }
            })
            console.log('end of try register user')
        } catch(err) {
            console.log(err.message)
        }
    }
};

console.log('api self-check', api.getProducts())