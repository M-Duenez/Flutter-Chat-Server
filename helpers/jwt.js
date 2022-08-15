const jwt = require('jsonwebtoken');

const generarJWT = ( uid, email ) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, email};

        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                //NO SE PUDO CREAR EL TOKEN 
                reject('No se pudo general el token')
            }
            else{
                //TOKEN
                resolve(token);
            }
        });
    });

};

module.exports = {generarJWT};