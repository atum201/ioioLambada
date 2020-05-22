const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
var TableName = "ioioG";
var AttributesToGet = ["id","c","p","l"];
exports.handler = (event,context) => { // event: p,g{id,r,h,s}
    let v = V(event)
    if(v>0)
        context.succeed({error:v})
    G(event.g.id).then(g=>{
        console.log(g);
        if(g.Item){
            console.log(g.Item,'info game')
            if(event.g.r && g.item.s == 0)
                UR(event.g).then(d=>{ // update game's result
                    console.log('Set finnish game');
                }).catch((err) => {
                    context.succeed({error:err.message});
                });
            if(event.g.h  && g.Item.s == 0){// push game's history
                
                UH(g.Item,event.g.h).then(d=>{
                    console.log("set add event to history");
                }).catch((err) => {
                    context.succeed({error:err.message});
                });
            }
        }
    })
    
};
function G(id) {
    let pget = {
        TableName,
        Key:{id},
        AttributesToGet:["id","p","r","h","s"]
    };
    return ddb.get(pget).promise();
}
function UR(g){
    let id=g.id;
    let param = {
            TableName,
            Key:{id},
            UpdateExpression: 'set r = :r, s = 1',
            ExpressionAttributeValues: {
                ':r' : g.r
            }
        }
    return ddb.update(param).promise();
}
function UH(g,h){
    let id=g.id;
    
    let param = {
            TableName,
            Key:{id},
            // UpdateExpression: 'set #h = list_append(#h, :h)',
            UpdateExpression: 'set h[ = :h',
            // ExpressionAttributeNames: { "#h":"h[1]"},
            ExpressionAttributeValues: { ':h' : {"t":131,"v":34,"d":123}}
        }
    console.log(param,"222222222")
    return ddb.update(param).promise();
}
function V(item) {
    // validate item structure
    return 0;
}