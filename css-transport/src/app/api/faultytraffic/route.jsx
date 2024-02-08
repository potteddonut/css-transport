//Ilham - Realtime traffic map

const API_URL = 'http://datamall2.mytransport.sg/ltaodataservice/FaultyTrafficLights';

export async function GET(request){
  const response = await fetch(API_URL, {
    headers: {
      'AccountKey': 'RVCGPbcyRg6yXOyENrIqow=='
    }
  });
  const data = await response.json();  
  console.log(data)

  return Response.json(data);
}