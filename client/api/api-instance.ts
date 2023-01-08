class Fetch {
  private baseUrl: string = `${process.env.BASE_URL}`;
  private token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  post(url: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }
  get(url: string) {
    return fetch(this.baseUrl + url, {
      method: "GET",
    });
  }
  getWithToken(url: string) {
    return fetch(this.baseUrl + url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  postWithToken(url: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
const api = new Fetch();
export default api;
