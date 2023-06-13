export async function fetchAPI(url, header = {}, body = {}, method = "GET") {

  if (typeof url !== "string" || url.length === 0 || !url.startsWith("http")) {
    throw new Error("Invalid URL");
  }
  if (method !== "GET" && method !== "POST") {
    throw new Error("Invalid method");
  }
  if (method === "POST") {
    body = JSON.stringify(body);
   
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: body,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  else{
    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
}
