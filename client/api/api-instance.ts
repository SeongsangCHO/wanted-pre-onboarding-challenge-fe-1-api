class Fetch {
  private baseUrl: string = `${process.env.BASE_URL}`;
  post(url: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
  get(url: string) {
    return fetch(this.baseUrl + url, {
      method: "GET",
    });
  }
  getWithToken(url: string, token: string) {
    return fetch(this.baseUrl + url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  postWithToken(url: string, token: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }
}
const api = new Fetch();
export default api;
