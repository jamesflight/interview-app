export const config = {
    knex: {
        client: 'postgresql',
        connection: {
            port: 5431,
            host : 'localhost',
            user : 'root',
            password : 'secret',
            database : 'interview-app'
        }
    }
};