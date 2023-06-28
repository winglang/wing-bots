module.exports = function({ http_Util, std_Json }) {
  class Slack {
    constructor({ token }) {
      this.token = token;
    }
    async $inflight_init()  {
    }
    async postMessage(args)  {
      const token = (await this.token.value());
      const res = (await http_Util.post("https://slack.com/api/chat.postMessage",{
      "headers": Object.freeze({"Authorization":`Bearer ${token}`,"Content-Type":"application/json; charset=utf8"}),
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([Object.freeze({"channel":args.channel,"text":(args.text ?? "")})]),}
      ));
      {console.log(((args) => { return JSON.stringify(args[0], null, args[1]) })([res.body]))};
    }
  }
  return Slack;
}
