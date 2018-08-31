const apiPrefix = 'https://api.spotify.com/v1';

export default async ({
token,
}) => {
  
  const uri = `https://api.spotify.com/v1/artists/4kYSro6naA4h99UJvo89HB/top-tracks?country=SE`;
 
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const json = await res.json();
  

  if (!res.ok) {
    return [];
  }

  
   const items = json.tracks;
  return items.map(item => ({
    id: item.id,
    title: item.name,
    link: item.external_urls.spotify,
    imageUri: item.album.images
      ? item.album.images[0].url
      : undefined
  }));
  
};
