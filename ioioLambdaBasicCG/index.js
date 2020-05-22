const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
var TableName = "ioioG";
var AttributesToGet = ["id","c","p","l"];
exports.handler = (event,context) => { // event: p,g
    console.log("event starting here")
    if(!V(event))
        context.succeed({error:0})
    F(event.g).then((d)=>{
        if(d.Items.length == 0)
            C(event.g).then((data) => {
                context.succeed(data)
            }).catch((err) => {
                context.succeed({error:err.message});
            });
        else
            U(d.Items[0],event.g).then((data) => {
                context.succeed(data)
            }).catch((err) => {
                context.succeed({error:err.message});
            });
    })
};
function F(item) {
    let param = Object.assign({
            TableName,
            FilterExpression : " s = :s and m.e = :me and m.t = :mt and f = :f and m.s = :ms",
            // ExpressionAttributeNames:{},
            ExpressionAttributeValues :{
                ":s":0,
                ":me":item.m.e,
                ":mt":item.m.t,
                ":f":item.f,
                ":ms":item.m.s
            },
            Select :"SPECIFIC_ATTRIBUTES",
            ProjectionExpression:AttributesToGet.join(',')
        },{});
    return ddb.scan(param).promise();
}
function C(item){
    let id = process.env.id++
    let pput = {
        TableName,
        Item: Object.assign({
            id,
            c: new Date().getTime(),
            s:0
        },item),
    };
    let pget = {
        TableName,
        Key:{id},
        AttributesToGet
    };
    return ddb.put(pput).promise().then(()=>ddb.get(pget).promise());
}
function U(g,item){
    let iu = -1;
    g.p.map((x,i)=> {if(x == 0 && item.p[i] > 0) iu=i; return x })
    if(iu > 0){
        g.p[iu] = item.p[iu]
        g.l[iu] = item.p[iu]
    }
    let id = g.id;
    let param = {
            TableName,
            Key:{id},
            UpdateExpression: 'set p = :p, l = :l',
            ExpressionAttributeValues: {
                ':p' : g.p,
                ':l' : g.l
            }
        }
    let pget = {
        TableName,
        Key:{id},
        AttributesToGet
    };
    return ddb.update(param).promise().then(()=>ddb.get(pget).promise());
}
function V(item) {
    // validate item structure
    return true;
}