


const root = 'http://localhost:5000'

export const api = {
    async getProducts(){
        try{
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
                    console.log('register response ok!')
                    console.log('response: ', response)
                    return response.json().then(token => console.log(token))
                    
                }
            })
            console.log('end of try register user')
        } catch(err) {
            console.log(err.message)
        }
    },
    async loginUser(email, password){
        console.log('api login called')
        const userCreds = {email: email, password: password}
        let token;
        try{
            fetch('http://localhost:5000/auth/login', {
                'method': 'POST',
                'headers': {
                    'Content-type': 'application/json'
                  },
                  'body': JSON.stringify(userCreds)
            }).then(response => {
                console.log(response);
                if (response.ok){
                        response.json().then(token => {
                            console.log('Login token from API', token)
                        })  
                }
            })

        } catch(err){
            console.log(err)
        }
         
    }
};

console.log('api self-check', api.getProducts())