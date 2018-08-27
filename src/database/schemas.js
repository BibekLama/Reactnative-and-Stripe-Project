import Realm from 'realm';
export const ACCOUNT_SCHEMA = "Account";

export const AccountSchema = {
    name: ACCOUNT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: {type: 'string', indexed: true},
        sk: 'string',
        country: 'string',
        balance: 'int'
    }
}

const databaseOptions = {
    path: 'stripe.realm',
    schema: [AccountSchema],
    schemaVersion: 1
}

export const getUsers = () => new Promise((resolve,reject) => {
    // alert("getUser")
    Realm.open(databaseOptions).then(realm => {
        let accounts = realm.objects(ACCOUNT_SCHEMA);
        resolve(accounts) 
        // realm.close() 
    }).catch((error) => reject(error))          
})

export const insertAccount = data => new Promise((resolve,reject) =>{
    // alert(JSON.stringify(data))
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            
            // alert(JSON.stringify(data))
            realm.create(ACCOUNT_SCHEMA, data)
            resolve(data)
        })
        // realm.close()
    }).catch((error) => reject(error))
});

export default new Realm(databaseOptions)