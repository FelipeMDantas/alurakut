import { SiteClient } from 'datocms-client';

export default async function requestsReceiver(request, response){
    const token = 'bb98848adb0a02c7707234c148702e';
    const client = new SiteClient(token);

    const createdRecord = await client.items.create({
        itemType: '1470509',
        title: 'Comunidade de teste',
        imageUrl: 'https://github.com/FelipeMDantas.png', 
        creatorSlug: 'FelipeMDantas'
    })

    console.log(createdRecord);

    response.json({
        data: 'Algum dado qualquer',
        createdRecord: createdRecord
    })
}