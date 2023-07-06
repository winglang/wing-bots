bring cloud;
bring http;

// types
struct SlackProps {
  token: cloud.Secret;
}

struct PostMessageArgs {
  channel: str;
  text: str?;
}

class Slack {
  token: cloud.Secret;

  init(props: SlackProps) {
    this.token = props.token;
  }

  inflight postMessage(args: PostMessageArgs) {
    let token = this.token.value();

    let res = http.post("https://slack.com/api/chat.postMessage", http.RequestOptions {
      headers: {
        "Authorization" => "Bearer ${token}",
        "Content-Type" => "application/json; charset=utf8",
      },
      body: Json.stringify(Json {
        channel: args.channel,
        text: args.text ?? "",
      })
    }
    );

    log(Json.stringify(res.body));
  }  
}


// pre flights
let slackToken = new cloud.Secret(name: "slack-token") as "slack";
let pagerDutyToken = new cloud.Secret(name: "pager-duty") as "pd";
let slack = new Slack(token: slackToken);


let handler = inflight () => {
  let userToId = Map<str> {
    "Tsuf Cohen" => "U04CXQRM30T", 
    "Uri Bar" => "U048U51N37A", 
    "Eyal Keren" => "U0483031FQV", 
    "Chris Rybicki" => "U048VR13G0Y",
    "Cristian Pallares" => "U048H6N5KPT",
    "Elad Ben-Israel" => "U047QJ7HLRG",
    "Hasan Abu-Rayyan" => "U04C61FA2PP",
    "Mark McCulloh" => "U047YQCTUSJ",
    "Pol Amoros" => "U04D5ANRVGC",
    "Revital Barletz" => "U047XV37TQE",
    "Shai Ainvoner" => "U048U7H72HE",
    "Shai Ber" => "U047PN8SRSB",
    "Yoav Steinberg" => "U0486KT6R28"
  };

// query on-call
let onCallResponse = http.get("https://api.pagerduty.com/oncalls", Json {
  headers: {
    "Authorization": "Token token=${pagerDutyToken.value()}",
    "Content-Type": "application/json",
    "Accept": "*/*"
  }
});

let body =  Json.parse(onCallResponse.body ?? "{}");

let onCalls = body.get("oncalls");
let var message = "_On-Call Update_ :dizzy:\n\n";
for item in Json.values(onCalls) {
  let policyId = str.fromJson(item.get("escalation_policy").get("id"));
 
  if (policyId == "POF5GFV") { // default policy id
    let schedule = str.fromJson(item.get("schedule").get("summary"));
    let userName = str.fromJson(item.get("user").get("summary"));

    message = message + "<@${userToId.get(userName)}> is our *${schedule}* on-call member! :rocket:\n";
  }
}

  message = message + "\nPlease contact them for any urgent issues or escalations. Let's ensure a seamless operation! :raised_hands:";

  // send to slack - @mona-incident
  slack.postMessage(text: message, channel: "C04CJL043D4");
};



// schedule daily query
let schedule = new cloud.Schedule(cron: "5 3,15 * * ?"); // how do I know what timezone is it?

schedule.onTick(handler);


