import fetch from "cross-fetch";

export class FetchClient {
  readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<Response>(url: string): Promise<Response> {
    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        headers: {
          authorization: `Bearer ${process.env.TOKEN}`,
        },
      });

      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }
}
