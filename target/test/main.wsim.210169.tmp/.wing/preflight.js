const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const http = require('@winglang/sdk').http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Slack extends $stdlib.std.Resource {
      constructor(scope, id, props) {
        super(scope, id);
        this._addInflightOps("postMessage");
        this.token = props.token;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Slack.js";
        const http_UtilClient = http.Util._toInflightType(context);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            http_Util: ${http_UtilClient.text},
            std_Json: ${std_JsonClient.text},
          })
        `);
      }
      _toInflight() {
        const token_client = this._lift(this.token);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SlackClient = ${Slack._toInflightType(this).text};
            const client = new SlackClient({
              token: ${token_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Slack._registerBindObject(this.token, host, []);
        }
        if (ops.includes("postMessage")) {
          Slack._registerBindObject(this.token, host, ["value"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const userToId_client = context._lift(userToId);
        const slack_client = context._lift(slack);
        const http_UtilClient = http.Util._toInflightType(context);
        const std_JsonClient = std.Json._toInflightType(context);
        const std_StringClient = std.String._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            userToId: ${userToId_client},
            slack: ${slack_client},
            http_Util: ${http_UtilClient.text},
            std_Json: ${std_JsonClient.text},
            std_String: ${std_StringClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(slack, host, []);
          $Closure1._registerBindObject(userToId, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(slack, host, ["postMessage"]);
          $Closure1._registerBindObject(userToId, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const handler_client = context._lift(handler);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            handler: ${handler_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(handler, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(handler, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const userToId = Object.freeze({"Tsuf Cohen":"U04CXQRM30T","Uri Bar":"U048U51N37A","Eyal Keren":"U0483031FQV","Chris Rybicki":"U048VR13G0Y","Cristian Pallares":"U048H6N5KPT","Elad Ben-Israel":"U047QJ7HLRG","Hasan Abu-Rayyan":"U04C61FA2PP","Mark McCulloh":"U047YQCTUSJ","Pol Amoros":"U04D5ANRVGC","Revital Barletz":"U047XV37TQE","Shai Ainvoner":"U048U7H72HE","Shai Ber":"U047PN8SRSB","Yoav Steinberg":"U0486KT6R28"});
    const slackToken = this.node.root.newAbstract("@winglang/sdk.cloud.Secret",this,"cloud.Secret",{ name: "slack-token" });
    const slack = new Slack(this,"Slack",{ token: slackToken });
    const handler = new $Closure1(this,"$Closure1");
    const schedule = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"cloud.Schedule",{ cron: "5 6,18 * * *" });
    (schedule.onTick(handler));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "main", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();
