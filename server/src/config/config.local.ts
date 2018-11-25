export const config = {
    knex: {
        client: 'postgresql',
        connection: {
            host : 'localhost',
            user : 'root',
            password : 'secret',
            database : 'interview-app'
        }
    }
};