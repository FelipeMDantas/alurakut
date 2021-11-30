export default async function requestsReceiver(request, response){
    const token = 'bb98848adb0a02c7707234c148702e'
    console.log(token);
    response.json({
        data: 'Algum dado qualquer'
    })
}