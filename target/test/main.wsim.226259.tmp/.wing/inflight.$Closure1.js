module.exports = function({ userToId, slack, http_Util, std_Json, std_String }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const token = "u+zwDe6CYAiNy7B3kzMg";
      const onCallResponse = (await http_Util.get("https://api.pagerduty.com/oncalls",Object.freeze({"headers":{"Authorization":`Token token=${token}`,"Content-Type":"application/json","Accept":"*/*"}})));
      const body = (JSON.parse((onCallResponse.body ?? "{}")));
      const onCalls = (body)["oncalls"];
      let message = "_On-Call Update_ :dizzy:\n\n";
      for (const item of (Object.values(onCalls))) {
        const schedule = ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(((item)["schedule"])["summary"]);
        const userName = ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(((item)["user"])["summary"]);
        const start = ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((item)["start"]);
        const end = ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((item)["end"]);
        message = (message + `<@${(userToId)[userName]}> is our *${schedule}* on-call member! :rocket:\n`);
      }
      message = (message + "\nPlease contact them for any urgent issues or escalations. Let's ensure a seamless operation! :raised_hands:");
      (await slack.postMessage({ text: message, channel: "C05DXHS9YKG" }));
    }
  }
  return $Closure1;
}
