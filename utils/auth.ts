interface IAuth {
  token: string | null;
  setToken: (token: string) => void;
}

export const Auth: IAuth = {
  token: null,
  setToken: function (token) {
    this.token = token;
  },
};
