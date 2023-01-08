class Fetch {
  private baseUrl: string = `${process.env.BASE_URL}`;
  private token: string =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  setToken(token: string) {
    this.token = token;
  }

  post(url: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  }
  get(url: string) {
    return fetch(this.baseUrl + url, {
      method: "GET",
    }).then((res) => res.json());
  }
  getWithToken(url: string) {
    return fetch(this.baseUrl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
    }).then((res) => res.json());
  }

  postWithToken(url: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  deleteWithToken(url: string) {
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  putWithToken(url: string, body: any) {
    return fetch(this.baseUrl + url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}
const api = new Fetch();
export default api;
