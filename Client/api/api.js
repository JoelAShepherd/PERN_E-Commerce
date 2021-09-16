


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
        
        try{
            const response = await fetch('http://localhost:5000/auth/login', {
                'method': 'POST',
                'headers': {
                    'Content-type': 'application/json'
                  },
                  'body': JSON.stringify(userCreds)
            })
            const parseRes = await response.json();
            console.log('Token in API', parseRes)

            if (parseRes === 'Email or password is incorrect'){
                //TODO: Display error to user
                return false
            }
           
            localStorage.setItem("token", parseRes.token)
            return true;
            

        } catch(err){
            console.log(err)
        }
         
    },
    async getUserName(){
        console.log('get user name called in API')
        
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:5000/dashboard', {
                'method': 'GET',
                'headers': {
                    'token': token
                }
            }
            )
            const parseRes = await response.json();
            console.log('Username from API: ', parseRes)
            return parseRes
        } catch(err){
            console.log(err)
        }
    }
};

console.log('api self-check', api.getProducts())