'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const server = new Hapi.Server({
    host: 'localhost',
    port: 3101
});
server.route([
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'I am Root Route'
        }
    },
    {
        method: 'POST',
        path: '/persegi',
        config: {
            validate: {
                payload:{
                    panjang: Joi.number().min(1).required(),
                    lebar: Joi.number().min(1).required()
                }
            }
        },
        handler: (request, h) => {
            console.log(request.payload);
            let panjangRequest= request.payload.panjang;
            let lebarRequest = request.payload.lebar;
            let hasil = parseInt(panjangRequest) * parseInt(lebarRequest)
            const data = {statusCode: 200,error:'', message: 'hitung luas persegi',...request.payload,hasilPerhitungan: hasil}   //bkin respon berbentuk json     
                return h.response(data).code(data.statusCode) //return output berupa json
        } 
        // const contentData = {
        //     data: 'Hitung Luas Segitiga',
        //     panjang : panjangRequest,
        //     lebar: lebarRequest,
        //     hasil : hasil
        // }
        
        // //const data = {
        //     statusCode: statusCode,
        //     error: '',
        //     message: 'Hitung Luas Persegi',
        //     content : contentData
        // }
        // return h.response(data).code(200)
    },
    {
        method: 'POST',
        path: '/ganjilgenap',
        config: {
            validate: {
                payload:{
                    angka: Joi.number().min(1).required()
                    
                }
            }
        },
        handler: (request, h) => {
            console.log(request.payload);
            let angka = request.payload.angka;         
            if(angka %2 == 0){
                const data = {data: 'hello detail users',...request.payload,hasilPerhitungan: 'genap'}   //bkin respon berbentuk json     
                return h.response(data).code(200)
            }else{
                const data = {data: 'hello detail users',...request.payload,hasilPerhitungan: 'ganjil'}   //bkin respon berbentuk json     
                return h.response(data).code(200)
            }
        }
    },

    // {
    //     method: 'GET',
    //     path: '/hello',
    //     handler: (request, h) => {
    //         return {msg: 'I am Hello'};
    //     }
    // },
    // {
    //     method: 'POST',
    //     path: '/register',
    //     handler: (request, h) => {
    //         return {msg: 'i am register using post'};
    //     }'
    // },
]);
const main = async () => {
    await server.register(require('./src/routes/users'));
    await server.start()
    return server
};



main().then(server => {
    console.log('Server Running at:',
    server.info.uri)
}).catch(err =>{
    console.log(err)
    process.exit(1)
})

